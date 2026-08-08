import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

const diamondPoints = [
  [0, -1.42, 0],
  [0.72, -0.42, 0],
  [0.36, -0.42, 0.62],
  [-0.36, -0.42, 0.62],
  [-0.72, -0.42, 0],
  [-0.36, -0.42, -0.62],
  [0.36, -0.42, -0.62],
  [0.56, 0.48, 0],
  [0.28, 0.48, 0.48],
  [-0.28, 0.48, 0.48],
  [-0.56, 0.48, 0],
  [-0.28, 0.48, -0.48],
  [0.28, 0.48, -0.48],
  [0, 1.42, 0],
];

const faces = [
  [0, 1, 2],
  [0, 2, 3],
  [0, 3, 4],
  [0, 4, 5],
  [0, 5, 6],
  [0, 6, 1],
  [1, 7, 8],
  [1, 8, 2],
  [2, 8, 9],
  [2, 9, 3],
  [3, 9, 10],
  [3, 10, 4],
  [4, 10, 11],
  [4, 11, 5],
  [5, 11, 12],
  [5, 12, 6],
  [6, 12, 7],
  [6, 7, 1],
  [7, 13, 8],
  [8, 13, 9],
  [9, 13, 10],
  [10, 13, 11],
  [11, 13, 12],
  [12, 13, 7],
];

const edges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
  [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 7],
  [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13],
];

function rotatePoint([x, y, z], rx, ry, rz) {
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);

  let nextY = y * cosX - z * sinX;
  let nextZ = y * sinX + z * cosX;
  let nextX = x;

  const xAfterY = nextX * cosY + nextZ * sinY;
  const zAfterY = -nextX * sinY + nextZ * cosY;
  nextX = xAfterY;
  nextZ = zAfterY;

  return [
    nextX * cosZ - nextY * sinZ,
    nextX * sinZ + nextY * cosZ,
    nextZ,
  ];
}

function ArkCoreCanvas({ activeIndex = 0 }) {
  const canvasRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const coreSpace = canvas?.parentElement;

    if (!canvas || !coreSpace) {
      return undefined;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const mobileViewport = () => window.innerWidth < 760;
    const pointer = { x: 0, y: 0, active: false };

    let width = 1;
    let height = 1;
    let frameId = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;
    let rotation = 0.28;
    let tiltX = 0;
    let tiltY = 0;
    let nodes = [];
    let lastFrameTime = 0;

    const makeNodes = () => {
      const count = mobileViewport() ? 9 : window.innerWidth < 1100 ? 16 : 22;

      nodes = Array.from({ length: count }, (_, index) => ({
        angle: Math.random() * TAU,
        orbit: index % 3,
        group: index % 4,
        speed:
          (0.00025 + Math.random() * 0.00042) *
          (index % 2 ? 1 : -1),
        offset: (Math.random() - 0.5) * 0.22,
        size: 0.9 + Math.random() * 1.35,
        baseOrange: index % 7 === 0 || Math.random() < 0.08,
        pulse: Math.random() * TAU,
      }));
    };

    const resize = () => {
      const bounds = coreSpace.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);

      const pixelRatio = mobileViewport()
        ? 1
        : Math.min(window.devicePixelRatio || 1, 1.45);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeNodes();
    };

    const getCore = () => {
      const mobile = mobileViewport();
      const scale = mobile
        ? Math.min(width * 0.18, 76)
        : window.innerWidth < 1100
          ? Math.min(width * 0.23, 112)
          : Math.min(width * 0.24, 138);

      return {
        x: width * 0.5,
        y: mobile ? height * 0.46 : height * 0.48,
        scale,
      };
    };

    const projectDiamond = (core) => {
      const pointerX = pointer.active
        ? ((pointer.x - core.x) / Math.max(core.scale * 3, 1)) * 0.075
        : 0;
      const pointerY = pointer.active
        ? ((pointer.y - core.y) / Math.max(core.scale * 3, 1)) * -0.055
        : 0;

      tiltX += (pointerY - tiltX) * 0.028;
      tiltY += (pointerX - tiltY) * 0.028;

      return diamondPoints.map((point) => {
        const [x, y, z] = rotatePoint(
          point,
          -0.12 + tiltX,
          rotation + tiltY,
          0.04,
        );
        const perspective = 3.9 / (3.9 - z * 0.45);

        return {
          x: core.x + x * core.scale * perspective,
          y: core.y + y * core.scale * perspective,
          z,
        };
      });
    };

    const drawOrbit = (core, radiusX, radiusY, rotationOffset, alpha) => {
      context.save();
      context.translate(core.x, core.y);
      context.rotate(rotationOffset);
      context.beginPath();
      context.ellipse(0, 0, radiusX, radiusY, 0, 0, TAU);
      context.strokeStyle = `rgba(255, 90, 31, ${alpha})`;
      context.lineWidth = 0.7;
      context.setLineDash([3, 6]);
      context.stroke();
      context.restore();
      context.setLineDash([]);
    };

    const getNodePosition = (node, core) => {
      const orbitScale = [1, 1.22, 1.48][node.orbit];
      const radiusX = core.scale * 2.05 * orbitScale;
      const radiusY = core.scale * (0.62 + node.orbit * 0.08);
      const rotationOffset = [-0.23, 0.18, -0.06][node.orbit];
      const angle = node.angle + node.offset;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      const cos = Math.cos(rotationOffset);
      const sin = Math.sin(rotationOffset);

      return {
        x: core.x + x * cos - y * sin,
        y: core.y + x * sin + y * cos,
      };
    };

    const drawNetwork = (core) => {
      const positions = nodes.map((node) => getNodePosition(node, core));
      const maxDistance = core.scale * 1.25;
      const currentIndex = activeIndexRef.current;

      for (let first = 0; first < positions.length; first += 1) {
        for (let second = first + 1; second < positions.length; second += 1) {
          const a = positions[first];
          const b = positions[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.14;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(255, 90, 31, ${alpha})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }
      }

      positions.forEach((position, index) => {
        const node = nodes[index];
        const pulse = 0.8 + Math.sin(node.pulse) * 0.2;
        const highlighted = node.baseOrange || node.group === currentIndex;

        if (pointer.active && finePointer) {
          const distance = Math.hypot(
            position.x - pointer.x,
            position.y - pointer.y,
          );
          const pointerRadius = Math.max(110, core.scale * 1.35);

          if (distance < pointerRadius) {
            const closeness = 1 - distance / pointerRadius;
            context.beginPath();
            context.moveTo(position.x, position.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = `rgba(255, 90, 31, ${closeness * 0.24})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }

        if (highlighted) {
          const glow = context.createRadialGradient(
            position.x,
            position.y,
            0,
            position.x,
            position.y,
            node.size * 7,
          );
          glow.addColorStop(0, `rgba(255, 90, 31, ${0.25 * pulse})`);
          glow.addColorStop(1, "rgba(255, 90, 31, 0)");
          context.beginPath();
          context.arc(position.x, position.y, node.size * 7, 0, TAU);
          context.fillStyle = glow;
          context.fill();
        }

        context.beginPath();
        context.arc(position.x, position.y, node.size, 0, TAU);
        context.fillStyle = highlighted
          ? `rgba(255, 90, 31, ${0.82 * pulse})`
          : `rgba(241, 238, 231, ${0.38 * pulse})`;
        context.fill();
      });
    };

    const drawDiamond = (points, core) => {
      const currentIndex = activeIndexRef.current;
      const sortedFaces = faces
        .map((face) => ({
          face,
          depth:
            face.reduce((sum, index) => sum + points[index].z, 0) / 3,
        }))
        .sort((a, b) => a.depth - b.depth);

      sortedFaces.forEach(({ face, depth }, faceIndex) => {
        const alpha = 0.025 + ((depth + 1) / 2) * 0.055;
        const orangeFace =
          faceIndex % (5 - Math.min(currentIndex, 2)) === 0;

        context.beginPath();
        context.moveTo(points[face[0]].x, points[face[0]].y);
        context.lineTo(points[face[1]].x, points[face[1]].y);
        context.lineTo(points[face[2]].x, points[face[2]].y);
        context.closePath();
        context.fillStyle = orangeFace
          ? `rgba(255, 90, 31, ${alpha + 0.025})`
          : `rgba(241, 238, 231, ${alpha})`;
        context.fill();
      });

      edges.forEach(([from, to], index) => {
        const depth = (points[from].z + points[to].z) / 2;
        const alpha = 0.16 + ((depth + 1) / 2) * 0.34;
        const orange = index % 4 === currentIndex;

        context.beginPath();
        context.moveTo(points[from].x, points[from].y);
        context.lineTo(points[to].x, points[to].y);
        context.strokeStyle = orange
          ? `rgba(255, 90, 31, ${Math.min(0.7, alpha + 0.16)})`
          : `rgba(241, 238, 231, ${alpha})`;
        context.lineWidth = orange ? 1 : 0.7;
        context.stroke();
      });

      const glow = context.createRadialGradient(
        core.x,
        core.y + core.scale * 1.32,
        0,
        core.x,
        core.y + core.scale * 1.32,
        core.scale * 0.78,
      );
      glow.addColorStop(0, "rgba(255, 90, 31, 0.25)");
      glow.addColorStop(1, "rgba(255, 90, 31, 0)");
      context.beginPath();
      context.ellipse(
        core.x,
        core.y + core.scale * 1.32,
        core.scale * 0.86,
        core.scale * 0.18,
        0,
        0,
        TAU,
      );
      context.fillStyle = glow;
      context.fill();
    };

    const drawPointer = () => {
      if (!pointer.active || !finePointer) {
        return;
      }

      context.beginPath();
      context.arc(pointer.x, pointer.y, 2, 0, TAU);
      context.fillStyle = "rgba(255, 90, 31, 0.82)";
      context.fill();

      context.beginPath();
      context.arc(pointer.x, pointer.y, 7, 0, TAU);
      context.strokeStyle = "rgba(255, 90, 31, 0.16)";
      context.lineWidth = 1;
      context.stroke();
    };

    const renderFrame = (time = 0) => {
      frameId = 0;

      if (!isVisible || !pageVisible) {
        return;
      }

      const targetInterval = mobileViewport() ? 34 : 16;

      if (
        !reducedMotion &&
        lastFrameTime &&
        time - lastFrameTime < targetInterval
      ) {
        frameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      lastFrameTime = time;
      context.clearRect(0, 0, width, height);
      const core = getCore();

      if (!reducedMotion) {
        rotation += mobileViewport() ? 0.0007 : 0.00105;
        nodes.forEach((node) => {
          node.angle += node.speed * 16;
          node.pulse += mobileViewport() ? 0.009 : 0.012;
        });
      }

      drawOrbit(core, core.scale * 2.05, core.scale * 0.62, -0.23, 0.19);
      drawOrbit(core, core.scale * 2.48, core.scale * 0.77, 0.18, 0.11);
      drawOrbit(core, core.scale * 3.02, core.scale * 0.93, -0.06, 0.07);
      drawNetwork(core);
      drawDiamond(projectDiamond(core), core);
      drawPointer();

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const start = () => {
      if (!frameId && isVisible && pageVisible && !reducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const stop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (!finePointer || reducedMotion) {
        return;
      }

      const bounds = coreSpace.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      renderFrame();
      start();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          renderFrame();
          start();
        } else {
          pointer.active = false;
          stop();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "60px 0px",
      },
    );

    resize();
    renderFrame();
    resizeObserver.observe(coreSpace);
    intersectionObserver.observe(coreSpace);
    coreSpace.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    coreSpace.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      coreSpace.removeEventListener("pointermove", handlePointerMove);
      coreSpace.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="capabilities-core-canvas"
      aria-hidden="true"
    />
  );
}

export default ArkCoreCanvas;
