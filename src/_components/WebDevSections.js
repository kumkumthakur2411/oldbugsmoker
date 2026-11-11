"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function SplitWords({ text }) {
    if (!text) return null;
    return text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block">
            {word}
            {"\u00A0"}
        </span>
    ));
}

const PlusIcon = ({ open }) => (
    <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open
                ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
                : "border-black/20 text-black"
        }`}
    >
        <span className="absolute h-[2px] w-4 bg-current" />
        <span
            className={`absolute h-4 w-[2px] bg-current transition-transform duration-300 ${
                open ? "scale-y-0" : "scale-y-100"
            }`}
        />
    </span>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WebDevSections({ service }) {
    if (!service) return null;

    const {
        featured,
        content,
        problem,
        solution,
        paragraphs,
        faq,
    } = service;

    const featuredItems = featured?.items || [];
    const stats = content?.stats || [];
    const problemItems = problem?.items || [];
    const solutionItems = solution?.items || [];
    const paragraphItems = paragraphs?.items || [];
    const faqItems = faq?.items || [];

    const root = useRef(null);
    const featRef = useRef(null);
    const trackRef = useRef(null);
    const paraRef = useRef(null);
    const [open, setOpen] = useState(0);
    const [activeCard, setActiveCard] = useState(0);
    const panels = useRef([]);

    /* Mobile swiper helpers */
    const handleTrackScroll = () => {
        const el = trackRef.current;
        if (!el || window.innerWidth >= 1024) return;
        const card = el.firstElementChild;
        if (!card) return;
        const cardWidth = card.getBoundingClientRect().width + 14;
        const index = Math.round(el.scrollLeft / cardWidth);
        setActiveCard(Math.min(Math.max(index, 0), Math.max(featuredItems.length - 1, 0)));
    };

    const scrollToIndex = (index) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.firstElementChild;
        if (!card) return;
        const cardWidth = card.getBoundingClientRect().width + 14;
        el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
        setActiveCard(index);
    };

    /* Scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /* Featured cards: pinned horizontal scroll on desktop */
            if (featuredItems.length > 0) {
                mm.add(
                    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                    () => {
                        const track = trackRef.current;
                        if (!track) return;
                        const distance = () =>
                            track.scrollWidth - window.innerWidth + 96;

                        gsap.to(track, {
                            x: () => -distance(),
                            ease: "none",
                            scrollTrigger: {
                                trigger: featRef.current,
                                start: "top top",
                                end: () => "+=" + distance(),
                                pin: true,
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        });
                    }
                );
            }

            /* Paragraph section: one pinned screen, paragraphs swap on scroll */
            if (paragraphItems.length > 0) {
                mm.add(
                    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                    () => {
                        const items = gsap.utils.toArray(".para-item");
                        const nav = gsap.utils.toArray(".para-nav");
                        const n = items.length;
                        if (!n) return;

                        gsap.set(items, { autoAlpha: 0, y: 60 });
                        gsap.set(items[0], { autoAlpha: 1, y: 0 });
                        gsap.set(nav, { opacity: 0.35 });
                        gsap.set(nav[0], { opacity: 1 });

                        const tl = gsap.timeline({
                            defaults: { ease: "power2.inOut" },
                            scrollTrigger: {
                                trigger: paraRef.current,
                                start: "center center",
                                end: "+=" + n * 45 + "%",
                                pin: true,
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            },
                        });

                        tl.to({}, { duration: n - 0.5 }, 0);
                        tl.fromTo(
                            ".para-bar",
                            { scaleY: 1 / n },
                            { scaleY: 1, ease: "none", duration: n - 0.5 },
                            0
                        );

                        for (let i = 1; i < n; i++) {
                            const t = i - 1 + 0.6;
                            tl.to(
                                items[i - 1],
                                { autoAlpha: 0, y: -60, duration: 0.4 },
                                t
                            )
                                .to(nav[i - 1], { opacity: 0.35, duration: 0.3 }, t)
                                .fromTo(
                                    items[i],
                                    { autoAlpha: 0, y: 60 },
                                    { autoAlpha: 1, y: 0, duration: 0.4 },
                                    t + 0.1
                                )
                                .to(nav[i], { opacity: 1, duration: 0.3 }, t + 0.1);
                        }
                    }
                );
            }

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Featured heading */
                gsap.from(".feat-heading", {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featRef.current,
                        start: "top 80%",
                    },
                });

                /* Content: text reveal + image clip-path */
                const words = gsap.utils.toArray(".reveal-word");
                if (words.length > 0) {
                    gsap.from(words, {
                        opacity: 0.15,
                        stagger: 0.04,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".reveal-text",
                            start: "top 85%",
                            end: "bottom 60%",
                            scrub: true,
                        },
                    });
                }

                gsap.fromTo(
                    ".content-img-inner",
                    { clipPath: "inset(12% round 16px)" },
                    {
                        clipPath: "inset(0% round 16px)",
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".content-img",
                            start: "top 80%",
                        },
                    }
                );

                /* Stats counter */
                gsap.utils.toArray(".stat-num").forEach((el) => {
                    const target = parseFloat(el.dataset.value) || 0;
                    gsap.fromTo(
                        el,
                        { innerText: 0 },
                        {
                            innerText: target,
                            duration: 1.6,
                            ease: "power2.out",
                            snap: { innerText: 1 },
                            scrollTrigger: {
                                trigger: el,
                                start: "top 85%",
                            },
                        }
                    );
                });

                /* Problem rows line animation */
                gsap.utils.toArray(".problem-row").forEach((row) => {
                    gsap.from(row.querySelectorAll(".problem-body"), {
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                        },
                    });
                    gsap.fromTo(
                        row.querySelector(".problem-line"),
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 85%",
                            },
                        }
                    );
                });

                /* Solution cards */
                gsap.utils.toArray(".solution-card").forEach((card) => {
                    gsap.from(card, {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    });
                    gsap.fromTo(
                        card.querySelector(".solution-bar"),
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            transformOrigin: "top center",
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 80%",
                                end: "bottom 50%",
                                scrub: true,
                            },
                        }
                    );
                });

                /* FAQ heading */
                gsap.from(".faq-item", {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: ".faq-list",
                        start: "top 80%",
                    },
                });
            });
        }, root);

        return () => ctx.revert();
    }, [service]);

    /* FAQ accordion: animates in response to the click */
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

    // Problem heading split
    const probHeading = problem?.heading || "";
    const probWords = probHeading.split(" ");
    const probSplitIdx =
        probWords.length > 3
            ? Math.ceil(probWords.length * 0.55)
            : probWords.length;
    const probFirst = probWords.slice(0, probSplitIdx).join(" ");
    const probSecond = probWords.slice(probSplitIdx).join(" ");

    return (
        <div ref={root} className="font-['Outfit']">
            {/* ---------------- 1. Featured cards ---------------- */}
            {featuredItems.length > 0 && (
                <section
                    ref={featRef}
                    className="relative w-full bg-white text-black lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
                >
                    <div className="w-full pt-8 pb-12 sm:py-16 lg:py-0">
                        <div className="feat-heading mb-6 flex w-full flex-col gap-3 px-5 sm:mb-8 sm:px-8 md:px-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:px-16">
                            <div>
                                <h2 className="max-w-3xl text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94]">
                                    {featured?.heading}
                                </h2>
                            </div>
                            {featured?.subheading && (
                                <div className="lg:flex lg:flex-col lg:items-end">
                                    <p className="max-w-sm text-xs sm:text-sm leading-[1.7] text-neutral-600 md:text-[15px]">
                                        {featured.subheading}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Swiper track on mobile / horizontal scroll on desktop */}
                        <div
                            ref={trackRef}
                            onScroll={handleTrackScroll}
                            className="flex w-full flex-row gap-3.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 sm:px-8 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:w-max lg:overflow-visible lg:snap-none lg:gap-6 lg:px-16"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            {featuredItems.map((f, i) => (
                                <article
                                    key={f.title || i}
                                    className="group relative h-[270px] xs:h-[295px] sm:h-[340px] w-[80vw] max-w-[310px] xs:w-[76vw] sm:w-[340px] shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-900 shadow-md transition-all duration-300 lg:h-[56vh] lg:w-[34vw] lg:max-w-[520px] lg:shadow-none"
                                >
                                    {f.img && (
                                        <Image
                                            src={f.img}
                                            alt={f.title}
                                            fill
                                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 340px, 34vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            style={{ objectPosition: f.pos || "center" }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

                                    {/* Card Counter Chip */}
                                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                                        <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-medium text-white/90">
                                            {`0${i + 1} · 0${featuredItems.length}`}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 sm:gap-3 p-4 sm:p-6 lg:p-8 text-white">
                                        <span className="h-1 w-8 rounded-full bg-[#ff5a1f] transition-all duration-500 group-hover:w-20" />
                                        <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.03em]">
                                            {f.title}
                                        </h3>
                                        <p className="line-clamp-2 sm:line-clamp-none max-w-xs text-xs sm:text-sm leading-[1.6] text-white/80">
                                            {f.text}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Mobile Pagination Dots */}
                        <div className="mt-5 flex items-center justify-center gap-1.5 lg:hidden">
                            {featuredItems.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeCard === idx
                                            ? "w-6 bg-[#ff5a1f]"
                                            : "w-1.5 bg-black/25 hover:bg-black/50"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- 2. Content & Stats ---------------- */}
            {content && (
                <section className="w-full overflow-hidden bg-white px-5 py-12 text-black sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-28">
                    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-20">
                        {/* Text + Stats */}
                        <div className="min-w-0 lg:col-span-7">
                            {content.quote && (
                                <p className="reveal-text max-w-3xl text-[clamp(1.5rem,6.5vw,2.7rem)] font-semibold leading-[1.14] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                                    <SplitWords text={content.quote} />
                                </p>
                            )}

                            {/* Stats */}
                            {stats.length > 0 && (
                                <div className="mt-8 grid grid-cols-3 gap-x-5 gap-y-8 border-t border-black/10 pt-6 sm:mt-12 sm:gap-x-8 sm:gap-y-10 sm:pt-9 lg:mt-16 lg:grid-cols-3 lg:gap-8 lg:pt-12">
                                    {stats.map((s) => (
                                        <div key={s.label} className="min-w-0">
                                            <div className="flex items-baseline whitespace-nowrap text-[clamp(2.5rem,10vw,4rem)] font-bold leading-none tracking-[-0.065em] lg:text-7xl">
                                                <span className="stat-num" data-value={s.value}>
                                                    {s.value}
                                                </span>
                                                <span className="text-[#ff5a1f]">{s.suffix}</span>
                                            </div>

                                            <p className="mt-3 max-w-[180px] break-words text-xs leading-[1.7] text-neutral-600 sm:text-sm">
                                                {s.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Image */}
                        {content.image && (
                            <div className="min-w-0 lg:col-span-5">
                                <div className="content-img relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-neutral-900 sm:aspect-[4/3] lg:aspect-[4/5] lg:rounded-2xl">
                                    <div className="content-img-inner absolute inset-0">
                                        <Image
                                            src={content.image}
                                            alt={content.imageAlt || "Bugsmoker work"}
                                            fill
                                            sizes="(max-width: 1023px) 100vw, 40vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ---------------- 3. Problem ---------------- */}
            {problemItems.length > 0 && (
                <section className="w-full overflow-hidden bg-black px-5 py-12 text-white sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-28">
                    <div className="mx-auto max-w-[1400px]">
                        {/* Heading */}
                        <div className="flex items-end justify-between gap-6">
                            <h2 className="max-w-4xl text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94]">
                                <span className="block">{probFirst}</span>
                                {probSecond && (
                                    <span className="block text-white/45">{probSecond}</span>
                                )}
                            </h2>

                            <span className="mb-1 hidden shrink-0 text-xs uppercase tracking-[0.15em] text-white/40 md:block">
                                The problems
                                <br />
                                worth fixing.
                            </span>
                        </div>

                        {/* Problem rows */}
                        <div className="mt-8 sm:mt-10 lg:mt-16">
                            {problemItems.map((p, i) => (
                                <div
                                    key={p.title || i}
                                    className="problem-row relative py-5 sm:py-6 lg:py-9"
                                >
                                    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:items-center lg:gap-10">
                                        {/* Number + title */}
                                        <div className="flex min-w-0 items-start gap-3 lg:col-span-6 lg:gap-5">
                                            <span className="problem-body mt-1 shrink-0 text-[10px] font-medium tracking-[0.12em] text-[#ff5a1f] sm:text-xs">
                                                ({String(i + 1).padStart(2, "0")})
                                            </span>

                                            <h3 className="problem-body min-w-0 text-[clamp(1.5rem,6.5vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                                                {p.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="problem-body ml-7 max-w-xl text-[13px] leading-[1.8] text-white/60 sm:ml-8 sm:text-sm sm:leading-[1.85] md:text-[15px] lg:col-span-5 lg:col-start-8 lg:ml-0">
                                            {p.text}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <span className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
                                    <span className="problem-line absolute inset-x-0 bottom-0 h-px origin-left bg-[#ff5a1f]" />
                                </div>
                            ))}
                        </div>

                        {/* Closing note */}
                        <div className="mt-7 flex items-center justify-between gap-4 sm:mt-9">
                            <p className="max-w-[250px] text-xs leading-[1.7] text-white/45 sm:max-w-none sm:text-sm">
                                Small problems. Lost opportunities. Better solutions.
                            </p>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg text-[#ff5a1f] sm:h-10 sm:w-10">
                                ↘
                            </span>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- 4. Solution ---------------- */}
            {solutionItems.length > 0 && (
                <section className="w-full bg-white px-5 py-12 text-black sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-28">
                    <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-20">
                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-24">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 font-['Outfit']">
                                        Strategic Answers
                                    </span>
                                </div>
                                <h2 className="text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94]">
                                    {solution?.heading}
                                </h2>
                                {solution?.subheading && (
                                    <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-neutral-600 md:text-[14px]">
                                        {solution.subheading}
                                    </p>
                                )}
                                {solution?.image && (
                                    <div className="relative mt-6 hidden aspect-[16/10] w-full max-w-[380px] overflow-hidden rounded-xl bg-neutral-900 lg:block shadow-sm">
                                        <Image
                                            src={solution.image}
                                            alt={solution.imageAlt || "Bugsmoker solution"}
                                            fill
                                            sizes="30vw"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3.5 sm:gap-4 lg:col-span-7">
                            {solutionItems.map((s) => (
                                <article
                                    key={s.title}
                                    className="solution-card relative overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 bg-white p-4 pl-6 sm:p-5 sm:pl-7 lg:p-6 lg:pl-8 transition-colors duration-300 hover:border-[#ff5a1f]"
                                >
                                    <span className="solution-bar absolute left-0 top-0 h-full w-1 sm:w-1.5 origin-top bg-[#ff5a1f]" />
                                    {s.fixes && (
                                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#ff5a1f]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                            <span>Fixes // {s.fixes.toLowerCase()}</span>
                                        </div>
                                    )}
                                    <h3 className="mt-2 text-base xs:text-lg sm:text-xl lg:text-2xl font-bold leading-snug tracking-[-0.02em]">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-neutral-600">
                                        {s.text}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- 5. Paragraphs ---------------- */}
            {paragraphItems.length > 0 && (
                <section
                    ref={paraRef}
                    className="w-full px-5 py-12 text-black sm:px-8 md:px-12 lg:px-16 lg:py-28"
                >
                    <div className="mx-auto grid w-full max-w-[1400px] gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-20">
                        {/* Left: heading + progress list (desktop) */}
                        <div className="lg:col-span-5">
                            <h2 className="text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94]">
                                {paragraphs?.heading}
                            </h2>

                            <div className="relative mt-12 hidden lg:block">
                                <span className="absolute left-0 top-0 h-full w-[3px] bg-black/20" />
                                <span className="para-bar absolute left-0 top-0 h-full w-[3px] origin-top bg-black" />
                                <ul className="flex flex-col gap-3 pl-6">
                                    {paragraphItems.map((p) => (
                                        <li
                                            key={p.title}
                                            className="para-nav text-lg font-semibold tracking-[-0.02em]"
                                        >
                                            {p.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: paragraphs */}
                        <div className="relative flex flex-col gap-10 lg:col-span-7 lg:block lg:min-h-[320px] lg:h-[360px] lg:gap-0">
                            {paragraphItems.map((p) => (
                                <div
                                    key={p.title}
                                    className="para-item border-t border-black/30 pt-6 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center lg:border-0 lg:pt-0"
                                >
                                    <h3 className="text-2xl font-bold tracking-[-0.03em] lg:hidden">
                                        {p.title}
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-base font-medium leading-[1.6] sm:text-lg lg:mt-0 lg:text-[1.75rem] lg:leading-[1.35] lg:tracking-[-0.02em]">
                                        {p.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------------- 6. FAQ ---------------- */}
            {faqItems.length > 0 && (
                <section className="w-full bg-neutral-50 px-5 py-12 text-black sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-28">
                    <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-20">
                        <div className="lg:col-span-4">
                            <h2 className="text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94]">
                                {faq?.heading}
                            </h2>
                            {faq?.subheading && (
                                <p className="mt-6 max-w-xs text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                                    {faq.subheading}
                                </p>
                            )}
                            <Link
                                href={faq?.contactButtonHref || "#contact"}
                                className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff5a1f] hover:shadow-xl hover:shadow-[#ff5a1f]/25 active:scale-95"
                            >
                                {faq?.contactButtonText || "Contact Us"}
                            </Link>
                        </div>

                        <div className="faq-list lg:col-span-8">
                            {faqItems.map((item, i) => {
                                const isOpen = open === i;
                                return (
                                    <div
                                        key={item.q}
                                        className="faq-item border-b border-black/15 first:border-t"
                                    >
                                        <h3>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpen(isOpen ? -1 : i)
                                                }
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
                                            <p className="max-w-2xl pb-7 text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
