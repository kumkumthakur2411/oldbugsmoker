"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const BLOG_ARTICLES = [
    {
        id: "01",
        number: "01",
        title: "MANZILA",
        tagline: "Kinetic Optics & Floral Form",
        category: "Art Direction",
        date: "October 2024",
        readTime: "4 min read",
        src: "/home/1.png",
        alt: "Manzila floral CRT installation in sunset field",
        description:
            "Investigating the interplay between blooming natural flora and the nostalgic glow of vintage cathode-ray glass at golden hour.",
    },
    {
        id: "02",
        number: "02",
        title: "CREAMODP*",
        tagline: "Botanical Sound Sanctuary",
        category: "Spatial Design",
        date: "September 2024",
        readTime: "6 min read",
        src: "/home/3.png",
        alt: "Creamodp conservatory with analogue screens and flowers",
        description:
            "A sun-drenched greenhouse where analog cassettes and cathode tubes coexist in harmony with overgrown climbing florals.",
    },
    {
        id: "03",
        number: "03",
        title: "BRONTE AZAHI",
        tagline: "Misty Rain & Ephemeral Solitude",
        category: "Visual Narrative",
        date: "August 2024",
        readTime: "5 min read",
        src: "/home/5.png",
        alt: "Bronte Azahi trench coat figure with floral umbrella",
        description:
            "A quiet study of damp earth, reflective water pools, and translucent umbrellas shielding fragile wildflower bouquets.",
    },
    {
        id: "04",
        number: "04",
        title: "RICE BROTHERS",
        tagline: "Sunlit Prairie & Golden Monoliths",
        category: "Digital Installation",
        date: "July 2024",
        readTime: "3 min read",
        src: "/home/4.png",
        alt: "Rice Brothers TV head in field of sunflowers at dawn",
        description:
            "Standing tall among bowing sunflowers, an amber screen reflects the rising sun in a celebration of morning stillness.",
    },
];

export default function Blog({
    brand = "Studio Rippl",
    headline = null,
    articles = BLOG_ARTICLES,
}) {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);
    const mobileScrollRef = useRef(null);

    const handleMobileScroll = () => {
        if (!mobileScrollRef.current) return;
        const scrollLeft = mobileScrollRef.current.scrollLeft;
        const cardWidth = mobileScrollRef.current.children[0]?.offsetWidth || 300;
        const gap = 16;
        const newIndex = Math.round(scrollLeft / (cardWidth + gap));
        setActiveMobileIndex(Math.min(Math.max(0, newIndex), articles.length - 1));
    };

    const scrollToSlide = (i) => {
        if (!mobileScrollRef.current) return;
        const cardWidth = mobileScrollRef.current.children[0]?.offsetWidth || 300;
        const gap = 16;
        mobileScrollRef.current.scrollTo({
            left: i * (cardWidth + gap),
            behavior: "smooth",
        });
        setActiveMobileIndex(i);
    };

    return (
        <section
            id="blog-section"
            className="relative w-full text-[#18181b] px-6 sm:px-10 md:px-14 lg:px-16 py-12 sm:py-16 md:py-20 overflow-hidden"
        >
            <div className="w-full max-w-[1400px] mx-auto">
                {/* Top Editorial Divider Line */}
                <div className="w-full border-t border-[#18181b]/15 mb-10 sm:mb-14 md:mb-16" />

                {/* Headline Statement */}
                <div className="mb-10 sm:mb-14 md:mb-16 lg:mb-20">
                    <h2 className="font-['Outfit'] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-[#141414] tracking-[-0.03em] leading-[1.14] max-w-[860px]">
                        {headline || (
                            <>
                                At {brand}, design isn’t just decoration—
                                <span className="block mt-1 sm:mt-1.5">
                                    it’s a tool for connection.
                                </span>
                            </>
                        )}
                    </h2>
                </div>

                {/* Desktop & Tablet: Multi-Column Grid (hidden on mobile < sm) */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {articles.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedArticle(item)}
                            className="group cursor-pointer flex flex-col focus:outline-none"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedArticle(item);
                                }
                            }}
                        >
                            {/* Image Frame with Aspect Ratio ~4:5 */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e8e7e1] shadow-xs">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    priority={index < 2}
                                />

                                {/* Subtle dark tint on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                {/* Quick inspect badge on hover */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-neutral-900 flex items-center gap-1 shadow-sm">
                                    <span>View</span>
                                    <ArrowUpRight size={11} />
                                </div>
                            </div>

                            {/* Caption Under Image */}
                            <div className="mt-3 sm:mt-3.5 flex items-baseline justify-between select-none">
                                <p className="font-['Inter'] text-[10.5px] sm:text-[11px] md:text-[11.5px] font-medium tracking-[0.06em] text-[#222222] uppercase group-hover:text-black transition-colors">
                                    <span>( {item.number} )</span>
                                    <span className="ml-2">{item.title}</span>
                                </p>
                                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-600 transition-colors">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View: Touch Swiper with Snap & Navigation Controls */}
                <div className="block sm:hidden">
                    <div
                        ref={mobileScrollRef}
                        onScroll={handleMobileScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-2 -mx-6 px-6 select-none"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {articles.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedArticle(item)}
                                className="group shrink-0 snap-start w-[82vw] max-w-[340px] flex flex-col focus:outline-none cursor-pointer"
                                role="button"
                                tabIndex={0}
                            >
                                {/* Image Frame */}
                                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#e8e7e1] shadow-xs">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="85vw"
                                        className="object-cover object-center active:scale-105 transition-transform duration-500"
                                        priority={index === 0}
                                    />

                                    {/* Tap to view badge */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-neutral-900 flex items-center gap-1 shadow-sm">
                                        <span>View</span>
                                        <ArrowUpRight size={11} />
                                    </div>
                                </div>

                                {/* Caption Under Image */}
                                <div className="mt-3 flex items-baseline justify-between select-none">
                                    <p className="font-['Inter'] text-[11px] font-medium tracking-[0.06em] text-[#222222] uppercase">
                                        <span>( {item.number} )</span>
                                        <span className="ml-2">{item.title}</span>
                                    </p>
                                    <span className="text-[10px] font-mono text-neutral-500">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Swiper Controls: Counter, Dots, Prev/Next Arrows */}
                    <div className="flex items-center justify-center mt-5 pt-2">
                        {/* Slide Counter */}


                        {/* Interactive Pagination Dots */}
                        <div className="flex items-center gap-1.5">
                            {articles.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToSlide(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeMobileIndex === i
                                        ? "w-6 bg-black"
                                        : "w-1.5 bg-black/20"
                                        }`}
                                />
                            ))}
                        </div>


                    </div>
                </div>

                {/* Bottom Editorial Divider Line */}
                <div className="w-full border-b border-[#18181b]/15 mt-12 sm:mt-16 md:mt-20" />
            </div>

            {/* Detail Modal / Lightbox for rich interaction */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative w-full max-w-3xl bg-[#fbfbf8] text-[#18181b] shadow-2xl rounded-sm overflow-hidden border border-neutral-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedArticle(null)}
                                aria-label="Close dialog"
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Image */}
                                <div className="relative w-full aspect-[4/5] md:aspect-auto md:min-h-[460px] bg-[#e5e4de]">
                                    <Image
                                        src={selectedArticle.src}
                                        alt={selectedArticle.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 500px"
                                        className="object-cover object-center"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
                                            <span>( {selectedArticle.number} )</span>
                                            <span>•</span>
                                            <span>{selectedArticle.category}</span>
                                        </div>

                                        <h3 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-[#141414] tracking-tight leading-tight">
                                            {selectedArticle.title}
                                        </h3>

                                        <p className="font-['Inter'] text-sm text-[#ff5a1f] font-medium mt-1 mb-4">
                                            {selectedArticle.tagline}
                                        </p>

                                        <p className="font-['Inter'] text-xs sm:text-[13px] leading-relaxed text-neutral-600 mb-6">
                                            {selectedArticle.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
                                        <span>{selectedArticle.date}</span>
                                        <span>{selectedArticle.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
