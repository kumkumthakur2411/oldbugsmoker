"use client";

import React, { useEffect, useRef } from "react";
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

const pad = (n) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

const ArrowDown = ({ size = 18 }) => (
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
        <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const trackRef = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);
    const cursorRef = useRef(null);

    /* Smooth scroll (Lenis) wired into GSAP's ticker */
    useEffect(() => {
        if (prefersReducedMotion()) return;

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
        if (!track || prefersReducedMotion()) return;

        let x = 0;
        const setSkew = gsap.quickTo(track, "skewX", {
            duration: 0.4,
            ease: "power3",
        });

        const tick = (time, delta) => {
            const v = lenisRef.current ? lenisRef.current.velocity : 0;
            const unit = track.scrollWidth / 2;
            x -= (60 + v * 45) * (delta / 1000);
            if (x <= -unit) x += unit;
            if (x > 0) x -= unit;
            gsap.set(track, { x });
            setSkew(gsap.utils.clamp(-8, 8, -v * 0.4));
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    /* Cursor chip over service images (desktop with a mouse only) */
    useEffect(() => {
        const chip = cursorRef.current;
        const host = root.current;
        if (!chip || !host) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            return;

        gsap.set(chip, { xPercent: -50, yPercent: -50, scale: 0 });
        const moveX = gsap.quickTo(chip, "x", { duration: 0.35, ease: "power3" });
        const moveY = gsap.quickTo(chip, "y", { duration: 0.35, ease: "power3" });

        const targets = Array.from(host.querySelectorAll("[data-cursor]"));

        const onEnter = (e) => {
            gsap.set(chip, { x: e.clientX, y: e.clientY });
            gsap.to(chip, {
                scale: 1,
                duration: 0.45,
                ease: "back.out(1.7)",
                overwrite: "auto",
            });
        };
        const onMove = (e) => {
            moveX(e.clientX);
            moveY(e.clientY);
        };
        const onLeave = () =>
            gsap.to(chip, {
                scale: 0,
                duration: 0.3,
                ease: "power3.in",
                overwrite: "auto",
            });

        targets.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            targets.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mousemove", onMove);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    const scrollToId = (id, offset = -90) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset, duration: 1.4 });
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
                    stagger: 0.1,
                    delay: 0.5,
                });
                gsap.to(".hero-title", {
                    yPercent: -8,
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

                /* List header */
                gsap.from(".list-head-anim", {
                    y: 36,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ".list-head", start: "top 85%" },
                });

                /* Service rows */
                gsap.utils.toArray(".service-row").forEach((row) => {
                    const trigger = { trigger: row, start: "top 85%" };

                    gsap.fromTo(
                        row.querySelector(".row-line"),
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: trigger,
                        }
                    );
                    gsap.from(row.querySelectorAll(".row-anim"), {
                        y: 30,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.07,
                        scrollTrigger: trigger,
                    });
                    gsap.fromTo(
                        row.querySelector(".row-img-wrap"),
                        { clipPath: "inset(0% 0% 100% 0% round 14px)" },
                        {
                            clipPath: "inset(0% 0% 0% 0% round 14px)",
                            duration: 1.3,
                            ease: "power4.inOut",
                            scrollTrigger: trigger,
                        }
                    );
                    gsap.from(row.querySelector(".row-img"), {
                        scale: 1.25,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: trigger,
                    });
                    gsap.fromTo(
                        row.querySelector(".row-img"),
                        { yPercent: -6 },
                        {
                            yPercent: 6,
                            ease: "none",
                            scrollTrigger: {
                                trigger: row,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });

                /* Stats band */
                gsap.from(".stat-item", {
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ".stats", start: "top 80%" },
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
                            start: "top 92%",
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
                            scrollTrigger: { trigger: step, start: "top 88%" },
                        }
                    );
                    gsap.from(step.querySelectorAll(".proc-anim"), {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: step, start: "top 88%" },
                    });
                });

                /* CTA */
                gsap.from(".cta-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".cta", start: "top 75%" },
                });
                gsap.from(".cta-fade", {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.3,
                    scrollTrigger: { trigger: ".cta", start: "top 75%" },
                });
            });
        }, root);

        /* Images change layout once loaded, so re-measure triggers */
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            ctx.revert();
        };
    }, []);

    return (
        <div
            ref={root}
            className="min-h-screen overflow-x-clip bg-black p-2 font-sans sm:p-3"
        >
            <Navbar />

            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            {/* Cursor chip (desktop with a mouse only) */}
            <div
                ref={cursorRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-20 w-20 scale-0 items-center justify-center rounded-full bg-[#ff5a1f] text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-xl shadow-black/30 [@media(hover:hover)_and_(pointer:fine)]:flex"
            >
                View
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
               
<section className="hero relative flex min-h-[78svh] flex-col justify-end overflow-hidden rounded-xl 
bg-[#f5f5f2] px-5 py-6 text-[#171717] sm:min-h-[88vh] sm:px-10 sm:py-8 lg:px-12">

    <div className="relative mt-20 sm:mt-0">
        

        <h1 className="hero-title text-[clamp(4rem,15vw,13rem)] font-semibold leading-[0.78] tracking-[-0.085em]">
            <span className="hero-line block">
                <MaskLine>what we</MaskLine>
            </span>

            <span className="hero-line mt-[0.08em] block">
                <MaskLine>
                    do<span className="text-[#ff5a1f]">.</span>
                </MaskLine>
            </span>
        </h1>
         <div className="mt-5 flex flex-col justify-between gap-6 border-t border-black/15 pt-5 sm:flex-row sm:items-end sm:pt-6">

        <p className="max-w-[310px] text-sm leading-relaxed text-black/55 sm:text-base">
            We turn complex business problems into simple,
            thoughtful and powerful digital experiences.
        </p>

        
    </div>
    </div>

    {/* Bottom information */}
   

</section>


                {/* ---------------- Ticker ---------------- */}
                <section className="overflow-hidden bg-black py-4 sm:py-5">
                    <div ref={trackRef} className="flex w-max will-change-transform">
                        {[...TICKER, ...TICKER].map((title, i) => (
                            <span
                                key={`${title}-${i}`}
                                aria-hidden={i >= TICKER.length}
                                className="mr-6 inline-flex shrink-0 items-center gap-6 whitespace-nowrap text-xl font-semibold tracking-[-0.03em] text-white sm:mr-10 sm:gap-10 sm:text-4xl"
                            >
                                {title}
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f] sm:h-2 sm:w-2" />
                            </span>
                        ))}
                    </div>
                </section>

                {/* ---------------- Services list ---------------- */}
                <section
                    id="services"
                    className="rounded-xl bg-white px-4 pb-4 pt-12 text-black sm:px-8 sm:pb-8 lg:pt-24"
                >
                    <div className="mx-auto max-w-[1400px]">
                        

                        <div className="group/list">
                            {SERVICES.map((s, i) => (
                                <article
                                    key={s.id}
                                    id={`service-${s.slug}`}
                                    className="service-row relative transition-opacity duration-500 md:group-hover/list:opacity-40 md:hover:!opacity-100"
                                >
                                 
   <span className="row-line absolute left-0 top-0 h-px w-full origin-left bg-black/15" />
                                    <div className="grid gap-5 py-6 sm:py-8 md:grid-cols-12 md:items-center md:gap-10 lg:py-12">
                                        {/* Image: first on mobile */}
                                        <Link
                                            href={SERVICE_HREF(s.slug)}
                                            aria-label={`View ${s.hero.titlePlain}`}
                                            data-cursor
                                            className="group relative order-1 block min-w-0 md:order-2 md:col-span-5"
                                        >
                                            <div className="row-img-wrap relative aspect-[16/11] overflow-hidden rounded-[14px] bg-neutral-200 md:aspect-[4/3]">
                                                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={s.hero.image}
                                                        alt={s.hero.imageAlt}
                                                        loading="lazy"
                                                        className="row-img absolute -top-[10%] left-0 h-[120%] w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Text */}
                                        <div className="order-2 min-w-0 md:order-1 md:col-span-7">
                                            <p className="row-anim text-xs text-[#ff5a1f] sm:text-sm">
                                                ({pad(i + 1)})
                                            </p>

                                            <Link
                                                href={SERVICE_HREF(s.slug)}
                                                className="group mt-3 flex items-start justify-between gap-4 sm:mt-4"
                                            >
                                                <h3 className="row-anim min-w-0 break-words text-[clamp(2rem,9vw,3.25rem)] font-semibold lowercase leading-[.95] tracking-[-0.06em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#ff5a1f] sm:text-[clamp(2.6rem,5vw,5.5rem)]">
                                                    {s.hero.titlePlain}
                                                </h3>

                                                <span className="row-anim mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] sm:h-14 sm:w-14">
                                                    <Arrow size={20} />
                                                </span>
                                            </Link>

                                            <p className="row-anim mt-3 line-clamp-2 max-w-md text-sm leading-[1.7] text-neutral-600 sm:mt-5 sm:text-[15px]">
                                                {s.metadata.description}
                                            </p>
                                        </div>
                                        
                                    </div>
                                    
                                </article>
                            ))}
                            <div className="h-px w-full bg-black/15" />
                        </div>
                    </div>
                </section>

                {/* ---------------- Stats band ---------------- */}
                <section className="stats rounded-xl border border-white/10 bg-neutral-900 px-4 py-12 text-white sm:px-8 lg:py-24">
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

                        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-8 lg:mt-20 lg:grid-cols-4 lg:pt-10">
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
                <section className="rounded-xl bg-white px-4 py-12 text-black sm:px-8 lg:py-24">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                                How every project moves
                            </h2>
                            <p className="max-w-xs text-sm leading-[1.8] text-neutral-600">
                                The same four steps whichever service you pick.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
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

                {/* ---------------- CTA ---------------- */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-4 pb-5 pt-12 text-black sm:px-8 sm:pb-8 sm:pt-16 lg:pt-28">
                    <p className="cta-fade text-xs sm:text-sm">
                        (Still not sure? Just talk to us.)
                    </p>

                    <div className="mt-6 flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="text-[clamp(3.6rem,19vw,16rem)] font-semibold leading-[.8] tracking-[-0.08em] sm:text-[clamp(4.5rem,16vw,16rem)] sm:leading-[.75] sm:tracking-[-.1em]">
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