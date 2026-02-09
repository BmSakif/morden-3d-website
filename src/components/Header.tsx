"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-transparent pointer-events-none"
        >
            {/* Logo */}
            <div className="pointer-events-auto">
                <Link href="/" className="group flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        SSR <span className="text-accent italic group-hover:text-white transition-colors duration-300">X</span>
                    </span>
                </Link>
            </div>

            {/* Navigation - Hidden on mobile for now to keep it clean, or simple list */}
            <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
                {["Overview", "Specs", "Technology"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            {/* CTA Button */}
            <div className="pointer-events-auto">
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105">
                    Pre-order
                </button>
            </div>
        </motion.header>
    );
}
