"use client";

/*
  Install once:  npm i gsap lenis
  Posts:         replace the POSTS array below with your real data (or import it from your CMS / JSON).
  Links:         each post links to /blog/[slug]. Change POST_HREF if your route differs.
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const POST_HREF = (slug) => `/blog/${slug}`;

/* ------------------------------------------------------------------ */
/* Placeholder posts: replace with your own                            */
/* ------------------------------------------------------------------ */

const POSTS = [
    {
        slug: "why-fast-websites-win",
        title: "Why fast websites quietly win every time",
        excerpt:
            "Speed is not a technical detail. It decides who stays, who buys and who comes back.",
        category: "Performance",
        date: "2026-10-20",
        readTime: 6,
        image: "/home/1.png",
    },
    {
        slug: "designing-for-the-smallest-screen",
        title: "Designing for the smallest screen first",
        excerpt:
            "Starting on a phone forces better decisions. Here is how we plan layouts from the inside out.",
        category: "Design",
        date: "2026-10-12",
        readTime: 5,
        image: "/home/2.png",
    },
    {
        slug: "seo-before-design",
        title: "Plan the SEO before you plan the design",
        excerpt:
            "Page structure, keywords and internal links shape a site more than most people expect.",
        category: "SEO",
        date: "2026-10-03",
        readTime: 7,
        image: "/home/3.png",
    },
    {
        slug: "motion-that-means-something",
        title: "Motion that actually means something",
        excerpt:
            "Animation should guide attention, not compete for it. A few rules we follow with GSAP.",
        category: "Design",
        date: "2026-09-24",
        readTime: 4,
        image: "/home/new1.png",
    },
    {
        slug: "nextjs-lessons-from-production",
        title: "Lessons from shipping Next.js to production",
        excerpt:
            "Caching, rendering modes and the small mistakes that cost us the most time.",
        category: "Development",
        date: "2026-09-15",
        readTime: 9,
        image: "/home/4.png",
    },
    {
        slug: "how-we-run-a-project",
        title: "How a Bugsmoker project actually runs",
        excerpt:
            "From first call to launch day: the rhythm we use to keep small projects calm and fast.",
        category: "Studio",
        date: "2026-09-05",
        readTime: 5,
        image: "/home/mos.png",
    },
    {
        slug: "core-web-vitals-in-plain-words",
        title: "Core Web Vitals in plain words",
        excerpt:
            "What the three metrics measure, why they matter and the quickest ways to improve them.",
        category: "Performance",
        date: "2026-08-27",
        readTime: 6,
        image: "/home/5.png",
    },
    {
        slug: "offline-first-apps",
        title: "Why your app should work without a signal",
        excerpt:
            "Offline-first thinking makes apps feel faster and more trustworthy, even on good connections.",
        category: "Development",
        date: "2026-08-14",
        readTime: 8,
        image: "/home/new2.png",
    },
    {
        slug: "small-studio-big-opinions",
        title: "Small studio, big opinions",
        excerpt:
            "What we believe about craft, speed and keeping things fun while doing serious work.",
        category: "Studio",
        date: "2026-08-02",
        readTime: 3,
        image: "/home/6.png",
    },
].sort((a, b) => (a.date < b.date ? 1 : -1));

const FEATURED = POSTS.slice(0, 4);
const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

const fmt = (d) =>
    new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

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

export default function BlogPage() {
    const root = useRef(null);
    const lenisRef = useRef(null);
    const gridRef = useRef(null);
    const featTextRef = useRef(null);
    const cursorRef = useRef(null);
    const cx = useRef(null);
    const cy = useRef(null);

    const [featIdx, setFeatIdx] = useState(0);
    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [cursorOn, setCursorOn] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return POSTS.filter(
            (p) =>
                (category === "All" || p.category === category) &&
                (!q ||
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q))
        );
    }, [category, query]);

    const feat = FEATURED[featIdx];

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

    /* Cursor bubble that follows the mouse over the grid */
    useEffect(() => {
        if (!cursorRef.current) return;
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        cx.current = gsap.quickTo(cursorRef.current, "x", {
            duration: 0.45,
            ease: "power3",
        });
        cy.current = gsap.quickTo(cursorRef.current, "y", {
            duration: 0.45,
            ease: "power3",
        });
    }, []);

    const onGridMove = (e) => {
        if (!cx.current) return;
        cx.current(e.clientX);
        cy.current(e.clientY);
    };

    /* Featured text re-animates whenever the featured story changes */
    useEffect(() => {
        if (!featTextRef.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.fromTo(
            featTextRef.current.children,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.07,
                delay: featIdx === 0 ? 0.35 : 0,
                overwrite: true,
            }
        );
    }, [featIdx]);

    /* Page-level animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".hero-fade", {
                    opacity: 0,
                    y: 16,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.2,
                });
                gsap.from(".hero-img-0", {
                    scale: 1.2,
                    duration: 1.8,
                    ease: "power3.out",
                });
                gsap.to(".hero-imgs", {
                    yPercent: 8,
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

                gsap.from(".news-fade", {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: { trigger: ".news", start: "top 75%" },
                });
            });
        }, root);

        return () => ctx.revert();
    }, []);

    /* Grid cards reveal on scroll, and re-run whenever the filter changes */
    useEffect(() => {
        if (!gridRef.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray(".post-card").forEach((card) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 92%" },
                });
            });
        }, gridRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, [category, query]);

    const onSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // Connect this to your newsletter provider here.
        setSubscribed(true);
    };

    return (
        <div ref={root} className="min-h-screen bg-black p-3 font-sans">
            {/* Scroll progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            {/* Cursor bubble (desktop) */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
            >
                <div
                    className={`flex h-24 w-24 items-center justify-center rounded-full bg-[#ff5a1f] text-sm font-semibold text-white transition duration-300 ${cursorOn ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                >
                    Read
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {/* ---------------- Hero: featured story switcher ---------------- */}
                <section className="hero relative min-h-[92vh] overflow-hidden rounded-xl bg-neutral-900 text-white">
                    <div className="hero-imgs absolute inset-x-0 -top-[10%] h-[120%]">
                        {FEATURED.map((p, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={p.slug}
                                src={p.image}
                                alt={i === featIdx ? p.title : ""}
                                className={`hero-img-${i} absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === featIdx ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />

                    <div className="relative z-10 flex min-h-[92vh] flex-col justify-between p-5 sm:p-8">
                        {/* Top row */}
                        <div className="hero-fade flex items-start justify-between">
                            <span className="flex items-center gap-2 text-xl font-semibold tracking-[-0.03em]">
                                Journal
                                <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
                            </span>
                            <span className="text-xs sm:text-sm">
                                ({pad(POSTS.length)}) stories
                            </span>
                        </div>

                        {/* Bottom */}
                        <div className="grid gap-10 pt-32 lg:grid-cols-12 lg:items-end">
                            <div className="lg:col-span-8">
                                <div ref={featTextRef}>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-xs backdrop-blur-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                        {feat.category}
                                    </span>

                                    <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[.98] tracking-[-0.045em]">
                                        {feat.title}
                                    </h1>

                                    <p className="mt-5 max-w-lg text-sm leading-[1.8] text-white/75 md:text-[15px]">
                                        {feat.excerpt}
                                    </p>

                                    <div className="mt-7 flex flex-wrap items-center gap-5">
                                        <Link
                                            href={POST_HREF(feat.slug)}
                                            className="group inline-flex items-center gap-3 text-sm font-semibold"
                                        >
                                            <span>Read story</span>
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white">
                                                <Arrow />
                                            </span>
                                        </Link>
                                        <span className="text-xs text-white/70 sm:text-sm">
                                            {fmt(feat.date)} &middot; {feat.readTime} min read
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Latest list (desktop) */}
                            <ul className="hero-fade hidden flex-col gap-1 lg:col-span-4 lg:flex">
                                <li className="mb-2 text-xs text-white/60">(Latest)</li>
                                {FEATURED.map((p, i) => (
                                    <li key={p.slug}>
                                        <button
                                            type="button"
                                            onMouseEnter={() => setFeatIdx(i)}
                                            onFocus={() => setFeatIdx(i)}
                                            onClick={() => setFeatIdx(i)}
                                            aria-current={i === featIdx}
                                            className={`flex w-full cursor-pointer items-start gap-4 border-l-2 py-3 pl-4 text-left transition-all duration-300 ${i === featIdx
                                                    ? "border-[#ff5a1f] opacity-100"
                                                    : "border-white/20 opacity-50 hover:opacity-80"
                                                }`}
                                        >
                                            <span className="pt-0.5 text-xs text-[#ff5a1f]">
                                                {pad(i + 1)}
                                            </span>
                                            <span>
                                                <span className="block text-base font-medium leading-[1.3] tracking-[-0.02em]">
                                                    {p.title}
                                                </span>
                                                <span className="mt-1 block text-xs text-white/60">
                                                    {fmt(p.date)}
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Compact switcher (mobile / tablet) */}
                            <div className="hero-fade flex gap-2 lg:hidden">
                                {FEATURED.map((p, i) => (
                                    <button
                                        key={p.slug}
                                        type="button"
                                        onClick={() => setFeatIdx(i)}
                                        aria-label={`Show story ${i + 1}: ${p.title}`}
                                        aria-current={i === featIdx}
                                        className={`h-10 min-w-10 rounded-full border px-4 text-xs transition-colors duration-300 ${i === featIdx
                                                ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
                                                : "border-white/30 text-white"
                                            }`}
                                    >
                                        {pad(i + 1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- Filter bar ---------------- */}
                <section className="sticky top-3 z-30 flex flex-col gap-3 rounded-xl bg-white/95 p-3 text-black backdrop-blur md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
                        {CATEGORIES.map((c) => {
                            const count =
                                c === "All"
                                    ? POSTS.length
                                    : POSTS.filter((p) => p.category === c).length;
                            const on = category === c;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => setCategory(c)}
                                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors duration-300 sm:text-sm ${on
                                            ? "border-black bg-black text-white"
                                            : "border-black/20 hover:border-black"
                                        }`}
                                >
                                    {c}
                                    <span className={on ? "text-[#ff5a1f]" : "text-black/40"}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <label className="relative block md:w-64">
                        <span className="sr-only">Search stories</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search stories"
                            className="w-full rounded-full border border-black/20 bg-transparent px-4 py-2 text-sm outline-none transition-colors duration-300 placeholder:text-black/40 focus:border-[#ff5a1f]"
                        />
                    </label>
                </section>

                {/* ---------------- Grid ---------------- */}
                <section className="rounded-xl bg-white px-5 py-12 text-black sm:px-8 lg:py-20">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-10 flex items-end justify-between text-xs sm:text-sm">
                            <span>
                                ({pad(filtered.length)}) {category === "All" ? "all stories" : category.toLowerCase()}
                            </span>
                            <span className="text-neutral-500">Newest first</span>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="py-24 text-center">
                                <p className="text-3xl font-semibold tracking-[-0.04em]">
                                    Nothing found.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCategory("All");
                                        setQuery("");
                                    }}
                                    className="mt-6 cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#ff5a1f]"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div
                                ref={gridRef}
                                onMouseMove={onGridMove}
                                className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {filtered.map((p) => (
                                    <article
                                        key={p.slug}
                                        onMouseEnter={() => setCursorOn(true)}
                                        onMouseLeave={() => setCursorOn(false)}
                                        className="post-card lg:[&:nth-child(3n+2)]:mt-16"
                                    >
                                        <Link href={POST_HREF(p.slug)} className="group block">
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="mt-5 flex items-center gap-3 text-xs">
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                                    {p.category}
                                                </span>
                                                <span className="text-neutral-500">
                                                    {fmt(p.date)}
                                                </span>
                                            </div>

                                            <h2 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[1.7rem]">
                                                <span className="bg-gradient-to-r from-[#ff5a1f] to-[#ff5a1f] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                                                    {p.title}
                                                </span>
                                            </h2>

                                            <p className="mt-3 line-clamp-2 max-w-sm text-sm leading-[1.7] text-neutral-600">
                                                {p.excerpt}
                                            </p>
                                            <p className="mt-3 text-xs text-neutral-500">
                                                {p.readTime} min read
                                            </p>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ---------------- Newsletter ---------------- */}
                <section className="news overflow-hidden rounded-xl bg-[#ff5a1f] px-5 py-14 text-black sm:px-8 lg:py-20">
                    <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
                        <div className="lg:col-span-7">
                            <p className="news-fade text-xs sm:text-sm">(Newsletter)</p>
                            <h2 className="news-fade mt-5 text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[.92] tracking-[-0.06em]">
                                New stories,
                                <br />
                                sent sparingly.
                            </h2>
                        </div>

                        <div className="news-fade lg:col-span-5">
                            {subscribed ? (
                                <p className="text-lg font-semibold tracking-[-0.02em]">
                                    You&apos;re in. Watch your inbox.
                                </p>
                            ) : (
                                <form onSubmit={onSubscribe} className="flex flex-col gap-3 sm:flex-row">
                                    <label className="flex-1">
                                        <span className="sr-only">Email address</span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@email.com"
                                            className="w-full rounded-full border border-black/40 bg-transparent px-5 py-3.5 text-sm outline-none placeholder:text-black/50 focus:border-black"
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="cursor-pointer rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                            <p className="mt-4 text-xs text-black/70">
                                One email when we publish. No spam.
                            </p>
                        </div>
                    </div>

                    <div className="news-fade mx-auto mt-14 flex max-w-[1400px] flex-col gap-2 border-t border-black/30 pt-5 text-xs sm:flex-row sm:justify-between sm:text-sm">
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