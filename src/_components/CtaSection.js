"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* ------------------------------------------------------------------ */

const QUOTE =
    "“We don't just build digital products — we solve the problems holding your business back. From standout websites to smarter software, we combine thoughtful design and reliable technology to help your business.”";

const HIGHLIGHT = new Set([
    "solve",
    "problems",
    "standout",
    "smarter",
    "thoughtful",
    "reliable",
]);

const PERKS = [
    "Free discovery call",
    "Reply within 24 hours",
    "Clear, fixed-scope quotes",
];

const MARQUEE = ["Websites", "Apps", "Software", "Hosting", "Tech support"];

const WORDS = QUOTE.split(/\s+/);

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

/* Rotating text ring inside the circular button */
function Ring() {
    return (
        <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 animate-[spin_16s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
        >
            <defs>
                <path
                    id="cta-ring-path"
                    d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                />
            </defs>
            <text
                className="fill-current text-[8.5px] font-semibold uppercase"
                textLength="248"
                lengthAdjust="spacing"
            >
                <textPath href="#cta-ring-path">
                    Let&apos;s talk • Let&apos;s build • Let&apos;s talk • Let&apos;s build •{" "}
                </textPath>
            </text>
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function CtaSection() {
    const rootRef = useRef(null);
    const glowRef = useRef(null);
    const quoteRef = useRef(null);
    const logoRef = useRef(null);
    const trackRef = useRef(null);
    const btnWrapRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /* Entrance + scroll effects */
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".cta-line .mask-inner", {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: root, start: "top 75%" },
                });

                gsap.from(".cta-fade", {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.2,
                    scrollTrigger: { trigger: root, start: "top 75%" },
                });

                gsap.from(btnWrapRef.current, {
                    scale: 0,
                    rotate: -90,
                    duration: 1.1,
                    ease: "back.out(1.6)",
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "bottom 90%",
                    },
                });

                /* Word-by-word manifesto reveal, scrubbed with scroll */
                const words = gsap.utils.toArray(".cta-word", quoteRef.current);
                gsap.fromTo(
                    words,
                    { opacity: 0.14 },
                    {
                        opacity: 1,
                        ease: "none",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: "top 82%",
                            end: "bottom 50%",
                            scrub: 0.4,
                        },
                    }
                );

                /* Logo tilt and drift */
                gsap.fromTo(
                    logoRef.current,
                    { rotate: -8, y: 40 },
                    {
                        rotate: 0,
                        y: -10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: root,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                /* Marquee that speeds up with scroll velocity */
                const track = trackRef.current;
                if (track) {
                    const loop = gsap.to(track, {
                        xPercent: -50,
                        ease: "none",
                        duration: 28,
                        repeat: -1,
                    });

                    let vel = 0;
                    ScrollTrigger.create({
                        trigger: root,
                        start: "top bottom",
                        end: "bottom top",
                        onUpdate: (self) => {
                            vel = self.getVelocity();
                        },
                    });

                    const tick = () => {
                        const target =
                            1 + gsap.utils.clamp(0, 8, Math.abs(vel) / 300);
                        loop.timeScale(
                            gsap.utils.interpolate(loop.timeScale(), target, 0.1)
                        );
                        vel *= 0.9;
                    };
                    gsap.ticker.add(tick);

                    return () => {
                        gsap.ticker.remove(tick);
                        loop.kill();
                    };
                }
            });

            /* Cursor spotlight + magnetic button: hover-capable devices only */
            mm.add(
                "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
                () => {
                    const glow = glowRef.current;
                    const wrap = btnWrapRef.current;
                    const btn = btnRef.current;

                    const cleanups = [];

                    if (glow) {
                        gsap.set(glow, {
                            xPercent: -50,
                            yPercent: -50,
                            opacity: 0,
                        });
                        const gx = gsap.quickTo(glow, "x", {
                            duration: 0.7,
                            ease: "power3",
                        });
                        const gy = gsap.quickTo(glow, "y", {
                            duration: 0.7,
                            ease: "power3",
                        });

                        const onMove = (e) => {
                            const r = root.getBoundingClientRect();
                            gx(e.clientX - r.left);
                            gy(e.clientY - r.top);
                        };
                        const onEnter = () =>
                            gsap.to(glow, { opacity: 1, duration: 0.5 });
                        const onLeave = () =>
                            gsap.to(glow, { opacity: 0, duration: 0.6 });

                        root.addEventListener("mousemove", onMove);
                        root.addEventListener("mouseenter", onEnter);
                        root.addEventListener("mouseleave", onLeave);
                        cleanups.push(() => {
                            root.removeEventListener("mousemove", onMove);
                            root.removeEventListener("mouseenter", onEnter);
                            root.removeEventListener("mouseleave", onLeave);
                        });
                    }

                    if (wrap && btn) {
                        const onBtnMove = (e) => {
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
                        const onBtnLeave = () =>
                            gsap.to(btn, {
                                x: 0,
                                y: 0,
                                duration: 0.9,
                                ease: "elastic.out(1, 0.4)",
                            });

                        wrap.addEventListener("mousemove", onBtnMove);
                        wrap.addEventListener("mouseleave", onBtnLeave);
                        cleanups.push(() => {
                            wrap.removeEventListener("mousemove", onBtnMove);
                            wrap.removeEventListener("mouseleave", onBtnLeave);
                        });
                    }

                    return () => cleanups.forEach((fn) => fn());
                }
            );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="cta-manifesto"
            className="relative w-full select-none overflow-hidden rounded-xl bg-white font-['Outfit',sans-serif] text-black"
        >
            {/* Cursor spotlight (neutral black glow) */}
            <div
                ref={glowRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-0 h-[520px] w-[520px] rounded-full opacity-0"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0) 65%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16">
                {/* Top row */}
                {/* <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] sm:text-xs">
                    <span className="cta-fade text-[#ff5a1f]">(Let&apos;s talk)</span>
                    <span className="cta-fade inline-flex items-center gap-2 rounded-full border border-black/20 px-3 py-1.5 text-neutral-700">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-70 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                        </span>
                        Available for new projects
                    </span>
                </div> */}

                <div className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
                    {/* Left column */}
                    <div className="flex flex-col justify-between py-1 lg:col-span-4">
                        {/* <div className="cta-fade font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-neutral-600 sm:text-xs">
                            <p className="font-semibold text-black">
                                Bugsmoker — Beyond the Ordinary
                            </p>
                            <p className="mt-1 font-medium text-neutral-500">
                                +1 (416) 555-7823
                            </p>

                            <ul className="mt-6 flex flex-col gap-2 normal-case tracking-normal">
                                {PERKS.map((p) => (
                                    <li
                                        key={p}
                                        className="flex items-center gap-2 text-[13px] text-neutral-700"
                                    >
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                        <div className="mt-8 pt-4 lg:mt-auto">
                            <div ref={logoRef} className="w-fit origin-bottom-left">
                                <Image
                                    src="/bs-logo.png"
                                    alt="Bugsmoker bS. mark"
                                    width={180}
                                    height={127}
                                    className="h-auto w-36 select-none object-contain transition-transform duration-300 hover:scale-[1.03] sm:w-44 md:w-48"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col justify-center lg:col-span-8">
                        <h2 className="mb-6 text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[.85] tracking-[-0.07em] sm:mb-8">
                            <span className="cta-line block">
                                <MaskLine>got a problem?</MaskLine>
                            </span>
                            <span className="cta-line mt-[0.06em] block">
                                <MaskLine>
                                    we&apos;ll solve it
                                    <span className="text-[#ff5a1f]">.</span>
                                </MaskLine>
                            </span>
                        </h2>

                        <blockquote
                            ref={quoteRef}
                            className="font-['Outfit'] text-[clamp(1.4rem,2.8vw,2.4rem)] font-semibold leading-[1.18] tracking-[-0.045em] text-black"
                        >
                            {WORDS.map((w, i) => {
                                const clean = w.toLowerCase().replace(/[^a-z]/g, "");
                                const hot = HIGHLIGHT.has(clean);
                                return (
                                    <React.Fragment key={i}>
                                        <span
                                            className={`cta-word inline-block ${
                                                hot ? "text-[#ff5a1f]" : ""
                                            }`}
                                        >
                                            {w}
                                        </span>{" "}
                                    </React.Fragment>
                                );
                            })}
                        </blockquote>

                        <div className="mt-10 flex flex-wrap items-center gap-6 sm:mt-12 sm:gap-8">
                            {/* Magnetic circular CTA */}
                            <div
                                ref={btnWrapRef}
                                className="-m-3 p-3 sm:-m-6 sm:p-6"
                            >
                                <Link
                                    ref={btnRef}
                                    href="/contactus"
                                    aria-label="Let's build together, contact us"
                                    className="group relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#ff5a1f] sm:h-40 sm:w-40"
                                >
                                    <Ring />
                                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45 sm:h-16 sm:w-16">
                                        <ArrowUpRight size={26} strokeWidth={2.2} />
                                    </span>
                                </Link>
                            </div>

                            <div className="cta-fade flex flex-col gap-2">
                                <span className="text-lg font-semibold tracking-[-0.03em] sm:text-2xl">
                                    Let&apos;s Build Together
                                </span>
                                <Link
                                    href="/services"
                                    className="w-fit cursor-pointer font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-[#ff5a1f]"
                                >
                                    [ View Capabilities ]
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee: black band, white outlined text */}
            <div
                className="relative z-10 overflow-hidden bg-black py-4 sm:py-5"
                aria-hidden="true"
            >
                <div ref={trackRef} className="flex w-max will-change-transform">
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex shrink-0 items-center">
                            {MARQUEE.map((m) => (
                                <span
                                    key={`${copy}-${m}`}
                                    className="mr-6 inline-flex shrink-0 cursor-default items-center gap-6 whitespace-nowrap text-4xl font-semibold uppercase tracking-[-0.04em] text-transparent transition-colors duration-300 hover:text-[#ff5a1f] sm:mr-10 sm:gap-10 sm:text-6xl"
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
                                >
                                    {m}
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5a1f] sm:h-3 sm:w-3" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}