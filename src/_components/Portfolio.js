"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Layers, Code2, MoveRight } from "lucide-react";

const PROJECTS_DATA = [
    {
        id: "01",
        title: "Galerie Botanique",
        category: "Spatial Web & 3D",
        year: "2026",
        client: "Paris, France",
        tagline: "Virtual 3D monograph documenting 20,000 sqm of curated floral coexistence across Paris and Tokyo.",
        description:
            "A bespoke digital exhibition experience designed at the intersection of analog flora and algorithmic layout. Built with headless Next.js architecture, real-time procedural lighting shaders, and custom smooth kinetic typography.",
        image: "/home/1.webp",
        tags: ["Next.js 15", "Three.js", "Framer Motion", "TailwindCSS"],
        metrics: "450K+ Global Visitors",
        awards: "FWA of the Day • Awwwards SOTD",
    },
    {
        id: "02",
        title: "Kroma Spatial Audio",
        category: "Creative Tech & Sound",
        year: "2025",
        client: "Tokyo, Japan",
        tagline: "Next-gen spatial sound synthesizer with interactive canvas waveforms and real-time DSP.",
        description:
            "We engineered a browser-native multichannel acoustic environment that transforms cursor gestures into spatial acoustic reflections. Zero latency, high fidelity, and tactile responsive design.",
        image: "/home/new1.webp",
        tags: ["Web Audio API", "Canvas 2D", "WebGL", "TypeScript"],
        metrics: "Sub-12ms Latency",
        awards: "Developer Award 2025",
    },
    {
        id: "03",
        title: "Studio Lumina Press",
        category: "Brand Systems & Editorial",
        year: "2025",
        client: "New York, USA",
        tagline: "Minimalist Swiss typography and tactile art direction for a contemporary architectural press.",
        description:
            "Bridging the physical warmth of archival bookbinding with high-speed digital eCommerce. Features bespoke micro-animations, digital contact sheets, and curated editorial spreads.",
        image: "/home/new2.png",
        tags: ["Headless Shopify", "Next.js", "Editorial Grid", "GSAP"],
        metrics: "180% Conversion Lift",
        awards: "Tokyo TDC Annual Selection",
    },
    {
        id: "04",
        title: "Hyperion Cloud Core",
        category: "Enterprise Architecture",
        year: "2026",
        client: "Zurich, Switzerland",
        tagline: "Mission-critical dashboard and telemetry engine for ultra-low latency distributed cloud clusters.",
        description:
            "Architected for real-time observability across 40+ global edge locations. Features zero-lag streaming WebSockets, automated failover visualization, and high-density financial-grade data rendering.",
        image: "/home/2.webp",
        tags: ["Next.js", "WebSockets", "D3.js", "Edge Runtime"],
        metrics: "99.999% Fault Tolerance",
        awards: "Best Data Architecture 2026",
    },
];

export default function Portfolio() {
    const [activeId, setActiveId] = useState("01");
    const [modalProject, setModalProject] = useState(null);

    return (
        <section
            id="portfolio"
            className="relative w-full bg-[#fbfbfb] text-[#0d0d0d] font-['Outfit',sans-serif] px-4 sm:px-8 md:px-12 lg:px-16 pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-20 md:pb-24 select-none overflow-hidden"
        >
            <div className="relative z-10 max-w-[1440px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-8 mb-8 sm:mb-12 border-b border-black/10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-2 w-2 rounded-full bg-[#ff5a1f] animate-pulse" />
                            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-black/60 font-semibold">
                                PORTFOLIO // 04 SELECTED ARCHIVES
                            </span>
                        </div>
                        <h2 className="font-['Outfit'] text-[clamp(1.8rem,7vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-black">
                            Work that alters.
                            <br />
                            <span className="text-neutral-400">
                                Perception.
                            </span>
                        </h2>
                    </div>


                </div>

                {/* ============================================================== */}
                {/* HORIZONTAL EXPANDING ACCORDION CARDS SLIDER                     */}
                {/* ============================================================== */}
                <div className="flex gap-2.5 sm:gap-4 md:gap-5 w-full h-[460px] sm:h-[500px] md:h-[540px] lg:h-[560px] items-stretch">
                    {PROJECTS_DATA.map((project) => {
                        const isActive = activeId === project.id;

                        return (
                            <motion.div
                                key={project.id}
                                layout
                                onClick={() => setActiveId(project.id)}
                                onMouseEnter={() => setActiveId(project.id)}
                                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                                className={`relative rounded-2xl sm:rounded-3xl md:rounded-[28px] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/10 transition-all duration-500 ${
                                    isActive
                                        ? "flex-[4] sm:flex-[4.5] md:flex-[5] shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                                        : "flex-1 hover:brightness-105"
                                }`}
                            >
                                {/* Background Image with zoom on active */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className={`object-cover object-center transition-all duration-700 ease-out ${
                                        isActive
                                            ? "scale-105 brightness-100 contrast-[1.04]"
                                            : "scale-100 grayscale-[40%] brightness-90 hover:grayscale-0"
                                    }`}
                                />

                                {/* Subtle Dark Vignette & Overlays */}
                                <div
                                    className={`absolute inset-0 transition-opacity duration-500 ${
                                        isActive
                                            ? "bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                                            : "bg-black/35 hover:bg-black/20"
                                    }`}
                                />

                                {/* ========================================================== */}
                                {/* COLLAPSED SLAT VIEW (Slender pillar with vertical rotated title) */}
                                {/* ========================================================== */}
                                {!isActive && (
                                    <div className="absolute inset-0 flex flex-col justify-between items-center py-6 sm:py-8 px-2 pointer-events-none">
                                        {/* Top Index Number */}
                                        <span className="font-mono text-xs sm:text-sm font-bold text-white/80 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                                            {project.id}
                                        </span>

                                        {/* Vertical Rotated Project Title */}
                                        <div className="my-auto [writing-mode:vertical-rl] rotate-180 flex items-center justify-center">
                                            <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-white whitespace-nowrap">
                                                {project.title}
                                            </span>
                                        </div>

                                        {/* Bottom Arrow Indicator */}
                                        <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                )}

                                {/* ========================================================== */}
                                {/* EXPANDED ACTIVE CARD CONTENT (Glassmorphic bottom overlay) */}
                                {/* ========================================================== */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 15 }}
                                            transition={{ duration: 0.45, delay: 0.1 }}
                                            className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8"
                                        >
                                            {/* Top Bar on Active Card */}
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-white border border-white/15 shadow-md">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                                    <span>{project.category}</span>
                                                </span>

                                                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono font-bold text-black shadow-md">
                                                    {project.id} / 04
                                                </span>
                                            </div>

                                            {/* Bottom Floating Glassmorphism Card */}
                                            <div className="rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 p-4 sm:p-6 text-white shadow-2xl">
                                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/65 mb-1.5">
                                                    <span>{project.client}</span>
                                                    <span>•</span>
                                                    <span>{project.metrics}</span>
                                                </div>

                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                                                    {project.title}
                                                </h3>

                                                <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed max-w-2xl">
                                                    {project.tagline}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>


            </div>

            {/* ============================================================== */}
            {/* FULLSCREEN CASE STUDY MODAL                                    */}
            {/* ============================================================== */}
            <AnimatePresence>
                {modalProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setModalProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-white text-black rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-black/15"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-black/10 bg-[#fafafa]">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black text-white">
                                        CASE {modalProject.id}
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-wider text-black/60">
                                        {modalProject.client} // {modalProject.year}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setModalProject(null)}
                                    className="p-1.5 sm:p-2 rounded-full bg-black/5 hover:bg-black/10 text-black/80 hover:text-black transition-colors cursor-pointer"
                                    aria-label="Close case study"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
                                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/5 border border-black/10 shadow-inner">
                                    <Image
                                        src={modalProject.image}
                                        alt={modalProject.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                                            {modalProject.category}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-black">
                                        {modalProject.title}
                                    </h3>
                                    <p className="mt-2 text-base sm:text-lg text-black/80 font-medium leading-relaxed">
                                        {modalProject.tagline}
                                    </p>
                                </div>

                                <div className="p-4 sm:p-5 rounded-xl bg-[#f7f7f7] border border-black/5">
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                                        PROJECT OVERVIEW
                                    </h4>
                                    <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                                        {modalProject.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-black/10 bg-white">
                                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black/50 mb-1">
                                            <Sparkles size={12} className="text-[#ff5a1f]" />
                                            <span>IMPACT &amp; METRIC</span>
                                        </div>
                                        <p className="text-base sm:text-lg font-bold text-black">
                                            {modalProject.metrics}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl border border-black/10 bg-white">
                                        <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black/50 mb-1">
                                            <Layers size={12} className="text-[#ff5a1f]" />
                                            <span>RECOGNITION</span>
                                        </div>
                                        <p className="text-base sm:text-lg font-bold text-black">
                                            {modalProject.awards}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black/50 mb-2.5">
                                        <Code2 size={12} />
                                        <span>TECHNOLOGY STACK</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {modalProject.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/5 text-black border border-black/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 sm:p-6 border-t border-black/10 bg-[#fafafa] flex items-center justify-between">
                                <span className="font-mono text-xs text-black/50">
                                    BUGSMOKER ATELIER CASE REPRODUCTION
                                </span>
                                <button
                                    onClick={() => setModalProject(null)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-[#ff5a1f] transition-colors cursor-pointer"
                                >
                                    <span>Close Case</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
