"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "@/data/services.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_SERVICES = servicesData?.services
    ? Object.values(servicesData.services)
    : [];

const pad = (n) => String(n).padStart(2, "0");

const Arrow = ({ size = 18 }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M7 17 17 7M8 7h9v9" />
    </svg>
);

/* Circular rotating "view service" badge */
export function SpinBadge({ id = "" }) {
    return (
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/20 transition-colors duration-300 group-hover:bg-[#ff5a1f] group-hover:text-white sm:h-24 sm:w-24">
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
                aria-hidden="true"
            >
                <defs>
                    <path
                        id={`badge-${id}`}
                        d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                </defs>
                <text
                    className="fill-current text-[9.5px] font-semibold uppercase"
                    textLength="226"
                    lengthAdjust="spacing"
                >
                    <textPath href={`#badge-${id}`}>
                        View service • View service •{" "}
                    </textPath>
                </text>
            </svg>
            <span className="transition-transform duration-300 group-hover:rotate-45">
                <Arrow size={22} />
            </span>
        </span>
    );
}

export function ServiceCard({ service, index = 0, total = 1, href, dark }) {
    const cardRef = useRef(null);
    if (!service) return null;

    const isDark = typeof dark === "boolean" ? dark : index % 2 === 1;
    const num = pad(index + 1);
    const linkHref = href || `/services/${service.slug || ""}`;
    const stat = service.content?.stats?.[0];

    return (
        <article
            ref={cardRef}
            id={`service-${service.slug || index}`}
            style={{ zIndex: index + 1 }}
            className="service-card relative scroll-mt-3 md:sticky md:top-3 md:h-[calc(100svh-1.5rem)] will-change-transform"
        >
            <div
                className={`card-inner relative h-full min-h-[620px] origin-top overflow-hidden rounded-xl sm:min-h-0 will-change-transform transform-gpu ${
                    isDark
                        ? "border border-white/10 bg-neutral-900 text-white"
                        : "bg-white text-black"
                }`}
            >
                {/* Oversized number watermark */}
                <span
                    aria-hidden="true"
                    className={`card-mark pointer-events-none absolute -bottom-10 -left-4 hidden select-none text-[22rem] font-semibold leading-none tracking-[-0.08em] md:block will-change-transform ${
                        isDark ? "text-white/[0.04]" : "text-black/[0.04]"
                    }`}
                >
                    {num}
                </span>

                {/* Dim layer, animated by the stack */}
                <div className="card-dim pointer-events-none absolute inset-0 z-20 bg-black opacity-0 will-change-[opacity]" />

                <div className="relative grid h-full gap-7 p-4 sm:gap-8 sm:p-8 md:grid-cols-12 md:gap-12">
                    {/* Text */}
                    <div className="flex min-w-0 flex-col justify-between gap-8 md:col-span-6 md:gap-10">
                        <div className="card-anim flex items-center justify-between gap-3 text-xs sm:text-sm">
                            <span>
                                <span className="text-[#ff5a1f]">({num})</span>
                                <span className="opacity-50"> / {pad(total)}</span>
                            </span>
                            <span className="text-right opacity-60">
                                {service.featured?.items?.length || 0} specialities
                            </span>
                        </div>

                        <div className="min-w-0">
                            <Link href={linkHref} className="group block">
                                <h2 className="card-anim break-words text-[clamp(2.2rem,10vw,3.5rem)] font-semibold lowercase leading-[.92] tracking-[-0.06em] transition-colors duration-300 group-hover:text-[#ff5a1f] sm:text-[clamp(2.6rem,6vw,6rem)] sm:leading-[.9]">
                                    {service.hero?.titlePlain || service.slug}
                                </h2>
                            </Link>

                            <p
                                className={`card-anim mt-4 max-w-md break-words text-sm leading-[1.8] sm:mt-6 sm:text-[15px] ${
                                    isDark ? "text-white/70" : "text-neutral-600"
                                }`}
                            >
                                {service.metadata?.description || service.hero?.description}
                            </p>

                            {service.featured?.items && (
                                <div className="card-anim mt-5 flex flex-wrap gap-2 sm:mt-6">
                                    {service.featured.items.map((f) => (
                                        <span
                                            key={f.title}
                                            className={`max-w-full break-words rounded-full border px-3 py-1.5 text-xs ${
                                                isDark
                                                    ? "border-white/20"
                                                    : "border-black/20"
                                            }`}
                                        >
                                            {f.title}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href={linkHref}
                            className="card-anim group inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold"
                        >
                            <span>View service</span>
                            <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white ${
                                    isDark
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                }`}
                            >
                                <Arrow />
                            </span>
                        </Link>
                    </div>

                    {/* Image */}
                    <Link
                        href={linkHref}
                        aria-label={`View ${service.hero?.titlePlain || service.slug}`}
                        className="group relative block aspect-[4/3] min-w-0 overflow-hidden rounded-lg bg-neutral-800 md:col-span-6 md:aspect-auto md:h-full"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={service.hero?.image}
                            alt={service.hero?.imageAlt || service.hero?.titlePlain}
                            className="card-img absolute inset-0 h-full w-full object-cover group-hover:scale-105 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                        {/* Rotating badge */}
                        <div className="card-anim absolute right-3 top-3 sm:right-4 sm:top-4">
                            <SpinBadge id={service.id || service.slug} />
                        </div>

                        {stat && (
                            <div className="card-anim absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 rounded-md bg-black/60 p-3 backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
                                <div>
                                    <div className="text-xl font-semibold text-white sm:text-2xl">
                                        {stat.value}
                                        <span className="text-[#ff5a1f]">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <div className="text-xs text-white/70">
                                        {stat.label}
                                    </div>
                                </div>
                                <span className="text-xs uppercase tracking-wider text-[#ff5a1f]">
                                    Verified
                                </span>
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function Services({
    services,
    service,
    index = 0,
    total,
    href,
    dark,
}) {
    const containerRef = useRef(null);

    // If passed a single service directly, render just the card
    if (service) {
        return (
            <ServiceCard
                service={service}
                index={index}
                total={total || 1}
                href={href}
                dark={dark}
            />
        );
    }

    const items = services || DEFAULT_SERVICES;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let refreshTimer;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const cards = gsap.utils.toArray(".service-card", container);
                cards.forEach((card) => {
                    const animElements = card.querySelectorAll(".card-anim");
                    if (animElements.length > 0) {
                        gsap.fromTo(
                            animElements,
                            { y: 35, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.7,
                                ease: "power3.out",
                                stagger: 0.06,
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 80%",
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                    }

                    const img = card.querySelector(".card-img");
                    if (img) {
                        gsap.fromTo(
                            img,
                            { scale: 1.15 },
                            {
                                scale: 1,
                                duration: 1.1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 80%",
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                                onComplete: () => {
                                    img.classList.add(
                                        "transition-transform",
                                        "duration-500",
                                        "ease-out"
                                    );
                                },
                            }
                        );
                    }

                    const mark = card.querySelector(".card-mark");
                    if (mark) {
                        gsap.fromTo(
                            mark,
                            { yPercent: 10 },
                            {
                                yPercent: -10,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            });

            // Card stacking effect on desktop
            mm.add(
                "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
                () => {
                    const cards = gsap.utils.toArray(".service-card", container);
                    cards.forEach((card, i) => {
                        const next = cards[i + 1];
                        if (!next) return;
                        const st = {
                            trigger: next,
                            start: "top 65%",
                            end: "top top+=12",
                            scrub: 0.5,
                        };
                        const inner = card.querySelector(".card-inner");
                        if (inner) {
                            gsap.to(inner, {
                                scale: 0.94,
                                ease: "none",
                                scrollTrigger: st,
                            });
                        }
                        const dim = card.querySelector(".card-dim");
                        if (dim) {
                            gsap.to(dim, {
                                opacity: 0.55,
                                ease: "none",
                                scrollTrigger: st,
                            });
                        }
                    });
                }
            );
        }, containerRef);

        // Ensure triggers align correctly after layout settles
        refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, [items]);

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative flex flex-col gap-3 w-full px-2 sm:px-3"
        >
            {items.map((s, i) => (
                <ServiceCard
                    key={s.id || s.slug || i}
                    service={s}
                    index={i}
                    total={items.length}
                    href={`/services/${s.slug}`}
                />
            ))}
        </section>
    );
}
