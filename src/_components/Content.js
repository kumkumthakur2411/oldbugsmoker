
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";

const CONTENT_PARTS = [
    { type: "text", value: "World shaped by experience," },
    {
        type: "image",
        src: "/home/1.png",
        alt: "Creative design project",
        rotate: -3,
    },
    { type: "text", value: "space matters more than ever." },
    {
        type: "image",
        src: "/home/hero.png",
        alt: "Digital design experience",
        rotate: 2,
    },
    { type: "text", value: "At Bugsmoker," },
    {
        type: "image",
        src: "/home/1.png",
        alt: "Visual design detail",
        rotate: -2,
    },
    { type: "text", value: " we fuse interior and digital design with strategic " },
    {
        type: "image",
        src: "/home/hero.png",
        alt: "Creative digital landscape",
        rotate: 3,
    },
    { type: "text", value: "with strategic thinking, " },
    {
        type: "image",
        src: "/home/1.png",
        alt: "Design inspiration",
        rotate: -2,
    },
    {
        type: "text",
        value: "creating environments that don't just look good, but work smart.",
    },
];

export default function Content() {
    const textRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 90%", "end 20%"],
    });

    let wordIndex = 0;

    const content = CONTENT_PARTS.flatMap((part, partIndex) => {
        if (part.type === "image") {
            return [{ ...part, key: `image - ${partIndex} ` }];
        }

        return part.value.split(" ").map((word) => ({
            type: "word",
            value: word,
            key: `word - ${wordIndex++} `,
        }));
    });

    return (
        <section
            id="manifesto-section"
            className="relative w-full overflow-hidden bg-white px-5 py-16 text-[#18181b] sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
        >
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
                    {/* Empty space on desktop */}
                    <div className="hidden lg:col-span-4 lg:block" />

                    {/* Animated content */}
                    <div className="min-w-0 lg:col-span-8">
                        <div
                            ref={textRef}
                            className="font-['Outfit'] text-[clamp(1.65rem,5.3vw,3.6rem)] font-medium leading-[1.28] tracking-[-0.045em] text-neutral-900 sm:leading-[1.2] lg:text-[clamp(2.5rem,3.6vw,3.65rem)]"
                        >
                            {content.map((item, index) => {
                                if (item.type === "image") {
                                    return (
                                        <InlineImage
                                            key={item.key}
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
                                        key={item.key}
                                        word={item.value}
                                        progress={scrollYProgress}
                                        index={index}
                                        total={content.length}
                                        reduceMotion={shouldReduceMotion}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function getAnimationRange(index, total) {
    const start = (index / total) * 0.9;
    const end = Math.min(start + 0.09, 1);

    return [start, end];
}


function Reveal({ word, progress, index, total, reduceMotion }) {
    const [start, end] = getAnimationRange(index, total);

    const opacity = useTransform(progress, [start, end], [0.55, 1]);
    const blur = useTransform(
        progress,
        [start, end],
        ["blur(5px)", "blur(0px)"]
    );

    return (
        <motion.span
            style={
                reduceMotion
                    ? { opacity: 1, filter: "blur(0px)" }
                    : {
                        opacity,
                        filter: blur,
                    }
            }
            className="inline-block"
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
    const [start, end] = getAnimationRange(index, total);

    const opacity = useTransform(progress, [start, end], [0.35, 1]);
    const scale = useTransform(progress, [start, end], [0.85, 1]);
    const blur = useTransform(
        progress,
        [start, end],
        ["blur(5px)", "blur(0px)"]
    );

    return (
        <motion.span
            style={
                reduceMotion
                    ? { rotate: `${rotate} deg` }
                    : {
                        opacity,
                        scale,
                        filter: blur,
                        rotate: `${rotate} deg`,
                    }
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
