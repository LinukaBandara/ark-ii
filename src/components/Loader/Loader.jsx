import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Loader.css";

const disciplines = [
  "IDENTITY",
  "DESIGN",
  "DEVELOPMENT",
  "DIRECTION",
];

const MINIMUM_DURATION = 3600;
const MAXIMUM_DURATION = 5800;

function shouldShowLoader() {
  if (typeof window === "undefined") {
    return true;
  }

  return !window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function Loader({ onComplete }) {
  const [visible, setVisible] = useState(shouldShowLoader);
  const [progress, setProgress] = useState(0);

  const activeDiscipline = useMemo(() => {
    // Keep IDENTITY active long enough to be clearly visible after
    // the discipline labels finish their entrance animation.
    if (progress < 38) {
      return 0;
    }

    if (progress < 62) {
      return 1;
    }

    if (progress < 82) {
      return 2;
    }

    return 3;
  }, [progress]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      document.body.classList.remove("is-loading");

      const completionTimer = window.setTimeout(() => {
        onComplete?.();
      }, 0);

      return () => {
        window.clearTimeout(completionTimer);
      };
    }

    document.body.classList.add("is-loading");

    let cancelled = false;
    let completed = false;
    let frameId = 0;
    let finishTimer = 0;
    let pageLoaded = document.readyState === "complete";
    let fontsLoaded = !document.fonts;

    const startedAt = performance.now();

    const handleWindowLoad = () => {
      pageLoaded = true;
    };

    window.addEventListener("load", handleWindowLoad, {
      once: true,
    });

    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          fontsLoaded = true;
        })
        .catch(() => {
          // A font error must not trap the user in the loader.
          fontsLoaded = true;
        });
    }

    const finish = () => {
      if (completed || cancelled) {
        return;
      }

      completed = true;
      setProgress(100);

      finishTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        onComplete?.();
        setVisible(false);
        document.body.classList.remove("is-loading");
      }, 320);
    };

    const update = (now) => {
      if (cancelled || completed) {
        return;
      }

      const elapsed = now - startedAt;
      const waitingProgress = Math.min(
        94,
        Math.round((elapsed / MINIMUM_DURATION) * 94),
      );

      setProgress((current) =>
        current === waitingProgress ? current : waitingProgress,
      );

      const minimumTimeReached = elapsed >= MINIMUM_DURATION;
      const assetsReady = pageLoaded && fontsLoaded;
      const maximumTimeReached = elapsed >= MAXIMUM_DURATION;

      if (
        (minimumTimeReached && assetsReady) ||
        maximumTimeReached
      ) {
        finish();
        return;
      }

      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimer);
      window.removeEventListener("load", handleWindowLoad);
      document.body.classList.remove("is-loading");
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <div className="loader__top">
            <span>ARK II / DIGITAL STUDIO</span>
            <span>EST. 2026</span>
          </div>

          <div className="loader__center">
            <div className="loader__brand" aria-label="ARK II">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.12,
                  duration: 0.88,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                ARK
              </motion.span>

              <motion.strong
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.62,
                  duration: 0.48,
                }}
              >
                II
              </motion.strong>
            </div>

            <div className="loader__disciplines" aria-hidden="true">
              {disciplines.map((item, index) => (
                <motion.span
                  key={item}
                  className={
                    index === activeDiscipline
                      ? "loader__discipline--active"
                      : ""
                  }
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.68 + index * 0.1,
                    duration: 0.48,
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="loader__bottom">
            <div className="loader__progress">
              <motion.span
                animate={{
                  scaleX: progress / 100,
                }}
                transition={{
                  duration: 0.12,
                  ease: "linear",
                }}
              />
            </div>

            <div className="loader__status">
              <span>Building the experience</span>
              <strong>{String(progress).padStart(3, "0")}%</strong>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
