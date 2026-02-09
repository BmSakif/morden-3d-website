"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Loader2 } from "lucide-react";

const FRAME_COUNT = 80;
const FILE_PREFIX = "kling_20260208_VIDEO_Image2_Ima_5341_0 (online-video-cutter.com)_";

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress für butter-smooth transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to image index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/frames/${FILE_PREFIX}${paddedIndex}.jpg`;

        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setIsLoading(false);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context || images.length === 0 || isLoading) return;

      const index = Math.round(frameIndex.get());
      const image = images[index] || images[0];

      // Use better image smoothing for high quality
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image centered and contained
      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imageRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on("change", render);

    // Initial render
    if (!isLoading && images.length > 0) {
      render();
    }

    return () => unsubscribe();
  }, [images, isLoading, frameIndex]);

  // Handle resize and retina displays
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;

        // Ensure the drawing logic stays consistent after resize
        const context = canvasRef.current.getContext("2d");
        const index = Math.round(frameIndex.get());
        const image = images[index] || images[0];
        if (context && image) {
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";

          const canvas = canvasRef.current;
          const canvasRatio = canvas.width / canvas.height;
          const imageRatio = image.width / image.height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (canvasRatio > imageRatio) {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imageRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imageRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
          }
          context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [images, isLoading, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <Loader2 className="h-10 w-10 animate-spin text-accent/60" />
          <p className="mt-4 font-mono text-sm tracking-widest text-accent/40 uppercase">
            SSR X • Pre-fetching assets {progress}%
          </p>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-contain"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
