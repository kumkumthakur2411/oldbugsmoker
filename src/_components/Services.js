"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICES_DATA = [
    {
        id: "1",
        title: "web development",
        src: "/home/1.png",
        alt: "web development",
        href: "web-development",
        serviceSlug: "web-development",
    },
    {
        id: "2",
        title: "software development",
        src: "/home/2.png",
        alt: "software development",
        href: "software-development",
        serviceSlug: "software-development",
    },
    {
        id: "3",
        title: "website optimization",
        src: "/home/3.png",
        alt: "website optimization",
        href: "website-optimization",
        serviceSlug: "website-optimization",
    },
    {
        id: "4",
        title: "hosting and maintenance",
        src: "/home/4.png",
        alt: "hosting maintenance",
        href: "hosting-maintenance",
        serviceSlug: "hosting-maintenance",
    },
    {
        id: "5",
        title: "tech support",
        src: "/home/5.png",
        alt: "tech support",
        href: "tech-support",
        serviceSlug: "tech-support",
    },
];

export default function Services() {
    const containerRef = useRef(null);
    const maskContainerRef = useRef(null);
    const cardsWrapperRef = useRef(null);
    const [maxScrollDistance, setMaxScrollDistance] = useState(null);

    // Track scroll through the pinned container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Measure exact scroll height so the 5th card is guaranteed 100% visible
    useEffect(() => {
        const calculateScroll = () => {
            if (cardsWrapperRef.current && maskContainerRef.current) {
                const totalCardsHeight = cardsWrapperRef.current.scrollHeight;
                const visibleMaskHeight = maskContainerRef.current.clientHeight;
                // Extra 24px padding ensures the last card sits comfortably inside the view
                const distance = Math.max(0, totalCardsHeight - visibleMaskHeight + 24);
                setMaxScrollDistance(distance);
            }
        };

        calculateScroll();
        window.addEventListener("resize", calculateScroll);
        // Small timeout for image load layout shifts
        const timer = setTimeout(calculateScroll, 300);

        return () => {
            window.removeEventListener("resize", calculateScroll);
            clearTimeout(timer);
        };
    }, []);

    // Reach full view of Card 5 slightly before the end of the scroll track (by 88% scroll)
    // so the user can easily see, hover, and click the last card without needing to scroll to the extreme edge
    const yPixel = useTransform(
        scrollYProgress,
        [0, 0.88, 1],
        [0, -(maxScrollDistance || 0), -(maxScrollDistance || 0)]
    );

    const yPercent = useTransform(
        scrollYProgress,
        [0, 0.88, 1],
        ["0%", "-64%", "-64%"]
    );

    const y = maxScrollDistance !== null ? yPixel : yPercent;

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[280vh] bg-neutral-950"
        >
            {/* Sticky 100vh Viewport Container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">

                {/* Background Image with Dark Vignette Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/home/servicebg.png"
                        alt="Services Background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                    {/* Gradient & Darkening Overlays for text contrast */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto h-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 w-full h-full items-center">

                        {/* Left Column: Fixed Headline & View All Button */}
                        <div className="lg:col-span-6 flex flex-col items-start justify-center text-white py-12 z-20">
                            <h2 className="font-['Outfit'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] leading-[0.92] tracking-tight text-white select-none drop-shadow-md">
                                Where<br />
                                Style Meets<br />
                                Function
                            </h2>

                            <Link
                                href="/services"
                                className="mt-8 sm:mt-10 inline-flex items-center justify-center px-7 py-2.5 sm:px-8 sm:py-3 bg-white text-black text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-100 hover:shadow-xl transition-all duration-300 active:scale-95 shadow-lg select-none"
                            >
                                VIEW ALL
                            </Link>
                        </div>

                        {/* Right Column: Vertically Scrolling Service Cards (2.5 visible at any time) */}
                        <div className="lg:col-span-6 h-full flex justify-end items-center overflow-hidden relative pt-8 pb-4">
                            
                            {/* Mask container showing 2 full cards and 1 half card */}
                            <div
                                ref={maskContainerRef}
                                className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] h-[88vh] overflow-hidden flex flex-col justify-start"
                            >
                                <motion.div
                                    ref={cardsWrapperRef}
                                    style={{ y }}
                                    className="flex flex-col gap-5 sm:gap-6 w-full will-change-transform pb-8"
                                >
                                    {SERVICES_DATA.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/service/${service.serviceSlug || service.href}`}
                                            className="group block bg-white rounded-2xl sm:rounded-[1.75rem] p-3 sm:p-3.5 shadow-2xl transition-all duration-500 hover:shadow-black/30 hover:-translate-y-1 cursor-pointer select-none border border-neutral-100"
                                        >
                                            {/* Card Image Container */}
                                            <div className="relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100">
                                                <Image
                                                    src={service.src}
                                                    alt={service.alt}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Card Info Bar */}
                                            <div className="mt-3 sm:mt-3.5 px-1.5 pb-0.5 flex items-center justify-between">
                                                <h3 className="font-['Outfit'] font-semibold text-neutral-900 text-sm sm:text-base capitalize tracking-tight group-hover:text-black transition-colors">
                                                    {service.title}
                                                </h3>
                                                <span className="font-mono text-xs sm:text-sm text-neutral-400 font-medium">
                                                    0{service.id}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}