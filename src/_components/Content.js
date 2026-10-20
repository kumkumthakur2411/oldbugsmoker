
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";

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
        alt: "Bugsmoker creative digital landscape",
    },
];

const PARTS = [
    "World shaped by experience, space matters more than ever.".split(" "),
    "At Bugsmoker, we fuse interior and digital design".split(" "),
    "with strategic thinking, creating environments that don't just look good, but work smart.".split(" "),
];

export default function Content() {
    const textRef = useRef(null);
    const [activeProject, setActiveProject] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 85%", "start 25%"],
    });

    const currentProject = PROJECTS[activeProject];

    const content = [
        ...PARTS[0].map((word) => ({ type: "word", value: word })),
        {
            type: "image",
            src: "/home/1.png",
            alt: "Interior and digital design detail",
            rotate: -2,
        },
        ...PARTS[1].map((word) => ({ type: "word", value: word })),
        {
            type: "image",
            src: "/home/hero.png",
            alt: "Creative digital landscape",
            rotate: 2,
        },
        ...PARTS[2].map((word) => ({ type: "word", value: word })),
    ];

    const toggleProject = () => {
        setActiveProject((prev) => (prev + 1) % PROJECTS.length);
    };

    return (
        <section
            id="manifesto-section"
            className="relative w-full overflow-hidden bg-white px-5 py-16 text-[#18181b] sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
        >
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

                    {/* Left Column */}
                    <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
                        <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#]" />


                        </div>

                        <div className="w-full max-w-[420px]">
                            <button
                                type="button"
                                onClick={toggleProject}
                                aria-label={`View next project. Current project: ${currentProject.title}`}
                                className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
                            >
                                <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 sm:aspect-[4/3]">
                                    <Image
                                        key={currentProject.src}
                                        src={currentProject.src}
                                        alt={currentProject.alt}
                                        fill
                                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 70vw, 380px"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />


                                </div>
                            </button>



                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="min-w-0 lg:col-span-8">
                        <div
                            ref={textRef}
                            className="font-['Outfit'] text-[clamp(1.65rem,5.3vw,3.6rem)] font-medium leading-[1.28] tracking-[-0.045em] text-neutral-900 sm:leading-[1.2] lg:text-[clamp(2.5rem,3.6vw,3.65rem)]"
                        >
                            {content.map((item, index) => {
                                if (item.type === "image") {
                                    return (
                                        <InlineImage
                                            key={`image-${index}`}
                                            src={item.src}
                                            alt={item.alt}
                                            progress={scrollYProgress}
                                            index={index}
                                            total={content.length}
                                            rotate={item.rotate}
                                            reduceMotion={shouldReduceMotion}
                                        />
                                    );
                                }

                                return (
                                    <Reveal
                                        key={`word-${index}`}
                                        word={item.value}
                                        progress={scrollYProgress}
                                        index={index}
                                        total={content.length}
                                        reduceMotion={shouldReduceMotion}
                                    />
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="my-10 h-px w-full bg-neutral-200 sm:my-14 lg:my-16" />

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-5 sm:gap-8">
                            <Stat
                                number="13"
                                label="Years Experience"
                                accent="#2563eb"
                            />

                            <Stat
                                number="64"
                                label="Total Projects"
                                accent="#ff5a1f"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Reveal({ word, progress, index, total, reduceMotion }) {
    const start = (index / total) * 0.55;
    const end = Math.min(start + 0.12, 0.65);

    const opacity = useTransform(progress, [start, end], [0.2, 1]);
    const y = useTransform(progress, [start, end], [10, 0]);
    const blur = useTransform(
        progress,
        [start, end],
        ["blur(5px)", "blur(0px)"]
    );

    return (
        <motion.span
            style={
                reduceMotion
                    ? { opacity: 1 }
                    : { opacity, y, filter: blur }
            }
            className="inline-block will-change-transform"
        >
            {word}&nbsp;
        </motion.span>
    );
}

function InlineImage({
    src,
    alt,
    progress,
    index,
    total,
    rotate = 0,
    reduceMotion,
}) {
    const start = (index / total) * 0.55;
    const end = Math.min(start + 0.12, 0.65);

    const opacity = useTransform(progress, [start, end], [0.35, 1]);
    const scale = useTransform(progress, [start, end], [0.9, 1]);
    const blur = useTransform(
        progress,
        [start, end],
        ["blur(3px)", "blur(0px)"]
    );

    return (
        <motion.span
            style={
                reduceMotion
                    ? { rotate: `${rotate}deg` }
                    : { opacity, scale, filter: blur, rotate: `${rotate}deg` }
            }
            className="relative mx-[0.1em] inline-block h-[0.76em] w-[1.12em] translate-y-[0.06em] overflow-hidden rounded-[0.15em] border border-neutral-300/70 align-baseline shadow-sm sm:mx-[0.13em] sm:rounded-[0.18em]"
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

function Stat({ number, label, accent }) {
    return (
        <div className="min-w-0">
            <div className="flex items-start">
                <span className="font-['Outfit'] text-6xl font-semibold leading-[0.95] tracking-[-0.07em] text-neutral-950 sm:text-7xl md:text-8xl lg:text-[6rem]">
                    {number}
                </span>

                <span
                    className="ml-1 text-3xl font-semibold leading-none sm:text-4xl md:text-5xl"
                    style={{ color: accent }}
                >
                    +
                </span>
            </div>

            <p className="mt-3 text-[11px] font-medium tracking-wide text-neutral-500 sm:mt-4 sm:text-sm">
                {label}
            </p>
        </div>
    );
}
