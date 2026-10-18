"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
    {
        id: "1",
        title: "Sunset Monitor Installation",
        tag: "Digital Art & Experience",
        src: "/home/1.png",
        alt: "Bugsmoker art installation",
    },
    {
        id: "2",
        title: "Vintage Media Meadow",
        tag: "Scenic Production",
        src: "/home/hero.png",
        alt: "Bugsmoker dual screen meadow scene",
    },
];

export default function Content() {
    const textRef = useRef(null);
    const [activeProject, setActiveProject] = useState(0);

    // Track scroll on the text container with an early completion offset
    // so 100% of the words are completely unblurred and visible as the section enters
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 85%", "start 25%"],
    });

    const currentProject = PROJECTS[activeProject];

    const toggleProject = () => {
        setActiveProject((prev) => (prev + 1) % PROJECTS.length);
    };

    // Text segments for scroll reveal animation
    const part1Words = ["World", "shaped", "by", "experience,", "space", "matters", "more", "than", "ever."];
    const part2Words = ["At", "Bugsmoker,", "we", "fuse", "interior", "and", "digital", "design"];
    const part3Words = ["with", "strategic", "thinking", "creating", "environments", "that", "don't", "just", "look", "good,", "but", "work", "smart."];

    const totalItems = part1Words.length + 1 + part2Words.length + 1 + part3Words.length;
    let globalIndex = 0;

    return (
        <section
            id="manifesto-section"
            className="relative w-full bg-white text-[#18181b] px-6 sm:px-10 md:px-14 lg:px-16 py-20 sm:py-28 md:py-36 overflow-hidden"
        >
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-stretch">

                    {/* Left Column: About Us Label & Project Showcase */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <span className="text-[13px] sm:text-sm font-medium tracking-wide text-neutral-400">
                                About Us
                            </span>
                        </div>

                        <div className="mt-12 lg:mt-auto pt-8">
                            {/* Project Preview Card */}
                            <div
                                onClick={toggleProject}
                                className="group cursor-pointer block w-full max-w-[280px]"
                            >
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-neutral-200/80 bg-neutral-100 transition-all duration-500 group-hover:shadow-xl group-hover:border-neutral-300">
                                    <Image
                                        key={currentProject.src}
                                        src={currentProject.src}
                                        alt={currentProject.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Caption below image matching reference design */}
                                <div className="mt-3.5 flex items-center gap-1.5 text-[13px] sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors select-none">
                                    <span className="text-neutral-500 group-hover:text-black group-hover:rotate-90 transition-transform duration-300">
                                        +
                                    </span>
                                    <span>Our Project</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Statement Text with Scroll Blur Reveal & Stats */}
                    <div className="lg:col-span-8 flex flex-col justify-between">

                        {/* Statement Paragraph with Inline Images and Scroll Reveal */}
                        <div
                            ref={textRef}
                            className="font-['Outfit'] sm:font-['Inter'] text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[2.85rem] font-bold leading-[1.18] sm:leading-[1.15] tracking-tight text-neutral-900"
                        >
                            {part1Words.map((word) => {
                                const idx = globalIndex++;
                                return (
                                    <Reveal
                                        key={`p1-${word}-${idx}`}
                                        word={word}
                                        progress={scrollYProgress}
                                        index={idx}
                                        total={totalItems}
                                    />
                                );
                            })}
                            {" "}
                            {(() => {
                                const idx = globalIndex++;
                                return (
                                    <InlineImage
                                        key="inline-img-1"
                                        src="/home/1.png"
                                        alt="Interior & digital design detail"
                                        progress={scrollYProgress}
                                        index={idx}
                                        total={totalItems}
                                        rotate={-2}
                                    />
                                );
                            })()}
                            {" "}
                            {part2Words.map((word) => {
                                const idx = globalIndex++;
                                return (
                                    <Reveal
                                        key={`p2-${word}-${idx}`}
                                        word={word}
                                        progress={scrollYProgress}
                                        index={idx}
                                        total={totalItems}
                                    />
                                );
                            })}
                            {" "}
                            {(() => {
                                const idx = globalIndex++;
                                return (
                                    <InlineImage
                                        key="inline-img-2"
                                        src="/home/hero.png"
                                        alt="Creative digital landscape"
                                        progress={scrollYProgress}
                                        index={idx}
                                        total={totalItems}
                                        rotate={2}
                                    />
                                );
                            })()}
                            {" "}
                            {part3Words.map((word) => {
                                const idx = globalIndex++;
                                return (
                                    <Reveal
                                        key={`p3-${word}-${idx}`}
                                        word={word}
                                        progress={scrollYProgress}
                                        index={idx}
                                        total={totalItems}
                                    />
                                );
                            })}
                        </div>

                        {/* Thin Horizontal Divider */}
                        <div className="w-full border-t border-neutral-200/80 my-10 sm:my-14 lg:my-16" />

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-8 sm:gap-16">
                            
                            {/* Stat 1: Years Experience */}
                            <div className="flex flex-col">
                                <div className="flex items-start">
                                    <span className="font-['Outfit'] font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight text-neutral-950 leading-none select-none">
                                        13
                                    </span>
                                    <span className="text-[#2563eb] font-bold text-3xl sm:text-4xl md:text-5xl ml-1 -translate-y-1 sm:-translate-y-2 select-none">
                                        +
                                    </span>
                                </div>
                                <span className="text-xs sm:text-sm text-neutral-500 font-normal tracking-wide mt-3 sm:mt-4">
                                    Years Experience
                                </span>
                            </div>

                            {/* Stat 2: Total Project */}
                            <div className="flex flex-col">
                                <div className="flex items-start">
                                    <span className="font-['Outfit'] font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight text-neutral-950 leading-none select-none">
                                        64
                                    </span>
                                    <span className="text-[#ff5a1f] font-bold text-3xl sm:text-4xl md:text-5xl ml-1 -translate-y-1 sm:-translate-y-2 select-none">
                                        +
                                    </span>
                                </div>
                                <span className="text-xs sm:text-sm text-neutral-500 font-normal tracking-wide mt-3 sm:mt-4">
                                    Total Project
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

function Reveal({ word, progress, index, total }) {
    // Reveal all items smoothly within the first 65% of the scroll progress
    // so that the entire text is fully unblurred and readable without needing to scroll past the section
    const step = 0.55 / total;
    const start = index * step;
    const end = Math.min(start + 0.12, 0.65);

    const opacity = useTransform(progress, [start, end], [0.15, 1]);
    const y = useTransform(progress, [start, end], [12, 0]);
    const blur = useTransform(progress, [start, end], ["blur(6px)", "blur(0px)"]);

    return (
        <motion.span
            style={{
                opacity,
                y,
                filter: blur,
            }}
            className="inline-block will-change-transform"
        >
            {word}&nbsp;
        </motion.span>
    );
}

function InlineImage({ src, alt, progress, index, total, rotate = 0 }) {
    const step = 0.55 / total;
    const start = index * step;
    const end = Math.min(start + 0.12, 0.65);

    const opacity = useTransform(progress, [start, end], [0.25, 1]);
    const scale = useTransform(progress, [start, end], [0.85, 1]);
    const blur = useTransform(progress, [start, end], ["blur(4px)", "blur(0px)"]);

    return (
        <motion.span
            style={{
                opacity,
                scale,
                filter: blur,
            }}
            className={`relative mx-[0.16em] inline-block h-[0.74em] w-[1.12em] translate-y-[0.06em] overflow-hidden rounded-[0.2em] align-baseline shadow-sm border border-neutral-300/60 ${
                rotate > 0 ? "rotate-2" : rotate < 0 ? "-rotate-2" : ""
            }`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="120px"
                className="object-cover"
            />
        </motion.span>
    );
}