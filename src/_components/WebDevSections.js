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
/* Content (swap any of this copy later)                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
    {
        title: "Bespoke websites",
        text: "Designed from a blank page around your brand, never a template.",
        img: "/home/1.png",
        pos: "center top",
    },
    {
        title: "Web applications",
        text: "Dashboards, portals and tools that stay fast as your users grow.",
        img: "/home/new1.png",
        pos: "center",
    },
    {
        title: "Interactive animation",
        text: "Scroll, motion and micro-interactions that guide people forward.",
        img: "/home/mos.png",
        pos: "left center",
    },
    {
        title: "Search optimization",
        text: "Clean markup and quick pages that search engines reward.",
        img: "/home/1.png",
        pos: "center bottom",
    },
];

const STATS = [
    { value: 60, suffix: "+", label: "sites and apps shipped" },
    { value: 98, suffix: "", label: "average Lighthouse score" },
    { value: 3, suffix: "x", label: "typical lift in engagement" },
];

const PROBLEMS = [
    {
        title: "Your site loads slowly",
        text: "Visitors leave before the first screen finishes painting.",
    },
    {
        title: "It looks like everyone else",
        text: "A recycled template makes your brand easy to forget.",
    },
    {
        title: "It breaks on phones",
        text: "Most of your traffic arrives on a small screen and gets a bad one.",
    },
    {
        title: "Nobody can find it",
        text: "Good work stays hidden when search engines can't read it.",
    },
];

const SOLUTIONS = [
    {
        fixes: "Slow loading",
        title: "Performance built in from day one",
        text: "Optimized images, lean code and server rendering keep every page quick on any connection.",
    },
    {
        fixes: "Generic look",
        title: "A design made only for you",
        text: "We start from your story and your audience, then build the interface and motion around it.",
    },
    {
        fixes: "Broken on phones",
        title: "Designed for the smallest screen first",
        text: "Every layout is tested on real devices before it reaches a laptop.",
    },
    {
        fixes: "Hard to find",
        title: "Search-ready structure",
        text: "Semantic markup, fast pages and clear metadata give you a solid base to rank from.",
    },
];

const FAQS = [
    {
        q: "How long does a web development project take?",
        a: "A focused marketing site usually takes three to five weeks. Larger web applications run eight to sixteen weeks, depending on features and integrations. You get a timeline before we start.",
    },
    {
        q: "What technologies do you use?",
        a: "We build with Next.js and React, animate with GSAP, and pair them with the backend and database that suit your product. We pick tools for the job, not for trends.",
    },
    {
        q: "Will my website work well on mobile?",
        a: "Yes. We design and test for phones and tablets first, then scale up to desktop.",
    },
    {
        q: "Do you handle SEO and performance?",
        a: "Both are part of every build: clean structure, optimized media, metadata and speed checks before launch.",
    },
    {
        q: "Can you redesign or extend my existing site?",
        a: "Yes. We can refresh the design, rebuild it on a faster stack, or add new features to what you already have.",
    },
    {
        q: "What happens after launch?",
        a: "We stay on for support and improvements. You can choose a maintenance plan or hand off with full documentation.",
    },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function SplitWords({ text }) {
    return text.split(" ").map((word, i) => (
        <span key={i} className="reveal-word inline-block">
            {word}
            {"\u00A0"}
        </span>
    ));
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
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export default function WebDevSections() {
    const root = useRef(null);
    const featRef = useRef(null);
    const trackRef = useRef(null);
    const [open, setOpen] = useState(0);
    const panels = useRef([]);

    /* Scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /* Featured cards: pinned horizontal scroll on desktop */
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

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Featured heading */
                gsap.from(".feat-heading", {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featRef.current,
                        start: "top 75%",
                    },
                });

                /* Content: word-by-word reveal tied to scroll */
                gsap.fromTo(
                    ".reveal-word",
                    { opacity: 0.12 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: ".reveal-text",
                            start: "top 80%",
                            end: "bottom 45%",
                            scrub: true,
                        },
                    }
                );

                /* Content image parallax */
                gsap.fromTo(
                    ".content-img-inner",
                    { yPercent: -12, scale: 1.15 },
                    {
                        yPercent: 12,
                        scale: 1.15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".content-img",
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                /* Stat counters */
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

                /* Problems: each row draws its line and brightens as it passes */
                gsap.utils.toArray(".problem-row").forEach((row) => {
                    const line = row.querySelector(".problem-line");
                    const body = row.querySelectorAll(".problem-body");

                    gsap.fromTo(
                        body,
                        { opacity: 0.25 },
                        {
                            opacity: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 85%",
                                end: "top 55%",
                                scrub: true,
                            },
                        }
                    );
                    gsap.fromTo(
                        line,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            ease: "none",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 85%",
                                end: "top 50%",
                                scrub: true,
                            },
                        }
                    );
                });

                /* Solutions: cards slide in from the right */
                gsap.utils.toArray(".solution-card").forEach((card) => {
                    gsap.from(card, {
                        x: 90,
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
    }, []);

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

    return (
        <div ref={root} className="font-['Outfit']">
            {/* ---------------- Featured cards ---------------- */}
            <section
                ref={featRef}
                className="relative w-full bg-white text-black lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
            >
                <div className="w-full py-20 lg:py-0">
                    <div className="feat-heading mb-10 flex flex-col gap-4 px-5 sm:px-8 md:px-12 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:px-16">
                        <h2 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                            What we build under web development
                        </h2>
                        <p className="max-w-sm text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                            Four things we do every week. Scroll sideways
                            through them.
                        </p>
                    </div>

                    <div
                        ref={trackRef}
                        className="flex flex-col gap-5 px-5 sm:px-8 md:grid md:grid-cols-2 md:px-12 lg:flex lg:w-max lg:flex-row lg:gap-6 lg:px-16"
                    >
                        {FEATURES.map((f, i) => (
                            <article
                                key={f.title}
                                className="group relative h-[420px] w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-900 lg:h-[56vh] lg:w-[34vw] lg:max-w-[520px]"
                            >
                                <Image
                                    src={f.img}
                                    alt={f.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 34vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    style={{ objectPosition: f.pos }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white sm:p-8">
                                    <span className="h-1 w-10 rounded-full bg-[#ff5a1f] transition-all duration-500 group-hover:w-24" />
                                    <h3 className="text-3xl font-bold leading-none tracking-[-0.03em] sm:text-4xl">
                                        {f.title}
                                    </h3>
                                    <p className="max-w-xs text-sm leading-[1.7] text-white/80">
                                        {f.text}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Content ---------------- */}
            <section className="w-full bg-white px-5 py-24 text-black sm:px-8 md:px-12 lg:px-16 lg:py-36">
                <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <p className="reveal-text text-3xl font-semibold leading-[1.15] tracking-[-0.04em] sm:text-4xl md:text-5xl">
                            <SplitWords text="A website is the first conversation you have with a customer. We make sure it is fast, memorable and impossible to scroll past without feeling something." />
                        </p>

                        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 sm:grid-cols-3">
                            {STATS.map((s) => (
                                <div key={s.label}>
                                    <div className="flex items-baseline text-6xl font-bold tracking-[-0.06em] lg:text-7xl">
                                        <span
                                            className="stat-num"
                                            data-value={s.value}
                                        >
                                            {s.value}
                                        </span>
                                        <span className="text-[#ff5a1f]">
                                            {s.suffix}
                                        </span>
                                    </div>
                                    <p className="mt-2 max-w-[180px] text-sm leading-[1.6] text-neutral-600">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="content-img relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900">
                            <div className="content-img-inner absolute inset-0">
                                <Image
                                    src="/home/new1.png"
                                    alt="Bugsmoker web development work"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- Problem ---------------- */}
            <section className="w-full bg-black px-5 py-24 text-white sm:px-8 md:px-12 lg:px-16 lg:py-36">
                <div className="mx-auto max-w-[1400px]">
                    <h2 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                        Most websites quietly lose people.
                    </h2>

                    <div className="mt-16 lg:mt-24">
                        {PROBLEMS.map((p) => (
                            <div
                                key={p.title}
                                className="problem-row relative py-8 lg:py-10"
                            >
                                <div className="grid gap-3 lg:grid-cols-12 lg:items-center lg:gap-10">
                                    <h3 className="problem-body text-3xl font-semibold tracking-[-0.04em] lg:col-span-6 lg:text-5xl">
                                        {p.title}
                                    </h3>
                                    <p className="problem-body max-w-md text-sm leading-[1.8] text-white/70 md:text-[15px] lg:col-span-5 lg:col-start-8">
                                        {p.text}
                                    </p>
                                </div>
                                <span className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
                                <span className="problem-line absolute inset-x-0 bottom-0 h-px origin-left bg-[#ff5a1f]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Solution ---------------- */}
            <section className="w-full bg-white px-5 py-24 text-black sm:px-8 md:px-12 lg:px-16 lg:py-36">
                <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-28">
                            <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                                So we fix them at the root.
                            </h2>
                            <p className="mt-6 max-w-sm text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                                Each problem above has a matching answer in
                                how we plan, design and build.
                            </p>
                            <div className="relative mt-10 hidden aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 lg:block">
                                <Image
                                    src="/home/mos.png"
                                    alt="Bugsmoker solution"
                                    fill
                                    sizes="40vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:col-span-7">
                        {SOLUTIONS.map((s) => (
                            <article
                                key={s.title}
                                className="solution-card relative overflow-hidden rounded-2xl border border-black/10 bg-white p-7 pl-9 transition-colors duration-300 hover:border-[#ff5a1f] sm:p-9 sm:pl-12"
                            >
                                <span className="solution-bar absolute left-0 top-0 h-full w-1.5 origin-top bg-[#ff5a1f]" />
                                <p className="text-sm font-medium text-[#ff5a1f]">
                                    Fixes: {s.fixes.toLowerCase()}
                                </p>
                                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl">
                                    {s.title}
                                </h3>
                                <p className="mt-3 max-w-lg text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                                    {s.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- FAQ ---------------- */}
            <section className="w-full bg-neutral-50 px-5 py-24 text-black sm:px-8 md:px-12 lg:px-16 lg:py-36">
                <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                            Questions we hear a lot
                        </h2>
                        <p className="mt-6 max-w-xs text-sm leading-[1.8] text-neutral-600 md:text-[15px]">
                            Don&apos;t see yours? Tell us about your project
                            and we&apos;ll answer it directly.
                        </p>
                        <Link
                            href="#contact"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff5a1f] hover:shadow-xl hover:shadow-[#ff5a1f]/25 active:scale-95"
                        >
                            Contact Us
                        </Link>
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
        </div>
    );
}