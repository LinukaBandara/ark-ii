import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function SmoothScroll({ children }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.02,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: {
        offset: -88,
      },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}

export default SmoothScroll;
