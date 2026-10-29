"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import servicesData from "@/data/data.json";
import Navbar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import Blog from "@/_components/Blog";
import TestimonialsSection from "@/_components/TestimonialsSection";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICES = Object.values(servicesData.services);
const SERVICE_HREF = (slug) => `/services/${slug}`;

const TICKER = Array.from(
    new Set(SERVICES.flatMap((s) => s.featured.items.map((i) => i.title)))
);

/* Up to five services with different images, for the fanned cards in the hero */
const FAN = (() => {
    const seen = new Set();
    return SERVICES.filter((s) => {
        if (seen.has(s.hero.image)) return false;
        seen.add(s.hero.image);
        return true;
    }).slice(0, 5);
})();

const TOTAL_SPECIALITIES = SERVICES.reduce(
    (sum, s) => sum + s.featured.items.length,
    0
);

/* Edit freely: numbers shown in the dark band */
const STATS = [
    { value: SERVICES.length, suffix: "", label: "core services under one roof" },
    { value: TOTAL_SPECIALITIES, suffix: "", label: "specialities across them" },
    { value: 60, suffix: "+", label: "sites and apps shipped" },
    { value: 15, suffix: "m", label: "typical emergency response" },
];

const PROCESS = [
    {
        title: "Discover",
        text: "We learn your goals, your audience and what success looks like before a single pixel moves.",
    },
    {
        title: "Design",
        text: "Interfaces, motion and structure shaped around your brand, reviewed with you at every step.",
    },
    {
        title: "Build",
        text: "Clean, tested, fast code. You see real progress early and often, not a surprise at the end.",
    },
    {
        title: "Support",
        text: "Hosting, monitoring and improvements after launch, with real engineers on the other end.",
    },
];

/* "Help me choose": each intent points at a service slug */
const INTENTS = [
    { label: "A website that sells", slug: "web-development" },
    { label: "A mobile app people keep", slug: "app-development" },
    { label: "Custom business software", slug: "software-development" },
    { label: "Fast, reliable hosting", slug: "hosting" },
    { label: "Someone to fix and maintain things", slug: "tech-support" },
    { label: "Hosting and support together", slug: "hosting-and-tech-support" },
].filter((i) => SERVICES.some((s) => s.slug === i.slug));

const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function MaskLine({ children }) {
    return (
        <span
            className="block overflow-hidden"
            style={{
                paddingTop: "0.15em",
                paddingBottom: "0.12em",
                marginTop: "-0.15em",
                marginBottom: "-0.12em",
            }}
        >
            <span className="mask-inner block">{children}</span>
        </span>
    );
}

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
function SpinBadge({ id }) {
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const trackRef = useRef(null);
    const fanRef = useRef(null);
    const fanInnerRef = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);

    const [pick, setPick] = useState(0);
    const picked = INTENTS[pick]
        ? SERVICES.find((s) => s.slug === INTENTS[pick].slug)
        : null;

    /* Smooth scroll (Lenis) wired into GSAP's ticker */
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const lenis = new Lenis({ lerp: 0.09 });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    /* Ticker strip: speeds up and skews with scroll velocity */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        let x = 0;
        const setSkew = gsap.quickTo(track, "skewX", {
            duration: 0.4,
            ease: "power3",
        });

        const tick = (time, delta) => {
            const v = lenisRef.current ? lenisRef.current.velocity : 0;
            const unit = track.scrollWidth / 2;
            x -= (70 + v * 45) * (delta / 1000);
            if (x <= -unit) x += unit;
            if (x > 0) x -= unit;
            gsap.set(track, { x });
            setSkew(gsap.utils.clamp(-8, 8, -v * 0.4));
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    /* Hero: fanned service cards that spread out on hover and drift with the mouse */
    useEffect(() => {
        const fan = fanRef.current;
        const inner = fanInnerRef.current;
        if (!fan || !inner) return;

        const cards = gsap.utils.toArray(".fan-card", fan);
        if (!cards.length) return;

        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const mid = (cards.length - 1) / 2;

        const layout = (spread = 1, intro = false) => {
            const w = fan.clientWidth;
            cards.forEach((card, i) => {
                const o = i - mid;
                gsap.to(card, {
                    x: o * w * 0.17 * spread,
                    y: Math.abs(o) * 12 * spread,
                    rotation: o * 7 * spread,
                    scale: 1,
                    opacity: 1,
                    zIndex: i + 1,
                    duration: reduce ? 0 : intro ? 1.1 : 0.7,
                    delay: intro && !reduce ? 0.5 + i * 0.09 : 0,
                    ease: "power4.out",
                    overwrite: "auto",
                });
            });
        };

        gsap.set(cards, {
            xPercent: -50,
            yPercent: -50,
            y: reduce ? 0 : 280,
            opacity: reduce ? 1 : 0,
        });
        layout(1, true);

        let hovering = false;

        const onEnter = () => {
            hovering = true;
            layout(1.45);
        };
        const onLeave = () => {
            hovering = false;
            layout(1);
            gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        };
        const onMove = (e) => {
            const r = fan.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(inner, {
                x: nx * 28,
                y: ny * 18,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            });
        };

        const cardEnter = (card) => () =>
            gsap.to(card, {
                rotation: 0,
                scale: 1.08,
                zIndex: 50,
                duration: 0.4,
                ease: "power3.out",
                overwrite: "auto",
            });
        const cardLeave = () => hovering && layout(1.45);

        const bound = cards.map((card) => {
            const fn = cardEnter(card);
            card.addEventListener("mouseenter", fn);
            card.addEventListener("mouseleave", cardLeave);
            return [card, fn];
        });

        fan.addEventListener("mouseenter", onEnter);
        fan.addEventListener("mouseleave", onLeave);
        fan.addEventListener("mousemove", onMove);

        const onResize = () => layout(hovering ? 1.45 : 1);
        window.addEventListener("resize", onResize);

        return () => {
            fan.removeEventListener("mouseenter", onEnter);
            fan.removeEventListener("mouseleave", onLeave);
            fan.removeEventListener("mousemove", onMove);
            bound.forEach(([card, fn]) => {
                card.removeEventListener("mouseenter", fn);
                card.removeEventListener("mouseleave", cardLeave);
            });
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const jumpTo = (slug) => {
        const el = document.getElementById(`service-${slug}`);
        if (!el) return;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -12, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const onBtnMove = (e) => {
        const wrap = btnWrapRef.current;
        const btn = btnRef.current;
        if (!wrap || !btn) return;

        const r = wrap.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);

        gsap.to(btn, {
            x: dx * 0.35,
            y: dy * 0.35,
            duration: 0.4,
            ease: "power3",
        });
    };

    const onBtnLeave = () => {
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.4)",
        });
    };

    /* Scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Hero */
                gsap.from(".hero-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.12,
                    delay: 0.1,
                });
                gsap.from(".hero-fade", {
                    opacity: 0,
                    y: 20,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.6,
                });

                const count = document.querySelector(".hero-count");
                if (count) {
                    const total = Number(count.dataset.total);
                    const c = { v: 0 };
                    gsap.to(c, {
                        v: total,
                        duration: 1.4,
                        delay: 0.5,
                        ease: "power2.out",
                        onUpdate: () => {
                            count.textContent = pad(Math.round(c.v));
                        },
                    });
                }

                gsap.to(".hero-title", {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hero",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });

                gsap.fromTo(
                    ".progress",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        ease: "none",
                        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
                    }
                );

                /* Service cards */
                gsap.utils.toArray(".service-card").forEach((card) => {
                    gsap.from(card.querySelectorAll(".card-anim"), {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: card, start: "top 75%" },
                    });
                    gsap.from(card.querySelector(".card-img"), {
                        scale: 1.25,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: { trigger: card, start: "top 75%" },
                    });
                    gsap.fromTo(
                        card.querySelector(".card-mark"),
                        { yPercent: 12 },
                        {
                            yPercent: -12,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });

                /* Stats band */
                gsap.from(".stat-item", {
                    y: 50,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ".stats", start: "top 75%" },
                });
                gsap.utils.toArray(".stat-num").forEach((el) => {
                    const target = Number(el.dataset.value);
                    const counter = { v: 0 };
                    gsap.to(counter, {
                        v: target,
                        duration: 1.8,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = Math.round(counter.v);
                        },
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            once: true,
                        },
                    });
                });

                /* Process */
                gsap.utils.toArray(".proc-step").forEach((step, i) => {
                    gsap.fromTo(
                        step.querySelector(".proc-line"),
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 1,
                            ease: "power3.out",
                            delay: (i % 2) * 0.1,
                            scrollTrigger: { trigger: step, start: "top 85%" },
                        }
                    );
                    gsap.from(step.querySelectorAll(".proc-anim"), {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: step, start: "top 85%" },
                    });
                });

                /* Picker + CTA */
                gsap.from(".pick-fade", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ".picker", start: "top 75%" },
                });

                gsap.from(".cta-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".cta", start: "top 70%" },
                });
                gsap.from(".cta-fade", {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.3,
                    scrollTrigger: { trigger: ".cta", start: "top 70%" },
                });
            });

            /* Stacking: next card slides over, previous shrinks and dims */
            mm.add(
                "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
                () => {
                    const cards = gsap.utils.toArray(".service-card");
                    cards.forEach((card, i) => {
                        const next = cards[i + 1];
                        if (!next) return;
                        const st = {
                            trigger: next,
                            start: "top bottom",
                            end: "top top+=12",
                            scrub: true,
                        };
                        gsap.to(card.querySelector(".card-inner"), {
                            scale: 0.94,
                            ease: "none",
                            scrollTrigger: st,
                        });
                        gsap.to(card.querySelector(".card-dim"), {
                            opacity: 0.55,
                            ease: "none",
                            scrollTrigger: st,
                        });
                    });
                }
            );
        }, root);

        return () => ctx.revert();
    }, []);

    /* Picker result re-animates when the choice changes */
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        gsap.fromTo(
            ".pick-result-anim",
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: true,
            }
        );
        gsap.fromTo(
            ".pick-result-img",
            { scale: 1.2 },
            { scale: 1, duration: 1.1, ease: "power3.out", overwrite: true }
        );
    }, [pick]);

    return (
        <div
            ref={root}
            className="min-h-screen overflow-x-clip bg-black p-2 font-sans sm:p-3"
        >
            <Navbar />

            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            <div className="flex flex-col gap-3">
                {/* ---------------- Hero ---------------- */}
                <section className="hero relative flex min-h-[85svh] flex-col justify-between overflow-hidden rounded-xl bg-white px-4 pb-5 pt-5 text-black sm:min-h-[92vh] sm:px-8 sm:pb-8 sm:pt-6">
                    <div className="hero-fade mt-[10vh] flex items-start justify-between gap-4 text-xs sm:text-sm">
                        <span className="shrink-0">(Services)</span>
                        <span className="max-w-[200px] text-right leading-[1.5] text-neutral-600 sm:max-w-[220px]">
                            Everything we build, run and look after, in one place.
                        </span>
                    </div>

                    {/* Fanned service cards */}
                    <div
                        ref={fanRef}
                        className="relative mx-auto mt-10 h-[300px] w-full max-w-[380px] sm:h-[340px] lg:absolute lg:right-10 lg:top-[16vh] lg:mt-0 lg:h-[50vh] lg:w-[34vw] lg:max-w-none"
                    >
                        <div ref={fanInnerRef} className="absolute inset-0">
                            {FAN.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => jumpTo(s.slug)}
                                    aria-label={`Jump to ${s.hero.titlePlain}`}
                                    className="fan-card absolute left-1/2 top-1/2 aspect-[3/4] w-[42%] cursor-pointer overflow-hidden rounded-xl bg-neutral-800 text-left shadow-2xl shadow-black/25"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={s.hero.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                                        <span className="block text-[10px] text-[#ff5a1f]">
                                            {pad(i + 1)}
                                        </span>
                                        <span className="block text-xs font-semibold leading-tight tracking-[-0.02em] sm:text-sm">
                                            {s.hero.titlePlain}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 sm:pt-20 lg:pt-32">
                        <div className="relative">
                            <span className="hero-fade absolute -top-6 right-0 text-sm font-semibold sm:-top-4 sm:text-base lg:hidden">
                                (
                                <span
                                    className="hero-count tabular-nums"
                                    data-total={SERVICES.length}
                                >
                                    {pad(SERVICES.length)}
                                </span>
                                )
                            </span>

                            <h1 className="hero-title text-[clamp(3.5rem,15vw,12.5rem)] font-semibold leading-[.82] tracking-[-0.08em] sm:text-[clamp(4rem,12vw,12.5rem)] sm:leading-[.73] sm:tracking-[-.1em]">
                                <span className="hero-line block">
                                    <MaskLine>what we</MaskLine>
                                </span>
                                <span className="hero-line mt-[0.08em] block">
                                    <MaskLine>
                                        do<span className="text-[#ff5a1f]">.</span>
                                    </MaskLine>
                                </span>
                            </h1>
                        </div>

                        {/* Service navigation */}
                        <div className="hero-fade mt-8 flex flex-wrap gap-2 border-t border-black/15 pt-5 sm:mt-10">
                            {SERVICES.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => jumpTo(s.slug)}
                                    className="group inline-flex min-h-10 max-w-full cursor-pointer items-center gap-2 rounded-full border border-black/20 px-3 py-2 text-left text-xs transition-colors duration-300 hover:border-black hover:bg-black hover:text-white sm:px-4 sm:text-sm"
                                >
                                    <span className="shrink-0 text-[#ff5a1f]">
                                        {pad(i + 1)}
                                    </span>
                                    <span className="break-words">
                                        {s.hero.titlePlain}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- Ticker ---------------- */}
                <section className="overflow-hidden bg-black py-5">
                    <div ref={trackRef} className="flex w-max will-change-transform">
                        {[...TICKER, ...TICKER].map((title, i) => (
                            <span
                                key={`${title}-${i}`}
                                aria-hidden={i >= TICKER.length}
                                className="mr-7 inline-flex shrink-0 items-center gap-7 whitespace-nowrap text-2xl font-semibold tracking-[-0.03em] text-white sm:mr-10 sm:gap-10 sm:text-4xl"
                            >
                                {title}
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5a1f]" />
                            </span>
                        ))}
                    </div>
                </section>

                {/* ---------------- Service cards ---------------- */}
                <section className="flex flex-col gap-3">
                    {SERVICES.map((s, i) => {
                        const dark = i % 2 === 1;
                        const stat = s.content.stats[0];

                        return (
                            <article
                                key={s.id}
                                id={`service-${s.slug}`}
                                className="service-card relative scroll-mt-3 md:sticky md:top-3 md:h-[calc(100svh-1.5rem)]"
                            >
                                <div
                                    className={`card-inner relative h-full min-h-[620px] origin-top overflow-hidden rounded-xl sm:min-h-0 ${dark
                                            ? "border border-white/10 bg-neutral-900 text-white"
                                            : "bg-white text-black"
                                        }`}
                                >
                                    {/* Oversized number watermark */}
                                    <span
                                        aria-hidden="true"
                                        className={`card-mark pointer-events-none absolute -bottom-10 -left-4 hidden select-none text-[22rem] font-semibold leading-none tracking-[-0.08em] md:block ${dark ? "text-white/[0.04]" : "text-black/[0.04]"
                                            }`}
                                    >
                                        {pad(i + 1)}
                                    </span>

                                    <div className="card-dim pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />

                                    <div className="relative grid h-full gap-7 p-4 sm:gap-8 sm:p-8 md:grid-cols-12 md:gap-12">
                                        {/* Text */}
                                        <div className="flex min-w-0 flex-col justify-between gap-8 md:col-span-6 md:gap-10">
                                            <div className="card-anim flex items-center justify-between gap-3 text-xs sm:text-sm">
                                                <span>
                                                    <span className="text-[#ff5a1f]">
                                                        ({pad(i + 1)})
                                                    </span>
                                                    <span className="opacity-50">
                                                        {" "}
                                                        / {pad(SERVICES.length)}
                                                    </span>
                                                </span>
                                                <span className="text-right opacity-60">
                                                    {s.featured.items.length} specialities
                                                </span>
                                            </div>

                                            <div className="min-w-0">
                                                <Link
                                                    href={SERVICE_HREF(s.slug)}
                                                    className="group block"
                                                >
                                                    <h2 className="card-anim break-words text-[clamp(2.2rem,10vw,3.5rem)] font-semibold lowercase leading-[.92] tracking-[-0.06em] transition-colors duration-300 group-hover:text-[#ff5a1f] sm:text-[clamp(2.6rem,6vw,6rem)] sm:leading-[.9]">
                                                        {s.hero.titlePlain}
                                                    </h2>
                                                </Link>

                                                <p
                                                    className={`card-anim mt-4 max-w-md break-words text-sm leading-[1.8] sm:mt-6 sm:text-[15px] ${dark ? "text-white/70" : "text-neutral-600"
                                                        }`}
                                                >
                                                    {s.metadata.description}
                                                </p>

                                                <div className="card-anim mt-5 flex flex-wrap gap-2 sm:mt-6">
                                                    {s.featured.items.map((f) => (
                                                        <span
                                                            key={f.title}
                                                            className={`max-w-full break-words rounded-full border px-3 py-1.5 text-xs ${dark
                                                                    ? "border-white/20"
                                                                    : "border-black/20"
                                                                }`}
                                                        >
                                                            {f.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link
                                                href={SERVICE_HREF(s.slug)}
                                                className="card-anim group inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold"
                                            >
                                                <span>View service</span>
                                                <span
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white ${dark
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
                                            href={SERVICE_HREF(s.slug)}
                                            aria-label={`View ${s.hero.titlePlain}`}
                                            className="group relative block aspect-[4/3] min-w-0 overflow-hidden rounded-lg bg-neutral-800 md:col-span-6 md:aspect-auto md:h-full"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={s.hero.image}
                                                alt={s.hero.imageAlt}
                                                className="card-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                                            {/* Rotating badge */}
                                            <div className="card-anim absolute right-3 top-3 sm:right-4 sm:top-4">
                                                <SpinBadge id={s.id} />
                                            </div>

                                            {/* Stat pill */}
                                            <div className="card-anim absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-baseline gap-2 rounded-full bg-white px-3 py-2 text-black sm:bottom-4 sm:left-4 sm:px-4">
                                                <span className="shrink-0 text-lg font-semibold tracking-[-0.03em]">
                                                    {stat.value}
                                                    <span className="text-[#ff5a1f]">
                                                        {stat.suffix}
                                                    </span>
                                                </span>
                                                <span className="min-w-0 break-words text-xs">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* ---------------- Stats band ---------------- */}
                <section className="stats rounded-xl border border-white/10 bg-neutral-900 px-4 py-14 text-white sm:px-8 lg:py-24">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                                One small team. A lot of ground covered.
                            </h2>
                            <p className="max-w-xs text-sm leading-[1.8] text-white/60">
                                Design, code, hosting and support handled by the same
                                people, so nothing falls between the gaps.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 lg:mt-20 lg:grid-cols-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="stat-item">
                                    <div className="flex items-baseline text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                                        <span
                                            className="stat-num tabular-nums"
                                            data-value={s.value}
                                        >
                                            {s.value}
                                        </span>
                                        <span className="text-[#ff5a1f]">{s.suffix}</span>
                                    </div>
                                    <p className="mt-3 max-w-[200px] text-xs leading-[1.6] text-white/60 sm:text-sm">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- Process ---------------- */}
                <section className="rounded-xl bg-white px-4 py-14 text-black sm:px-8 lg:py-24">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                                How every project moves
                            </h2>
                            <p className="max-w-xs text-sm leading-[1.8] text-neutral-600">
                                The same four steps whichever service you pick.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
                            {PROCESS.map((p, i) => (
                                <div key={p.title} className="proc-step">
                                    <div className="relative h-[2px] w-full bg-black/10">
                                        <span className="proc-line absolute inset-0 origin-left bg-black" />
                                    </div>
                                    <p className="proc-anim mt-5 text-xs text-[#ff5a1f] sm:text-sm">
                                        ({pad(i + 1)})
                                    </p>
                                    <h3 className="proc-anim mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                        {p.title}
                                    </h3>
                                    <p className="proc-anim mt-3 max-w-xs text-sm leading-[1.8] text-neutral-600">
                                        {p.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------- Help me choose ---------------- */}
                {picked && (
                    <section className="picker rounded-xl bg-neutral-100 px-4 py-14 text-black sm:px-8 lg:py-24">
                        <div className="mx-auto max-w-[1400px]">
                            <h2 className="pick-fade text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                                Not sure where to start?
                            </h2>
                            <p className="pick-fade mt-5 max-w-sm text-sm leading-[1.8] text-neutral-600">
                                Tell us what you need and we&apos;ll point you to the
                                right service.
                            </p>

                            <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-14">
                                {/* Choices */}
                                <div
                                    className="pick-fade lg:col-span-6"
                                    role="radiogroup"
                                    aria-label="What do you need?"
                                >
                                    {INTENTS.map((it, i) => {
                                        const on = i === pick;
                                        return (
                                            <button
                                                key={it.slug}
                                                type="button"
                                                role="radio"
                                                aria-checked={on}
                                                onClick={() => setPick(i)}
                                                className="group flex w-full cursor-pointer items-center gap-4 border-t border-black/15 py-5 text-left last:border-b sm:py-6"
                                            >
                                                <span
                                                    className={`text-xs transition-colors duration-300 ${on ? "text-[#ff5a1f]" : "text-black/40"
                                                        }`}
                                                >
                                                    {pad(i + 1)}
                                                </span>
                                                <span
                                                    className={`flex-1 text-xl font-semibold tracking-[-0.03em] transition-all duration-500 sm:text-3xl ${on
                                                            ? "translate-x-2 text-black"
                                                            : "text-black/45 group-hover:translate-x-2 group-hover:text-black"
                                                        }`}
                                                >
                                                    {it.label}
                                                </span>
                                                <span
                                                    className={`h-3 w-3 shrink-0 rounded-full transition-all duration-300 ${on
                                                            ? "scale-100 bg-[#ff5a1f]"
                                                            : "scale-50 bg-black/15"
                                                        }`}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Result */}
                                <div className="pick-fade lg:col-span-6">
                                    <div
                                        aria-live="polite"
                                        className="overflow-hidden rounded-xl bg-neutral-900 text-white"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                key={picked.slug}
                                                src={picked.hero.image}
                                                alt={picked.hero.imageAlt}
                                                className="pick-result-img absolute inset-0 h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                                        </div>

                                        <div className="p-5 sm:p-8">
                                            <p className="pick-result-anim text-xs text-[#ff5a1f]">
                                                (We&apos;d suggest)
                                            </p>
                                            <h3 className="pick-result-anim mt-3 break-words text-3xl font-semibold lowercase leading-[.95] tracking-[-0.05em] sm:text-5xl">
                                                {picked.hero.titlePlain}
                                            </h3>
                                            <p className="pick-result-anim mt-4 max-w-md text-sm leading-[1.8] text-white/70">
                                                {picked.metadata.description}
                                            </p>

                                            <div className="pick-result-anim mt-6 flex flex-wrap items-center gap-3">
                                                <Link
                                                    href={SERVICE_HREF(picked.slug)}
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#ff5a1f] px-6 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white"
                                                >
                                                    View service
                                                    <Arrow />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => jumpTo(picked.slug)}
                                                    className="cursor-pointer rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                                                >
                                                    Show me above
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ---------------- CTA ---------------- */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-4 pb-5 pt-12 text-black sm:px-8 sm:pb-8 sm:pt-16 lg:pt-28">
                    <p className="cta-fade text-xs sm:text-sm">
                        (Still not sure? Just talk to us.)
                    </p>

                    <div className="mt-6 flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="text-[clamp(3.5rem,17vw,16rem)] font-semibold leading-[.8] tracking-[-0.08em] sm:text-[clamp(4.5rem,16vw,16rem)] sm:leading-[.75] sm:tracking-[-.1em]">
                            <span className="cta-line block">
                                <MaskLine>say</MaskLine>
                            </span>
                            <span className="cta-line mt-[0.08em] block">
                                <MaskLine>hello.</MaskLine>
                            </span>
                        </h2>

                        <div
                            ref={btnWrapRef}
                            onMouseMove={onBtnMove}
                            onMouseLeave={onBtnLeave}
                            className="cta-fade self-start p-2 sm:p-6 lg:self-end lg:p-10"
                        >
                            <a
                                ref={btnRef}
                                href="mailto:hello@bugsmoker.com"
                                className="flex h-28 w-28 items-center justify-center rounded-full bg-black text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black sm:h-40 sm:w-40"
                            >
                                Start a
                                <br />
                                project
                            </a>
                        </div>
                    </div>

                    <div className="cta-fade mt-10 flex flex-col gap-3 border-t border-black/30 pt-5 text-xs sm:mt-14 sm:flex-row sm:justify-between sm:text-sm">
                        <a
                            href="mailto:hello@bugsmoker.com"
                            className="w-fit break-all underline underline-offset-4"
                        >
                            hello@bugsmoker.com
                        </a>
                        <span>© Bugsmoker</span>
                    </div>
                </section>
            </div>

            <TestimonialsSection />
            <Blog />
            <Footer />
        </div>
    );
}