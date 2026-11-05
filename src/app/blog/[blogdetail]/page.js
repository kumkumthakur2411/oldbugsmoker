"use client";

/*
  Blog detail page  ->  /blog/[slug]
  Data:   src/data/blog.json   (import blogData from "@/data/blog.json")
  Install once:  npm i gsap lenis

  Supported content blocks in blog.json:
    { type: "p",     text }
    { type: "h2",    text }
    { type: "h3",    text }
    { type: "quote", text }
    { type: "list",  items: [] }
    { type: "image", src, alt, caption }
    { type: "code",  lang, text }
*/

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import blogData from "@/data/blog.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const POST_HREF = (slug) => `/blog/${slug}`;

const POSTS = [...blogData.posts].sort((a, b) => (a.date < b.date ? 1 : -1));

const fmt = (d) =>
    new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

const pad = (n) => String(n).padStart(2, "0");

const initials = (name = "") =>
    name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

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

const ArrowLeft = ({ size = 18 }) => (
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
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);

const LinkIcon = () => (
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
        <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

/* ------------------------------------------------------------------ */
/* Content renderer (Medium-style: serif body, roomy line height)      */
/* ------------------------------------------------------------------ */

function Block({ b }) {
    switch (b.type) {
        case "h2":
            return (
                <h2 className="mt-14 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.04em] text-black sm:text-[2.1rem]">
                    {b.text}
                </h2>
            );
        case "h3":
            return (
                <h3 className="mt-10 text-xl font-semibold leading-[1.25] tracking-[-0.03em] text-black sm:text-2xl">
                    {b.text}
                </h3>
            );
        case "quote":
            return (
                <blockquote className="my-12 border-l-[3px] border-[#ff5a1f] pl-6 sm:pl-8">
                    <p className="font-sans text-[1.6rem] font-medium leading-[1.25] tracking-[-0.035em] text-black sm:text-[2rem]">
                        {b.text}
                    </p>
                </blockquote>
            );
        case "list":
            return (
                <ul className="my-6 space-y-3">
                    {b.items.map((item, i) => (
                        <li key={i} className="flex gap-4">
                            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "image":
            return (
                <figure className="my-12 sm:-mx-6 lg:-mx-16">
                    <div className="overflow-hidden rounded-xl bg-neutral-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={b.src}
                            alt={b.alt || ""}
                            loading="lazy"
                            className="aspect-[16/10] w-full object-cover"
                        />
                    </div>
                    {b.caption && (
                        <figcaption className="mt-3 text-center font-sans text-xs text-neutral-500 sm:text-sm">
                            {b.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case "code":
            return (
                <pre className="my-8 overflow-x-auto rounded-xl bg-neutral-900 p-5 text-[13px] leading-[1.8] text-white/90 sm:text-sm">
                    <code className="font-mono">{b.text}</code>
                </pre>
            );
        default:
            return <p>{b.text}</p>;
    }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function BlogDetailContent({ params }) {
    const routeParams = useParams();
    const resolvedParams =
        params && typeof params.then === "function" ? React.use(params) : params;
    const slug =
        resolvedParams?.blogdetail ||
        resolvedParams?.slug ||
        routeParams?.blogdetail ||
        routeParams?.slug;

    const root = useRef(null);
    const lenisRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const index = POSTS.findIndex((p) => p.slug === slug);
    const post = index >= 0 ? POSTS[index] : null;
    const prev = index > 0 ? POSTS[index - 1] : null; // newer
    const next = index >= 0 && index < POSTS.length - 1 ? POSTS[index + 1] : null; // older

    const related = useMemo(() => {
        if (!post) return [];
        const others = POSTS.filter((p) => p.slug !== post.slug);
        const same = others.filter((p) => p.category === post.category);
        const rest = others.filter((p) => p.category !== post.category);
        return [...same, ...rest].slice(0, 3);
    }, [post]);

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

    /* Animations */
    useEffect(() => {
        if (!post) return;

        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Hero */
                gsap.from(".hero-fade", {
                    opacity: 0,
                    y: 24,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.2,
                });
                gsap.from(".hero-img", {
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

                /* Reading progress: tracks the article only */
                gsap.fromTo(
                    ".progress",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".article",
                            start: "top 20%",
                            end: "bottom 60%",
                            scrub: 0.3,
                        },
                    }
                );

                /* CTA */
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

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            ctx.revert();
        };
    }, [post]);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked, ignore */
        }
    };

    const share = (network) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post.title);
        const target =
            network === "x"
                ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
                : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        window.open(target, "_blank", "noopener,noreferrer");
    };

    const onSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // Connect this to your newsletter provider here.
        setSubscribed(true);
    };

    /* ---------------- Not found ---------------- */
    if (!post) {
        return (
            <div className="min-h-screen bg-black p-3 font-sans">
                <section className="flex min-h-[90vh] flex-col items-center justify-center rounded-xl bg-[#f5f5f2] px-5 text-center text-[#171717]">
                    <p className="text-sm text-[#ff5a1f]">(404)</p>
                    <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[.85] tracking-[-0.07em]">
                        story not found<span className="text-[#ff5a1f]">.</span>
                    </h1>
                    <Link
                        href="/blog"
                        className="mt-10 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#ff5a1f]"
                    >
                        Back to journal
                    </Link>
                </section>
            </div>
        );
    }

    return (
        <div ref={root} className="min-h-screen bg-black p-3 font-sans">
            {/* Reading progress */}
            <div className="progress pointer-events-none fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-[#ff5a1f]" />

            <div className="flex flex-col gap-3">
                {/* ---------------- Hero ---------------- */}
                <section className="hero relative min-h-[88vh] overflow-hidden rounded-xl bg-neutral-900 text-white">
                    <div className="hero-imgs absolute inset-x-0 -top-[10%] h-[120%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.image}
                            alt={post.title}
                            className="hero-img absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />

                    <div className="relative z-10 flex min-h-[88vh] flex-col justify-between p-5 sm:p-8">
                        {/* Top row */}
                        <div className="hero-fade flex items-start justify-between">
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-3 text-sm font-semibold"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-[#ff5a1f] group-hover:text-white">
                                    <ArrowLeft />
                                </span>
                                <span>Journal</span>
                            </Link>
                            <span className="text-xs sm:text-sm">
                                ({pad(POSTS.length - index)}) of {pad(POSTS.length)}
                            </span>
                        </div>

                        {/* Bottom */}
                        <div className="pt-32">
                            <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-xs backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                {post.category}
                            </span>

                            <h1 className="hero-fade mt-5 max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[.96] tracking-[-0.05em]">
                                {post.title}
                            </h1>

                            <p className="hero-fade mt-5 max-w-xl text-sm leading-[1.8] text-white/75 md:text-[15px]">
                                {post.excerpt}
                            </p>

                            <div className="hero-fade mt-8 flex flex-wrap items-center gap-4 border-t border-white/20 pt-5 text-xs text-white/70 sm:text-sm">
                                <span className="font-medium text-white">{post.author.name}</span>
                                <span>{fmt(post.date)}</span>
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- Article (Medium-style) ---------------- */}
                <section className="rounded-xl bg-white px-5 py-12 text-black sm:px-8 lg:py-20">
                    <div className="relative mx-auto max-w-[720px]">
                        {/* Sticky share rail (wide screens) */}
                        <div className="absolute -left-24 top-0 hidden h-full xl:block">
                            <div className="sticky top-24 flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={copyLink}
                                    aria-label="Copy link"
                                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                >
                                    <LinkIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => share("x")}
                                    aria-label="Share on X"
                                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                >
                                    <XIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => share("linkedin")}
                                    aria-label="Share on LinkedIn"
                                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                >
                                    <LinkedInIcon />
                                </button>
                            </div>
                        </div>

                        {/* Byline */}
                        <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-6">
                            <div className="flex items-center gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                                    {initials(post.author.name)}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{post.author.name}</p>
                                    <p className="text-xs text-neutral-500 sm:text-sm">
                                        {post.author.role} &middot; {post.readTime} min read &middot;{" "}
                                        {fmt(post.date)}
                                    </p>
                                </div>
                            </div>

                            {/* Share (mobile / tablet) */}
                            <div className="flex gap-2 xl:hidden">
                                <button
                                    type="button"
                                    onClick={copyLink}
                                    aria-label="Copy link"
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                >
                                    <LinkIcon />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => share("x")}
                                    aria-label="Share on X"
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 transition-colors duration-300 hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                >
                                    <XIcon />
                                </button>
                            </div>
                        </div>

                        {copied && (
                            <p
                                role="status"
                                className="mt-3 text-xs font-medium text-[#ff5a1f]"
                            >
                                Link copied.
                            </p>
                        )}

                        {/* Body */}
                        <article className="article mt-10 space-y-7 font-serif text-[1.15rem] leading-[1.85] text-neutral-800 sm:text-[1.3rem] sm:leading-[1.8]">
                            {post.content.map((b, i) => (
                                <Block key={i} b={b} />
                            ))}
                        </article>

                        {/* Tags */}
                        <div className="mt-14 flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-black/20 px-4 py-2 text-xs sm:text-sm"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Author card */}
                        <div className="mt-12 flex items-start gap-5 border-t border-black/10 pt-8">
                            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ff5a1f] text-lg font-semibold text-black">
                                {initials(post.author.name)}
                            </span>
                            <div>
                                <p className="text-xs text-neutral-500">(Written by)</p>
                                <p className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                                    {post.author.name}
                                </p>
                                <p className="mt-1 text-sm leading-[1.7] text-neutral-600">
                                    {post.author.role} at Bugsmoker. Writes about building fast,
                                    calm and well-made things for the web.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------- Prev / Next ---------------- */}
                {(prev || next) && (
                    <section className="grid gap-3 md:grid-cols-2">
                        {[
                            { post: prev, label: "(Newer)" },
                            { post: next, label: "(Older)" },
                        ].map(({ post: p, label }, i) =>
                            p ? (
                                <Link
                                    key={label}
                                    href={POST_HREF(p.slug)}
                                    className="group flex items-center justify-between gap-6 rounded-xl bg-neutral-900 p-6 text-white transition-colors duration-300 hover:bg-neutral-800 sm:p-8"
                                >
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#ff5a1f]">{label}</p>
                                        <p className="mt-3 text-xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-2xl">
                                            {p.title}
                                        </p>
                                    </div>
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white">
                                        <Arrow />
                                    </span>
                                </Link>
                            ) : (
                                <div key={label} className="hidden md:block" aria-hidden="true" />
                            )
                        )}
                    </section>
                )}

                {/* ---------------- Related ---------------- */}
                {related.length > 0 && (
                    <section className="rounded-xl bg-[#f5f5f2] px-5 py-12 text-[#171717] sm:px-8 lg:py-20">
                        <div className="mx-auto max-w-[1400px]">
                            <div className="mb-10 flex items-end justify-between">
                                <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                                    keep reading
                                </h2>
                                <Link
                                    href="/blog"
                                    className="text-xs underline underline-offset-4 sm:text-sm"
                                >
                                    All stories
                                </Link>
                            </div>

                            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                {related.map((p) => (
                                    <article key={p.slug}>
                                        <Link href={POST_HREF(p.slug)} className="group block">
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    loading="lazy"
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="mt-5 flex items-center gap-3 text-xs">
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                                                    {p.category}
                                                </span>
                                                <span className="text-neutral-500">{fmt(p.date)}</span>
                                            </div>
                                            <h3 className="mt-3 text-2xl font-semibold leading-[1.1] tracking-[-0.04em]">
                                                <span className="bg-gradient-to-r from-[#ff5a1f] to-[#ff5a1f] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                                                    {p.title}
                                                </span>
                                            </h3>
                                            <p className="mt-3 text-xs text-neutral-500">
                                                {p.readTime} min read
                                            </p>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ---------------- Newsletter ---------------- */}
                <section className="news overflow-hidden rounded-xl bg-[#ff5a1f] px-5 py-14 text-black sm:px-8 lg:py-20">
                    <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
                        <div className="lg:col-span-7">
                            <p className="news-fade text-xs sm:text-sm">(Newsletter)</p>
                            <h2 className="news-fade mt-5 text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[.92] tracking-[-0.06em]">
                                Liked this one?
                                <br />
                                Get the next.
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

export default function BlogDetailPage(props) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <BlogDetailContent {...props} />
        </Suspense>
    );
}