"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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

// Swipeable stacked card deck for mobile view
function MobileStackedServicesDeck({ services }) {
    const [deck, setDeck] = useState(services);

    const activeService = deck[0];
    const activeIndex = services.findIndex((s) => s.id === activeService.id);

    const handleSwipe = (direction = 1) => {
        setDeck((prev) => {
            if (direction === 1) {
                // Next: front card goes to the back
                return [...prev.slice(1), prev[0]];
            } else {
                // Prev: back card comes to the front
                return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
            }
        });
    };

    return (
        <div className="relative flex w-full flex-col items-center pt-10 pb-2">
            {/* Cards Stack Area */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[340px] sm:h-[370px]">
                {deck.slice(0, 4).reverse().map((service, reverseIndex) => {
                    const index = deck.slice(0, 4).length - 1 - reverseIndex;
                    const isFront = index === 0;

                    // Stack calculations matching the screenshot:
                    // Rear cards peek out from the top with vertical offset and slight scale
                    const yOffset = -index * 18;
                    const scale = 1 - index * 0.055;
                    const zIndex = 40 - index * 10;
                    const darkness = index * 0.22;

                    return (
                        <motion.div
                            key={service.id}
                            layout
                            drag={isFront ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.7}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipeThreshold = 50;
                                if (offset.x > swipeThreshold || velocity.x > 300) {
                                    handleSwipe(-1);
                                } else if (offset.x < -swipeThreshold || velocity.x < -300) {
                                    handleSwipe(1);
                                }
                            }}
                            animate={{
                                y: yOffset,
                                scale: scale,
                                zIndex: zIndex,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 280,
                                damping: 24,
                            }}
                            whileDrag={{
                                scale: 1.02,
                                cursor: "grabbing",
                            }}
                            className={`absolute inset-x-0 bottom-0 select-none ${
                                isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                            }`}
                            style={{
                                transformOrigin: "bottom center",
                            }}
                        >
                            <div className="relative w-full overflow-hidden rounded-lg border border-white/20 bg-white p-2.5 shadow-2xl shadow-black/60">
                                {/* Dimming overlay for stacked cards in background */}
                                {!isFront && (
                                    <div
                                        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
                                        style={{ backgroundColor: `rgba(0, 0, 0, ${darkness})` }}
                                    />
                                )}

                                {/* Image */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-neutral-900">
                                    <Image
                                        src={service.src}
                                        alt={service.alt}
                                        fill
                                        priority={isFront}
                                        sizes="(max-width: 640px) 90vw, 380px"
                                        className="object-cover pointer-events-none"
                                    />

                                    {/* Number Badge */}
                                    <span className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-sm bg-black/75 px-2 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                                        0{services.findIndex((s) => s.id === service.id) + 1}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex items-center justify-between gap-3 px-1 pt-3 pb-1">
                                    <div className="min-w-0">
                                        <h3 className="truncate font-['Outfit'] text-[15px] sm:text-base font-bold tracking-tight text-neutral-900">
                                            {service.title}
                                        </h3>
                                        <p className="text-[11px] text-neutral-500 font-medium">
                                            Tap arrow to view details
                                        </p>
                                    </div>

                                    {isFront ? (
                                        <Link
                                            href={`/service/${service.serviceSlug || service.href}`}
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a1f] text-white shadow-md shadow-[#ff5a1f]/30 transition-transform hover:scale-105 active:scale-95"
                                        >
                                            <ArrowUpRight size={17} strokeWidth={2.2} />
                                        </Link>
                                    ) : (
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                                            <ArrowUpRight size={17} strokeWidth={2} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Swipe Controls and Indicator */}
            <div className="mt-5 flex w-full max-w-[340px] sm:max-w-[380px] items-center justify-between px-1 text-white">
                <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="font-bold text-[#ff5a1f]">0{activeIndex + 1}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/55">0{services.length}</span>
                </div>

                <div className="text-[10px] uppercase tracking-[0.16em] text-white/60 font-medium">
                    ← Swipe cards →
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => handleSwipe(-1)}
                        aria-label="Previous card"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white transition-colors active:bg-white/30 cursor-pointer"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwipe(1)}
                        aria-label="Next card"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white transition-colors active:bg-white/30 cursor-pointer"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Services() {
    const containerRef = useRef(null);
    const maskContainerRef = useRef(null);
    const cardsWrapperRef = useRef(null);

    const [maxScrollDistance, setMaxScrollDistance] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

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
            className="relative min-h-[100svh] w-full overflow-clip bg-neutral-950 md:h-[280vh]"
        >
            {/* Background Container */}
            <div className="relative md:sticky md:top-0 flex min-h-[100svh] w-full flex-col overflow-hidden md:h-screen md:flex-row md:items-center">

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

                    <div className="absolute inset-0 bg-black/45" />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/70 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-black/10" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-5 pb-6 pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 md:px-12 md:py-8 lg:px-16">

                    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-12 md:items-center md:gap-8 lg:gap-14">

                        {/* Left: Heading and Info */}
                        <div className="relative z-20 flex flex-col items-start justify-center text-white md:col-span-6">
                            <span className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/65 sm:mb-4 sm:text-xs md:mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                What we do
                            </span>

                            <h2 className="max-w-[600px] font-['Outfit'] text-[clamp(2.5rem,9vw,4rem)] font-bold leading-[0.91] tracking-[-0.055em] text-white drop-shadow-md sm:text-6xl md:text-6xl lg:text-[5.5rem] xl:text-[6.2rem]">
                                Where
                                <br />
                                Style Meets
                                <br />
                                Function<span className="text-[#ff5a1f]">.</span>
                            </h2>

                            <p className="mt-4 max-w-[320px] text-xs leading-relaxed text-white/70 sm:mt-5 sm:text-sm md:mt-6 md:max-w-[340px]">
                                Thoughtful design. Smart technology.
                                Digital experiences that work for your business.
                            </p>

                            <Link
                                href="/services"
                                className="mt-5 inline-flex min-h-11 items-center gap-5 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-colors duration-300 hover:bg-[#ff5a1f] hover:text-white sm:mt-7 sm:px-6 sm:text-xs md:mt-9"
                            >
                                View all services
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        {/* Right: Service Cards Area */}
                        <div className="relative min-h-0 w-full md:col-span-6">

                            {/* Mobile View (< 768px): Swipeable Stacked Deck */}
                            <div className="block md:hidden w-full">
                                <MobileStackedServicesDeck services={SERVICES_DATA} />
                            </div>

                            {/* Desktop View (>= 768px): Scroll-Driven Masked Cards */}
                            <div className="hidden md:flex w-full items-center justify-end overflow-hidden">
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
                                                className="group block w-full shrink-0 border border-white/15 bg-white p-2.5 shadow-xl shadow-black/10 transition-colors duration-300 hover:border-white/50 sm:p-3 md:p-3.5"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-[16/8] w-full overflow-hidden bg-neutral-200 sm:aspect-[16/9] md:aspect-[16/11]">
                                                    <Image
                                                        src={service.src}
                                                        alt={service.alt}
                                                        fill
                                                        sizes="420px"
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />

                                                    <span className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center bg-black/60 px-2 font-mono text-[10px] text-white backdrop-blur-sm sm:left-4 sm:top-4">
                                                        0{index + 1}
                                                    </span>
                                                </div>

                                                {/* Card Footer */}
                                                <div className="flex items-center justify-between gap-3 px-1 py-2 sm:py-2.5">
                                                    <h3 className="min-w-0 font-['Outfit'] text-sm font-semibold tracking-tight text-neutral-900 sm:text-base md:text-[17px]">
                                                        {service.title}
                                                    </h3>

                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[#ff5a1f] transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white sm:h-9 sm:w-9">
                                                        <ArrowUpRight
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Indicator */}
                    <div className="relative z-20 mt-3 flex shrink-0 items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[0.18em] text-white/55 sm:pt-4 sm:text-[10px] md:mt-5">
                        <span>Bugsmoker Studio</span>
                        <span className="flex items-center gap-2">
                            <span className="hidden md:inline">Scroll to explore ↓</span>
                            <span className="inline md:hidden">Swipe cards above</span>
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
