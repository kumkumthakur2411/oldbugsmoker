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

/* Services with distinct hero images (used for the intro, banner and avatars) */
const UNIQUE = (() => {
    const seen = new Set();
    return SERVICES.filter((s) => {
        if (seen.has(s.hero.image)) return false;
        seen.add(s.hero.image);
        return true;
    });
})();

const TOTAL_SPECIALITIES = SERVICES.reduce(
    (sum, s) => sum + s.featured.items.length,
    0
);

/* Edit freely: small stat row under the intro */
const STATS = [
    { value: SERVICES.length, suffix: "", label: "Core services" },
    { value: TOTAL_SPECIALITIES, suffix: "", label: "Specialities" },
    { value: 60, suffix: "+", label: "Sites and apps shipped" },
    { value: 15, suffix: "m", label: "Emergency response" },
];

/* Circle stats: pulled from the first services' own numbers */
const BUBBLES = SERVICES.slice(0, 3).map((s) => ({
    value: s.content.stats[0].value,
    suffix: s.content.stats[0].suffix,
    label: s.content.stats[0].label,
}));

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

const NO_SCROLLBAR =
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]";

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

const Chevron = ({ dir = "right", size = 18 }) => (
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
        className={dir === "left" ? "rotate-180" : ""}
    >
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const galleryRef = useRef(null);
    const previewRef = useRef(null);
    const previewX = useRef(null);
    const previewY = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);

    const [pick, setPick] = useState(0);
    const [hover, setHover] = useState(-1);

    const picked = INTENTS[pick]
        ? SERVICES.find((s) => s.slug === INTENTS[pick].slug)
        : null;

    const lead = UNIQUE[0] || SERVICES[0];
    const banner = UNIQUE[1] || lead;

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

    /* Floating image preview that follows the cursor over the list */
    useEffect(() => {
        const el = previewRef.current;
        if (!el) return;
        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 });
        previewX.current = gsap.quickTo(el, "x", {
            duration: 0.5,
            ease: "power3",
        });
        previewY.current = gsap.quickTo(el, "y", {
            duration: 0.5,
            ease: "power3",
        });
    }, []);

    useEffect(() => {
        const el = previewRef.current;
        if (!el) return;
        gsap.to(el, {
            opacity: hover >= 0 ? 1 : 0,
            scale: hover >= 0 ? 1 : 0.8,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
        });
    }, [hover]);

    const onListMove = (e) => {
        if (previewX.current) previewX.current(e.clientX + 40);
        if (previewY.current) previewY.current(e.clientY);
    };

    const jumpTo = (slug) => {
        const el = document.getElementById(`service-${slug}`);
        if (!el) return;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -80, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const scrollGallery = (dir) => {
        const g = galleryRef.current;
        if (!g) return;
        g.scrollBy({ left: dir * g.clientWidth * 0.6, behavior: "smooth" });
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
                /* Intro */
                gsap.from(".intro-img", {
                    clipPath: "inset(0 0 100% 0)",
                    duration: 1.3,
                    ease: "power4.out",
                    delay: 0.1,
                });
                gsap.from(".intro-fade", {
                    opacity: 0,
                    y: 20,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.4,
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

                /* Big banner: headline reveal + image parallax */
                gsap.from(".banner-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".banner", start: "top 70%" },
                });
                gsap.fromTo(
                    ".banner-img",
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".banner",
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                /* Stats counters */
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
                            start: "top 92%",
                            once: true,
                        },
                    });
                });

                /* Circles pop in */
                gsap.from(".bubble", {
                    scale: 0.6,
                    opacity: 0,
                    duration: 1,
                    ease: "back.out(1.6)",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".bubbles", start: "top 80%" },
                });

                /* Process lines */
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
                            scrollTrigger: { trigger: step, start: "top 88%" },
                        }
                    );
                });

                /* CTA */
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

                /* One shared reveal for cards, rows and steps as they enter */
                gsap.set(".reveal-item", { opacity: 0, y: 40 });
                ScrollTrigger.batch(".reveal-item", {
                    start: "top 88%",
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            stagger: 0.1,
                            overwrite: true,
                        }),
                });
            });
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
        <div ref={root} className="min-h-screen overflow-x-clip bg-black p-2 font-sans sm:p-3">
            <Navbar />

            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            {/* Cursor-following preview for the list */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/5] w-[240px] overflow-hidden rounded-lg bg-neutral-800 shadow-2xl shadow-black/30 lg:block"
            >
                {SERVICES.map((s, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={s.id}
                        src={s.hero.image}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${i === hover ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-neutral-100 px-4 pb-16 pt-[14vh] text-black sm:px-8 lg:pb-28">
                    <div className="mx-auto max-w-[1400px]">
                        {/* ---------------- Intro ---------------- */}
                        <section className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                            <div className="lg:col-span-4">
                                <div className="intro-img relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-300">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={lead.hero.image}
                                        alt={lead.hero.imageAlt}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between gap-12 lg:col-span-8">
                                <div className="intro-fade ml-auto max-w-sm text-sm leading-[1.7]">
                                    <p>
                                        <span className="font-semibold uppercase">
                                            Services
                                        </span>{" "}
                                        is everything we build, run and look after.
                                        Design, code, hosting and support come from
                                        one team, so your project never gets passed
                                        around.
                                    </p>
                                </div>

                                <div className="intro-fade grid max-w-xl gap-6 text-xs leading-[1.8] text-neutral-500 sm:grid-cols-2 lg:ml-auto">
                                    <p>
                                        Start with one service or combine several.
                                        Each one is run by the same people, with the
                                        same standards, from first call to launch day.
                                    </p>
                                    <p>
                                        Pick a service below to see what is included,
                                        or tell us what you need and we will point you
                                        to the right one.
                                    </p>
                                </div>

                                <div className="intro-fade flex flex-wrap gap-2 border-t border-black/15 pt-5">
                                    {SERVICES.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => jumpTo(s.slug)}
                                            className="inline-flex min-h-10 max-w-full cursor-pointer items-center rounded-full border border-black/20 px-4 py-2 text-left text-xs transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a1f] sm:text-sm"
                                        >
                                            <span className="break-words">
                                                {s.hero.titlePlain}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ---------------- Stats row ---------------- */}
                        <section className="mt-12 grid grid-cols-2 gap-y-8 border-t border-black/15 pt-8 lg:mt-16 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] lg:gap-y-0">
                            <div className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:pr-10">
                                <div className="flex">
                                    {UNIQUE.slice(0, 3).map((s, i) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            key={s.id}
                                            src={s.hero.image}
                                            alt=""
                                            className={`h-11 w-11 rounded-full border-2 border-neutral-100 object-cover ${i ? "-ml-3" : ""
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="max-w-[120px] text-xs font-semibold leading-tight">
                                    The team behind every service
                                </p>
                            </div>

                            {STATS.map((s) => (
                                <div
                                    key={s.label}
                                    className="border-l border-black/15 pl-4 lg:pl-6"
                                >
                                    <div className="flex items-baseline text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                                        <span
                                            className="stat-num tabular-nums"
                                            data-value={s.value}
                                        >
                                            {s.value}
                                        </span>
                                        <span className="text-[#ff5a1f]">{s.suffix}</span>
                                    </div>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </section>

                        {/* ---------------- Banner ---------------- */}
                        <section className="banner relative mt-14 flex min-h-[60svh] items-center justify-center overflow-hidden rounded-lg bg-neutral-800 px-4 py-20 sm:min-h-[75svh] lg:mt-24">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={banner.hero.image}
                                alt=""
                                className="banner-img absolute -inset-y-[10%] inset-x-0 h-[120%] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/45" />

                            <h1 className="relative text-center text-[clamp(3rem,12vw,10rem)] font-semibold uppercase leading-[.88] tracking-[-0.06em] text-white">
                                <span className="banner-line block">
                                    <MaskLine>what we</MaskLine>
                                </span>
                                <span className="banner-line block">
                                    <MaskLine>
                                        do<span className="text-[#ff5a1f]">.</span>
                                    </MaskLine>
                                </span>
                            </h1>
                        </section>

                        {/* ---------------- Circles + statement ---------------- */}
                        <section className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:items-center">
                            <div className="bubbles flex flex-wrap items-center gap-4 lg:col-span-6">
                                {BUBBLES[0] && (
                                    <div className="bubble flex h-40 w-40 flex-col items-center justify-center rounded-full border border-black/25 text-center sm:h-48 sm:w-48">
                                        <span className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                                            {BUBBLES[0].value}
                                            <span className="text-[#ff5a1f]">
                                                {BUBBLES[0].suffix}
                                            </span>
                                        </span>
                                        <span className="mt-1 max-w-[110px] text-[11px] leading-tight text-neutral-500">
                                            {BUBBLES[0].label}
                                        </span>
                                    </div>
                                )}

                                <div className="bubble flex h-32 w-32 items-center justify-center rounded-full bg-[#ff5a1f] p-4 text-center text-xs font-semibold leading-tight text-black sm:h-36 sm:w-36">
                                    Numbers from our work
                                </div>

                                {BUBBLES.slice(1).map((b) => (
                                    <div
                                        key={b.label}
                                        className="bubble flex h-28 w-28 flex-col items-center justify-center rounded-full border border-black/25 text-center sm:h-32 sm:w-32"
                                    >
                                        <span className="text-2xl font-semibold tracking-[-0.05em]">
                                            {b.value}
                                            <span className="text-[#ff5a1f]">
                                                {b.suffix}
                                            </span>
                                        </span>
                                        <span className="mt-1 max-w-[90px] text-[10px] leading-tight text-neutral-500">
                                            {b.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="reveal-item lg:col-span-6">
                                <p className="ml-auto max-w-sm text-sm leading-[1.7]">
                                    <span className="font-semibold uppercase">
                                        One small team
                                    </span>{" "}
                                    covers a lot of ground. Design, code, hosting and
                                    support are handled by the same people, so nothing
                                    falls between the gaps.
                                </p>
                                <p className="ml-auto mt-6 max-w-sm text-xs leading-[1.8] text-neutral-500">
                                    Every number here comes from real projects. Browse
                                    the services below to see how each one works.
                                </p>
                            </div>
                        </section>

                        {/* ---------------- Services gallery ---------------- */}
                        <section className="mt-16 lg:mt-28">
                            <div
                                ref={galleryRef}
                                className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 ${NO_SCROLLBAR}`}
                            >
                                {SERVICES.map((s, i) => (
                                    <Link
                                        key={s.id}
                                        href={SERVICE_HREF(s.slug)}
                                        className={`reveal-item group w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[24%] ${i % 2 ? "lg:mt-10" : ""
                                            }`}
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-300">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={s.hero.image}
                                                alt={s.hero.imageAlt}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white">
                                                <Arrow size={16} />
                                            </span>
                                        </div>
                                        <h2 className="mt-3 text-[11px] font-semibold uppercase leading-tight tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#ff5a1f]">
                                            {s.hero.titlePlain}
                                        </h2>
                                        <p className="mt-1 text-[11px] text-neutral-500">
                                            {s.featured.items.length} specialities
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <p className="max-w-xs text-sm leading-[1.7] text-neutral-600">
                                    We help brands begin a new chapter online and
                                    leave competitors behind.
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => scrollGallery(-1)}
                                        aria-label="Scroll services left"
                                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a1f]"
                                    >
                                        <Chevron dir="left" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollGallery(1)}
                                        aria-label="Scroll services right"
                                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a1f]"
                                    >
                                        <Chevron />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- Service list ---------------- */}
                        <section className="mt-16 lg:mt-28">
                            <div
                                className="mx-auto max-w-4xl"
                                onMouseMove={onListMove}
                                onMouseLeave={() => setHover(-1)}
                            >
                                {SERVICES.map((s, i) => (
                                    <Link
                                        key={s.id}
                                        id={`service-${s.slug}`}
                                        href={SERVICE_HREF(s.slug)}
                                        onMouseEnter={() => setHover(i)}
                                        onFocus={() => setHover(i)}
                                        onBlur={() => setHover(-1)}
                                        className="reveal-item group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-t border-black/15 py-6 last:border-b sm:gap-x-6 sm:py-8"
                                    >
                                        <span className="text-xs text-neutral-400 transition-colors duration-300 group-hover:text-[#ff5a1f]">
                                            {pad(i + 1)}
                                        </span>

                                        <span className="min-w-0">
                                            <span className="block break-words text-2xl font-semibold lowercase leading-[1] tracking-[-0.04em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#ff5a1f] sm:text-4xl">
                                                {s.hero.titlePlain}
                                            </span>
                                            <span className="mt-2 block max-w-xl break-words text-xs leading-[1.7] text-neutral-500">
                                                {s.featured.items
                                                    .map((f) => f.title)
                                                    .join(", ")}
                                            </span>
                                        </span>

                                        <span className="flex items-center gap-3 text-[10px] font-semibold uppercase text-neutral-500">
                                            <span className="hidden sm:block">
                                                {s.featured.items.length} specialities
                                            </span>
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f]">
                                                <Arrow size={16} />
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* ---------------- Process ---------------- */}
                        <section className="mt-20 lg:mt-32">
                            <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                                How every project moves
                            </h2>
                            <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-[1.8] text-neutral-600">
                                The same four steps whichever service you pick.
                            </p>

                            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
                                {PROCESS.map((p, i) => (
                                    <div key={p.title} className="proc-step reveal-item">
                                        <div className="relative h-[2px] w-full bg-black/10">
                                            <span className="proc-line absolute inset-0 origin-left bg-black" />
                                        </div>
                                        <p className="mt-5 text-xs text-[#ff5a1f] sm:text-sm">
                                            ({pad(i + 1)})
                                        </p>
                                        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                            {p.title}
                                        </h3>
                                        <p className="mt-3 max-w-xs text-sm leading-[1.8] text-neutral-600">
                                            {p.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ---------------- Help me choose ---------------- */}
                        {picked && (
                            <section className="mt-20 lg:mt-32">
                                <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                                    Not sure where to start?
                                </h2>
                                <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-[1.8] text-neutral-600">
                                    Tell us what you need and we&apos;ll point you to
                                    the right service.
                                </p>

                                <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-14">
                                    <div
                                        className="lg:col-span-6"
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
                                                    className="group flex w-full cursor-pointer items-center gap-4 border-t border-black/15 py-5 text-left last:border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a1f] sm:py-6"
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

                                    <div className="lg:col-span-6">
                                        <div
                                            aria-live="polite"
                                            className="overflow-hidden rounded-lg bg-neutral-900 text-white"
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
                            </section>
                        )}
                    </div>
                </div>

                {/* ---------------- CTA ---------------- */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-4 pb-5 pt-16 text-center text-black sm:px-8 sm:pb-8 sm:pt-24">
                    <p className="cta-fade text-xs sm:text-sm">
                        (Still not sure? Just talk to us.)
                    </p>

                    <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(3rem,11vw,9rem)] font-semibold uppercase leading-[.88] tracking-[-0.06em]">
                        <span className="cta-line block">
                            <MaskLine>say</MaskLine>
                        </span>
                        <span className="cta-line block">
                            <MaskLine>hello.</MaskLine>
                        </span>
                    </h2>

                    <div
                        ref={btnWrapRef}
                        onMouseMove={onBtnMove}
                        onMouseLeave={onBtnLeave}
                        className="cta-fade mx-auto mt-6 flex w-fit justify-center p-4 sm:p-8"
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

                    <div className="cta-fade mt-8 flex flex-col gap-3 border-t border-black/30 pt-5 text-xs sm:mt-10 sm:flex-row sm:justify-between sm:text-sm">
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