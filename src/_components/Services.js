"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES_DATA = [
    {
        id: "1",
        title: "Web Development",
        src: "/home/1.png",
        alt: "Web development",
        href: "web-development",
        serviceSlug: "web-development",
    },
    {
        id: "2",
        title: "Software Development",
        src: "/home/2.png",
        alt: "Software development",
        href: "software-development",
        serviceSlug: "software-development",
    },
    {
        id: "3",
        title: "Website Optimization",
        src: "/home/3.png",
        alt: "Website optimization",
        href: "website-optimization",
        serviceSlug: "website-optimization",
    },
    {
        id: "4",
        title: "Hosting & Maintenance",
        src: "/home/4.png",
        alt: "Hosting and maintenance",
        href: "hosting-maintenance",
        serviceSlug: "hosting-maintenance",
    },
    {
        id: "5",
        title: "Tech Support",
        src: "/home/5.png",
        alt: "Technical support",
        href: "tech-support",
        serviceSlug: "tech-support",
    },
];

// Fanned offset so every previous card's corners and edges remain clearly visible
const STACK_LAYOUT = [
    { targetRotate: -2.5, targetX: -5, targetY: 8, zIndex: 10 },
    { targetRotate: 3.5, targetX: 5, targetY: 4, zIndex: 20 },
    { targetRotate: -3.5, targetX: -5, targetY: 0, zIndex: 30 },
    { targetRotate: 3.0, targetX: 4, targetY: -4, zIndex: 40 },
    { targetRotate: 0, targetX: 0, targetY: -8, zIndex: 50 },
];

function MobileScrollFlippingCard({ service, index, totalCards, progress, isActive }) {
    const layout = STACK_LAYOUT[index];

    // Card 0 starts already in place. Cards 1..4 enter from completely off-screen bottom (y: 850px).
    const isBase = index === 0;
    const enterStart = isBase ? 0 : 0.05 + (index - 1) * 0.20;
    const enterEnd = isBase ? 0 : enterStart + 0.19;

    const y = useTransform(
        progress,
        isBase ? [0, 1] : [0, enterStart, enterEnd, 1],
        isBase ? [layout.targetY, layout.targetY] : [850, 850, layout.targetY, layout.targetY]
    );

    const rotate = useTransform(
        progress,
        isBase ? [0, 1] : [0, enterStart, enterEnd, 1],
        isBase ? [layout.targetRotate, layout.targetRotate] : [0, 0, layout.targetRotate, layout.targetRotate]
    );

    const rotateX = useTransform(
        progress,
        isBase ? [0, 1] : [0, enterStart, enterEnd, 1],
        isBase ? [0, 0] : [22, 22, 0, 0]
    );

    const opacity = useTransform(
        progress,
        isBase ? [0, 1] : [0, enterStart, enterStart + 0.03, 1],
        isBase ? [1, 1] : [0, 0, 1, 1]
    );

    const zIndex = (index + 1) * 10;
    const zClass = index === 0 ? "z-[10]" : index === 1 ? "z-[20]" : index === 2 ? "z-[30]" : index === 3 ? "z-[40]" : "z-[50]";

    return (
        <motion.div
            style={{
                y,
                x: layout.targetX,
                rotate,
                rotateX,
                opacity,
                zIndex,
                transformOrigin: "center center",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
            }}
            className={`absolute inset-0 will-change-transform ${zClass} ${
                isActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
            <Link
                href={`/service/${service.serviceSlug || service.href}`}
                className="group relative block w-full overflow-hidden border border-black/15 bg-white p-2.5 shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition-shadow duration-300 sm:p-3"
            >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                    <Image
                        src={service.src}
                        alt={service.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 90vw, 360px"
                        draggable={false}
                        className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                    {/* Large image number */}
                    <span className="absolute -bottom-3 left-2 font-['Outfit'] text-[80px] font-bold leading-none tracking-[-0.09em] text-white/85 select-none sm:text-[95px]">
                        0{index + 1}
                    </span>

                    {/* Top pill */}
                    <span className="absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/90 backdrop-blur-sm sm:right-3 sm:top-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                        0{index + 1} / 0{totalCards}
                    </span>
                </div>

                {/* Card details */}
                <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-3 sm:pt-3.5">
                    <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-400">
                            Bugsmoker Service
                        </p>
                        <h3 className="font-['Outfit'] text-lg font-semibold leading-tight tracking-[-0.04em] text-neutral-950 sm:text-xl">
                            {service.title}
                        </h3>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ff5a1f] text-white shadow-sm transition-transform active:scale-95 group-hover:bg-neutral-950 sm:h-11 sm:w-11">
                        <ArrowUpRight size={20} strokeWidth={1.9} />
                    </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#ff5a1f]" />
            </Link>
        </motion.div>
    );
}

export default function Services() {
    const containerRef = useRef(null);
    const maskContainerRef = useRef(null);
    const cardsWrapperRef = useRef(null);

    const [maxScrollDistance, setMaxScrollDistance] = useState(0);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth scroll interpolation with spring physics to guarantee 60/120fps fluid motion
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 85,
        damping: 24,
        mass: 0.35,
        restDelta: 0.0001,
    });

    // Only trigger React state updates when the card index actually changes (prevents scroll jank)
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        let nextIndex = 0;
        if (latest >= 0.75) nextIndex = 4;
        else if (latest >= 0.55) nextIndex = 3;
        else if (latest >= 0.35) nextIndex = 2;
        else if (latest >= 0.15) nextIndex = 1;

        if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveCardIndex(nextIndex);
        }
    });

    const scrollToCard = (cardIndex) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const containerTop = rect.top + scrollTop;
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableDistance = containerHeight - windowHeight;

        if (scrollableDistance <= 0) return;

        const targets = [0.04, 0.25, 0.45, 0.65, 0.85];
        const targetProgress = targets[cardIndex] ?? 0;

        window.scrollTo({
            top: containerTop + targetProgress * scrollableDistance,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const calculateScroll = () => {
            if (!cardsWrapperRef.current || !maskContainerRef.current) return;

            const totalHeight = cardsWrapperRef.current.scrollHeight;
            const visibleHeight = maskContainerRef.current.clientHeight;

            setMaxScrollDistance(
                Math.max(0, totalHeight - visibleHeight + 12)
            );
        };

        calculateScroll();

        const resizeObserver = new ResizeObserver(calculateScroll);

        if (cardsWrapperRef.current) {
            resizeObserver.observe(cardsWrapperRef.current);
        }

        if (maskContainerRef.current) {
            resizeObserver.observe(maskContainerRef.current);
        }

        window.addEventListener("resize", calculateScroll);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", calculateScroll);
        };
    }, []);

    const y = useTransform(
        scrollYProgress,
        [0, 0.88, 1],
        [0, -maxScrollDistance, -maxScrollDistance]
    );

    return (
        <section
            ref={containerRef}
            className="relative h-[360vh] w-full overflow-clip bg-neutral-950 md:h-[280vh]"
        >
            {/* Background Container */}
            <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden md:h-screen md:flex-row md:items-center">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home/servicebg.png"
                        alt="Bugsmoker services background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-black/55" />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-black/15" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 md:px-12 md:py-8 lg:px-16">

                    {/* MOBILE VIEW (< md): Scroll-Driven Bottom-Rising Stacking Cards */}
                    <div className="flex md:hidden flex-1 flex-col justify-between py-1">
                        {/* Header */}
                        <div className="flex flex-col items-start pt-1 sm:pt-3">
                            <span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                                What we bring to the table
                            </span>

                            <h2 className="font-['Outfit'] text-[clamp(1.85rem,7.8vw,2.75rem)] font-medium leading-[1.0] tracking-[-0.05em] text-white">
                                Where style
                                <br />
                                meets function<span className="text-[#ff5a1f]">.</span>
                            </h2>

                            <p className="mt-1.5 hidden text-xs leading-relaxed text-white/60 sm:block max-w-[340px]">
                                Thoughtful design. Smart technology. Digital experiences that move your business forward.
                            </p>
                        </div>

                        {/* Card Deck Area with Fanned Corners */}
                        <div className="relative mx-auto my-auto flex w-full max-w-[350px] items-center justify-center py-2">
                            <div
                                className="relative h-[290px] w-full sm:h-[330px]"
                                style={{
                                    perspective: 1000,
                                    perspectiveOrigin: "center 70%",
                                }}
                            >
                                {SERVICES_DATA.map((service, index) => (
                                    <MobileScrollFlippingCard
                                        key={service.id}
                                        service={service}
                                        index={index}
                                        totalCards={SERVICES_DATA.length}
                                        progress={smoothProgress}
                                        isActive={index === activeCardIndex}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom Indicator & Nav */}
                        <div className="flex w-full items-center justify-between border-t border-white/15 pb-2 pt-2.5 sm:pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[11px] font-semibold tracking-wider text-[#ff5a1f]">
                                    0{activeCardIndex + 1}
                                    <span className="text-white/40 font-normal"> / 0{SERVICES_DATA.length}</span>
                                </span>

                                <div className="flex items-center gap-1.5">
                                    {SERVICES_DATA.map((s, i) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            aria-label={`Go to ${s.title}`}
                                            onClick={() => scrollToCard(i)}
                                            className={`h-1 rounded-full transition-all duration-300 ${
                                                i === activeCardIndex
                                                    ? "w-5 bg-[#ff5a1f]"
                                                    : i < activeCardIndex
                                                    ? "w-2 bg-white/60"
                                                    : "w-2 bg-white/20"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/services"
                                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-[#ff5a1f]"
                            >
                                <span>All Services</span>
                                <ArrowUpRight size={13} className="text-[#ff5a1f]" />
                            </Link>
                        </div>
                    </div>

                    {/* DESKTOP VIEW (>= md): 2-Column Grid with Scroll-Driven Masked Cards */}
                    <div className="hidden md:grid min-h-0 flex-1 grid-cols-12 items-center gap-8 lg:gap-14">
                        <div className="relative z-20 flex flex-col items-start justify-center text-white md:col-span-6">
                            <span className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 sm:mb-7 sm:text-[10px] sm:tracking-[0.22em]">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                                What we bring to the table
                            </span>

                            <h2 className="max-w-full font-['Outfit'] text-[clamp(2.65rem,10.5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.065em] sm:text-[clamp(3rem,7vw,5.5rem)]">
                                Where style
                                <br />
                                meets function<span className="text-[#ff5a1f]">.</span>
                            </h2>

                            <p className="mt-4 max-w-[310px] text-[13px] leading-[1.8] text-white/65 sm:mt-6 sm:max-w-[340px] sm:text-sm sm:leading-7">
                                Thoughtful design. Smart technology.
                                Digital experiences that move your business forward.
                            </p>

                            <Link
                                href="/services"
                                className="group mt-7 flex w-full max-w-[340px] items-center justify-between border-t border-white/20 py-4 sm:mt-9 sm:w-auto sm:justify-start sm:gap-6 sm:border-0 sm:py-2"
                            >
                                <span className="relative pb-1 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]">
                                    Explore our services
                                    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-40 bg-[#ff5a1f] transition-transform duration-500 group-hover:scale-x-100" />
                                </span>

                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-[#ff5a1f] group-hover:bg-[#ff5a1f]">
                                    <ArrowUpRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </span>
                            </Link>
                        </div>

                        {/* Right: Desktop Service Cards Area */}
                        <div className="relative min-h-0 w-full md:col-span-6">
                            <div className="flex w-full items-center justify-end overflow-hidden">
                                <div
                                    ref={maskContainerRef}
                                    className="relative h-full min-h-0 w-full max-w-[400px] overflow-hidden md:h-[84vh] md:max-h-none lg:max-w-[420px]"
                                >
                                    <motion.div
                                        ref={cardsWrapperRef}
                                        style={{ y }}
                                        className="flex w-full flex-col gap-4 pb-4 md:gap-5"
                                    >
                                        {SERVICES_DATA.map((service, index) => (
                                            <Link
                                                key={service.id}
                                                href={`/service/${service.serviceSlug || service.href}`}
                                                className="group relative block w-full shrink-0 overflow-hidden bg-[#f3f1ed] p-3 transition-all duration-500 hover:bg-[#ff5a1f] sm:p-4"
                                            >
                                                {/* Image Area */}
                                                <div className="relative aspect-[5/4] overflow-hidden bg-neutral-200 sm:aspect-[4/3]">
                                                    <Image
                                                        src={service.src}
                                                        alt={service.alt}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />

                                                    {/* Image tint */}
                                                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/25" />

                                                    {/* Oversized number */}
                                                    <span className="absolute -bottom-5 -left-1 font-['Outfit'] text-[100px] font-bold leading-none tracking-[-0.1em] text-white/80 transition-transform duration-500 group-hover:translate-x-2 sm:text-[125px]">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

                                                    {/* Floating arrow */}
                                                    <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff5a1f] text-white transition-transform duration-500 group-hover:rotate-45 sm:right-4 sm:top-4 sm:h-12 sm:w-12">
                                                        <ArrowUpRight size={21} strokeWidth={1.7} />
                                                    </span>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-5 sm:px-2 sm:pt-6">
                                                    <div className="min-w-0">
                                                        <h3 className="font-['Outfit'] text-xl font-semibold leading-[1.05] tracking-[-0.055em] text-neutral-950 transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl md:text-[28px]">
                                                            {service.title}
                                                        </h3>
                                                    </div>

                                                    <span className="mb-1 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 transition-colors duration-300 group-hover:text-black">
                                                        ↗
                                                    </span>
                                                </div>

                                                {/* Bottom accent */}
                                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                                            </Link>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Indicator for Desktop */}
                    <div className="relative z-20 mt-3 hidden md:flex shrink-0 items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[0.18em] text-white/55 sm:pt-4 sm:text-[10px] md:mt-5">
                        <span>Bugsmoker Studio</span>
                        <span className="flex items-center gap-2">
                            Scroll to explore
                            <span className="text-[#ff5a1f]">↓</span>
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
