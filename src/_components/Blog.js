"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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
    const [activeDescription, setActiveDescription] = useState(null);
    const mobileScrollRef = useRef(null);
    const cardRefs = useRef([]);

    const handleMobileScroll = useCallback(() => {
        const container = mobileScrollRef.current;
        if (!container || !articles.length) return;

        const containerCenter =
            container.getBoundingClientRect().left + container.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveMobileIndex(closestIndex);
    }, [articles.length]);

    const scrollToSlide = (index) => {
        const container = mobileScrollRef.current;
        const card = cardRefs.current[index];

        if (!container || !card) return;

        const target =
            card.offsetLeft -
            (container.clientWidth - card.offsetWidth) / 2;

        container.scrollTo({
            left: target,
            behavior: "smooth",
        });

        setActiveMobileIndex(index);
    };

    const changeSlide = (direction) => {
        const nextIndex = Math.max(
            0,
            Math.min(articles.length - 1, activeMobileIndex + direction)
        );

        scrollToSlide(nextIndex);
    };

    useEffect(() => {
        const container = mobileScrollRef.current;
        if (!container) return;

        handleMobileScroll();

        const observer = new ResizeObserver(handleMobileScroll);
        observer.observe(container);

        return () => observer.disconnect();
    }, [handleMobileScroll]);

    useEffect(() => {
        if (!selectedArticle) return;

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedArticle(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedArticle]);

    const openArticle = (article) => setSelectedArticle(article);

    return (
        <section
            id="blog-section"
            className="relative w-full overflow-hidden bg-white/90 py-16 text-[#181818] sm:py-20 md:py-28"
        >
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
                {/* Section header */}
                <div className="">
                    <div className="mb-10 flex flex-col gap-7 sm:mb-14 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10">
                        <div className="max-w-[900px]">


                            <h2 className="font-['Outfit'] text-[clamp(1.8rem,7vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
                                {headline || (
                                    <>
                                        At {brand}, design isn&apos;t just
                                        decoration.
                                        <span className="mt-1 block text-neutral-400">
                                            It&apos;s a tool for connection.
                                        </span>
                                    </>
                                )}
                            </h2>
                        </div>

                        <p className="max-w-[300px] text-sm leading-6 text-neutral-500 md:mb-1 md:text-[13px]">
                            A closer look at the ideas, experiments, and
                            details behind the work we create.
                        </p>
                    </div>
                </div>

                {/* Desktop and tablet grid */}
                {/* Desktop and tablet cards */}
                <div className="hidden grid-cols-2 gap-x-5 gap-y-12 sm:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
                    {articles.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => openArticle(item)}
                            className="group min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-4"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e6df]">
                                {/* Image */}
                                <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-0">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                        priority={index < 2}
                                        className="object-cover"
                                    />
                                </div>

                                {/* Description revealed on hover */}
                                <div className="absolute inset-0 flex flex-col justify-between bg-white/90 p-5 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6">
                                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
                                        <span>Project / {item.number}</span>
                                        <ArrowUpRight size={17} />
                                    </div>

                                    <div>
                                        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] ">
                                            {item.category}
                                        </p>

                                        <h3 className="mb-3 font-['Outfit'] text-xl font-semibold leading-tight tracking-[-0.04em] lg:text-2xl">
                                            {item.tagline}
                                        </h3>

                                        <p className="text-xs leading-6 text-black lg:text-[13px]">
                                            {item.description}
                                        </p>

                                        <p className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em]">
                                            Explore story <ArrowUpRight size={13} />
                                        </p>
                                    </div>
                                </div>

                                {/* Image label */}
                                <div className="absolute left-3 top-3 font-mono text-[10px] tracking-widest text-white drop-shadow-md transition-opacity duration-200 group-hover:opacity-0 sm:left-4 sm:top-4">
                                    / {item.number}
                                </div>
                            </div>

                            {/* Caption */}
                            <div className="mt-4 flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="font-['Outfit'] text-sm font-semibold tracking-[-0.025em] sm:text-base">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-neutral-500 sm:text-[13px]">
                                        {item.tagline}
                                    </p>
                                </div>

                                <span className="mt-1 shrink-0 font-mono text-[9px] uppercase tracking-wide text-neutral-400">
                                    {item.category}
                                </span>
                            </div>

                            <div className="mt-4 h-px w-full bg-black/10">
                                <div className="h-px w-0 bg-[#ff5a1f] transition-all duration-500 group-hover:w-full" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mobile carousel */}
                <div className="sm:hidden">
                    <div
                        ref={mobileScrollRef}
                        onScroll={handleMobileScroll}
                        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 pt-1"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {articles.map((item, index) => {
                            const showDescription = activeDescription === item.id;

                            return (
                                <div
                                    key={item.id}
                                    ref={(element) => {
                                        cardRefs.current[index] = element;
                                    }}
                                    className="w-[82%] max-w-[370px] shrink-0 snap-center"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveDescription((current) =>
                                                current === item.id ? null : item.id
                                            )
                                        }
                                        aria-expanded={showDescription}
                                        aria-label={
                                            showDescription
                                                ? `Show image for ${item.title}`
                                                : `Show description for ${item.title}`
                                        }
                                        className="group relative block aspect-[4/5] w-full overflow-hidden bg-[#e8e6df] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f]"
                                    >
                                        {/* Image */}
                                        <div
                                            className={`absolute inset-0 transition-all duration-500 ${showDescription
                                                ? "scale-[1.04] opacity-0"
                                                : "scale-100 opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                sizes="82vw"
                                                priority={index === 0}
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Description panel */}
                                        <div
                                            className={`absolute inset-0 flex flex-col justify-between bg-white/90 p-5 text-black transition-all duration-400 ${showDescription
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-3 opacity-0"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
                                                <span>Project / {item.number}</span>
                                                <ArrowUpRight size={18} />
                                            </div>

                                            <div>
                                                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] ">
                                                    {item.category}
                                                </p>

                                                <h3 className="mb-3 font-['Outfit'] text-2xl font-semibold leading-tight tracking-[-0.04em]">
                                                    {item.tagline}
                                                </h3>

                                                <p className="text-[13px] leading-6 ">
                                                    {item.description}
                                                </p>

                                                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/75">
                                                    Tap to see image
                                                </p>
                                            </div>
                                        </div>

                                        {/* Image state labels */}
                                        <div
                                            className={`absolute left-3 top-3 font-mono text-[10px] tracking-widest text-white drop-shadow-md transition-opacity duration-200 ${showDescription ? "opacity-0" : "opacity-100"
                                                }`}
                                        >
                                            / {item.number}
                                        </div>

                                        <div
                                            className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf9f6] text-black transition-opacity duration-200 ${showDescription ? "opacity-0" : "opacity-100"
                                                }`}
                                        >
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </button>
                                    <div className="mt-4 flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="font-['Outfit'] text-base font-semibold tracking-[-0.03em]">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                                                {item.tagline}
                                            </p>
                                        </div>

                                        <span className="mt-1 max-w-[100px] shrink-0 text-right font-mono text-[9px] uppercase leading-4 tracking-wide text-neutral-400">
                                            {item.category}
                                        </span>
                                    </div>


                                </div>
                            );
                        })}
                    </div>


                </div>

                {/* Bottom divider */}
                <div className="mt-14  sm:mt-16 md:mt-20" />
            </div>


        </section>
    );
}
