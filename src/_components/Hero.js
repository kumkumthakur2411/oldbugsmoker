
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_SHOW_INDICES = new Set([
    // Row 0
    2, 5, 8,
    // Row 1
    10, 11, 13, 16, 19,
    // Row 2 (tile 23 shows monitor top, tile 24 is white space)
    21, 23, 25, 28,
    // Row 3 (full computer code screen: tiles 33 & 34)
    30, 33, 34, 35, 37, 39,
    // Row 4 (tile 43 shows lower screen & flower, tile 44 is white space)
    41, 43, 46, 49,
    // Row 5 (tile 53 shows computer base, tile 54 is white space)
    53,
    // Rows 6 & 7: 100% clean white for text!
]);

// Mobile (6 cols x 10 rows):
// row = Math.floor(i / 6), col = i % 6
const MOBILE_SHOW_INDICES = new Set([
    // Row 0: empty (keeps navbar area 100% clean and legible)
    // Row 1: soft sunset glow
    1 * 6 + 1, // 7
    1 * 6 + 4, // 10
    // Row 2: monitor top & sky
    2 * 6 + 2, // 14
    2 * 6 + 3, // 15
    2 * 6 + 5, // 17
    // Row 3: vintage computer code screen & sunset bloom
    3 * 6 + 0, // 18
    3 * 6 + 2, // 20 (code screen)
    3 * 6 + 3, // 21 (code screen)
    3 * 6 + 4, // 22
    // Row 4: lower screen, keyboard & vibrant flower bloom
    4 * 6 + 1, // 25
    4 * 6 + 2, // 26
    4 * 6 + 3, // 27
    // Row 5: base of flowers
    5 * 6 + 2, // 32
    // Rows 6, 7, 8, 9 (indices 36-59): 100% clean white for text!
]);

// Tablet (8 cols x 8 rows):
const TABLET_SHOW_INDICES = new Set([
    2, 5,
    1 * 8 + 1, 1 * 8 + 3, 1 * 8 + 6,
    2 * 8 + 2, 2 * 8 + 3, 2 * 8 + 4, 2 * 8 + 7,
    3 * 8 + 0, 3 * 8 + 3, 3 * 8 + 4, 3 * 8 + 5,
    4 * 8 + 1, 4 * 8 + 3, 4 * 8 + 6,
    5 * 8 + 3,
    // Rows 6 & 7: clean white for text!
]);

const isTileShown = (index, mode) => {
    if (mode === "mobile") return MOBILE_SHOW_INDICES.has(index);
    if (mode === "tablet") return TABLET_SHOW_INDICES.has(index);
    return DESKTOP_SHOW_INDICES.has(index);
};

export default function Hero() {
    const heroRef = useRef(null);
    const gridRef = useRef(null);

    const [gridConfig, setGridConfig] = useState({
        cols: 10,
        rows: 8,
        tileCount: 80,
        mode: "desktop",
    });

    // Responsive grid configuration
    useEffect(() => {
        const updateGrid = () => {
            const width = window.innerWidth;

            if (width < 768) {
                setGridConfig({
                    cols: 6,
                    rows: 10,
                    tileCount: 60,
                    mode: "mobile",
                });
            } else if (width < 1024) {
                setGridConfig({
                    cols: 8,
                    rows: 8,
                    tileCount: 64,
                    mode: "tablet",
                });
            } else {
                setGridConfig({
                    cols: 10,
                    rows: 8,
                    tileCount: 80,
                    mode: "desktop",
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

            const isMobile = window.innerWidth < 768;

            gsap.set(tiles, {
                opacity: 0,
                scale: 0.6,
                y: 15,
                transformOrigin: "center center",
            });

            gsap.to(tiles, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.4)",
                stagger: {
                    amount: 0.8,
                    from: "random",
                },
                delay: 0.15,
            });

            if (isMobile) {
                gsap.to(gridRef.current, {
                    y: 30,
                    opacity: 0.7,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.8,
                    },
                });
            } else {
                gsap.to(tiles, {
                    y: (i) => ((i % 10) - 4.5) * 35,
                    scale: 0.94,
                    stagger: {
                        amount: 0.5,
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
                className="relative isolate flex min-h-[100svh] w-full flex-col justify-end bg-white text-[rgb(36,36,36)]"
            >
                {/* Heading and description */}
                <div className="pointer-events-none relative z-30 w-full bg-transparent">
                    <div className="px-5 pb-8 pt-4 sm:px-8 sm:pb-14 sm:pt-9 md:px-12 lg:px-16">
                        <div className="mx-auto max-w-[1400px]">
                            <div className="mt-auto pt-4 sm:pt-20 md:pt-32">
                                <div className="pointer-events-auto grid grid-cols-1 items-end gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-10">
                                    <div className="min-w-0 lg:col-span-7">
                                        <h1 className="break-words font-['Outfit'] text-[clamp(2.75rem,11.5vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem]">
                                            We&apos;re
                                            <br />
                                            Bugsmoker<span className="text-[#ff5a1f]">.</span>
                                        </h1>
                                    </div>

                                    <div className="w-full max-w-md lg:col-span-4">
                                        <p className="font-['Outfit'] text-[13px] leading-[1.7] text-[#4a4a4a] sm:text-sm sm:leading-[1.8] md:text-[15px]">
                                            We’re all about making chaotic
                                            digital stuff that actually works
                                            for you. And honestly, we like to
                                            keep things light and reckless fun
                                            — because who wants boring, right?
                                        </p>
                                    </div>

                                    <div className="hidden lg:col-span-1 lg:block">
                                        <div className="relative aspect-[3/4]">
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
                    className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden"
                >
                    <div
                        className="absolute inset-0 grid h-full w-full"
                        style={{
                            gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${gridConfig.rows}, minmax(0, 1fr))`,
                        }}
                    >
                        {Array.from(
                            { length: gridConfig.tileCount },
                            (_, i) => {
                                const show = isTileShown(i, gridConfig.mode);
                                const col = i % gridConfig.cols;
                                const row = Math.floor(i / gridConfig.cols);

                                return (
                                    <div
                                        key={i}
                                        className={`mosaic-tile group pointer-events-auto relative overflow-hidden transition-colors duration-300 cursor-pointer ${show
                                            ? "bg-transparent"
                                            : "bg-white"
                                            }`}
                                    >
                                        {show && (
                                            <div
                                                className="mosaic-tile-image-inner pointer-events-none absolute"
                                                style={{
                                                    width: `${gridConfig.cols * 100}%`,
                                                    height: `${gridConfig.rows * 100}%`,
                                                    left: `${-col * 100}%`,
                                                    top: `${-row * 100}%`,
                                                    backgroundImage: "url('/Vintage%20Computer%20Bloom%20at%20Sunset.png')",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <style>{`
                        .mosaic-tile {
                            position: relative;
                        }
                        .mosaic-tile:hover {
                            z-index: 25 !important;
                        }
                        .mosaic-tile .mosaic-tile-image-inner {
                            transition: transform 0.3s ease;
                        }
                        .mosaic-tile:hover .mosaic-tile-image-inner {
                            transform: scale(1.04);
                        }
                    `}</style>
                </div>

            </section>

            {/* Banner section */}
            {/* <section className="w-full px-0 pb-8 sm:px-5 sm:pb-12 lg:px-8">
                <div
                    className="group relative h-[55svh] min-h-[340px] max-h-[720px] w-full overflow-hidden border-y border-neutral-200/80 bg-neutral-900 shadow-xl shadow-black/10 sm:h-[580px] sm:min-h-[480px] sm:rounded-xl sm:border md:h-[620px] lg:h-[680px] lg:rounded-2xl xl:h-[720px]"
                >
                    <Image
                        src="/home/new1.png"
                        alt="Bugsmoker Hero Banner"
                        fill
                        unoptimized={true}
                        priority
                        sizes="100vw"
                        className="object-cover object-center grayscale brightness-[1.15] contrast-95 transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 z-10 bg-black/35 backdrop-blur-[0.5px]" />

                    <div className="relative z-20 flex h-full min-h-[340px] w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-8 sm:py-14 md:px-12 lg:px-16">
                        <h2 className="w-full max-w-3xl font-['Outfit'] text-[clamp(1.6rem,6vw,2.5rem)] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            Crafting chaotic digital worlds that people
                            actually remember.
                        </h2>

                        <div className="mt-5 sm:mt-9">
                            <Link
                                href="#services"
                                className="group/btn inline-flex cursor-pointer select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#ff5a1f] px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#ff5a1f]/20 transition-all duration-300 hover:bg-[#e04f1a] hover:shadow-xl hover:shadow-[#ff5a1f]/35 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
                            >
                                <span>Contact Us</span>
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={2.4}
                                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
