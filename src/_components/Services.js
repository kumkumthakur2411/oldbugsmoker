"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES_DATA = [
    {
        id: "services-overview",
        isOverview: true,
        pill: "Our Capabilities & Expertise",
        serviceName: "Services We Offer",
        badge: "Overview",
        tagline:
            "From custom high-performance web platforms to resilient cloud infrastructure, every service is tailored to make your digital presence memorable and unstoppable.",
        src: "/home/new1.webp",
        alt: "Bugsmoker Services Overview",
        href: "#services",
        buttonText: "Explore Our Services",
    },
    {
        id: "web-development",
        number: "01",
        pill: "01 • Architecture & Frontend",
        serviceName: "Web Development",
        badge: "Next.js 15+ & React 19",
        tagline:
            "Crafting immersive web platforms that convert & inspire. Modern Next.js architectures engineered for sub-second load times and fluid 60+ FPS motion.",
        src: "/home/1.webp",
        alt: "Bugsmoker Web Development",
        href: "/services",
        buttonText: "Explore Web Development",
    },
    {
        id: "software-development",
        number: "02",
        pill: "02 • Systems & Full-Stack",
        serviceName: "Software Development",
        badge: "High-Throughput Engineering",
        tagline:
            "Engineering scalable software engines built for exponential growth. Robust full-stack platforms, bespoke dashboards, and automated digital workflows.",
        src: "/home/2.webp",
        alt: "Bugsmoker Software Development",
        href: "/services",
        buttonText: "Explore Software Development",
    },
    {
        id: "website-optimization",
        number: "03",
        pill: "03 • Speed & Core Web Vitals",
        serviceName: "Website Optimization",
        badge: "Performance & SEO Lab",
        tagline:
            "Sub-second load times, 99+ Core Web Vitals, and effortless fluidity. Eliminate latency, maximize conversions, and dominate search rankings.",
        src: "/home/3.webp",
        alt: "Bugsmoker Website Optimization",
        href: "/services",
        buttonText: "Explore Optimization",
    },
    {
        id: "hosting-maintenance",
        number: "04",
        pill: "04 • Cloud & Infrastructure",
        serviceName: "Hosting & Maintenance",
        badge: "DevOps & Global Edge",
        tagline:
            "Mission-critical reliability and proactive 24/7 cloud management. Automated zero-downtime deployments, enterprise security hardening, and real-time telemetry.",
        src: "/home/4.webp",
        alt: "Bugsmoker Hosting and Maintenance",
        href: "/services",
        buttonText: "Explore Hosting & Cloud",
    },
    {
        id: "tech-support",
        number: "05",
        pill: "05 • Dedicated Support",
        serviceName: "Tech Support",
        badge: "24/7 Developer Pairing",
        tagline:
            "Relentless technical support keeping your systems bulletproof. Rapid incident resolution, continuous updates, and hands-on developer pairing.",
        src: "/home/5.webp",
        alt: "Bugsmoker Tech Support",
        href: "/services",
        buttonText: "Explore Tech Support",
    },
];

function ServiceCardItem({ i, service, total, progress, range, targetScale }) {
    // Dynamic scale as subsequent cards stack over this card
    const scale = useTransform(progress, range, [1, targetScale]);
    const brightness = useTransform(progress, range, [1, Math.max(0.68, targetScale - 0.2)]);

    // Cascading top reveal: each card docks slightly lower showing top edge of previous cards
    const topOffset = `${i * 14}px`;

    return (
        <div
            className="sticky top-0 h-[100svh] min-h-[580px] w-full flex items-center justify-center px-0 sm:px-5 lg:px-8 pointer-events-none"
            style={{
                zIndex: i + 10,
            }}
        >
            <motion.div
                style={{
                    scale,
                    filter: `brightness(${brightness})`,
                    top: topOffset,
                }}
                className="card-inner pointer-events-auto relative h-[68svh] min-h-[440px] max-h-[740px] w-full overflow-hidden border-y border-neutral-200/80 bg-neutral-900 shadow-2xl shadow-black/30 sm:h-[560px] sm:min-h-[480px] sm:rounded-xl sm:border md:h-[620px] lg:h-[680px] lg:rounded-2xl xl:h-[720px]"
            >
                {/* Background Image: Lightweight WebP (~90KB) loaded with priority for instant rendering */}
                <Image
                    src={service.src}
                    alt={service.alt}
                    fill
                    sizes="100vw"
                    priority={true}
                    loading="eager"
                    className="object-cover object-center grayscale brightness-115 contrast-95 transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 z-10 bg-black/35 backdrop-blur-[0.5px]" />

                {/* Content Area */}
                <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 sm:p-9 md:p-12 lg:p-14 text-center items-center">
                    {/* Top Meta Bar */}
                    <div className="w-full flex items-center justify-between text-left">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50">
                            BUGSMOKER ATELIER
                        </span>

                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/50">
                            {service.badge}
                        </span>
                    </div>

                    {/* Centered Content: Pill Badge + Big Bold White Service Name + Tagline + Button */}
                    <div className="my-auto flex flex-col items-center justify-center max-w-4xl px-2">
                        {/* Centered Category / Sub-heading Pill */}
                        <div className="mb-3 sm:mb-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                <span>{service.pill}</span>
                            </span>
                        </div>

                        {/* Centered Main Heading: Bold White Service Name */}
                        <h2 className="w-full font-['Outfit'] text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white text-center">
                            {service.serviceName}
                            <span className="text-[#ff5a1f]">.</span>
                        </h2>

                        {/* Centered Tagline / Description */}
                        <p className="mt-4 sm:mt-5 text-[14px] sm:text-base md:text-lg leading-relaxed text-white/85 max-w-2xl text-center">
                            {service.tagline}
                        </p>

                        {/* Centered Action Button */}
                        <div className="mt-6 sm:mt-8">
                            <Link
                                href={service.href}
                                className="group/btn inline-flex cursor-pointer select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#ff5a1f] px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#ff5a1f]/20 transition-all duration-300 hover:bg-[#e04f1a] hover:shadow-xl hover:shadow-[#ff5a1f]/35 active:scale-95"
                            >
                                <span>{service.buttonText}</span>
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={2.4}
                                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Status / Deck Indicator */}
                    <div className="w-full flex items-center justify-between text-[10px] sm:text-xs text-white/55 font-mono pt-3 border-t border-white/15">
                        <span className="tracking-wider uppercase">
                            {service.isOverview
                                ? "01 / 06 • Overview"
                                : i === total - 1
                                ? `0${total} / 0${total} • Complete`
                                : `0${i + 1} / 0${total} • Scroll for next service ↓`}
                        </span>

                        {/* Deck Step Indicator */}
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: total }, (_, idx) => (
                                <span
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        idx === i
                                            ? "w-6 bg-[#ff5a1f]"
                                            : idx < i
                                            ? "w-2 bg-white/60"
                                            : "w-2 bg-white/20"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Services() {
    const containerRef = useRef(null);

    // Track scroll of the entire services section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative w-full bg-white text-black pt-4 pb-0 sm:pt-6 sm:pb-0"
        >
            {/* Stacking Cards Track: each card has an equal 100svh track in document flow */}
            <div className="relative w-full">
                {SERVICES_DATA.map((service, i) => {
                    const targetScale = 1 - (SERVICES_DATA.length - i - 1) * 0.035;
                    const step = 1 / SERVICES_DATA.length;
                    const range = [i * step, 1];

                    return (
                        <ServiceCardItem
                            key={service.id}
                            i={i}
                            service={service}
                            total={SERVICES_DATA.length}
                            progress={scrollYProgress}
                            range={range}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}
