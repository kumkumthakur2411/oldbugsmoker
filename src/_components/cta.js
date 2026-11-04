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
/* Marquee Data                                                        */
/* ------------------------------------------------------------------ */

const MARQUEE_1 = [
    "Websites",
    "Apps",
    "High Performance",
    "Software",
    "Sub-Second Speed",
    "Hosting & DevOps",
    "Tech Support",
    "Scalable Systems",
    "Fluid Motion",
    "Next.js 15+ & React 19",
];

const MARQUEE_2 = [
    "Bugsmoker Atelier",
    "Digital Engineering",
    "Creative Direction",
    "Zero Downtime",
    "Fluid 60+ FPS Motion",
    "Enterprise Grade",
    "Bespoke Platforms",
    "AI Integration",
    "Cloud Architecture",
    "Bespoke Systems",
];

const RIBBON_ITEMS_1 = [...MARQUEE_1, ...MARQUEE_1, ...MARQUEE_1, ...MARQUEE_1];
const RIBBON_ITEMS_2 = [...MARQUEE_2, ...MARQUEE_2, ...MARQUEE_2, ...MARQUEE_2];

/* Rotating text ring inside the circular button */
function RotatingRing({
    text = "Let's talk • Let's build • Let's talk • Let's build • ",
}) {
    const id = "cta-ring-path-standalone";

    return (
        <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 animate-[spin_16s_linear_infinite] motion-reduce:animate-none pointer-events-none"
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

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Cta({
    showLogo = true,
    contactHref = "/contactus",
    capabilitiesHref = "/services",
    title = "Let's Build Together",
    subtitle = "[ View Capabilities ]",
    className = "",
}) {
    const rootRef = useRef(null);
    const wrapRef = useRef(null);
    const btnRef = useRef(null);
    const stageRef = useRef(null);
    const trackRef1 = useRef(null);
    const trackRef2 = useRef(null);

    /* 1. Magnetic button spring physics on hover */
    useEffect(() => {
        const wrap = wrapRef.current;
        const btn = btnRef.current;
        if (!wrap || !btn) return;

        const isHover = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;
        if (!isHover) return;

        const onBtnMove = (e) => {
            const r = wrap.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);

            gsap.to(btn, {
                x: dx * 0.35,
                y: dy * 0.35,
                duration: 0.35,
                ease: "power3.out",
            });
        };

        const onBtnLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.9,
                ease: "elastic.out(1, 0.4)",
            });
        };

        wrap.addEventListener("mousemove", onBtnMove);
        wrap.addEventListener("mouseleave", onBtnLeave);

        return () => {
            wrap.removeEventListener("mousemove", onBtnMove);
            wrap.removeEventListener("mouseleave", onBtnLeave);
        };
    }, []);

    /* 2. Dual Waving Marquee Ribbons animation */
    useEffect(() => {
        const root = rootRef.current;
        const stage = stageRef.current;
        const track1 = trackRef1.current;
        const track2 = trackRef2.current;
        if (!root || !stage || !track1 || !track2) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const pills1 = gsap.utils.toArray(".wave-pill-1", track1);
                const pills2 = gsap.utils.toArray(".wave-pill-2", track2);
                if (pills1.length === 0 || pills2.length === 0) return;

                const setTrack1X = gsap.quickSetter(track1, "x", "px");
                const setTrack2X = gsap.quickSetter(track2, "x", "px");

                const setPill1Y = pills1.map((p) =>
                    gsap.quickSetter(p, "y", "px")
                );
                const setPill1Rot = pills1.map((p) =>
                    gsap.quickSetter(p, "rotation", "deg")
                );

                const setPill2Y = pills2.map((p) =>
                    gsap.quickSetter(p, "y", "px")
                );
                const setPill2Rot = pills2.map((p) =>
                    gsap.quickSetter(p, "rotation", "deg")
                );

                let stepWidth1 = 180;
                let stepWidth2 = 210;
                let repeatWidth1 = MARQUEE_1.length * stepWidth1;
                let repeatWidth2 = MARQUEE_2.length * stepWidth2;
                let wavelength = 900;
                let amplitude = 42;
                let maxRot = 14;

                let xPos1 = 0;
                let xPos2 = -repeatWidth2;
                let vel = 0;
                let isHovered = false;
                let currentSpeed = 2.0;

                const measure = () => {
                    if (pills1.length >= 2) {
                        const step1 =
                            pills1[1].offsetLeft - pills1[0].offsetLeft;
                        if (step1 > 20) stepWidth1 = step1;
                    }
                    if (pills2.length >= 2) {
                        const step2 =
                            pills2[1].offsetLeft - pills2[0].offsetLeft;
                        if (step2 > 20) stepWidth2 = step2;
                    }

                    repeatWidth1 = MARQUEE_1.length * stepWidth1;
                    repeatWidth2 = MARQUEE_2.length * stepWidth2;

                    const waves1 = Math.max(2, Math.round(repeatWidth1 / 850));
                    wavelength = repeatWidth1 / waves1;

                    const width = window.innerWidth;
                    amplitude = width < 640 ? 24 : width < 1024 ? 34 : 44;
                    maxRot = width < 640 ? 10 : 15;
                };

                const applyPositions = () => {
                    for (let i = 0; i < pills1.length; i++) {
                        const screenX = xPos1 + i * stepWidth1;
                        const angle = (screenX / wavelength) * Math.PI * 2;
                        setPill1Y[i](Math.sin(angle) * amplitude);
                        setPill1Rot[i](Math.cos(angle) * maxRot);
                    }
                    for (let j = 0; j < pills2.length; j++) {
                        const screenX = xPos2 + j * stepWidth2;
                        const angle =
                            (screenX / wavelength) * Math.PI * 2 + Math.PI;
                        setPill2Y[j](Math.sin(angle) * amplitude);
                        setPill2Rot[j](Math.cos(angle) * maxRot);
                    }
                };

                measure();
                applyPositions();

                const onResize = () => {
                    measure();
                    applyPositions();
                };
                window.addEventListener("resize", onResize);

                const st = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        vel = self.getVelocity();
                    },
                });

                const onEnter = (e) => {
                    if (e.pointerType === "mouse") isHovered = true;
                };
                const onLeave = () => {
                    isHovered = false;
                };

                stage.addEventListener("pointerenter", onEnter);
                stage.addEventListener("pointerleave", onLeave);

                const tick = () => {
                    const boost = gsap.utils.clamp(0, 6, Math.abs(vel) / 250);
                    const targetSpeed = isHovered ? 0.35 : 2.0 + boost;
                    currentSpeed += (targetSpeed - currentSpeed) * 0.1;

                    // Ribbon 1 moves to the left
                    xPos1 -= currentSpeed;
                    if (xPos1 <= -repeatWidth1) {
                        xPos1 += repeatWidth1;
                    }
                    setTrack1X(xPos1);

                    // Ribbon 2 moves to the right
                    xPos2 += currentSpeed * 0.95;
                    if (xPos2 >= 0) {
                        xPos2 -= repeatWidth2;
                    }
                    setTrack2X(xPos2);

                    for (let i = 0; i < pills1.length; i++) {
                        const screenX = xPos1 + i * stepWidth1;
                        const angle = (screenX / wavelength) * Math.PI * 2;
                        setPill1Y[i](Math.sin(angle) * amplitude);
                        setPill1Rot[i](Math.cos(angle) * maxRot);
                    }

                    for (let j = 0; j < pills2.length; j++) {
                        const screenX = xPos2 + j * stepWidth2;
                        const angle =
                            (screenX / wavelength) * Math.PI * 2 + Math.PI;
                        setPill2Y[j](Math.sin(angle) * amplitude);
                        setPill2Rot[j](Math.cos(angle) * maxRot);
                    }

                    vel *= 0.9;
                };

                gsap.ticker.add(tick);

                return () => {
                    gsap.ticker.remove(tick);
                    window.removeEventListener("resize", onResize);
                    stage.removeEventListener("pointerenter", onEnter);
                    stage.removeEventListener("pointerleave", onLeave);
                    st.kill();
                };
            });

            // Reduced motion fallback
            mm.add("(prefers-reduced-motion: reduce)", () => {
                const pills1 = gsap.utils.toArray(".wave-pill-1", track1);
                const pills2 = gsap.utils.toArray(".wave-pill-2", track2);
                pills1.forEach((p, i) => {
                    const y = Math.sin((i / 8) * Math.PI * 2) * 24;
                    gsap.set(p, { y });
                });
                pills2.forEach((p, j) => {
                    const y = Math.sin((j / 8) * Math.PI * 2 + Math.PI) * 24;
                    gsap.set(p, { y });
                });
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="cta-section"
            aria-label="Call to action"
            className={`relative w-full select-none overflow-hidden rounded-xl bg-white font-['Outfit',sans-serif] text-black py-12 sm:py-16 md:py-20 ${className}`}
        >
            {/* Top Row: Brand Logo Mark + Magnetic Button Lockup */}
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                {/* Left: Brand Logo Mark */}
                {showLogo && (
                    <div className="shrink-0 select-none flex flex-col items-center md:items-start text-center md:text-left gap-2">
                        <Link
                            href="/"
                            aria-label="Bugsmoker Home"
                            className="block group"
                        >
                            <Image
                                src="/bs-logo.png"
                                alt="Bugsmoker bS. mark"
                                width={180}
                                height={127}
                                className="h-auto w-32 sm:w-40 md:w-44 object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                                priority
                            />
                        </Link>
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                            Digital Engineering &bull; Studio
                        </span>
                    </div>
                )}

                {/* Right: Magnetic Rotating Button + Text Lockup */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8">
                    {/* Magnetic Circular CTA Button */}
                    <div
                        ref={wrapRef}
                        className="-m-3 p-3 sm:-m-4 sm:p-4 flex items-center justify-center cursor-pointer"
                    >
                        <Link
                            ref={btnRef}
                            href={contactHref}
                            aria-label={`${title}, contact us`}
                            className="group relative flex h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-xl shadow-black/15 transition-colors duration-300 hover:bg-[#ff5a1f] will-change-transform"
                        >
                            {/* Outer rotating text ring */}
                            <RotatingRing />

                            {/* Inner white circle with arrow */}
                            <span className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={22} strokeWidth={2.4} />
                            </span>
                        </Link>
                    </div>

                    {/* Title & Link */}
                    <div className="flex flex-col items-center md:items-start gap-1.5">
                        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-black">
                            {title}
                        </span>
                        <Link
                            href={capabilitiesHref}
                            className="w-fit cursor-pointer font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-500 transition-colors hover:text-[#ff5a1f]"
                        >
                            {subtitle}
                        </Link>
                    </div>
                </div>
            </div>

           
        </section>
    );
}

export { Cta };
