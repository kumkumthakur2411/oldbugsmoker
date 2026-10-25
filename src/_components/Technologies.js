"use client";

import React from "react";
import { motion } from "framer-motion";

const ROW_1 = [
    {
        name: "Next.js",
        svg: (
            <svg viewBox="0 0 180 180" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="Next.js">
                <circle cx="90" cy="90" fill="currentColor" r="90" />
                <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="#ebebed" />
                <rect fill="#ebebed" height="72" width="12" x="115" y="54" />
            </svg>
        ),
    },
    {
        name: "React",
        svg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-11 h-11 sm:w-13 sm:h-13 fill-none stroke-current" strokeWidth="1.2" aria-label="React">
                <circle cx="0" cy="0" r="2.2" fill="currentColor" stroke="none" />
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </svg>
        ),
    },
    {
        name: "TypeScript",
        svg: (
            <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="TypeScript">
                <rect width="128" height="128" rx="22" fill="currentColor" />
                <path d="M72.2 89.2c1.8 3 4.2 5.4 7.2 7.1s6.6 2.6 10.8 2.6c3.7 0 6.8-.7 9.2-2.1s4.1-3.3 5-5.6c.9-2.3 1.3-4.9 1.3-7.7 0-3.6-.8-6.7-2.5-9.2s-4.2-4.7-7.7-6.5c-3.4-1.8-7.8-3.6-13.1-5.3-5.3-1.8-9.8-3.7-13.4-5.8-3.6-2.1-6.4-4.8-8.2-8s-2.8-7.2-2.8-11.9c0-4.8 1.2-9 3.7-12.7s6-6.6 10.5-8.8c4.5-2.2 9.9-3.3 16.1-3.3 5.9 0 11.2 1.1 15.9 3.3 4.7 2.2 8.4 5.4 11 9.6l-10.4 6.7c-1.8-2.6-3.8-4.5-6.1-5.6s-5.1-1.7-8.3-1.7c-3.4 0-6.1.6-8.2 1.9s-3.2 3.1-3.2 5.5c0 2 .6 3.6 1.8 4.9s3.1 2.5 5.5 3.6c2.4 1.1 5.8 2.3 10.2 3.8 5.6 1.9 10.3 3.9 14.1 6.1s6.6 5 8.5 8.3c1.9 3.3 2.8 7.3 2.8 12.1 0 5.4-1.3 10-4 13.9s-6.5 6.9-11.4 9c-4.9 2.1-10.7 3.2-17.4 3.2-7.3 0-13.6-1.3-19-4s-9.4-6.6-12-11.8l10.8-6.7zM20 37.4h42.2V49H47.1v56.8H34.9V49H20V37.4z" fill="#ebebed" />
            </svg>
        ),
    },
    {
        name: "Tailwind CSS",
        svg: (
            <svg viewBox="0 0 48 48" className="w-12 h-12 sm:w-14 sm:h-14 fill-current" aria-label="Tailwind CSS">
                <path d="M24 10C16 10 11 15 9 25C12 21 16 19.5 21 20.5C23.9 21.1 26 23.3 28.3 25.7C32 29.5 36.3 34 45 34C53 34 58 29 60 19C57 23 53 24.5 48 23.5C45.1 22.9 43 20.7 40.7 18.3C37 14.5 32.7 10 24 10ZM9 25C1 25 -4 30 -6 40C-3 36 1 34.5 6 35.5C8.9 36.1 11 38.3 13.3 40.7C17 44.5 21.3 49 30 49C38 49 43 44 45 34C42 38 38 39.5 33 38.5C30.1 37.9 28 35.7 25.7 33.3C22 29.5 17.7 25 9 25Z" transform="translate(4, -2) scale(0.7)" />
            </svg>
        ),
    },
    {
        name: "Three.js",
        svg: (
            <svg viewBox="0 0 256 256" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="Three.js">
                <path d="M227.8 190.2L135.5 30.5c-3.3-5.7-9.3-9.2-15.9-9.2s-12.6 3.5-15.9 9.2L11.4 190.2c-3.3 5.7-3.3 12.7 0 18.4 3.3 5.7 9.3 9.2 15.9 9.2h184.6c6.6 0 12.6-3.5 15.9-9.2 3.3-5.7 3.3-12.7 0-18.4zM119.6 47.9l75.4 130.6H44.2l75.4-130.6zm-64.6 150h129.2L120 72.8 55 197.9z" />
            </svg>
        ),
    },
    {
        name: "Framer Motion",
        svg: (
            <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11 fill-current" aria-label="Framer Motion">
                <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
            </svg>
        ),
    },
    {
        name: "Figma",
        svg: (
            <svg viewBox="0 0 38 57" className="w-8 h-8 sm:w-9 sm:h-9 fill-current" aria-label="Figma">
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0zM0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5zM0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5zM19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" />
            </svg>
        ),
    },
    {
        name: "GraphQL",
        svg: (
            <svg viewBox="0 0 400 400" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="GraphQL">
                <path d="M57.468 302.66l-14.376-8.3 160.15-277.38 14.377 8.3z" />
                <path d="M39.8 272.2h320.4v16.6H39.8z" />
                <path d="M206.348 25.28l160.15 277.38-14.377 8.3-160.15-277.38z" />
                <path d="M345.822 208.21l-14.377-8.3 16.59-28.73 14.377 8.3z" />
                <circle cx="200" cy="30" r="30" />
                <circle cx="347" cy="115" r="30" />
                <circle cx="347" cy="285" r="30" />
                <circle cx="200" cy="370" r="30" />
                <circle cx="53" cy="285" r="30" />
                <circle cx="53" cy="115" r="30" />
            </svg>
        ),
    },
];

const ROW_2 = [
    {
        name: "Node.js",
        svg: (
            <svg viewBox="0 0 256 289" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="Node.js">
                <path d="M128 0L256 73.9V215.1L128 289L0 215.1V73.9L128 0Z" />
                <path d="M128 40L220 93.1V195.9L128 249L36 195.9V93.1L128 40Z" fill="#ebebed" />
                <path d="M128 65L198 105.4V183.6L128 224L58 183.6V105.4L128 65Z" />
            </svg>
        ),
    },
    {
        name: "Python",
        svg: (
            <svg viewBox="0 0 256 255" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="Python">
                <path d="M126.9 0C60.2 0 63.8 28.9 63.8 28.9l.1 29.9h64.7v9.2H38.2S0 63.4 0 127.3c0 63.9 33.4 61.6 33.4 61.6h19.9v-28.1s-1.1-33.4 32.8-33.4h56.4s31.7.5 31.7-30.8V32s3.6-32-47.3-32zM92.8 19.3a10.8 10.8 0 1 1 0 21.6 10.8 10.8 0 0 1 0-21.6z" />
                <path d="M129.1 254.9c66.7 0 63.1-28.9 63.1-28.9l-.1-29.9h-64.7v-9.2h90.4s38.2 4.6 38.2-59.3c0-63.9-33.4-61.6-33.4-61.6h-19.9v28.1s1.1 33.4-32.8 33.4H113.5s-31.7-.5-31.7 30.8V223s-3.6 31.9 47.3 31.9zm34.1-19.3a10.8 10.8 0 1 1 0-21.6 10.8 10.8 0 0 1 0 21.6z" opacity="0.75" />
            </svg>
        ),
    },
    {
        name: "PostgreSQL",
        svg: (
            <svg viewBox="0 0 256 264" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="PostgreSQL">
                <path d="M125.6 0C56.2 0 0 57.3 0 128c0 52.8 31.7 98.1 77.1 117.8 3.8.7 7.7 1.3 11.6 1.8 1.4-1.2 2.6-2.5 3.6-4.1 6.8-10.4 13.7-20.9 20.5-31.3 1.3-2 3.7-2.9 5.9-2.2 4.4 1.4 8.8 2.5 13.3 3.3 3.8.7 7.7 1.1 11.6 1.1 4.7 0 9.4-.5 14-1.4 4.5-.9 8.8-2.2 13-4 2.1-.9 4.6-.2 5.9 1.7 6.8 10.4 13.7 20.9 20.5 31.3 1 1.6 2.2 2.9 3.6 4.1 3.9-.5 7.8-1.1 11.6-1.8 45.4-19.7 77.1-65 77.1-117.8C251.2 57.3 195 0 125.6 0z" />
            </svg>
        ),
    },
    {
        name: "Docker",
        svg: (
            <svg viewBox="0 0 256 183" className="w-12 h-12 sm:w-14 sm:h-14 fill-current" aria-label="Docker">
                <path d="M106.3 30.6h25.5v25.5h-25.5zm29.8 0h25.5v25.5h-25.5zm-59.5 0h25.5v25.5H76.6zm-29.8 30.6h25.5v25.5H46.8zm29.8 0h25.5v25.5H76.6zm29.8 0h25.5v25.5h-25.5zm29.8 0h25.5v25.5h-25.5zm29.8 0h25.5v25.5h-25.5zm-89.3 30.6h25.5v25.5H76.6zm29.8 0h25.5v25.5h-25.5zm29.8 0h25.5v25.5h-25.5zm29.8 0h25.5v25.5h-25.5zM250 83.6c-4.3-3.2-13.8-5.3-25.5-2.1-3.2-12.8-13.8-22.3-25.5-24.5l-6.4 11.7c7.4 3.2 13.8 8.5 17 16-17 0-35.1 8.5-43.6 19.1-16-1.1-60.6-2.1-94.7 18.1-16 9.6-25.5 23.4-27.7 41.5-1.1 10.6 1.1 22.3 8.5 31.9 14.9 19.1 41.5 28.7 71.3 28.7 54.3 0 94.7-33 111.7-90.4 5.3 1.1 10.6 2.1 16 1.1 8.5-1.1 16-5.3 20.2-12.8 1.1-2.1 2.1-5.3 2.1-7.4-4.2-7.5-13.7-10.7-23.4-10.9z" />
            </svg>
        ),
    },
    {
        name: "Cloudflare",
        svg: (
            <svg viewBox="0 0 256 116" className="w-12 h-12 sm:w-14 sm:h-14 fill-current" aria-label="Cloudflare">
                <path d="M182.2 37.8c-3.8-17.7-19.4-31.1-38.3-31.1-15.5 0-28.8 9-35.3 22.1-5.9-4.7-13.4-7.5-21.6-7.5-18.7 0-33.9 14.7-34.9 33.1C22.6 57 0 81.3 0 110.8c0 2.8.2 5.5.6 8.2h205.8c27.7 0 50.2-22.5 50.2-50.2 0-25.3-18.8-46.3-43.3-49.8-8.2-12.8-22.7-21.2-30.5-21.2z" />
            </svg>
        ),
    },
    {
        name: "Redis",
        svg: (
            <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 fill-current" aria-label="Redis">
                <path d="M22.5 7.5L12 2.25 1.5 7.5l10.5 5.25 10.5-5.25zM1.5 10.5l10.5 5.25 10.5-5.25v3L12 19.5 1.5 14.25v-3.75zM1.5 15l10.5 5.25 10.5-5.25v3L12 24 1.5 18.75v-3.75z" />
            </svg>
        ),
    },
    {
        name: "Go",
        svg: (
            <svg viewBox="0 0 256 96" className="w-12 h-12 sm:w-14 sm:h-14 fill-current" aria-label="Go">
                <path d="M48.2 38.3c-2.4-1.2-5.1-1.8-8-1.8-7.9 0-14.3 6.4-14.3 14.3s6.4 14.3 14.3 14.3c5.3 0 9.9-2.9 12.4-7.2h-12.4v-8.6h23.2v25.2h-8.2l-1.3-4.3c-3.6 3.6-8.5 5.9-14 5.9-12.7 0-23-10.3-23-23s10.3-23 23-23c5.7 0 10.9 2.1 14.9 5.6l-6.6 6.6zM88.4 27.8c12.7 0 23 10.3 23 23s-10.3 23-23 23-23-10.3-23-23 10.3-23 23-23zm0 37.3c7.9 0 14.3-6.4 14.3-14.3s-6.4-14.3-14.3-14.3-14.3 6.4-14.3 14.3 6.4 14.3 14.3 14.3z" />
            </svg>
        ),
    },
];

export default function Technologies() {
    // Duplicate arrays for perfectly seamless infinite looping
    const row1Items = [...ROW_1, ...ROW_1, ...ROW_1];
    const row2Items = [...ROW_2, ...ROW_2, ...ROW_2];

    return (
        <section
            id="technologies"
            className="relative w-full bg-[#fbfbfb] text-[#0d0d0d] font-['Outfit',sans-serif] py-14 sm:py-20 md:py-24 overflow-hidden border-t border-black/10 select-none"
        >
            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
                            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-black/60 font-semibold">
                                CORE ARCHITECTURE // ECOSYSTEM
                            </span>
                        </div>
                        <h2 className="font-['Outfit'] text-[clamp(1.8rem,7vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-black">
                            Technologies.
                            <br />
                            <span className="text-neutral-400">
                                We work with.
                            </span>
                        </h2>
                    </div>

                    <p className="font-mono text-xs text-black/50 uppercase tracking-widest sm:text-right">
                        [ BATTLE-TESTED MODERN STACK ]
                    </p>
                </div>
            </div>

            {/* Two-Row Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden flex flex-col gap-3.5 sm:gap-4 md:gap-5 py-2">
                {/* Soft gradient edge fade masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-r from-[#fbfbfb] via-[#fbfbfb]/90 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-l from-[#fbfbfb] via-[#fbfbfb]/90 to-transparent z-10" />

                {/* Row 1: Left to Right Marquee */}
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 38,
                    }}
                    className="flex items-center gap-3.5 sm:gap-4 md:gap-5 w-max"
                >
                    {row1Items.map((tech, idx) => (
                        <div
                            key={`r1-${tech.name}-${idx}`}
                            className="group relative flex items-center justify-center w-[130px] h-[85px] sm:w-[160px] sm:h-[105px] md:w-[180px] md:h-[115px] rounded-2xl sm:rounded-[22px] bg-[#ebebed] transition-all duration-300 hover:bg-[#e2e2e5] hover:scale-[1.03] cursor-default flex-shrink-0"
                            title={tech.name}
                        >
                            <div className="flex items-center justify-center text-[#111111] transition-transform duration-300 group-hover:scale-110">
                                {tech.svg}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Row 2: Right to Left Marquee */}
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                    }}
                    className="flex items-center gap-3.5 sm:gap-4 md:gap-5 w-max"
                >
                    {row2Items.map((tech, idx) => (
                        <div
                            key={`r2-${tech.name}-${idx}`}
                            className="group relative flex items-center justify-center w-[130px] h-[85px] sm:w-[160px] sm:h-[105px] md:w-[180px] md:h-[115px] rounded-2xl sm:rounded-[22px] bg-[#ebebed] transition-all duration-300 hover:bg-[#e2e2e5] hover:scale-[1.03] cursor-default flex-shrink-0"
                            title={tech.name}
                        >
                            <div className="flex items-center justify-center text-[#111111] transition-transform duration-300 group-hover:scale-110">
                                {tech.svg}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
