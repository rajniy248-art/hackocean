import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 300;
const LERP_FACTOR = 0.08;

const framePath = (index: number): string =>
  `/frames/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /** Draw a specific frame onto the canvas, covering the full viewport */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.scale(dpr, dpr);
    }

    // Cover-fit: scale image so it fully covers the viewport
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const vpRatio = vw / vh;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > vpRatio) {
      drawH = vh;
      drawW = vh * imgRatio;
      drawX = (vw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = vw;
      drawH = vw / imgRatio;
      drawX = 0;
      drawY = (vh - drawH) / 2;
    }

    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /** Preload all frames */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** Draw first frame when loaded */
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  /** Scroll handler: map entire page scroll to frame index */
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

      targetFrameRef.current = Math.min(
        FRAME_COUNT - 1,
        Math.floor(fraction * FRAME_COUNT)
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded]);

  /** Animation loop: lerp towards target frame */
  useEffect(() => {
    if (!isLoaded) return;

    let lastDrawnFrame = -1;

    const animate = () => {
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) * LERP_FACTOR;

      const frameToDraw = Math.round(currentFrameRef.current);

      if (frameToDraw !== lastDrawnFrame) {
        drawFrame(frameToDraw);
        lastDrawnFrame = frameToDraw;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame]);

  /** Handle window resize */
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  return (
    <>
      {/* Fixed background canvas — sits behind all website content */}
      <canvas
        ref={canvasRef}
        className="scroll-animation-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Loading overlay */}
      {!isLoaded && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#020617",
          }}
        >
          <div className="scroll-loader">
            <div className="scroll-loader-ring" />
            <div className="scroll-loader-text">
              <span
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                Loading Deep Sea
              </span>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.75rem",
                  color: "#2dd4bf",
                  letterSpacing: "0.15em",
                  marginTop: "0.5rem",
                }}
              >
                {loadProgress}%
              </span>
            </div>
            <div className="scroll-loader-bar-track">
              <div
                className="scroll-loader-bar-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
