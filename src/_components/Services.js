"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";

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




function MobileStackedServicesDeck({ services }) {
    const [deck, setDeck] = useState(services);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        setDeck(services);
    }, [services]);

    if (!deck?.length) return null;

    const activeService = deck[0];
    const activeIndex = services.findIndex(
        (service) => service.id === activeService.id
    );

    const handleSwipe = (nextDirection = 1) => {
        if (deck.length < 2) return;

        setDirection(nextDirection);

        setDeck((previous) => {
            if (nextDirection === 1) {
                return [...previous.slice(1), previous[0]];
            }

            return [
                previous[previous.length - 1],
                ...previous.slice(0, -1),
            ];
        });
    };

    const visibleCards = deck.slice(0, Math.min(3, deck.length));

    return (
        <div className="w-full overflow-hidden px-4 pb-8 pt-6 sm:px-6">


            {/* Stacked cards */}
            <div className="relative mx-auto w-full max-w-[390px]">
                <div className="relative h-[390px] w-full sm:h-[420px]">
                    {visibleCards
                        .map((service, index) => {
                            const isFront = index === 0;
                            const originalIndex = services.findIndex(
                                (item) => item.id === service.id
                            );

                            return (
                                <motion.div
                                    key={service.id}
                                    layout
                                    drag={isFront && deck.length > 1 ? "x" : false}
                                    dragConstraints={{
                                        left: 0,
                                        right: 0,
                                    }}
                                    dragElastic={0.85}
                                    onDragEnd={(event, info) => {
                                        if (
                                            info.offset.x > 65 ||
                                            info.velocity.x > 450
                                        ) {
                                            handleSwipe(-1);
                                        } else if (
                                            info.offset.x < -65 ||
                                            info.velocity.x < -450
                                        ) {
                                            handleSwipe(1);
                                        }
                                    }}
                                    animate={{
                                        y: index * -13,
                                        scale: 1 - index * 0.045,
                                        rotate: isFront ? 0 : index === 1 ? 2 : -3,
                                        opacity: 1 - index * 0.16,
                                        zIndex: 30 - index,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 27,
                                    }}
                                    whileDrag={
                                        isFront
                                            ? {
                                                rotate: direction === 1 ? 3 : -3,
                                                scale: 1.02,
                                                cursor: "grabbing",
                                            }
                                            : undefined
                                    }
                                    className={`absolute inset-x-0 bottom-0 ${isFront
                                        ? "cursor-grab active:cursor-grabbing"
                                        : "pointer-events-none"
                                        }`}
                                    style={{
                                        transformOrigin: "bottom center",
                                        touchAction: isFront ? "pan-y" : "auto",
                                    }}
                                >
                                    <div className="relative overflow-hidden border border-black/10 bg-white p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-3">
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                                            <Image
                                                src={service.src}
                                                alt={service.alt}
                                                fill
                                                priority={isFront}
                                                sizes="(max-width: 640px) 92vw, 390px"
                                                draggable={false}
                                                className="pointer-events-none object-cover"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />



                                            {/* Large image number */}
                                            <span className="absolute bottom-[-15px] left-2 font-['Outfit'] text-[100px] font-bold leading-none tracking-[-0.09em] text-white/75">
                                                {String(originalIndex + 1).padStart(2, "0")}
                                            </span>


                                        </div>

                                        {/* Card details */}
                                        <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
                                            <div className="min-w-0">


                                                <h3 className="font-['Outfit'] text-xl font-semibold leading-tight tracking-[-0.05em] text-neutral-950 sm:text-2xl">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            {isFront ? (
                                                <Link
                                                    href={`/service/${service.serviceSlug || service.href}`}
                                                    aria-label={`Explore ${service.title}`}
                                                    onPointerDown={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#ff5a1f] text-white transition-colors hover:bg-black active:scale-95"
                                                >
                                                    <ArrowUpRight
                                                        size={21}
                                                        strokeWidth={1.8}
                                                    />
                                                </Link>
                                            ) : (
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 text-neutral-400">
                                                    <ArrowUpRight size={19} />
                                                </span>
                                            )}
                                        </div>

                                        {/* Orange bottom accent */}
                                        <div
                                            className={`absolute bottom-0 left-0 h-[3px] bg-[#ff5a1f] transition-all duration-500 ${isFront ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })
                        .reverse()}
                </div>



                {/* Progress indicator */}
                <div className="mt-5 flex gap-1.5">
                    {services.map((service, index) => (
                        <button
                            key={service.id}
                            type="button"
                            aria-label={`Go to ${service.title}`}
                            onClick={() => {
                                const targetIndex = deck.findIndex(
                                    (item) => item.id === service.id
                                );

                                if (targetIndex < 0) return;

                                setDirection(1);
                                setDeck((previous) => [
                                    ...previous.slice(targetIndex),
                                    ...previous.slice(0, targetIndex),
                                ]);
                            }}
                            className={`h-[3px] flex-1 transition-colors duration-300 ${index === activeIndex
                                ? "bg-[#ff5a1f]"
                                : "bg-neutral-200"
                                }`}
                        />
                    ))}
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

                                                    {/* Top label */}


                                                    {/* Floating arrow */}
                                                    <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff5a1f] text-white transition-transform duration-500 group-hover:rotate-45 sm:right-4 sm:top-4 sm:h-12 sm:w-12">
                                                        <ArrowUpRight size={21} strokeWidth={1.7} />
                                                    </span>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-5 sm:px-2 sm:pt-6">
                                                    <div className="min-w-0">
                                                        {/* <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 transition-colors duration-300 group-hover:text-black/60">
                                                            Bugsmoker Studio / {String(index + 1).padStart(2, "0")}
                                                        </p> */}

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



                </div>
            </div>
        </section>
    );
}
