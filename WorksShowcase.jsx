"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// 5x7 dot matrix font patterns for digits and hyphens
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
            className="h-5 w-auto max-w-full select-none text-neutral-700 sm:h-7"
            aria-label={text}
        >
            {text.split("").map((char, charIdx) => {
                const pattern = DOT_PATTERNS[char] || DOT_PATTERNS[" "];
                const startX = charIdx * charSpacing + 3;

                return (
                    <g key={charIdx}>
                        {pattern.flatMap((row, rIdx) =>
                            row.map((val, cIdx) => {
                                const isActive = val === 1;
                                return (
                                    <circle
                                        key={`${rIdx}-${cIdx}`}
                                        cx={startX + cIdx * dx}
                                        cy={2 + rIdx * dy}
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
    title = "WORKS SHOWCASE",
    years = "2025----2026",
    withLenis = true,
}) {
    const rootRef = useRef(null);
    const list = items && items.length > 0 ? items : DEFAULT_ITEMS;

    useEffect(() => {
        let lenis = typeof window !== "undefined" ? window.__lenis : null;
        let isOwner = false;
        let raf = null;

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
            raf = (time) => lenis.raf(time * 1000);
            gsap.ticker.add(raf);
            gsap.ticker.lagSmoothing(0);
        }

        const root = rootRef.current;

        let refreshTimer;
        let ctx;

        if (root) {
            ctx = gsap.context(() => {
                const mm = gsap.matchMedia();

                mm.add("(prefers-reduced-motion: no-preference)", () => {
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

                    const cards = gsap.utils.toArray(".ws-card", root);
                    cards.forEach((card, index) => {
                        gsap.fromTo(
                            card,
                            { y: 50, opacity: 0, scale: 0.98 },
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
        }

        return () => {
            clearTimeout(refreshTimer);
            if (ctx) ctx.revert();
            if (isOwner && lenis) {
                if (raf) gsap.ticker.remove(raf);
                lenis.destroy();
                delete window.__lenis;
            }
        };
    }, [withLenis, list]);

    return (
        <section
            ref={rootRef}
            id="portfolio"
            className="works-section relative w-full select-none overflow-hidden px-4 pb-14 pt-12 text-black sm:px-6 sm:pb-20 sm:pt-16 lg:pt-24"
        >
            {/* Header */}
            <div className="ws-head relative mx-auto mb-8 max-w-4xl text-center sm:mb-12 lg:mb-14">
                <h2 className="t-display my-2 uppercase text-black sm:my-3">
                    {title}
                </h2>

                <div className="mt-3 flex justify-center sm:mt-4">
                    <DotMatrixText text={years} />
                </div>
            </div>

            {/* Cards: 1 column on mobile, 2 from md */}
            <div className="mx-auto grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-7">
                {list.slice(0, 4).map((it, i) => (
                    <Link
                        key={it.id ?? it.href ?? i}
                        href={it.href || "/portfolio"}
                        aria-label={it.title}
                        className="ws-card group relative flex aspect-[4/3] max-h-[540px] min-h-[260px] w-full cursor-pointer items-center justify-center overflow-hidden border border-black/10 bg-[#0e0e11] shadow-xl outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-[#ff5a1f] sm:min-h-[340px] md:aspect-[1.3] lg:min-h-[500px]"
                    >
                        {/* Image centred inside the card */}
                        <div className="ws-img-inner relative h-[68%] w-[68%] overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[70%] sm:w-[70%] md:h-[72%] md:w-[72%]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={it.image}
                                alt={it.alt || it.title}
                                loading="lazy"
                                className="ws-img absolute inset-0 h-full w-full object-cover brightness-95 contrast-105 grayscale transition-all duration-700 ease-out will-change-transform group-hover:scale-105 group-hover:grayscale-0"
                            />
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </div>

                        {/* Hover overlay (mouse devices) */}
                        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 p-5 text-center opacity-0 backdrop-blur-[3px] transition-all duration-300 ease-out group-hover:opacity-100 sm:p-8">
                            <h3 className="t-title max-w-sm translate-y-3 uppercase text-[#ff5a1f] drop-shadow-md transition-transform delay-75 duration-300 ease-out group-hover:translate-y-0">
                                {it.title}
                            </h3>
                        </div>

                        {/* Always-visible caption for touch devices */}
                        <span className="t-label absolute bottom-3 left-3 right-3 z-10 truncate text-white md:hidden">
                            {it.title}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
