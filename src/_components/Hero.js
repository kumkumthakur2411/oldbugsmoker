
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SHOW_INDICES = [
    2, 4, 5, 8, 10, 11, 13, 16, 17, 19,
    22, 24, 25, 28, 33, 35, 37, 45, 49, 56, 58
];

export default function Hero() {
    const heroRef = useRef(null);
    const gridRef = useRef(null);

    const [gridConfig, setGridConfig] = useState({
        cols: 4,
        rowHeight: 100,
        tileCount: 48,
    });

    // Responsive grid configuration
    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;

            if (width < 768) {
                setGridConfig({
                    cols: 4,
                    rowHeight: 100,
                    tileCount: 64,
                });

            } else if (width < 1024) {
                setGridConfig({
                    cols: 8,
                    rowHeight: 90,
                    tileCount: 48,
                });
            } else {
                setGridConfig({
                    cols: 10,
                    rowHeight: 90,
                    tileCount: 60,
                });
            }
        };

        updateGrid();

        window.addEventListener("resize", updateGrid);

        return () => {
            window.removeEventListener("resize", updateGrid);
        };
    }, []);

    // GSAP mosaic animations
    useEffect(() => {
        if (!gridRef.current || !heroRef.current) return;

        const ctx = gsap.context(() => {
            const tiles =
                gridRef.current.querySelectorAll(".mosaic-tile");

            if (!tiles.length) return;

            const isMobile = window.innerWidth < 600;

            gsap.set(tiles, {
                opacity: 0,
                scale: 0.2,
                y: 20,
                transformOrigin: "center center",
            });

            if (isMobile) {
                const mobileTimeline = gsap.timeline({
                    repeat: -1,
                    delay: 0.2,
                });

                mobileTimeline
                    .fromTo(
                        tiles,
                        {
                            opacity: 0,
                            scale: 0.2,
                            y: 20,
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "back.out(1.5)",
                            stagger: {
                                amount: 1.4,
                                from: "random",
                            },
                        }
                    )
                    .to({}, { duration: 3 })
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
                    .to({}, { duration: 0.5 });

                gsap.to(gridRef.current, {
                    y: 35,
                    opacity: 0.4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8,
                    },
                });
            } else {
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

                gsap.to(tiles, {
                    y: (i) => ((i % 10) - 4.5) * 40,
                    scale: 0.92,
                    opacity: (i) =>
                        SHOW_INDICES.includes(i) ? 0.35 : 0.75,
                    stagger: {
                        amount: 0.6,
                        from: "random",
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                });
            }
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, [gridConfig]);

    return (
        <>
            <section
                ref={heroRef}
                className="relative isolate w-full bg-white text-black lg:min-h-screen xl:min-h-[105vh] lg:flex lg:flex-col lg:justify-end"
            >
                {/* Heading and description */}
                <div className="relative z-30 bg-transparent w-full">
                    <div className="px-5 pb-10 pt-7 sm:px-8 sm:pb-14 sm:pt-9 md:px-12 lg:px-16 lg:pb-20 lg:pt-14 xl:pb-24">
                        <div className="mx-auto max-w-[1400px]">
                            <div className="mt-[50vh] sm:mt-64 md:mt-72 lg:mt-[44vh] xl:mt-[48vh]">
                                <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
                                    <div className="min-w-0 lg:col-span-7">
                                        <h1 className="break-words font-['Outfit'] text-[clamp(3.5rem,12vw,5rem)] font-bold leading-[0.83] tracking-[-0.075em] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem]">
                                            We&apos;re
                                            <br />
                                            Bugsmoker
                                        </h1>
                                    </div>

                                    <div className="w-full max-w-md lg:col-span-4">
                                        <p className="font-['Outfit'] text-[13px] leading-[1.8] text-[#4a4a4a] sm:text-sm md:text-[15px]">
                                            We’re all about making chaotic
                                            digital stuff that actually works
                                            for you. And honestly, we like to
                                            keep things light and reckless fun
                                            — because who wants boring, right?
                                        </p>
                                    </div>

                                    <div className="hidden lg:col-span-1 lg:block">
                                        <div className="relative aspect-[3/4] ">
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

                {/* Mosaic image grid */}
                <div
                    ref={gridRef}
                    className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[70vh] sm:h-[50vh] lg:h-[62vh] xl:h-[68vh]"
                >
                    <div
                        className="absolute inset-0 grid
            grid-cols-4 auto-rows-[100px]
            md:grid-cols-8 md:auto-rows-[90px]
            lg:grid-cols-10 lg:auto-rows-[90px]"
                    >
                        {Array.from(
                            { length: gridConfig.tileCount },
                            (_, i) => {
                                const show = SHOW_INDICES.includes(i);
                                const col = i % gridConfig.cols;
                                const row = Math.floor(i / gridConfig.cols);

                                const bgX = `${-col * (100 / gridConfig.cols)}vw`;
                                const bgY = `${-row * gridConfig.rowHeight}px`;

                                return (
                                    <div
                                        key={i}
                                        className={`mosaic-tile relative transition-colors duration-300 ${show
                                            ? "bg-transparent"
                                            : "bg-white/95"
                                            }`}
                                    >
                                        {show && (
                                            <div
                                                className="mosaic-tile-image-inner absolute inset-0 bg-no-repeat"
                                                style={{
                                                    backgroundImage: "url('/home/mos.png')",
                                                    backgroundSize: "100vw auto",
                                                    backgroundPosition: `${bgX} ${bgY}`,
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

            </section>

            {/* Banner section */}
            <section className="w-full px-0 pb-8 sm:px-5 sm:pb-12 lg:px-8">
                <div
                    className="group relative h-[65svh] min-h-[400px] max-h-[720px] w-full overflow-hidden border-y border-neutral-200/80 bg-neutral-900 shadow-xl shadow-black/10 sm:h-[580px] sm:min-h-[480px] sm:rounded-xl sm:border md:h-[620px] lg:h-[680px] lg:rounded-2xl xl:h-[720px]"
                >
                    <Image
                        src="/home/new1.png"
                        alt="Bugsmoker Hero Banner"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 z-10 bg-black/55 backdrop-blur-[0.5px]" />

                    <div className="relative z-20 flex h-full min-h-[400px] w-full flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-14 md:px-12 lg:px-16">
                        <h2 className="w-full max-w-3xl font-['Outfit'] text-[clamp(1.8rem,6vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            Crafting chaotic digital worlds that people
                            actually remember.
                        </h2>

                        <div className="mt-7 sm:mt-9">
                            <Link
                                href="#services"
                                className="group/btn inline-flex cursor-pointer select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-6 py-3 text-xs font-semibold tracking-wide text-black transition-all duration-300 hover:bg-[#ff5a1f] hover:text-white hover:shadow-xl hover:shadow-[#ff5a1f]/25 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
                            >
                                <span>Contact Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
