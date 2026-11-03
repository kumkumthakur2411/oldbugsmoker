"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

/* Rotating text ring inside the circular button */
function RotatingRing({ text = "Let's talk • Let's build • Let's talk • Let's build • " }) {
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
                <textPath href={`#${id}`}>
                    {text}
                </textPath>
            </text>
        </svg>
    );
}

export default function Cta({
    showLogo = true,
    contactHref = "/contactus",
    capabilitiesHref = "/services",
    title = "Let's Build Together",
    subtitle = "[ View Capabilities ]",
    className = "",
}) {
    const wrapRef = useRef(null);
    const btnRef = useRef(null);
    const logoRef = useRef(null);

    // Magnetic button spring physics on hover
    useEffect(() => {
        const wrap = wrapRef.current;
        const btn = btnRef.current;
        if (!wrap || !btn) return;

        // Only on pointer-fine hover devices
        const isHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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

    return (
        <div
            className={`w-full flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12 py-6 sm:py-8 ${className}`}
        >
            {/* Left: Brand Logo Mark */}
            {showLogo && (
                <div ref={logoRef} className="shrink-0 select-none">
                    <Link href="/" aria-label="Bugsmoker Home" className="block group">
                        <Image
                            src="/bs-logo.png"
                            alt="Bugsmoker bS. mark"
                            width={180}
                            height={127}
                            className="h-auto w-32 sm:w-40 md:w-48 object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                            priority
                        />
                    </Link>
                </div>
            )}

            {/* Right: Magnetic Rotating Button + Text Lockup */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                {/* Magnetic Circular CTA Button */}
                <div
                    ref={wrapRef}
                    className="-m-3 p-3 sm:-m-5 sm:p-5 flex items-center justify-center cursor-pointer"
                >
                    <Link
                        ref={btnRef}
                        href={contactHref}
                        aria-label={`${title}, contact us`}
                        className="group relative flex h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-xl shadow-black/20 transition-colors duration-300 hover:bg-[#ff5a1f] will-change-transform"
                    >
                        {/* Outer rotating text ring */}
                        <RotatingRing />

                        {/* Inner white circle with arrow */}
                        <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={24} strokeWidth={2.4} />
                        </span>
                    </Link>
                </div>

                {/* Title & Link */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-black">
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
    );
}

export { Cta };

