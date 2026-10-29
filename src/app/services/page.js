
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

const SERVICES = Object.values(servicesData.services);
const SERVICE_HREF = (slug) => `/services/${slug}`;

const TICKER = Array.from(
    new Set(SERVICES.flatMap((s) => s.featured.items.map((i) => i.title)))
);

const pad = (n) => String(n).padStart(2, "0");

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

export default function ServicesPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const trackRef = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);

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

    const jumpTo = (slug) => {
        const el = document.getElementById(`service-${slug}`);
        if (!el) return;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, {
                offset: -12,
                duration: 1.4,
            });
        } else {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
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

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
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
                        scrollTrigger: {
                            start: 0,
                            end: "max",
                            scrub: 0.3,
                        },
                    }
                );

                gsap.utils.toArray(".service-card").forEach((card) => {
                    gsap.from(card.querySelectorAll(".card-anim"), {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 75%",
                        },
                    });

                    gsap.from(card.querySelector(".card-img"), {
                        scale: 1.25,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 75%",
                        },
                    });
                });

                gsap.from(".cta-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: ".cta",
                        start: "top 70%",
                    },
                });

                gsap.from(".cta-fade", {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: ".cta",
                        start: "top 70%",
                    },
                });
            });

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
        <div
            ref={root}
            className="min-h-screen overflow-x-clip bg-black p-2 font-sans sm:p-3"
        >
            <Navbar />
            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            <div className="flex flex-col gap-3">
                {/* Hero */}
                <section className="hero flex min-h-[85svh] flex-col justify-between overflow-hidden rounded-xl bg-white px-4 pb-5 pt-5 text-black sm:min-h-[92vh] sm:px-8 sm:pb-8 sm:pt-6">
                    <div className="hero-fade flex items-start justify-between gap-4 text-xs sm:text-sm mt-[10vh]">
                        <span className="shrink-0">(Services)</span>

                        <span className="max-w-[200px] text-right leading-[1.5] text-neutral-600 sm:max-w-[220px]">
                            Everything we build, run and look after, in one place.
                        </span>
                    </div>

                    <div className="pt-16 sm:pt-32">
                        <div className="relative">
                            <span className="hero-fade absolute -top-6 right-0 text-sm font-semibold sm:-top-4 sm:text-base">
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

                                    <span className="break-words">{s.hero.titlePlain}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ticker */}
                <section className="overflow-hidden bg-black py-5">
                    <div
                        ref={trackRef}
                        className="flex w-max will-change-transform"
                    >
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

                {/* Service cards */}
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
                                    <div className="card-dim pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />

                                    <div className="grid h-full gap-7 p-4 sm:gap-8 sm:p-8 md:grid-cols-12 md:gap-12">
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
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white ${dark ? "bg-white text-black" : "bg-black text-white"
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

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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

                {/* CTA */}
                <section className="cta overflow-hidden rounded-xl bg-[#ff5a1f] px-4 pb-5 pt-12 text-black sm:px-8 sm:pb-8 sm:pt-16 lg:pt-28">
                    <p className="cta-fade text-xs sm:text-sm">
                        (Not sure which one you need?)
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