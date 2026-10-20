
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
            className="relative h-[240vh] w-full overflow-clip bg-neutral-950 md:h-[280vh]"
        >
            {/* Sticky Background */}
            <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden md:h-screen md:flex-row md:items-center">

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
                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-5 pb-5 pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 md:px-12 md:py-8 lg:px-16">

                    <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-5 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-8 lg:gap-14">

                        {/* Heading */}
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

                        {/* Service Cards */}
                        <div className="relative flex min-h-0 w-full items-start justify-center overflow-hidden md:col-span-6 md:items-center md:justify-end">

                            <div
                                ref={maskContainerRef}
                                className="relative h-full min-h-0 w-full max-w-[440px] overflow-hidden sm:max-h-[52vh] md:h-[84vh] md:max-h-none md:max-w-[400px] lg:max-w-[420px]"
                            >
                                <motion.div
                                    ref={cardsWrapperRef}
                                    style={{ y }}
                                    className="flex w-full flex-col gap-3 pb-4 sm:gap-4 md:gap-5"
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
                                                    sizes="(max-width: 767px) 100vw, 420px"
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

                    {/* Bottom Indicator */}
                    <div className="relative z-20 mt-3 flex shrink-0 items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[0.18em] text-white/55 sm:pt-4 sm:text-[10px] md:mt-5">
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
