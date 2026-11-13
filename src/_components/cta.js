"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE = [
    "Websites",
    "Apps",
    "High Performance",
    "Digital Engineering",
    "Creative Direction",
    "Zero Downtime",
    "AI Integration",
    "Next.js & React",
];

/* One loop group = the list twice, so a single group is always wider than the screen */
const GROUP = [...MARQUEE, ...MARQUEE];

const RESTING = {
    "--ink": "#ffffff",
    "--ink-soft": "rgba(255,255,255,0.55)",
    "--accent": "#ff5a1f",
    "--line": "rgba(255,255,255,0.14)",
    "--circle-bg": "#ffffff",
    "--circle-fg": "#000000",
};

const ACTIVE = {
    "--ink": "#000000",
    "--ink-soft": "rgba(0,0,0,0.6)",
    "--accent": "#ffffff",
    "--line": "rgba(0,0,0,0.2)",
    "--circle-bg": "#000000",
    "--circle-fg": "#ffffff",
};

function StarIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
        </svg>
    );
}

/* Rotating text ring inside the circular button */
function RotatingRing({
    text = "Let's talk • Let's build • Let's talk • Let's build • ",
}) {
    const id = "cta-ring-path-standalone";

    return (
        <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 animate-[spin_16s_linear_infinite] text-[color:var(--ink)] group-hover/cta:animate-[spin_7s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
        >
            <defs>
                <path
                    id={id}
                    d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                />
            </defs>
            <text
                className="fill-current text-[8.5px] font-semibold uppercase tracking-wider"
                textLength="248"
                lengthAdjust="spacing"
            >
                <textPath href={`#${id}`}>{text}</textPath>
            </text>
        </svg>
    );
}

function MarqueeGroup({ hidden = false }) {
    return (
        <div
            className="flex shrink-0 items-center"
            aria-hidden={hidden ? "true" : undefined}
        >
            {GROUP.map((label, i) => (
                <span
                    key={`${label}-${i}`}
                    className="flex items-center gap-4 whitespace-nowrap pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] sm:gap-6 sm:pr-6 sm:text-xs"
                >
                    {label}
                    <StarIcon className="h-2.5 w-2.5 text-[color:var(--accent)]" />
                </span>
            ))}
        </div>
    );
}

export default function Cta({
    contactHref = "/contactus",
    title = "Let's Build Together",
    label = "[ Have an idea? ]",
    className = "",
}) {
    const rootRef = useRef(null);
    const fillRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        const fill = fillRef.current;
        const track = trackRef.current;
        if (!root || !fill || !track) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /* Shared hover-fill logic; duration is 0 for reduced motion */
            const bindHover = (dur) => {
                const canHover = window.matchMedia(
                    "(hover: hover) and (pointer: fine)"
                ).matches;
                if (!canHover) return () => {};

                const point = (e) => {
                    const r = root.getBoundingClientRect();
                    return `${e.clientX - r.left}px ${e.clientY - r.top}px`;
                };

                const onEnter = (e) => {
                    if (e.pointerType !== "mouse") return;
                    const at = point(e);
                    gsap.killTweensOf([fill, root]);
                    gsap.set(fill, { clipPath: `circle(0% at ${at})` });
                    gsap.to(fill, {
                        clipPath: `circle(150% at ${at})`,
                        duration: dur,
                        ease: "power3.inOut",
                    });
                    gsap.to(root, {
                        ...ACTIVE,
                        duration: dur * 0.6,
                        ease: "power2.out",
                    });
                };

                const onLeave = (e) => {
                    if (e.pointerType !== "mouse") return;
                    const at = point(e);
                    gsap.killTweensOf([fill, root]);
                    gsap.set(fill, { clipPath: `circle(150% at ${at})` });
                    gsap.to(fill, {
                        clipPath: `circle(0% at ${at})`,
                        duration: dur,
                        ease: "power3.inOut",
                    });
                    gsap.to(root, {
                        ...RESTING,
                        duration: dur * 0.6,
                        ease: "power2.out",
                    });
                };

                root.addEventListener("pointerenter", onEnter);
                root.addEventListener("pointerleave", onLeave);

                return () => {
                    root.removeEventListener("pointerenter", onEnter);
                    root.removeEventListener("pointerleave", onLeave);
                };
            };

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Entrance reveal */
                gsap.fromTo(
                    ".cta-reveal",
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: root,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );

                const unbind = bindHover(0.7);

                /* Marquee: -50% of a two-group track loops seamlessly */
                const tween = gsap.fromTo(
                    track,
                    { xPercent: 0 },
                    { xPercent: -50, duration: 36, ease: "none", repeat: -1 }
                );

                let vel = 0;
                let visible = false;
                let scale = 1;

                const st = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: (self) => {
                        visible = self.isActive;
                        tween.paused(!visible);
                    },
                    onUpdate: (self) => {
                        vel = self.getVelocity();
                    },
                });
                visible = st.isActive;
                tween.paused(!visible);

                const tick = (time, deltaTime) => {
                    if (!visible) return;
                    const dt = Math.min(deltaTime, 64) / 16.667;
                    const target = 1 + gsap.utils.clamp(0, 4, Math.abs(vel) / 300);
                    scale += (target - scale) * (1 - Math.pow(1 - 0.1, dt));
                    tween.timeScale(scale);
                    vel *= Math.pow(0.9, dt);
                };
                gsap.ticker.add(tick);

                return () => {
                    gsap.ticker.remove(tick);
                    unbind();
                    st.kill();
                    tween.kill();
                };
            });

            /* Reduced motion: static, instant colour swap on hover */
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(".cta-reveal", { opacity: 1, y: 0 });
                return bindHover(0);
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="cta-section"
            aria-label="Call to action"
            style={RESTING}
            className={`group/cta relative w-full select-none overflow-hidden rounded-xl bg-black font-['Outfit',sans-serif] text-[color:var(--ink)] ring-1 ring-white/10 ${className}`}
        >
            {/* Orange fill that expands from the cursor */}
            <div
                ref={fillRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[#ff5a1f]"
                style={{ clipPath: "circle(0% at 50% 50%)" }}
            />

            {/* Headline row */}
            <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-8 sm:px-8 sm:py-10 md:px-12">
                <div className="cta-reveal flex min-w-0 flex-col gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)] sm:text-[11px]">
                        {label}
                    </span>

                    <h2 className="text-[2.5rem] font-extrabold leading-[1] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl">
                        <Link
                            href={contactHref}
                            aria-label={`${title}, contact us`}
                            className="outline-none after:absolute after:inset-0 after:z-20 after:content-['']"
                        >
                            Let&apos;s build
                            <br className="sm:hidden" />{" "}
                            <span className="text-[color:var(--accent)]">
                                together.
                            </span>
                        </Link>
                    </h2>
                </div>

                {/* Circular button with rotating text ring */}
                <div
                    aria-hidden="true"
                    className="cta-reveal relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] sm:h-36 sm:w-36 md:h-44 md:w-44"
                >
                    <RotatingRing />

                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--circle-bg)] text-[color:var(--circle-fg)] shadow-md transition-transform duration-300 group-hover/cta:rotate-45 sm:h-16 sm:w-16 md:h-20 md:w-20">
                        <ArrowUpRight
                            strokeWidth={2.4}
                            className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9"
                        />
                    </span>
                </div>
            </div>

            {/* Slim marquee strip */}
            <div className="cta-reveal relative z-10 overflow-hidden border-t border-[color:var(--line)] py-3 text-[color:var(--ink-soft)] sm:py-3.5">
                <div ref={trackRef} className="flex w-max will-change-transform">
                    <MarqueeGroup />
                    <MarqueeGroup hidden />
                </div>
            </div>
        </section>
    );
}

export { Cta };