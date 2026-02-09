"use client";

import HeadphoneScroll from "@/components/HeadphoneScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text opacity transformations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const engineeringOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const driversOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  return (
    <main ref={containerRef} className="relative bg-[#050505] selection:bg-accent/30 font-sans min-h-screen">
      <HeadphoneScroll />

      {/* Narrative Overlays - Adaptive HUD */}
      <div className="fixed inset-0 pointer-events-none flex flex-col justify-end md:justify-center">

        {/* 0% Scroll: SSR X. Pure Sound. */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10"
        >
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter uppercase text-white leading-none">
            SSR <span className="text-accent italic">X</span>
          </h1>
          <p className="text-[10px] sm:text-xs md:text-lg mt-4 sm:mt-6 font-mono tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase">
            Aural Systems • Gen.01
          </p>
        </motion.div>

        {/* 30% Scroll: Precision Engineering. */}
        <motion.div
          style={{ opacity: engineeringOpacity }}
          className="absolute bottom-[30vh] left-0 right-0 md:inset-0 flex flex-col items-start justify-end md:justify-center px-3 sm:px-4 md:pb-0 md:pl-20 md:px-0 translate-x-[20px] pointer-events-none"
        >
          <div className="glass-panel tech-border p-6 sm:p-8 md:p-16 rounded-t-2xl md:rounded-2xl w-full md:w-auto md:max-w-lg lg:max-w-xl pointer-events-auto backdrop-blur-3xl border border-white/10 md:border-none">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 opacity-50">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase text-white">System Analysis // 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white leading-tight">
              Precision<br />Engineering.
            </h2>
            <div className="w-full h-[1px] bg-white/10 my-4 sm:my-6 md:my-8" />
            <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/70">
              Every internal component is crafted with micron-level accuracy,
              ensuring a resonance-free acoustic chamber and zero distortion.
            </p>
          </div>
        </motion.div>

        {/* 60% Scroll: Titanium Drivers. */}
        <motion.div
          style={{ opacity: driversOpacity }}
          className="absolute bottom-[30vh] left-0 right-0 md:inset-0 flex flex-col items-end justify-end md:justify-center px-3 sm:px-4 md:pb-0 md:pr-20 md:px-0 pointer-events-none"
        >
          <div className="glass-panel tech-border p-6 sm:p-8 md:p-16 rounded-t-2xl md:rounded-2xl w-full md:w-auto md:max-w-lg lg:max-w-xl pointer-events-auto backdrop-blur-3xl border border-white/10 md:border-none text-left">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 opacity-50 justify-start">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase text-white">System Analysis // 02</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase text-white leading-tight">
              Titanium<br />Drivers.
            </h2>
            <div className="w-full h-[1px] bg-white/10 my-4 sm:my-6 md:my-8" />
            <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/70">
              Custom-engineered 40mm Titanium drivers deliver lightning-fast transient
              response and subterranean bass extension.
            </p>
          </div>
        </motion.div>

        {/* 90% Scroll: Hear Everything. */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4 sm:mb-6 text-white">
            Hear Everything.
          </h2>
          <p className="text-xs sm:text-sm md:text-xl mb-8 sm:mb-10 text-white/50 font-light tracking-wide max-w-lg mx-auto leading-relaxed px-4">
            The ultimate expression of high-fidelity audio engineering.
            Crafted for those who demand absolute sonic perfection.
          </p>
          <button className="group relative px-8 py-3 sm:px-10 sm:py-4 md:px-14 md:py-5 bg-accent text-black font-bold uppercase tracking-[0.2em] transition-all duration-300 pointer-events-auto cursor-pointer overflow-hidden rounded-sm hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] text-xs sm:text-sm md:text-base">
            <span className="relative z-10">Reserve Yours</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </motion.div>

      </div>

      {/* Footer-like indicator */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 flex gap-2 sm:gap-4 pointer-events-none items-center z-20">
        <div className="w-[1px] h-6 sm:h-8 md:h-12 bg-accent/40" />
        <p className="text-[7px] sm:text-[8px] md:text-[10px] font-mono tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white/30">
          SSR X DESIGN AND CREATED BY BM SAKIF
        </p>
      </div>
    </main>
  );
}
