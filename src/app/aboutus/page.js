


"use client";

/*
  Install once:  npm i gsap lenis
  (Swiper is no longer needed on this page: the image ticker is driven by GSAP.)
  Images expected in /public:  about1.jpeg ... about8.jpeg
*/

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Link from "next/link";
import Image from "next/image";
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Content: replace with your own copy                                 */
/* ------------------------------------------------------------------ */

const projects = [
    { id: "01", title: "Editorial", image: "/about1.jpeg" },
    { id: "02", title: "Fashion", image: "/about2.jpeg" },
    { id: "03", title: "Portrait", image: "/about3.jpeg" },
    { id: "04", title: "Brand", image: "/about4.jpeg" },
    { id: "05", title: "UI Design", image: "/about5.jpeg" },
    { id: "06", title: "Magazine", image: "/about6.jpeg" },
    { id: "07", title: "Identity", image: "/about7.jpeg" },
    { id: "08", title: "Photography", image: "/about8.jpeg" },
];

const STORY =
    "Bugsmoker is a small digital studio that likes making things people remember. We design and build websites, brands and interfaces with a loud streak and a serious respect for how they work.";

const DETAILS = [
    {
        label: "What we do",
        text: "Websites, web apps, brand identity and motion, designed and built under one roof.",
    },
    {
        label: "How we work",
        text: "A small team and direct conversations. You talk to the people making the thing.",
    },
    {
        label: "What we care about",
        text: "Work that is playful on the surface and solid underneath: fast, accessible and easy to maintain.",
    },
];

const PRINCIPLES = [
    {
        title: "Make it loud",
        text: "Ideas that are hard to ignore, shaped so they still make sense.",
        image: "/about3.jpeg",
    },
    {
        title: "Make it work",
        text: "Fast, accessible and tested before anything ships.",
        image: "/about5.jpeg",
    },
    {
        title: "Keep it light",
        text: "Serious about the craft, relaxed about everything else.",
        image: "/about7.jpeg",
    },
    {
        title: "Finish it properly",
        text: "Details, handover and support that don't disappear after launch.",
        image: "/about1.jpeg",
    },
];

const FAQS = [
    {
        q: "Who is Bugsmoker?",
        a: "We are a small digital studio that designs and builds websites, web apps and brand identities. We like work that is playful, bold and technically solid.",
    },
    {
        q: "What does working with you look like?",
        a: "We start with a conversation about your goals, agree on scope and timeline, then share progress often. You see real work early, not a surprise at the end.",
    },
    {
        q: "Do you work with small teams and startups?",
        a: "Yes. We work with founders, small teams and established companies. What matters is that the project is interesting and the people are easy to talk to.",
    },
    {
        q: "How long does a project take?",
        a: "A focused website usually takes three to five weeks. Larger products take longer. You get a clear timeline before we begin.",
    },
    {
        q: "Do you offer support after launch?",
        a: "Yes. We can stay on for updates and improvements, or hand everything over with documentation so your team can run it.",
    },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/* Masked line: the text slides up from behind its own edge */
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

function SplitWords({ text }) {
    return text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block">
            {word}
            {"\u00A0"}
        </span>
    ));
}

/* Rounded image that sits inside a line of text. Sized in em, so it scales with the headline. */
function Pill({ src, className = "", depth = 1, tag = "" }) {
    return (
        <span
            data-depth={depth}
            className={`hero-pill group/pill relative mx-[0.06em] inline-block overflow-hidden rounded-full border border-black/10 bg-neutral-200 align-middle shadow-xs transition-transform duration-500 hover:scale-105 ${className}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                className="hero-pill-img absolute inset-0 h-full w-full scale-125 object-cover transition-transform duration-700 ease-out group-hover/pill:scale-140"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/pill:bg-black/20" />
            {tag && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/pill:opacity-100">
                    <span className="rounded-full bg-black/85 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-xs uppercase">
                        {tag}
                    </span>
                </span>
            )}
        </span>
    );
}

const PlusIcon = ({ open }) => (
    <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${open
            ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
            : "border-black/20 text-black"
            }`}
    >
        <span className="absolute h-[2px] w-4 bg-current" />
        <span
            className={`absolute h-4 w-[2px] bg-current transition-transform duration-300 ${open ? "scale-y-0" : "scale-y-100"
                }`}
        />
    </span>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function PortfolioHero() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const trackRef = useRef(null);
    const expandRef = useRef(null);
    const listRef = useRef(null);
    const floatRef = useRef(null);
    const xTo = useRef(null);
    const yTo = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);
    const panels = useRef([]);

    const [open, setOpen] = useState(0);
    const [active, setActive] = useState(-1);

    /* Smooth scroll (Lenis) wired into GSAP's ticker */
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    /* Image ticker: speeds up and skews with scroll velocity */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let x = 0;
        const setSkew = gsap.quickTo(track, "skewX", {
            duration: 0.4,
            ease: "power3",
        });

        const tick = (time, delta) => {
            const v = lenisRef.current ? lenisRef.current.velocity : 0;
            const unit = track.scrollWidth / 4; // four identical copies
            x -= (60 + v * 45) * (delta / 1000);
            if (x <= -unit) x += unit;
            if (x > 0) x -= unit;
            gsap.set(track, { x });
            setSkew(gsap.utils.clamp(-10, 10, -v * 0.5));
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    const rotateTo = useRef(null);
    const lastX = useRef(0);

    /* Floating preview image that follows the cursor over the list */
    useEffect(() => {
        if (!floatRef.current) return;
        gsap.set(floatRef.current, { xPercent: 15, yPercent: -50, opacity: 0 });
        xTo.current = gsap.quickTo(floatRef.current, "x", {
            duration: 0.45,
            ease: "power3.out",
        });
        yTo.current = gsap.quickTo(floatRef.current, "y", {
            duration: 0.45,
            ease: "power3.out",
        });
        rotateTo.current = gsap.quickTo(floatRef.current, "rotation", {
            duration: 0.5,
            ease: "power3.out",
        });
    }, []);

    const onListMove = (e) => {
        if (!listRef.current || !xTo.current || !yTo.current) return;
        const r = listRef.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        xTo.current(x);
        yTo.current(y);

        // Smooth tilt based on cursor velocity
        const vx = e.clientX - lastX.current;
        lastX.current = e.clientX;
        if (rotateTo.current) {
            rotateTo.current(gsap.utils.clamp(-10, 10, vx * 0.35));
        }

        // Tucks to left if too close to right container edge
        const isNearRight = x > r.width - 250;
        gsap.to(floatRef.current, {
            xPercent: isNearRight ? -115 : 15,
            yPercent: -50,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleRowEnter = (e, i) => {
        if (!listRef.current || !floatRef.current) return;
        const r = listRef.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        // Instant position on first hover so it never flies across the screen from (0,0)
        if (active === -1) {
            gsap.set(floatRef.current, { x, y, opacity: 1 });
        }
        setActive(i);
    };

    const handleListLeave = () => {
        setActive(-1);
        if (rotateTo.current) rotateTo.current(0);
    };

    /* Magnetic button */
    const onBtnMove = (e) => {
        const wrap = btnWrapRef.current;
        const btn = btnRef.current;
        if (!wrap || !btn) return;
        const r = wrap.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.4, ease: "power3" });
    };
    const onBtnLeave = () => {
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.4)",
        });
    };

    /* Hero: pills and floating stamps drift with the mouse, each at its own depth */
    const heroRef = useRef(null);
    const onHeroMove = (e) => {
        const hero = heroRef.current;
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        hero.querySelectorAll(".hero-pill").forEach((pill) => {
            const d = Number(pill.dataset.depth) || 1;
            gsap.to(pill, {
                x: nx * 40 * d,
                y: ny * 24 * d,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            });
            gsap.to(pill.querySelector(".hero-pill-img"), {
                x: nx * -20 * d,
                y: ny * -12 * d,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            });
        });
        hero.querySelectorAll(".hero-float").forEach((el) => {
            const d = Number(el.dataset.depth) || 1;
            gsap.to(el, {
                x: nx * 50 * d,
                y: ny * 32 * d,
                rotate: nx * 12 * d,
                duration: 1,
                ease: "power3.out",
                overwrite: "auto",
            });
        });
    };

    /* Scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Hero intro */
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
                    stagger: 0.1,
                    delay: 0.7,
                });
                gsap.from(".hero-pill", {
                    width: 0,
                    marginLeft: 0,
                    duration: 1.1,
                    ease: "power4.inOut",
                    stagger: 0.15,
                    delay: 0.6,
                });
                gsap.from(".hero-pill-img", {
                    scale: 1.8,
                    duration: 1.6,
                    ease: "power3.out",
                    delay: 0.6,
                });
                gsap.from(".hero-float", {
                    scale: 0,
                    rotate: -35,
                    opacity: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                    delay: 0.8,
                });
                gsap.to(".hero-arrow", {
                    y: 5,
                    duration: 0.7,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
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

                /* Scroll progress bar */
                gsap.fromTo(
                    ".progress",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        ease: "none",
                        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
                    }
                );

                /* Story: words light up with scroll */
                gsap.fromTo(
                    ".reveal-word",
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: ".story-text",
                            start: "top 80%",
                            end: "bottom 55%",
                            scrub: true,
                        },
                    }
                );
                gsap.from(".detail", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".details", start: "top 85%" },
                });

                /* Image that grows to fill the screen while pinned */
                const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: expandRef.current,
                        start: "top top",
                        end: "+=120%",
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                tl.fromTo(
                    ".expand-wrap",
                    {
                        clipPath: isDesktop
                            ? "inset(18% 30% 18% 30% round 24px)"
                            : "inset(20% 8% 20% 8% round 16px)",
                    },
                    { clipPath: "inset(0% 0% 0% 0% round 12px)", duration: 1, ease: "power1.inOut" },
                    0
                )
                    .fromTo(".expand-img", { scale: 1.35 }, { scale: 1, duration: 1, ease: "power1.inOut" }, 0)
                    .fromTo(
                        ".expand-overlay",
                        { opacity: 0.2 },
                        { opacity: 0.45, duration: 1 },
                        0
                    )
                    .fromTo(
                        ".expand-text",
                        { opacity: 0, y: 50, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" },
                        0.55
                    );

                /* Principles entrance stagger */
                gsap.from(".principle", {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 80%",
                        once: true,
                    },
                });

                /* FAQ */
                gsap.from(".faq-item", {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
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
            });
        }, root);

        return () => ctx.revert();
    }, []);

    /* FAQ accordion */
    useEffect(() => {
        panels.current.forEach((panel, i) => {
            if (!panel) return;
            gsap.to(panel, {
                height: open === i ? "auto" : 0,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => ScrollTrigger.refresh(),
            });
        });
    }, [open]);

    return (
        <div ref={root} className="min-h-screen bg-black p-3 font-sans">
            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            <div className="flex flex-col gap-3">
                {/* ---------------- Hero ---------------- */}
                <section
                    ref={heroRef}
                    onMouseMove={onHeroMove}
                    className="hero relative flex min-h-[92vh] flex-col justify-between overflow-hidden rounded-xl bg-white px-5 pb-6 pt-6 text-black sm:px-8 sm:pb-8"
                >
                    {/* Top Status & Meta Header */}
                    <div className="hero-fade flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold tracking-tight">(About us)</span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-100/80 px-2.5 py-1 text-[11px] font-medium text-neutral-800">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                                </span>
                                <span>Available for Commissions</span>
                            </span>
                        </div>

                        <div className="hidden lg:flex items-center gap-3 text-xs tracking-wider text-neutral-500 uppercase font-mono">
                            <span>[EST. 2024]</span>
                            <span>•</span>
                            <span>[STUDIO 01 // EARTH]</span>
                        </div>

                        <div className="text-left sm:text-right">
                            <span className="block max-w-[240px] text-xs sm:text-sm leading-[1.5] text-neutral-600">
                                A small studio making chaotic digital things that actually work.
                            </span>
                        </div>
                    </div>

                    {/* Main Headline & Interactive Parallax Elements */}
                    <div className="relative pt-16 sm:pt-24 lg:pt-28">
                        {/* Floating Parallax Stamp Badge */}
                        <div
                            data-depth={1.6}
                            className="hero-float pointer-events-none absolute right-2 top-6 hidden -translate-y-1/2 md:block lg:right-10"
                        >
                            <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                                <svg
                                    className="absolute inset-0 h-full w-full animate-[spin_20s_linear_infinite]"
                                    viewBox="0 0 120 120"
                                >
                                    <path
                                        id="stampCircle"
                                        d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                                        fill="none"
                                    />
                                    <text className="text-[9px] font-bold uppercase tracking-[0.24em] fill-black">
                                        <textPath href="#stampCircle" startOffset="0%">
                                            ✦ OBSESSIVE CRAFT ✦ ZERO TEMPLATES ✦
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl transition-transform duration-500 hover:scale-110">
                                    <span className="text-base text-[#ff5a1f]">✦</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="hero-title text-[clamp(3.6rem,12vw,12.5rem)] font-semibold leading-[.73] tracking-[-.1em]">
                            <span className="hero-line block">
                                <MaskLine>
                                    we are
                                    <Pill
                                        src="/about3.jpeg"
                                        depth={1}
                                        tag="CRAFT"
                                        className="ml-[0.1em] h-[0.6em] w-[1.5em]"
                                    />
                                </MaskLine>
                            </span>
                            <span className="hero-line mt-[0.08em] block">
                                <MaskLine>
                                    bugsmoker<span className="text-[#ff5a1f]">.</span>
                                    <Pill
                                        src="/about6.jpeg"
                                        depth={1.8}
                                        tag="STUDIO"
                                        className="ml-[0.08em] h-[0.6em] w-[0.6em]"
                                    />
                                </MaskLine>
                            </span>
                        </h1>
                    </div>

                    {/* Bottom Bar: Action link, capability chips, and live telemetry */}
                    <div className="hero-fade mt-14 flex flex-col gap-6 border-t border-black/10 pt-6 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
                        {/* Scroll indicator & manifesto */}
                        <div className="flex flex-col gap-3">
                            <a
                                href="#ticker"
                                className="group/scroll inline-flex w-fit items-center gap-3 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                            >
                                <span className="hero-arrow inline-block transition-transform duration-300 group-hover/scroll:translate-y-0.5">
                                    ↓
                                </span>
                                <span>Scroll to explore</span>
                            </a>
                            <p className="max-w-[280px] text-xs leading-[1.65] text-neutral-600 sm:text-sm">
                                We reject the cookie-cutter web to engineer high-velocity, sensory digital experiences that make brands unforgettable.
                            </p>
                        </div>

                        {/* Interactive Capability Chips */}
                        <div className="hidden xl:flex flex-wrap items-center justify-center gap-2 max-w-sm">
                            <span className="cursor-default rounded-full border border-black/10 bg-neutral-100/90 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white">
                                ⚡ Motion & GSAP
                            </span>
                            <span className="cursor-default rounded-full border border-black/10 bg-neutral-100/90 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white">
                                ✦ Bespoke Architecture
                            </span>
                            <span className="cursor-default rounded-full border border-black/10 bg-neutral-100/90 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white">
                                ◈ Native 60fps
                            </span>
                            <span className="cursor-default rounded-full border border-black/10 bg-neutral-100/90 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white">
                                ✱ Zero Boring Code
                            </span>
                        </div>

                        {/* Telemetry / Live studio specs */}
                        <div className="flex flex-col items-start sm:items-end gap-2 text-left sm:text-right">
                            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                <span>ENGINE: TURBOPACK</span>
                                <span className="text-neutral-300">•</span>
                                <span>LIGHTHOUSE: 98+</span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-900">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
                                <span>DISRUPTING THE DIGITAL NORM</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- Image ticker ---------------- */}
                <section id="ticker" className="overflow-hidden bg-black py-8">
                    <div ref={trackRef} className="flex w-max will-change-transform">
                        {[...projects, ...projects, ...projects, ...projects].map(
                            (item, i) => (
                                <div
                                    key={`${item.id}-${i}`}
                                    aria-hidden={i >= projects.length}
                                    className="group mr-5 w-44 shrink-0 cursor-pointer sm:w-52"
                                >
                                    <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.image}
                                            alt={i < projects.length ? item.title : ""}
                                            className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                        />
                                    </div>
                                    <div className="mt-3 flex justify-between text-xs uppercase text-white">
                                        <span>({item.id})</span>
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>

                {/* ---------------- Story ---------------- */}
                <section className="rounded-xl bg-white px-5 py-16 text-black sm:px-8 lg:py-28">
                    <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-16">
                        <p className="text-xs sm:text-sm lg:col-span-3">(Who we are)</p>

                        <div className="lg:col-span-9">
                            <p className="story-text text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl">
                                <SplitWords text={STORY} />
                            </p>

                            <div className="details mt-14 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-3 lg:mt-20">
                                {DETAILS.map((d) => (
                                    <div key={d.label} className="detail">
                                        <p className="text-sm font-semibold">{d.label}</p>
                                        <p className="mt-2 text-sm leading-[1.8] text-neutral-600">
                                            {d.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- Expanding image ---------------- */}
                <section
                    ref={expandRef}
                    className="relative h-screen w-full overflow-hidden rounded-xl bg-black"
                >
                    <div className="expand-wrap absolute inset-0 overflow-hidden will-change-[clip-path]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/about2.jpeg"
                            alt="Bugsmoker studio work"
                            className="expand-img absolute inset-0 h-full w-full object-cover will-change-transform"
                        />
                        <div className="expand-overlay absolute inset-0 bg-black/40 transition-opacity" />
                    </div>
                    <div className="expand-text pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center">
                        <h2 className="max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                            Chaos, but make it work.
                        </h2>
                    </div>
                </section>

                {/* ---------------- Principles ---------------- */}
                <section className="rounded-xl bg-white px-5 py-16 text-black sm:px-8 lg:py-28">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-10 flex items-end justify-between lg:mb-16">
                            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                                How we think
                            </h2>
                            <span className="hidden text-xs sm:block sm:text-sm text-neutral-500 font-mono">
                                (Hover to preview)
                            </span>
                        </div>

                        <div
                            ref={listRef}
                            onMouseMove={onListMove}
                            onMouseLeave={handleListLeave}
                            className="relative"
                        >
                            {PRINCIPLES.map((p, i) => (
                                <div
                                    key={p.title}
                                    onMouseEnter={(e) => handleRowEnter(e, i)}
                                    className="principle group grid cursor-pointer grid-cols-12 items-baseline gap-4 border-t border-black/15 py-6 last:border-b sm:py-8 transition-colors duration-300 hover:border-black"
                                >
                                    <span className="col-span-2 text-xs font-mono sm:col-span-1 sm:text-sm text-neutral-400 group-hover:text-black transition-colors">
                                        0{i + 1}
                                    </span>
                                    <h3 className="col-span-10 text-3xl font-semibold tracking-[-0.04em] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#ff5a1f] sm:col-span-6 sm:text-5xl lg:text-6xl">
                                        {p.title}
                                    </h3>
                                    <p className="col-span-10 col-start-3 max-w-xs text-sm leading-[1.7] text-neutral-600 sm:col-span-5 sm:col-start-8">
                                        {p.text}
                                    </p>
                                </div>
                            ))}

                            {/* Cursor-following preview (desktop only) */}
                            <div
                                ref={floatRef}
                                className="pointer-events-none absolute left-0 top-0 z-30 hidden lg:block will-change-transform"
                                style={{ opacity: 0 }}
                            >
                                <div
                                    className={`relative h-72 w-56 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl border border-black/10 transition-all duration-300 ease-out ${
                                        active >= 0 ? "scale-100 opacity-100" : "scale-80 opacity-0"
                                    }`}
                                >
                                    {PRINCIPLES.map((p, i) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            key={p.title}
                                            src={p.image}
                                            alt=""
                                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
                                                active === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                            }`}
                                        />
                                    ))}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono tracking-wider uppercase z-10 flex items-center justify-between">
                                        <span className="font-semibold">{active >= 0 ? PRINCIPLES[active].title : ""}</span>
                                        <span className="text-[#ff5a1f]">0{active + 1}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- FAQ ---------------- */}
                <section className="rounded-xl bg-white px-5 py-16 text-black sm:px-8 lg:py-28">
                    <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-4">
                            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                                Questions we hear a lot
                            </h2>
                            <p className="mt-6 max-w-xs text-sm leading-[1.8] text-neutral-600">
                                Something missing? Say hello and we&apos;ll answer it
                                directly.
                            </p>
                        </div>

                        <div className="faq-list lg:col-span-8">
                            {FAQS.map((item, i) => {
                                const isOpen = open === i;
                                return (
                                    <div
                                        key={item.q}
                                        className="faq-item border-b border-black/15 first:border-t"
                                    >
                                        <h3>
                                            <button
                                                type="button"
                                                onClick={() => setOpen(isOpen ? -1 : i)}
                                                aria-expanded={isOpen}
                                                aria-controls={`faq-panel-${i}`}
                                                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-xl font-semibold tracking-[-0.02em] outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] sm:text-2xl"
                                            >
                                                <span>{item.q}</span>
                                                <PlusIcon open={isOpen} />
                                            </button>
                                        </h3>
                                        <div
                                            id={`faq-panel-${i}`}
                                            ref={(el) => (panels.current[i] = el)}
                                            style={{ height: i === 0 ? "auto" : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-2xl pb-7 text-sm leading-[1.8] text-neutral-600">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------------- CTA ---------------- */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-5 pb-6 pt-16 text-black sm:px-8 sm:pb-8 lg:pt-28">
                    <p className="cta-fade text-xs sm:text-sm">(Got an idea?)</p>

                    <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="text-[clamp(4.5rem,16vw,16rem)] font-semibold leading-[.75] tracking-[-.1em]">
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
                            className="cta-fade self-start p-6 lg:self-end lg:p-10"
                        >
                            <a
                                ref={btnRef}
                                href="mailto:hello@bugsmoker.com"
                                className="flex h-36 w-36 items-center justify-center rounded-full bg-black text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black sm:h-40 sm:w-40"
                            >
                                Start a<br />project
                            </a>
                        </div>
                    </div>

                    <div className="cta-fade mt-14 flex flex-col gap-2 border-t border-black/30 pt-5 text-xs sm:flex-row sm:justify-between sm:text-sm">
                        <a
                            href="mailto:hello@bugsmoker.com"
                            className="underline underline-offset-4"
                        >
                            hello@bugsmoker.com
                        </a>
                        <span>© Bugsmoker</span>
                    </div>
                </section>
            </div>
        </div>
    );
}