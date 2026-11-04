"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Data (edit freely). Add an `href` to any article to make it a link. */
/* ------------------------------------------------------------------ */

const BLOG_ARTICLES = [
    {
        id: "01",
        number: "01",
        title: "MANZILA",
        tagline: "Kinetic Optics & Floral Form",
        category: "Art Direction",
        date: "October 2024",
        readTime: "4 min read",
        src: "/home/1.png",
        alt: "Manzila floral CRT installation in sunset field",
        description:
            "Investigating the interplay between blooming natural flora and the nostalgic glow of vintage cathode-ray glass at golden hour.",
        // href: "/blog/manzila",
    },
    {
        id: "02",
        number: "02",
        title: "CREAMODP*",
        tagline: "Botanical Sound Sanctuary",
        category: "Spatial Design",
        date: "September 2024",
        readTime: "6 min read",
        src: "/home/3.png",
        alt: "Creamodp conservatory with analogue screens and flowers",
        description:
            "A sun-drenched greenhouse where analog cassettes and cathode tubes coexist in harmony with overgrown climbing florals.",
        // href: "/blog/creamodp",
    },
    {
        id: "03",
        number: "03",
        title: "BRONTE AZAHI",
        tagline: "Misty Rain & Ephemeral Solitude",
        category: "Visual Narrative",
        date: "August 2024",
        readTime: "5 min read",
        src: "/home/5.png",
        alt: "Bronte Azahi trench coat figure with floral umbrella",
        description:
            "A quiet study of damp earth, reflective water pools, and translucent umbrellas shielding fragile wildflower bouquets.",
        // href: "/blog/bronte-azahi",
    },
    {
        id: "04",
        number: "04",
        title: "RICE BROTHERS",
        tagline: "Sunlit Prairie & Golden Monoliths",
        category: "Digital Installation",
        date: "July 2024",
        readTime: "3 min read",
        src: "/home/4.png",
        alt: "Rice Brothers TV head in field of sunflowers at dawn",
        description:
            "Standing tall among bowing sunflowers, an amber screen reflects the rising sun in a celebration of morning stillness.",
        // href: "/blog/rice-brothers",
    },
];

const pad = (n) => String(n).padStart(2, "0");

/* Masked line: text slides up from behind its own edge */
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
            <span className="bl-mask block">{children}</span>
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Props (all optional)
 *  - articles:     [{ id, number, title, tagline, category, date, readTime, src, alt, description, href? }]
 *  - label:        small label in the top-left
 *  - heading:      big heading, e.g. "The journal"
 *  - intro:        short paragraph next to the heading
 *  - viewAllHref:  where the "View all" button and the orange strip link to
 *  - marqueeText:  text repeated in the orange strip
 */
export default function Blog({
    articles = BLOG_ARTICLES,
    label = "Journal // Essays & perspectives",
    heading = "The journal",
    intro = "Notes, case studies and perspectives from our studio. New pieces whenever we have something worth saying.",
    viewAllHref = "/blog",
    marqueeText = "Read the journal",
}) {
    const rootRef = useRef(null);
    const listRef = useRef(null);
    const previewRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeTween = useRef(null);
    const firstRender = useRef(true);

    const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

    const [cat, setCat] = useState("All");
    const [activeId, setActiveId] = useState(articles[0]?.id);
    const [hovering, setHovering] = useState(false); // mouse is inside the list

    const visible = articles.filter((a) => cat === "All" || a.category === cat);
    const position = Math.max(
        0,
        visible.findIndex((a) => a.id === activeId)
    );

    const chooseCat = (c) => {
        setCat(c);
        const first = articles.find((a) => c === "All" || a.category === c);
        if (first) setActiveId(first.id);
    };

    /* Entrance */
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".bl-mask", {
                    yPercent: 115,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: root, start: "top 80%" },
                });

                gsap.from(".bl-fade", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: root, start: "top 80%" },
                });

                gsap.from(".bl-row", {
                    y: 70,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.1,
                    clearProps: "transform,opacity",
                    scrollTrigger: { trigger: listRef.current, start: "top 88%" },
                });

                gsap.from(".bl-strip", {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".bl-strip", start: "top 95%" },
                });

                /* Orange strip: endless flow, slows on hover */
                marqueeTween.current = gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    duration: 28,
                    ease: "none",
                    repeat: -1,
                });
            });
        }, root);

        return () => {
            marqueeTween.current = null;
            ctx.revert();
        };
    }, []);

    /* Rows re-animate when the category changes */
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const rows = listRef.current?.querySelectorAll(".bl-row");
        if (!rows || !rows.length) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            ScrollTrigger.refresh();
            return;
        }

        gsap.fromTo(
            rows,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                clearProps: "transform,opacity",
                overwrite: true,
                onComplete: () => ScrollTrigger.refresh(),
            }
        );
    }, [cat]);

    /* Cursor-following preview (mouse devices only) */
    useEffect(() => {
        const list = listRef.current;
        const preview = previewRef.current;
        if (!list || !preview) return;

        const mm = gsap.matchMedia();

        mm.add(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
                gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0 });

                const qx = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
                const qy = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
                const qr = gsap.quickTo(preview, "rotation", { duration: 0.5, ease: "power3" });

                let lastX = 0;
                let settle = 0;

                const onEnter = (e) => {
                    lastX = e.clientX;
                    gsap.set(preview, { x: e.clientX, y: e.clientY });
                    gsap.to(preview, {
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.5)",
                        overwrite: "auto",
                    });
                };

                const onMove = (e) => {
                    qx(e.clientX);
                    qy(e.clientY);

                    const dx = e.clientX - lastX;
                    lastX = e.clientX;
                    qr(gsap.utils.clamp(-12, 12, dx * 0.6));

                    clearTimeout(settle);
                    settle = setTimeout(() => qr(0), 90);
                };

                const onLeave = () => {
                    clearTimeout(settle);
                    gsap.to(preview, {
                        scale: 0,
                        rotation: 0,
                        duration: 0.4,
                        ease: "power3.in",
                        overwrite: "auto",
                    });
                };

                list.addEventListener("pointerenter", onEnter);
                list.addEventListener("pointermove", onMove);
                list.addEventListener("pointerleave", onLeave);

                return () => {
                    clearTimeout(settle);
                    list.removeEventListener("pointerenter", onEnter);
                    list.removeEventListener("pointermove", onMove);
                    list.removeEventListener("pointerleave", onLeave);
                };
            }
        );

        return () => mm.revert();
    }, []);

    const slowStrip = (slow) => {
        if (!marqueeTween.current) return;
        gsap.to(marqueeTween.current, {
            timeScale: slow ? 0.15 : 1,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    const headingWords = heading.split(" ");

    return (
        <section
            ref={rootRef}
            id="blog-section"
            className="relative mt-3 w-full select-none overflow-hidden rounded-xl font-['Outfit',sans-serif]"
        >
            {/* ================= White band: heading + filters ================= */}
            <div className="bg-white px-4 pb-8 pt-6 text-black sm:px-8 sm:pb-12 sm:pt-8 lg:px-12">
                

                <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
                    <h2 className="text-[clamp(3.6rem,13vw,11rem)] font-semibold uppercase leading-[.82] tracking-[-0.08em] lg:col-span-8">
                        {headingWords.map((w, i) => (
                            <span key={`${w}-${i}`} className="block">
                                <MaskLine>
                                    {w}
                                    {i === headingWords.length - 1 && (
                                        <span className="text-[#ff5a1f]">.</span>
                                    )}
                                </MaskLine>
                            </span>
                        ))}
                    </h2>

                    <div className="bl-fade flex flex-col items-start gap-6 lg:col-span-4 lg:items-end">
                        <p className="max-w-xs text-[13px] leading-[1.8] text-neutral-600 lg:text-right">
                            {intro}
                        </p>
                        <Link
                            href={viewAllHref}
                            className="group inline-flex items-center gap-3 rounded-full bg-black py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#ff5a1f] hover:text-black"
                        >
                            View all
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={18} strokeWidth={2.2} />
                            </span>
                        </Link>
                    </div>
                </div>

               
            </div>

            {/* ================= Black band: the list ================= */}
            <div className="bg-black px-3 pb-4 pt-2 text-white sm:px-6 sm:pb-6 lg:px-9">
                <div
                    ref={listRef}
                    onPointerLeave={() => setHovering(false)}
                    className="border-b border-white/15"
                >
                    {visible.map((item) => {
                        const isActive = item.id === activeId;
                        const hot = hovering && isActive; /* orange sweep state (desktop) */
                        const dim = hovering && !isActive;

                        return (
                            <div
                                key={item.id}
                                onPointerEnter={(e) => {
                                    if (e.pointerType === "mouse") {
                                        setActiveId(item.id);
                                        setHovering(true);
                                    }
                                }}
                                className={`bl-row relative overflow-hidden border-t border-white/15 transition-opacity duration-500 ${
                                    dim ? "lg:opacity-40" : ""
                                }`}
                            >
                                {/* Orange sweep from the bottom */}
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#ff5a1f] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                                        hot ? "lg:scale-y-100" : ""
                                    }`}
                                />

                                {/* Desktop: whole row is a link when href exists */}
                                {item.href && (
                                    <Link
                                        href={item.href}
                                        aria-label={`${item.title}, ${item.tagline}`}
                                        className="absolute inset-0 z-20 hidden lg:block"
                                    />
                                )}

                                {/* Row header */}
                                <button
                                    type="button"
                                    onClick={() => setActiveId(item.id)}
                                    onFocus={() => setActiveId(item.id)}
                                    aria-expanded={isActive}
                                    className="relative z-10 grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 px-1 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:gap-6 sm:px-3 lg:grid-cols-12 lg:gap-6 lg:py-8"
                                >
                                    <span
                                        className={`font-mono text-xs transition-colors duration-300 sm:text-sm lg:col-span-1 ${
                                            hot ? "lg:text-black" : "text-[#ff5a1f]"
                                        }`}
                                    >
                                        ({item.number})
                                    </span>

                                    <span className="min-w-0 lg:col-span-6">
                                        <span
                                            className={`block break-words text-[clamp(1.6rem,7.5vw,2.6rem)] font-semibold uppercase leading-[.95] tracking-[-0.05em] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:text-[clamp(2rem,6vw,3.2rem)] lg:text-[clamp(2.5rem,4.6vw,5rem)] ${
                                                hot ? "text-black lg:translate-x-4" : "text-white"
                                            }`}
                                        >
                                            {item.title}
                                        </span>
                                    </span>

                                    {/* Tagline + category (desktop) */}
                                    <span className="hidden min-w-0 lg:col-span-3 lg:block">
                                        <span
                                            className={`block truncate text-sm font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                                                hot ? "text-black" : "text-white"
                                            }`}
                                        >
                                            {item.tagline}
                                        </span>
                                        <span
                                            className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                                                hot ? "text-black/70" : "text-white/50"
                                            }`}
                                        >
                                            {item.category}
                                        </span>
                                    </span>

                                    {/* Date + arrow (desktop) / plus (mobile) */}
                                    <span className="flex items-center justify-end gap-4 lg:col-span-2">
                                        <span
                                            className={`hidden font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 xl:inline ${
                                                hot ? "text-black/70" : "text-white/50"
                                            }`}
                                        >
                                            {item.date}
                                        </span>

                                        <span
                                            className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500 lg:flex ${
                                                hot
                                                    ? "rotate-45 bg-black text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            <ArrowUpRight size={20} strokeWidth={2} />
                                        </span>

                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
                                                isActive
                                                    ? "rotate-45 border-[#ff5a1f] bg-[#ff5a1f] text-black"
                                                    : "border-white/25 text-white"
                                            }`}
                                        >
                                            <Plus size={16} strokeWidth={2.2} />
                                        </span>
                                    </span>
                                </button>

                                {/* Mobile and tablet: expanding card */}
                                <div
                                    className={`relative z-10 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none lg:hidden ${
                                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-1 pb-6 pt-1 sm:px-3">
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-800 sm:aspect-[16/9]">
                                                <Image
                                                    src={item.src}
                                                    alt={item.alt}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 0px"
                                                    draggable={false}
                                                    className="object-cover"
                                                />
                                                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black">
                                                    {item.category}
                                                </span>
                                            </div>

                                            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                                                {item.date} &middot; {item.readTime}
                                            </p>
                                            <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#ff5a1f]">
                                                {item.tagline}
                                            </p>
                                            <p className="mt-2 max-w-xl text-sm leading-[1.75] text-white/70">
                                                {item.description}
                                            </p>

                                            {item.href && (
                                                <Link
                                                    href={item.href}
                                                    className="group mt-5 inline-flex w-fit items-center gap-3 text-sm font-semibold"
                                                >
                                                    <span>Read story</span>
                                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff5a1f] text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-white">
                                                        <ArrowUpRight size={18} strokeWidth={2.2} />
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ================= Orange band: endless strip ================= */}
            <Link
                href={viewAllHref}
                aria-label={marqueeText}
                onMouseEnter={() => slowStrip(true)}
                onMouseLeave={() => slowStrip(false)}
                className="bl-strip group block overflow-hidden bg-[#ff5a1f] py-4 text-black sm:py-6"
            >
                <div ref={marqueeRef} className="flex w-max will-change-transform">
                    {[0, 1].map((k) => (
                        <div
                            key={k}
                            aria-hidden={k === 1}
                            className="flex shrink-0 items-center"
                        >
                            {Array.from({ length: 5 }).map((_, j) => (
                                <span
                                    key={j}
                                    className="mr-6 inline-flex items-center gap-6 whitespace-nowrap text-[clamp(1.8rem,5vw,3.6rem)] font-semibold uppercase tracking-[-0.04em] sm:mr-10 sm:gap-10"
                                >
                                    {marqueeText}
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[#ff5a1f] transition-transform duration-300 group-hover:rotate-45 sm:h-14 sm:w-14">
                                        <ArrowUpRight size={22} strokeWidth={2.2} />
                                    </span>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </Link>

            {/* Cursor-following preview (desktop, mouse only) */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/5] w-[240px] overflow-hidden rounded-xl bg-neutral-800 shadow-2xl shadow-black/30 lg:block xl:w-[300px]"
            >
                {articles.map((item) => (
                    <div
                        key={item.id}
                        className="absolute inset-0"
                        style={{
                            clipPath:
                                item.id === activeId
                                    ? "inset(0% 0% 0% 0%)"
                                    : "inset(100% 0% 0% 0%)",
                            transition: "clip-path 0.7s cubic-bezier(.22,1,.36,1)",
                        }}
                    >
                        <Image
                            src={item.src}
                            alt=""
                            fill
                            sizes="300px"
                            draggable={false}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 font-mono text-xs text-[#ff5a1f]">
                            ({item.number})
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}