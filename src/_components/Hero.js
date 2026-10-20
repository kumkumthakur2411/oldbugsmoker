"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SHOW_INDICES = [
    2, 4, 5, 8, 10, 11, 13, 16, 17, 19,
    22, 24, 25, 28, 33, 35, 37
];

export default function Hero() {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const [gridConfig, setGridConfig] = useState({ cols: 5, rowHeight: 70 });

    useEffect(() => {
        const updateGrid = () => {
            const w = window.innerWidth;

            if (w < 640) {
                // Larger tiles on mobile
                setGridConfig({ cols: 4, rowHeight: 100 });
            } else if (w < 1024) {
                setGridConfig({ cols: 8, rowHeight: 90 });
            } else {
                // Keep desktop exactly the same
                setGridConfig({ cols: 10, rowHeight: 90 });
            }
        };

        updateGrid();
        window.addEventListener("resize", updateGrid);
        return () => window.removeEventListener("resize", updateGrid);
    }, []);

    useEffect(() => {
        if (!gridRef.current) return;

        const ctx = gsap.context(() => {
            const tiles = gridRef.current?.querySelectorAll(".mosaic-tile");
            const imageTiles = gridRef.current?.querySelectorAll(".mosaic-tile-image-inner");

            if (!tiles || tiles.length === 0) return;

            // Set initial hidden state for all tiles
            gsap.set(tiles, {
                opacity: 0,
                scale: 0.2,
                y: 20,
            });

            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                // Mobile repeating loop:
                // 1. Tiles come one by one into the grid (exact scale: 1)
                // 2. Stay static at full size in the exact grid
                // 3. Remove one by one
                // 4. Brief pause, then come one by one again in the same grid
                const mobileTimeline = gsap.timeline({
                    repeat: -1,
                    delay: 0.2,
                });

                mobileTimeline
                    // 1. Come one by one into the grid
                    .to(tiles, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "back.out(1.5)",
                        stagger: {
                            amount: 1.4,
                            from: "random",
                        },
                    })
                    // 2. Stay resting in place at full size (no size changes)
                    .to({}, { duration: 2.8 })
                    // 3. One by one remove from the grid
                    .to(tiles, {
                        opacity: 0,
                        scale: 0.2,
                        y: 15,
                        duration: 0.4,
                        ease: "power2.in",
                        stagger: {
                            amount: 1.2,
                            from: "random",
                        },
                    })
                    // 4. Brief pause before coming again
                    .to({}, { duration: 0.5 });

                // Scroll response on mobile: smoothly fades / translates grid container
                if (heroRef.current && gridRef.current) {
                    gsap.to(gridRef.current, {
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: "top top",
                            end: "bottom top",
                            scrub: 0.8,
                        },
                        y: 35,
                        opacity: 0.4,
                        ease: "none",
                    });
                }
            } else {
                // Desktop / Web view: entrance once, then driven by scroll
                const desktopTimeline = gsap.timeline({
                    delay: 0.2,
                });

                desktopTimeline.to(tiles, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "back.out(1.5)",
                    stagger: {
                        amount: 1.4,
                        from: "random",
                    },
                });

                if (heroRef.current) {
                    gsap.to(tiles, {
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: "top top",
                            end: "bottom top",
                            scrub: 1.2,
                        },
                        y: (i) => ((i % 10) - 4.5) * 40,
                        scale: 0.92,
                        opacity: (i) => (SHOW_INDICES.includes(i) ? 0.35 : 0.75),
                        stagger: {
                            amount: 0.6,
                            from: "random",
                        },
                        ease: "none",
                    });
                }
            }
        }, heroRef);

        return () => ctx.revert();
    }, [gridConfig]);

    return (<>
        <section
            ref={heroRef}
            className="relative isolate w-full overflow-hidden bg-white text-black"
        >
            {/* White content surface */}
            <div className="relative z-30 bg-transparent mt-15">
                <div className="px-5 pb-10 pt-7 sm:px-8 sm:pb-14 sm:pt-9 md:px-12 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mt-[50vh] sm:mt-64">
                            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
                                <div className="min-w-0 lg:col-span-7">
                                    <h1 className="break-words font-['Outfit'] text-[clamp(3.5rem,12vw,5rem)] font-bold leading-[0.83] tracking-[-0.075em] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem]">
                                        We're
                                        <br />
                                        Bugsmoker
                                    </h1>
                                </div>

                                <div className="w-full max-w-md lg:col-span-4">
                                    <p className="font-['Outfit'] text-[13px] leading-[1.8] text-[#4a4a4a] sm:text-sm md:text-[15px]">
                                        We’re all about making chaotic digital
                                        stuff that actually works for you. And
                                        honestly, we like to keep things light
                                        and reckless fun — because who wants
                                        boring, right?
                                    </p>
                                </div>

                                <div className="hidden lg:col-span-1 lg:block">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src="/home/1.png"
                                            alt="Bugsmoker"
                                            fill
                                            sizes="10vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visible mosaic overlay — image fragments */}
            <div
                ref={gridRef}
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[65vh] overflow-hidden"
            >
                <div
                    className="absolute inset-0 grid
    grid-cols-4 auto-rows-[100px]
    sm:grid-cols-8 sm:auto-rows-[90px]
    lg:grid-cols-10 lg:auto-rows-[90px]"
                >
                    {Array.from({ length: 48 }, (_, i) => {
                        const show = SHOW_INDICES.includes(i);
                        const col = i % gridConfig.cols;
                        const row = Math.floor(i / gridConfig.cols);
                        const bgX = `${-col * (100 / gridConfig.cols)}vw`;
                        const bgY = `${-row * gridConfig.rowHeight}px`;

                        return (
                            <div
                                key={i}
                                className={`mosaic-tile relative transition-colors duration-300 ${show ? "bg-transparent" : "bg-white/95"
                                    }`}
                            >
                                {show && (
                                    <div
                                        className="mosaic-tile-image-inner absolute inset-0 bg-cover bg-no-repeat"
                                        style={{
                                            backgroundImage: "url('/home/1.png')",
                                            backgroundSize: "100vw auto",
                                            backgroundPosition: `${bgX} ${bgY}`,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        <section className="w-full px-0 sm:px-5 lg:px-8 pb-8 sm:pb-12">
            <div className="relative w-full
                    min-h-[400px] h-[65svh] max-h-[720px]
                    sm:min-h-[480px] sm:h-[580px]
                    md:h-[620px] lg:h-[680px] xl:h-[720px]
                    overflow-hidden
                    shadow-xl shadow-black/10
                    border-y sm:border border-neutral-200/80
                    bg-neutral-900
                    sm:rounded-xl lg:rounded-2xl group">

                <Image
                    src="/home/new1.png"
                    alt="Bugsmoker Hero Banner"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center
                            transition-transform duration-1000
                            ease-out group-hover:scale-[1.02]"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/55
                        backdrop-blur-[0.5px] z-10" />

                {/* Banner Content */}
                <div className="relative z-20 min-h-[400px] h-full
                        w-full flex flex-col items-center justify-center
                        text-center
                        px-5 py-12
                        sm:px-8 sm:py-14
                        md:px-12 lg:px-16">

                    <h2 className="font-['Outfit'] font-bold text-white
                            tracking-tight leading-[1.08]
                            text-[clamp(1.8rem,6vw,2.5rem)]
                            sm:text-4xl md:text-5xl
                            lg:text-6xl
                            w-full max-w-3xl">
                        Crafting chaotic digital worlds that people
                        actually remember.
                    </h2>

                    {/* CTA Button */}
                    <div className="mt-7 sm:mt-9">
                        <Link
                            href="#services"
                            className="group/btn inline-flex items-center
                                    justify-center gap-2.5
                                    px-6 sm:px-8 py-3 sm:py-3.5
                                    rounded-full bg-white text-black
                                    text-xs sm:text-sm font-semibold
                                    tracking-wide whitespace-nowrap
                                    transition-all duration-300
                                    hover:bg-[#ff5a1f] hover:text-white
                                    hover:shadow-xl
                                    hover:shadow-[#ff5a1f]/25
                                    active:scale-95 cursor-pointer
                                    select-none"
                        >
                            <span>Contact Us</span>
                            {/* <ArrowUpRight
                                size={16}
                                strokeWidth={2.4}
                                className="transition-transform duration-300
                                        group-hover/btn:-translate-y-0.5
                                        group-hover/btn:translate-x-0.5"
                            /> */}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}
