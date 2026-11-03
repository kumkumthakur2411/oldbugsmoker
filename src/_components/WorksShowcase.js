"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const pad = (n) => String(n).padStart(2, "0");

// 5x7 Dot Matrix font patterns for digits and hyphens (matches reference image)
const DOT_PATTERNS = {
    "0": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ],
    "1": [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
    ],
    "2": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    "5": [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ],
    "6": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ],
    "-": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    " ": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
};

function DotMatrixText({ text = "2025----2026" }) {
    const dx = 3.4;
    const dy = 3.4;
    const charSpacing = 22;

    return (
        <svg
            viewBox="0 0 270 28"
            className="h-6 sm:h-7 w-auto text-neutral-700 select-none"
            aria-label={text}
        >
            {text.split("").map((char, charIdx) => {
                const pattern = DOT_PATTERNS[char] || DOT_PATTERNS[" "];
                const startX = charIdx * charSpacing + 3;

                return (
                    <g key={charIdx}>
                        {pattern.flatMap((row, rIdx) =>
                            row.map((val, cIdx) => {
                                const cx = startX + cIdx * dx;
                                const cy = 2 + rIdx * dy;
                                const isActive = val === 1;

                                return (
                                    <circle
                                        key={`${rIdx}-${cIdx}`}
                                        cx={cx}
                                        cy={cy}
                                        r={isActive ? 1.15 : 0.65}
                                        fill="currentColor"
                                        opacity={isActive ? 0.8 : 0.12}
                                    />
                                );
                            })
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

const DEFAULT_ITEMS = [
    {
        id: "01",
        title: "Galerie Botanique",
        category: "Spatial Web & 3D",
        image: "/home/1.webp",
        alt: "Galerie Botanique - Spatial Web & 3D",
        href: "/portfolio",
    },
    {
        id: "02",
        title: "Kroma Spatial Audio",
        category: "Creative Tech & Sound",
        image: "/home/new1.webp",
        alt: "Kroma Spatial Audio - Creative Tech & Sound",
        href: "/portfolio",
    },
    {
        id: "03",
        title: "Studio Lumina Press",
        category: "Brand Systems & Editorial",
        image: "/home/new2.png",
        alt: "Studio Lumina Press - Brand Systems & Editorial",
        href: "/portfolio",
    },
    {
        id: "04",
        title: "Hyperion Cloud Core",
        category: "Enterprise Architecture",
        image: "/home/2.webp",
        alt: "Hyperion Cloud Core - Enterprise Architecture",
        href: "/portfolio",
    },
];

export default function WorksShowcase({
    items = [],
    eyebrow = "EST / 2026",
    title = "WORKS SHOWCASE",
    years = "2025----2026",
    withLenis = true,
}) {
    const rootRef = useRef(null);
    const list = items && items.length > 0 ? items : DEFAULT_ITEMS;

    // Smooth scroll with Lenis & GSAP ScrollTrigger
    useEffect(() => {
        let lenis = window.__lenis;
        let isOwner = false;

        if (withLenis && !lenis && typeof window !== "undefined") {
            lenis = new Lenis({
                lerp: 0.09,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
            });
            window.__lenis = lenis;
            isOwner = true;

            lenis.on("scroll", ScrollTrigger.update);
            const raf = (time) => lenis.raf(time * 1000);
            gsap.ticker.add(raf);
            gsap.ticker.lagSmoothing(0);
        }

        const root = rootRef.current;
        if (!root) return;

        let refreshTimer;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Bottom-to-top scroll animation on the cards
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Header reveal
                gsap.fromTo(
                    ".ws-head",
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".ws-head",
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                // Cards entrance: Smooth bottom to top reveal without overlapping
                const cards = gsap.utils.toArray(".ws-card", root);
                cards.forEach((card, index) => {
                    gsap.fromTo(
                        card,
                        {
                            y: 50,
                            opacity: 0,
                            scale: 0.98,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.9,
                            ease: "power3.out",
                            delay: (index % 2) * 0.08,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                toggleActions: "play none none none",
                                once: true,
                            },
                        }
                    );

                    // Inner centered image subtle parallax
                    const imgWrap = card.querySelector(".ws-img-inner");
                    if (imgWrap) {
                        gsap.fromTo(
                            imgWrap,
                            { yPercent: 3 },
                            {
                                yPercent: -3,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.8,
                                },
                            }
                        );
                    }
                });
            });
        }, root);

        refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
            if (isOwner && lenis) {
                lenis.destroy();
                delete window.__lenis;
            }
        };
    }, [withLenis, list]);

    return (
        <section
            ref={rootRef}
            id="portfolio"
            className="works-section relative w-full  text-black font-['Outfit',sans-serif] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pt-24 select-none overflow-hidden"
        >
            {/* Header matching reference image */}
            <div className="ws-head relative mx-auto max-w-4xl text-center mb-8 sm:mb-12 lg:mb-14">
             

                {/* Big Bold Headline */}
                <h2 className="font-['Outfit'] text-[clamp(2.4rem,7.5vw,5.2rem)] font-extrabold uppercase tracking-[-0.04em] text-black leading-none my-2 sm:my-3">
                    {title}
                </h2>

                {/* Dot Matrix Year */}
                <div className="flex justify-center mt-3 sm:mt-4">
                    <DotMatrixText text={years} />
                </div>
            </div>

            {/* 4 Big Image Cards: Refined width and height (2 columns on desktop) */}
            <div className="mx-auto grid  grid-cols-1 gap-5 sm:gap-6 lg:gap-7 sm:grid-cols-2">
                {list.slice(0, 4).map((it, i) => (
                    <Link
                        key={it.id ?? it.href ?? i}
                        href={it.href || "/portfolio"}
                        aria-label={it.title}
                    className="ws-card group relative aspect-[18/5] sm:aspect-[4/3] md:aspect-[1.3] w-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] max-h-[540px] overflow-hidden  bg-[#0e0e11] border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] will-change-transform"   >
                        

                        {/* Image in center of card div, NOT taking full width & height */}
                        <div 
                       className="ws-img-inner relative w-[68%] h-[68%] sm:w-[70%] sm:h-[70%] md:w-[72%] md:h-[72%]  overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03]"> 
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={it.image}
                                alt={it.alt || it.title}
                                loading="lazy"
                                className="ws-img absolute inset-0 h-full w-full object-cover grayscale contrast-105 brightness-95 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
                            />
                            {/* Subtle inner frame border */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                        </div>

                        {/* Hover Overlay: Title text in ORANGE displayed on top of card */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 sm:p-8 text-center bg-black/65 backdrop-blur-[3px]  opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none">
                         

                            {/* Title text in ORANGE color */}
                            <h3 className="font-['Outfit'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#ff5a1f] leading-[1.1] drop-shadow-md max-w-sm transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                                {it.title}
                            </h3>

                        </div>

                      
                    </Link>
                ))}
            </div>

        </section>
    );
}
