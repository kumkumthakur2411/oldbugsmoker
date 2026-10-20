"use client";

import React from "react";
import Image from "next/image";

const MOODBOARD_TILES = [
    {
        id: "1",
        src: "/home/3.png",
        alt: "Greenhouse visual exploration",
    },
    {
        id: "2",
        src: "/home/4.png",
        alt: "Golden sunset aesthetic reference",
    },
    {
        id: "3",
        src: "/home/5.png",
        alt: "Vintage rain umbrella composition",
    },
    {
        id: "4",
        src: "/home/2.png",
        alt: "Coastal horizon color palette",
    },
];

export default function Project() {
    return (
        <section className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

            {/* Left Column: Monochromatic Background with Centered White Editorial Card */}
            <div className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16">

                {/* Monochrome Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home/new1.png"
                        alt="Monochrome texture background"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center grayscale contrast-125 brightness-95"
                    />
                    {/* Subtle soft overlay */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* White Editorial Card */}
                <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] bg-white shadow-2xl flex flex-col items-center justify-center text-center p-8 sm:p-12 select-none">
                    <h3 className="font-['Outfit'] font-bold text-xl sm:text-2xl text-black lowercase tracking-tight mb-5 sm:mb-6">
                        Selective work
                    </h3>

                    <p className="font-['Inter'] text-[12.5px] sm:text-[13.5px] leading-[1.75] text-[#4a4a4a] lowercase font-normal max-w-[260px] sm:max-w-[280px]">
                        was developed as the starting point of the creative process.
                        the concept, visual direction, and design elements were carefully
                        explored to establish a cohesive identity and a clear visual
                        language for the project
                    </p>
                </div>
            </div>

            {/* Right Column: Dark Matte Background with 2x2 Image Grid & Description */}
            <div className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-screen text-white flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16">

                {/* 2x2 Moodboard Grid */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 w-full max-w-[380px] sm:max-w-[420px]">
                    {MOODBOARD_TILES.map((tile) => (
                        <div
                            key={tile.id}
                            className="group relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 shadow-md cursor-pointer"
                        >
                            <Image
                                src={tile.src}
                                alt={tile.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 220px"
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Subtle dark hover veil */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                        </div>
                    ))}
                </div>

                {/* Bottom Caption Text */}
                <p className="font-['Inter'] text-xs sm:text-[13px] leading-[1.7] text-[#8e8e8e] text-center max-w-[340px] sm:max-w-[370px] lowercase font-normal mt-7 sm:mt-9 select-none">
                    each project is thoughtfully crafted with a focus on visual
                    storytelling, cohesive design, and meaningful details to create
                    a distinct and memorable experience
                </p>

            </div>

        </section>
    );
}
