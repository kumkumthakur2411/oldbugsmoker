"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Layers, Code2 } from "lucide-react";

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
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [modalProject, setModalProject] = useState(null);
    const [maxScroll, setMaxScroll] = useState(0);

    // Dynamically calculate horizontal distance to slide
    useEffect(() => {
        const updateScrollDistance = () => {
            if (trackRef.current) {
                const totalWidth = trackRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                const rightPadding = windowWidth >= 1024 ? 24 : 16;
                setMaxScroll(Math.max(0, totalWidth - windowWidth + rightPadding));
            }
        };

        updateScrollDistance();
        window.addEventListener("resize", updateScrollDistance);
        const timer = setTimeout(updateScrollDistance, 300);
        return () => {
            window.removeEventListener("resize", updateScrollDistance);
            clearTimeout(timer);
        };
    }, []);

    // Link vertical scroll of pinned section to horizontal movement
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative w-full h-[280vh] bg-white text-[rgb(36,36,36)] font-['Outfit',sans-serif] select-none"
        >
            {/* Sticky Viewport Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-4 sm:py-6">
                {/* Header Section */}
                <div className="relative z-10 w-full px-1 sm:px-2 lg:px-3 mb-5 sm:mb-6 md:mb-7">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
                                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[rgb(36,36,36)]/60 font-semibold">
                                    PORTFOLIO // SELECTED ARCHIVES
                                </span>
                            </div>
                            <h2 className="font-['Outfit'] text-[clamp(1.8rem,7vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[rgb(36,36,36)]">
                                Work that alters.
                                <br />
                                <span className="text-neutral-400">
                                    Perception.
                                </span>
                            </h2>
                        </div>

                        {/* View All Button on Top Right */}
                        <div>
                            <Link
                                href="/portfolio"
                                className="group inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-full border border-black/20 bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide text-black shadow-xs transition-all duration-300 hover:bg-[#ff5a1f] hover:border-[#ff5a1f] hover:text-white hover:shadow-md hover:shadow-[#ff5a1f]/20 active:scale-95"
                            >
                                <span className="transition-colors">View All</span>
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={2.2}
                                    className="text-black transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Horizontal Sliding Cards Track */}
                <div className="w-full relative overflow-hidden">
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="flex gap-5 sm:gap-6 px-1 sm:px-2 lg:px-3 will-change-transform"
                    >
                        {PROJECTS_DATA.map((project, idx) => (
                            <div
                                key={project.id}
                                onClick={() => setModalProject(project)}
                                className="flex-shrink-0 relative w-[86vw] sm:w-[70vw] md:w-[58vw] lg:w-[50vw] xl:w-[740px] 2xl:w-[800px] h-[460px] sm:h-[500px] md:h-[540px] lg:h-[560px] max-h-[62vh] rounded-xl sm:rounded-xl lg:rounded-2xl overflow-hidden group shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-black/10 select-none bg-neutral-900 cursor-pointer"
                            >
                                {/* Monochrome Background Image with Zoom on Hover */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    unoptimized={true}
                                    sizes="(max-width: 768px) 90vw, 800px"
                                    className="object-cover object-center grayscale brightness-[1.15] contrast-95 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                                />

                                {/* Deep Cinematic Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/95 pointer-events-none" />

                                {/* Top Bar on Card */}
                                <div className="absolute top-0 left-0 right-0 p-5 sm:p-7 flex items-center justify-between pointer-events-none z-10">
                                    <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                                        CASE 0{idx + 1}
                                    </span>

                                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono font-bold text-black shadow-md">
                                        {project.id} / 04
                                    </span>
                                </div>

                                {/* Bottom Content Area */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-10 flex flex-col justify-end text-white pointer-events-none">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                                        {project.title}
                                    </h3>

                                    <p className="mt-2 text-xs sm:text-sm md:text-base text-white/85 line-clamp-2 leading-relaxed max-w-xl drop-shadow">
                                        {project.tagline}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
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
                                        unoptimized={true}
                                        className="object-cover grayscale brightness-[1.15] contrast-95"
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
