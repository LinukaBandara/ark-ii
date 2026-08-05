import { useEffect, useRef } from "react";
import "./NetworkCanvas.css";

const TAU = Math.PI * 2;

const settings = {
  hero: {
    desktopNodes: 34,
    tabletNodes: 22,
    mobileNodes: 13,
    desktopDistance: 148,
    mobileDistance: 112,
    pointerRadius: 185,
    lineAlpha: 0.2,
    dotAlpha: 0.72,
    speedMin: 0.055,
    speedMax: 0.14,
  },
  contact: {
    desktopNodes: 11,
    tabletNodes: 8,
    mobileNodes: 6,
    desktopDistance: 165,
    mobileDistance: 120,
    pointerRadius: 0,
    lineAlpha: 0.13,
    dotAlpha: 0.48,
    speedMin: 0.035,
    speedMax: 0.09,
  },
  why: {
    desktopNodes: 21,
    tabletNodes: 15,
    mobileNodes: 9,
    desktopDistance: 132,
    mobileDistance: 102,
    pointerRadius: 145,
    lineAlpha: 0.16,
    dotAlpha: 0.58,
    speedMin: 0.03,
    speedMax: 0.078,
  },
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function getSettings(variant) {
  return settings[variant] ?? settings.hero;
}

function getNodeCount(width, variant) {
  const config = getSettings(variant);

  if (width < 640) {
    return config.mobileNodes;
  }

  if (width < 1024) {
    return config.tabletNodes;
  }

  return config.desktopNodes;
}

function createNode(index, width, height, variant) {
  const config = getSettings(variant);
  const mobile = width < 640;
  const speedMultiplier = mobile ? 0.72 : 1;

  let x;
  let y;

  if (variant === "contact") {
    x = randomBetween(width * 0.42, width * 1.02);
    y = randomBetween(-height * 0.04, height * 0.78);
  } else if (variant === "why") {
    x = randomBetween(width * 0.06, width * 0.94);
    y = randomBetween(height * 0.06, height * 0.94);
  } else {
    // Slightly bias the hero network toward the orb/right side while
    // still keeping a few lines across the full composition.
    const horizontalSeed = Math.pow(Math.random(), 0.72);
    x = width * (0.035 + horizontalSeed * 0.965);
    y = randomBetween(height * 0.035, height * 0.91);
  }

  const angle = randomBetween(0, TAU);
  const speed =
    randomBetween(config.speedMin, config.speedMax) * speedMultiplier;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(mobile ? 0.8 : 0.95, mobile ? 1.45 : 1.8),
    orange: index % 7 === 0 || Math.random() < 0.1,
    pulse: randomBetween(0, TAU),
    pulseSpeed: randomBetween(0.008, 0.018),
  };
}

function NetworkCanvas({ variant = "hero" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    const host = wrapper?.parentElement;

    if (!canvas || !wrapper || !host) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return undefined;
    }

    const config = getSettings(variant);
    const pointer = {
      x: 0,
      y: 0,
      active: false,
    };

    let width = 0;
    let height = 0;
    let nodes = [];
    let frameId = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;
    let finePointer = false;

    const setCanvasSize = () => {
      const bounds = wrapper.getBoundingClientRect();

      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      );

      nodes = Array.from(
        { length: getNodeCount(width, variant) },
        (_, index) => createNode(index, width, height, variant),
      );

      finePointer =
        (variant === "hero" || variant === "why") &&
        width >= 900 &&
        window.matchMedia("(pointer: fine)").matches;
    };

    const drawLine = (fromX, fromY, toX, toY, alpha, orange = false) => {
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.strokeStyle = orange
        ? `rgba(255, 90, 31, ${alpha})`
        : `rgba(241, 238, 231, ${alpha})`;
      context.lineWidth = orange ? 0.8 : 0.65;
      context.stroke();
    };

    const updateNodes = () => {
      const edgePadding = 14;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < -edgePadding) {
          node.x = width + edgePadding;
        } else if (node.x > width + edgePadding) {
          node.x = -edgePadding;
        }

        if (node.y < -edgePadding) {
          node.y = height + edgePadding;
        } else if (node.y > height + edgePadding) {
          node.y = -edgePadding;
        }

        if (pointer.active && finePointer) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < config.pointerRadius) {
            const influence =
              (1 - distance / config.pointerRadius) * 0.013;

            node.x += (dx / distance) * influence;
            node.y += (dy / distance) * influence;
          }
        }
      });
    };

    const drawConnections = () => {
      const connectionDistance =
        width < 640
          ? config.mobileDistance
          : config.desktopDistance;

      for (let first = 0; first < nodes.length; first += 1) {
        const nodeA = nodes[first];

        for (
          let second = first + 1;
          second < nodes.length;
          second += 1
        ) {
          const nodeB = nodes[second];
          const distance = Math.hypot(
            nodeA.x - nodeB.x,
            nodeA.y - nodeB.y,
          );

          if (distance >= connectionDistance) {
            continue;
          }

          const closeness = 1 - distance / connectionDistance;
          const orange = nodeA.orange && nodeB.orange;
          const alpha =
            closeness *
            config.lineAlpha *
            (orange ? 1.3 : 1);

          drawLine(
            nodeA.x,
            nodeA.y,
            nodeB.x,
            nodeB.y,
            alpha,
            orange,
          );
        }
      }
    };

    const drawPointerConnections = () => {
      if (!pointer.active || !finePointer) {
        return;
      }

      nodes.forEach((node) => {
        const distance = Math.hypot(
          node.x - pointer.x,
          node.y - pointer.y,
        );

        if (distance >= config.pointerRadius) {
          return;
        }

        const closeness = 1 - distance / config.pointerRadius;

        drawLine(
          node.x,
          node.y,
          pointer.x,
          pointer.y,
          closeness * 0.24,
          node.orange,
        );
      });

      context.beginPath();
      context.arc(pointer.x, pointer.y, 2.2, 0, TAU);
      context.fillStyle = "rgba(255, 90, 31, 0.8)";
      context.fill();

      context.beginPath();
      context.arc(pointer.x, pointer.y, 7, 0, TAU);
      context.strokeStyle = "rgba(255, 90, 31, 0.18)";
      context.lineWidth = 1;
      context.stroke();
    };

    const drawNodes = () => {
      nodes.forEach((node) => {
        const pulse = 0.86 + Math.sin(node.pulse) * 0.14;
        const alpha = config.dotAlpha * pulse;

        if (node.orange) {
          const glow = context.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 7,
          );

          glow.addColorStop(0, `rgba(255, 90, 31, ${alpha * 0.38})`);
          glow.addColorStop(1, "rgba(255, 90, 31, 0)");

          context.beginPath();
          context.arc(node.x, node.y, node.radius * 7, 0, TAU);
          context.fillStyle = glow;
          context.fill();
        }

        context.beginPath();
        context.arc(
          node.x,
          node.y,
          node.orange ? node.radius * 1.28 : node.radius,
          0,
          TAU,
        );
        context.fillStyle = node.orange
          ? `rgba(255, 90, 31, ${Math.min(1, alpha + 0.12)})`
          : `rgba(241, 238, 231, ${alpha})`;
        context.fill();
      });
    };

    const render = () => {
      frameId = 0;

      if (!isVisible || !pageVisible) {
        return;
      }

      context.clearRect(0, 0, width, height);
      updateNodes();
      drawConnections();
      drawPointerConnections();
      drawNodes();

      frameId = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!frameId && isVisible && pageVisible) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (!finePointer) {
        return;
      }

      const bounds = host.getBoundingClientRect();

      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y >= 0 &&
        pointer.y <= bounds.height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;

      if (pageVisible) {
        start();
      } else {
        stop();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
      start();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          start();
        } else {
          stop();
        }
      },
      {
        threshold: 0.02,
      },
    );

    setCanvasSize();
    resizeObserver.observe(wrapper);
    intersectionObserver.observe(host);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    if (variant === "hero" || variant === "why") {
      host.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      host.addEventListener("pointerleave", handlePointerLeave);
    }

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [variant]);

  return (
    <div
      className={`network-canvas network-canvas--${variant}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default NetworkCanvas;
