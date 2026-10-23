"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Bookmark, Check, Share2, Sparkles, X } from "lucide-react";

const EDITORIAL_FEATURES = [
    {
        id: "01",
        number: "01",
        column: 1,
        aspect: "aspect-[16/11]",
        src: "/home/1.png",
        alt: "Manzila floral CRT installation in sunset field",
        category: "Architecture, Systems",
        title: "19 Architectures at Galerie Bugsmoker",
        description:
            "As our core discipline in the modern digital age, Galerie Bugsmoker presents type-safe Next.js full-stack architectures where scalable engineering explores the pure art of web performance.",
        byline: "By Bugsmoker Atelier",
        specs: ["Next.js 15+ App Router", "TypeScript 5.x", "Modular Clean Architecture", "Automated Edge Caching"],
        impact: "Enterprise Scale with 0ms Cold Start",
    },
    {
        id: "02",
        number: "02",
        column: 2,
        aspect: "aspect-[3/4]",
        src: "/home/3.png",
        alt: "Creamodp conservatory with analogue screens and flowers",
        category: "Art, Lifestyle",
        title: "Cy Twombly Painting Can Bring Eight Or Nine Figures In Auction!",
        description:
            "As one of the most intelligent, erudite, sophisticated, and emotionally eloquent motion systems of our age, fluid 60+ FPS physics-based interactions turn passive digital visitors into passionate advocates.",
        byline: "By Adam Nagourney",
        specs: ["GSAP ScrollTrigger & Flip", "Framer Motion Springs", "WebGL Canvas Integration", "Adaptive 120Hz Refresh"],
        impact: "60+ FPS Fluid Motion across all devices",
    },
    {
        id: "03",
        number: "03",
        column: 3,
        aspect: "aspect-[16/11]",
        src: "/home/2.png",
        alt: "Two figures with cathode ray screens at sunrise on the beach",
        category: "Art, Design",
        title: "Ten Inspiration Web Vitals & Edge Sketches",
        description:
            "Apart from being an exceptional architectural foundation, sub-second TTFB, edge-rendered hydration, and Turbopack asset streaming establish this as one of the best codebases for modern speed.",
        byline: "By Performance Lab",
        specs: ["Sub-400ms First Contentful Paint", "99+ Google Lighthouse Score", "Zero Cumulative Layout Shift", "Dynamic Asset Splitting"],
        impact: "Sub-Second Global Load Time",
    },
    {
        id: "04",
        number: "04",
        column: 1,
        aspect: "aspect-[16/11]",
        src: "/home/hero.png",
        alt: "Two vintage screen figures seated on a wooden bench in a meadow",
        category: "Travel, Lifestyle",
        title: "New Zealand's Backpacker Buses & Headless Commerce",
        description:
            "Headless commerce pipelines are popular across high-growth international brands. These architectures offer friction-free checkout workflows and headless Shopify pipelines that allow travelers supreme flexibility.",
        byline: "By Nomad&Man",
        specs: ["Headless Shopify Storefronts", "Stripe Custom Elements", "One-Click Checkout Optimization", "Multi-Currency Global Routing"],
        impact: "+34% Average Checkout Conversion",
    },
    {
        id: "05",
        number: "05",
        column: 2,
        aspect: "aspect-[3/4]",
        src: "/home/5.png",
        alt: "Misty mountain solitary figure under wildflower umbrella",
        hasNumberOverlay: true,
        overlayNumber: "05",
        overlaySub: "January",
        category: "Art, Discovery",
        title: "Eight Free Search Protocols In Europe You Have",
        underlinedWord: "To Check Out",
        description:
            "As some of the finest discovery frameworks, automated JSON-LD schemas and semantic HTML5 crawl pathways offer search engine algorithms the cleanest indexation routes to ensure permanent top-rank authority.",
        byline: "By SEO Strategy",
        specs: ["Deep JSON-LD Schema Graphs", "Dynamic OG & Twitter Social Cards", "Semantic HTML5 Hierarchy", "Clean XML Sitemaps & RSS"],
        impact: "100% Google Search Crawlability",
    },
    {
        id: "06",
        number: "06",
        column: 3,
        aspect: "aspect-[16/11]",
        src: "/home/4.png",
        alt: "Sunflowers in dawn field with amber cathode-ray screen",
        category: "Fashion, Systems",
        title: "10 Best Enterprise Security Protocols to visit",
        description:
            "Even the most esteemed digital ateliers require impenetrable infrastructure. Multi-region automated failovers, Zero-Trust network perimeters, and automated CI/CD deployments make every release a true delight.",
        byline: "By Systems Engineering",
        specs: ["Zero-Trust Network Perimeter", "Multi-Region Cloud Failovers", "Automated GitHub Actions CI/CD", "Strict CSP & SSL/TLS Encryption"],
        impact: "99.99% Guaranteed Cloud Uptime",
    },
];

function EditorialCard({ feature, onSelect, isSaved, onToggleSave }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col w-full select-none"
        >
            {/* Image Container */}
            <div
                onClick={() => onSelect(feature)}
                className={`relative w-full ${feature.aspect} overflow-hidden bg-neutral-100 cursor-pointer rounded-[2px] transition-all duration-700`}
            >
                <Image
                    src={feature.src}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Optional editorial translucent number overlay (matching Card 05 in reference screenshot) */}
                {feature.hasNumberOverlay && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/15 pointer-events-none">
                        <span className="font-['Outfit'] text-[clamp(5.5rem,11vw,8.5rem)] font-bold leading-none text-white/90 drop-shadow-sm tracking-tight">
                            {feature.overlayNumber}
                        </span>
                        <span className="mt-1 font-['Outfit'] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                            {feature.overlaySub}
                        </span>
                    </div>
                )}

                {/* Subtle hover vignette */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>

            {/* Metadata Bar (Category on Left, Two Circular Buttons on Right) */}
            <div className="mt-3.5 flex items-center justify-between text-neutral-500">
                <span className="font-['Outfit'] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    {feature.category}
                </span>

                <div className="flex items-center gap-1.5">
                    {/* Circle 1: Bookmark / Save Action */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(feature.id);
                        }}
                        aria-label="Save this feature"
                        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                            isSaved
                                ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
                                : "border-neutral-300/80 bg-white text-neutral-600 hover:border-black hover:text-black"
                        }`}
                    >
                        {isSaved ? <Check size={11} strokeWidth={2.5} /> : <Bookmark size={11} strokeWidth={1.8} />}
                    </button>

                    {/* Circle 2: Action / Arrow Icon */}
                    <button
                        type="button"
                        onClick={() => onSelect(feature)}
                        aria-label="View feature details"
                        className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:bg-[#ff5a1f] cursor-pointer"
                    >
                        <ArrowUpRight size={11} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Title (Clean Outfit font) */}
            <h3
                onClick={() => onSelect(feature)}
                className="mt-2.5 font-['Outfit'] text-[21px] sm:text-[23px] lg:text-[25px] font-bold leading-[1.2] tracking-[-0.03em] text-[#1c1c1c] transition-colors duration-300 group-hover:text-[#ff5a1f] cursor-pointer"
            >
                {feature.title}{" "}
                {feature.underlinedWord && (
                    <span className="underline underline-offset-[5px] decoration-neutral-300 transition-colors group-hover:decoration-[#ff5a1f]">
                        {feature.underlinedWord}
                    </span>
                )}
            </h3>

            {/* Excerpt Description */}
            <p className="mt-2.5 font-['Outfit',sans-serif] text-[13px] sm:text-[13.5px] leading-[1.72] text-[#4a4a4a] font-normal">
                {feature.description}
            </p>

            {/* Byline / Author at Bottom */}
            <div className="mt-3 text-[11px] sm:text-[12px] font-['Outfit'] font-medium text-neutral-400 tracking-wide">
                {feature.byline}
            </div>
        </motion.article>
    );
}

export default function ServiceFeatures() {
    const sectionRef = useRef(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [savedFeatures, setSavedFeatures] = useState({});

    // Parallax scroll-based animation for columns
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 20,
        mass: 0.25,
    });

    // Column 2 has subtle offset scroll parallax for that floating magazine feel
    const col2Y = useTransform(smoothScroll, [0, 1], [30, -30]);
    // Column 3 has subtle delayed parallax
    const col3Y = useTransform(smoothScroll, [0, 1], [-15, 15]);

    const toggleSave = (id) => {
        setSavedFeatures((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const col1Cards = EDITORIAL_FEATURES.filter((f) => f.column === 1);
    const col2Cards = EDITORIAL_FEATURES.filter((f) => f.column === 2);
    const col3Cards = EDITORIAL_FEATURES.filter((f) => f.column === 3);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#faf9f6] px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:px-16 lg:py-32 text-[#1c1c1c]"
        >
            <div className="mx-auto w-full max-w-[1360px]">
                {/* Editorial Section Header */}
                <div className="mb-14 sm:mb-16 md:mb-20">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-black/10 pb-8 sm:pb-10">
                        <div>
                            {/* Kicker badge */}
                            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff5a1f]">
                                <span className="h-2 w-2 rounded-full bg-[#ff5a1f] animate-pulse" />
                                <span>Curated Architecture &bull; 06 Selected Works</span>
                            </div>

                            {/* Headline */}
                            <h2 className="font-['Outfit'] text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-[#111111]">
                                Where technical precision
                                <br />
                                meets editorial form<span className="text-[#ff5a1f]">.</span>
                            </h2>
                        </div>

                        {/* Subtitle / summary */}
                        <div className="max-w-md">
                            <p className="font-['Outfit',sans-serif] text-sm sm:text-[15px] leading-relaxed text-[#555]">
                                Six foundational web development pillars curated as an editorial
                                magazine spread. Explore our bespoke architecture, kinetic physics,
                                and zero-trust engineering.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3-Column Editorial Grid with Scroll-Based Parallax Float */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-11 xl:gap-14 items-start">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
                        {col1Cards.map((feature) => (
                            <EditorialCard
                                key={feature.id}
                                feature={feature}
                                onSelect={setSelectedFeature}
                                isSaved={Boolean(savedFeatures[feature.id])}
                                onToggleSave={toggleSave}
                            />
                        ))}
                    </div>

                    {/* Column 2 (Floating with subtle vertical scroll parallax) */}
                    <motion.div
                        style={{ y: col2Y }}
                        className="flex flex-col gap-10 sm:gap-12 lg:gap-14"
                    >
                        {col2Cards.map((feature) => (
                            <EditorialCard
                                key={feature.id}
                                feature={feature}
                                onSelect={setSelectedFeature}
                                isSaved={Boolean(savedFeatures[feature.id])}
                                onToggleSave={toggleSave}
                            />
                        ))}
                    </motion.div>

                    {/* Column 3 (Floating with subtle alternate parallax) */}
                    <motion.div
                        style={{ y: col3Y }}
                        className="flex flex-col gap-10 sm:gap-12 lg:gap-14 md:col-span-2 lg:col-span-1"
                    >
                        {col3Cards.map((feature) => (
                            <EditorialCard
                                key={feature.id}
                                feature={feature}
                                onSelect={setSelectedFeature}
                                isSaved={Boolean(savedFeatures[feature.id])}
                                onToggleSave={toggleSave}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Editorial Footer Note */}
                <div className="mt-20 sm:mt-24 flex flex-col sm:flex-row items-center justify-between border-t border-black/10 pt-8 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 gap-4">
                    <span>Bugsmoker Atelier &bull; Monograph Series</span>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/contactus"
                            className="text-[#ff5a1f] hover:underline flex items-center gap-1 font-semibold"
                        >
                            <span>Commission a Custom Build</span>
                            <ArrowUpRight size={13} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick View Interactive Drawer Modal */}
            <AnimatePresence>
                {selectedFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFeature(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white p-6 sm:p-8 md:p-10 shadow-2xl"
                        >
                            {/* Close button */}
                            <button
                                type="button"
                                onClick={() => setSelectedFeature(null)}
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-black hover:text-white cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff5a1f]">
                                <Sparkles size={14} />
                                <span>
                                    Pillar {selectedFeature.number} &bull; {selectedFeature.category}
                                </span>
                            </div>

                            <h3 className="mt-3 font-['Outfit'] text-3xl sm:text-4xl font-bold leading-tight text-neutral-950">
                                {selectedFeature.title}
                            </h3>

                            <p className="mt-4 font-['Outfit',sans-serif] text-sm sm:text-base leading-relaxed text-neutral-600">
                                {selectedFeature.description}
                            </p>

                            {/* Tech Specs */}
                            <div className="mt-6 border-t border-neutral-100 pt-5">
                                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                                    Technical Architecture
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {selectedFeature.specs.map((spec) => (
                                        <div
                                            key={spec}
                                            className="flex items-center gap-2 text-xs font-['Outfit'] text-neutral-800"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Impact Callout */}
                            <div className="mt-6 flex items-center justify-between rounded-lg bg-neutral-50 p-4 border border-neutral-100">
                                <div>
                                    <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                                        Observed Benchmark
                                    </span>
                                    <span className="font-['Outfit'] text-sm font-semibold text-neutral-900">
                                        {selectedFeature.impact}
                                    </span>
                                </div>

                                <Link
                                    href="/contactus"
                                    className="flex items-center gap-1.5 rounded-full bg-[#ff5a1f] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                                >
                                    <span>Inquire</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
