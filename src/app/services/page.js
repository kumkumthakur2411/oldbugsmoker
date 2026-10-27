"use client";

/*
  Install once:  npm i gsap lenis
  Data:          adjust the import path below to wherever your services JSON lives.
  Links:         each card links to /services/[slug]. Change SERVICE_HREF if your route differs.
*/

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import servicesData from "@/data/data.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = Object.values(servicesData.services);
const SERVICE_HREF = (slug) => `/services/${slug}`;

/* Every featured item title across all services, de-duplicated, for the ticker */
const TICKER = Array.from(
    new Set(SERVICES.flatMap((s) => s.featured.items.map((i) => i.title)))
);

const pad = (n) => String(n).padStart(2, "0");

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

const Arrow = () => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const trackRef = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);

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

    /* Ticker strip: speeds up and skews with scroll velocity */
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
            const unit = track.scrollWidth / 2; // two identical copies
            x -= (70 + v * 45) * (delta / 1000);
            if (x <= -unit) x += unit;
            if (x > 0) x -= unit;
            gsap.set(track, { x });
            setSkew(gsap.utils.clamp(-8, 8, -v * 0.4));
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    /* Jump to a service card from the hero index */
    const jumpTo = (slug) => {
        const el = document.getElementById(`service-${slug}`);
        if (!el) return;
        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -12, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
                    stagger: 0.08,
                    delay: 0.6,
                });

                /* Counter next to the headline */
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

                /* Each card's content rises in when it comes into view */
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

            /* Stacking: as the next card slides over, the previous one shrinks and dims */
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

    return (
        <div ref={root} className="min-h-screen bg-black p-3 font-sans">
            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            <div className="flex flex-col gap-3">
                {/* ---------------- Hero ---------------- */}
                <section className="hero flex min-h-[92vh] flex-col justify-between overflow-hidden rounded-xl bg-white px-5 pb-6 pt-6 text-black sm:px-8 sm:pb-8">
                    <div className="hero-fade flex items-start justify-between text-xs sm:text-sm">
                        <span>(Services)</span>
                        <span className="max-w-[220px] text-right leading-[1.5] text-neutral-600">
                            Everything we build, run and look after, in one place.
                        </span>
                    </div>

                    <div className="pt-24 sm:pt-32">
                        <div className="relative">
                            <span className="hero-fade absolute -top-2 right-0 text-sm font-semibold sm:text-base lg:-top-4">
                                (
                                <span
                                    className="hero-count tabular-nums"
                                    data-total={SERVICES.length}
                                >
                                    {pad(SERVICES.length)}
                                </span>
                                )
                            </span>

                            <h1 className="hero-title text-[clamp(4rem,12vw,12.5rem)] font-semibold leading-[.73] tracking-[-.1em]">
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

                        {/* Index: click to jump to a service */}
                        <div className="hero-fade mt-10 flex flex-wrap gap-2 border-t border-black/15 pt-5">
                            {SERVICES.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => jumpTo(s.slug)}
                                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-xs transition-colors duration-300 hover:border-black hover:bg-black hover:text-white sm:text-sm"
                                >
                                    <span className="text-[#ff5a1f]">{pad(i + 1)}</span>
                                    <span>{s.hero.titlePlain}</span>
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
                                className="mr-10 inline-flex items-center gap-10 whitespace-nowrap text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl"
                            >
                                {title}
                                <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
                            </span>
                        ))}
                    </div>
                </section>

                {/* ---------------- Service cards (stack on scroll) ---------------- */}
                <section className="flex flex-col gap-3">
                    {SERVICES.map((s, i) => {
                        const dark = i % 2 === 1;
                        const stat = s.content.stats[0];
                        return (
                            <article
                                key={s.id}
                                id={`service-${s.slug}`}
                                className="service-card relative md:sticky md:top-3 md:h-[calc(100svh-1.5rem)]"
                            >
                                <div
                                    className={`card-inner relative h-full origin-top overflow-hidden rounded-xl ${dark
                                        ? "border border-white/10 bg-neutral-900 text-white"
                                        : "bg-white text-black"
                                        }`}
                                >
                                    <div className="card-dim pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />

                                    <div className="grid h-full gap-8 p-5 sm:p-8 md:grid-cols-12 md:gap-12">
                                        {/* Text */}
                                        <div className="flex flex-col justify-between gap-10 md:col-span-6">
                                            <div className="card-anim flex items-center justify-between text-xs sm:text-sm">
                                                <span>
                                                    <span className="text-[#ff5a1f]">({pad(i + 1)})</span>
                                                    <span className="opacity-50">
                                                        {" "}
                                                        / {pad(SERVICES.length)}
                                                    </span>
                                                </span>
                                                <span className="opacity-60">
                                                    {s.featured.items.length} specialities
                                                </span>
                                            </div>

                                            <div>
                                                <Link href={SERVICE_HREF(s.slug)} className="group block">
                                                    <h2 className="card-anim break-words text-[clamp(2.6rem,6vw,6rem)] font-semibold lowercase leading-[.9] tracking-[-0.06em] transition-colors duration-300 group-hover:text-[#ff5a1f]">
                                                        {s.hero.titlePlain}
                                                    </h2>
                                                </Link>

                                                <p
                                                    className={`card-anim mt-6 max-w-md text-sm leading-[1.8] md:text-[15px] ${dark ? "text-white/70" : "text-neutral-600"
                                                        }`}
                                                >
                                                    {s.metadata.description}
                                                </p>

                                                <div className="card-anim mt-6 flex flex-wrap gap-2">
                                                    {s.featured.items.map((f) => (
                                                        <span
                                                            key={f.title}
                                                            className={`rounded-full border px-3 py-1.5 text-xs ${dark ? "border-white/20" : "border-black/20"
                                                                }`}
                                                        >
                                                            {f.title}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link
                                                href={SERVICE_HREF(s.slug)}
                                                className="card-anim group inline-flex w-fit items-center gap-3 text-sm font-semibold"
                                            >
                                                <span>View service</span>
                                                <span
                                                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white ${dark ? "bg-white text-black" : "bg-black text-white"
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
                                            className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-neutral-800 md:col-span-6 md:aspect-auto md:h-full"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={s.hero.image}
                                                alt={s.hero.imageAlt}
                                                className="card-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            <div className="card-anim absolute bottom-4 left-4 flex items-baseline gap-2 rounded-full bg-white px-4 py-2 text-black">
                                                <span className="text-lg font-semibold tracking-[-0.03em]">
                                                    {stat.value}
                                                    <span className="text-[#ff5a1f]">{stat.suffix}</span>
                                                </span>
                                                <span className="text-xs">{stat.label}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* ---------------- CTA ---------------- */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-5 pb-6 pt-16 text-black sm:px-8 sm:pb-8 lg:pt-28">
                    <p className="cta-fade text-xs sm:text-sm">
                        (Not sure which one you need?)
                    </p>

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