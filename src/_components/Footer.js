"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Social Media SVGs                                                   */
/* ------------------------------------------------------------------ */

function InstagramIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function LinkedInIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    );
}

function GitHubIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}

function XTwitterIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function PhoneIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const EMAIL = "info@bugsmoker.com";
const PHONE = "+91 8791802003";
const PHONE_HREF = "tel:+918791802003";

const NAV = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
];

const SERVICES = [
    { label: "Websites", href: "/services/web-development" },
    { label: "Apps", href: "/services/app-development" },
    { label: "Software", href: "/services/software-development" },
];

const SOCIALS = [
    {
        label: "Instagram",
        href: "https://instagram.com/",
        Icon: InstagramIcon,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/",
        Icon: LinkedInIcon,
    },
    {
        label: "GitHub",
        href: "https://github.com/",
        Icon: GitHubIcon,
    },
    {
        label: "X / Twitter",
        href: "https://x.com/",
        Icon: XTwitterIcon,
    },
];

const LEGAL = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

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
            <span className="ft-mask block">{children}</span>
        </span>
    );
}

function ColLabel({ children }) {
    return (
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5a1f] sm:text-xs sm:tracking-[0.22em]">
            ({children})
        </p>
    );
}

function FooterLink({ href, children }) {
    const external = /^https?:\/\//.test(href);
    const props = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Link
            href={href}
            {...props}
            className="group inline-flex min-h-9 items-center gap-1.5 text-[15px] text-white/70 transition-colors duration-300 hover:text-[#ff5a1f] focus-visible:text-[#ff5a1f] focus-visible:outline-none"
        >
            <span>{children}</span>
            <ArrowUpRight
                size={14}
                strokeWidth={2.2}
                aria-hidden="true"
                className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            />
        </Link>
    );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Footer() {
    const rootRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const video = videoRef.current;
        if (video) {
            video.muted = true;
        }

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    motion: "(prefers-reduced-motion: no-preference)",
                    reduce: "(prefers-reduced-motion: reduce)",
                },
                (context) => {
                    if (context.conditions.reduce) {
                        video?.pause();
                        return;
                    }

                    video?.play().catch(() => {});

                    gsap.from(".ft-mask", {
                        yPercent: 115,
                        duration: 1.1,
                        ease: "power4.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: root, start: "top 80%", once: true },
                    });

                    gsap.from(".ft-fade", {
                        opacity: 0,
                        y: 24,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.07,
                        scrollTrigger: { trigger: root, start: "top 75%", once: true },
                    });

                    /* Giant wordmark rises into view at the very bottom */
                    gsap.from(".ft-wordmark", {
                        yPercent: 35,
                        opacity: 0,
                        duration: 1.3,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: ".ft-wordmark",
                            start: "top 100%",
                            once: true,
                        },
                    });
                }
            );
        }, root);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, []);

    const toTop = () => {
        const lenis = typeof window !== "undefined" ? window.__lenis : null;
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.4 });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer
            ref={rootRef}
            id="footer"
            className="relative mt-3 w-full select-none overflow-hidden rounded-xl bg-black font-['Outfit',sans-serif] text-white"
        >
            {/* Ambient orange brand aura */}
            <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
                <div
                    className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[140px] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, #ff5a1f 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* ================= Top: call to action ================= */}
            <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
                    <div className="lg:col-span-8">
                        <div className="ft-fade flex items-center gap-2">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-70 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                            </span>
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.22em]">
                                Available for new projects
                            </span>
                        </div>

                        <h2 className="mt-5 text-[clamp(2.3rem,11.5vw,3.4rem)] font-semibold lowercase leading-[.9] tracking-[-0.06em] sm:mt-6 sm:text-[clamp(3rem,6.5vw,7rem)] sm:leading-[.88] sm:tracking-[-0.07em]">
                            <span className="block">
                                <MaskLine>have an idea?</MaskLine>
                            </span>
                            <span className="mt-[0.04em] block">
                                <MaskLine>
                                    <span className="text-white/35">let&apos;s build it</span>
                                    <span className="text-[#ff5a1f]">.</span>
                                </MaskLine>
                            </span>
                        </h2>
                    </div>

                    <div className="ft-fade flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
                        <p className="max-w-xs text-sm leading-[1.7] text-white/60 sm:leading-[1.8] lg:text-right">
                            Tell us what&apos;s holding your business back. We reply within 24
                            hours, with a clear, fixed-scope quote.
                        </p>

                        <Link
                            href="/contact-us"
                            className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] py-2 pl-6 pr-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-[#ff5a1f]/20"
                        >
                            Start a project
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={18} strokeWidth={2.2} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ================= Lower footer: video-backed links, wordmark & bottom bar ================= */}
            <div className="relative overflow-hidden border-t border-white/15 bg-black">
                {/* Ambient video background */}
                <video
                    ref={videoRef}
                    src="/video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 saturate-[0.85] contrast-[1.06]"
                />

                {/* Soft vertical gradient veil for seamless top fade & crisp legibility */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 backdrop-blur-[1px]"
                   
                />

                {/* Subtle edge vignette */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 65% 45%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.68) 100%)",
                    }}
                />

                {/* ================= Middle: link columns ================= */}
                <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-12 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-x-8">
                        {/* Brand + contact */}
                        <div className="ft-fade col-span-2 md:col-span-5">
                            <Link href="/" aria-label="Bugsmoker Home" className="inline-block group">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/bs-logo.png"
                                        alt="Bugsmoker bS. mark"
                                        width={140}
                                        height={99}
                                        className="h-16 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-20 md:h-16 lg:h-20"
                                    />
                                    <p className="max-w-xs text-sm leading-[1.7] text-white/75 sm:leading-[1.8]">
                                        Beyond the ordinary. Websites, apps and software built with
                                        thoughtful design and reliable technology.
                                    </p>
                                </div>
                            </Link>

                            <div className="mt-6 flex flex-col items-start gap-4">
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="group inline-flex min-h-9 items-center gap-2.5 text-[19px] font-semibold tracking-[0.02em] transition-colors duration-300 hover:text-[#ff5a1f] sm:text-2xl md:text-xl lg:text-2xl"
                                >
                                    {EMAIL}
                                    <ArrowUpRight
                                        size={18}
                                        strokeWidth={2.2}
                                        aria-hidden="true"
                                        className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
                                    />
                                </a>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5">
                                    <a
                                        href={PHONE_HREF}
                                        className="group inline-flex min-h-9 shrink-0 items-center gap-2 font-mono text-sm font-bold tracking-[0.06em] text-white/90 transition-colors duration-300 hover:text-[#ff5a1f]"
                                    >
                                        <PhoneIcon className="h-4 w-4 shrink-0 text-[#ff5a1f] transition-transform duration-300 group-hover:scale-110" />
                                        {PHONE}
                                    </a>

                                    {/* Quick SVG Social Media Badges */}
                                    <div className="flex items-center gap-2.5">
                                        {SOCIALS.map(({ label, href, Icon }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/85 backdrop-blur-md transition-all duration-300 hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-black hover:scale-110 active:scale-95 shadow-sm sm:h-10 sm:w-10"
                                            >
                                                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigate */}
                        <nav
                            aria-label="Footer navigation"
                            className="ft-fade md:col-span-2 md:col-start-6"
                        >
                            <ColLabel>Navigate</ColLabel>
                            <ul className="mt-4 flex flex-col">
                                {NAV.map((l) => (
                                    <li key={l.label}>
                                        <FooterLink href={l.href}>{l.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Services */}
                        <div className="ft-fade md:col-span-3">
                            <ColLabel>What we do</ColLabel>
                            <ul className="mt-4 flex flex-col">
                                {SERVICES.map((l) => (
                                    <li key={l.label}>
                                        <FooterLink href={l.href}>{l.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow (with SVGs) */}
                        {/* <div className="ft-fade col-span-2 md:col-span-2 md:col-start-11 md:row-start-1">
                            <ColLabel>Follow</ColLabel>
                            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:gap-x-0 md:gap-y-2">
                                {SOCIALS.map(({ label, href, Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex min-h-9 items-center gap-2 text-[14px] text-white/80 transition-colors duration-300 hover:text-white"
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/85 backdrop-blur-md transition-all duration-300 group-hover:border-[#ff5a1f] group-hover:bg-[#ff5a1f] group-hover:text-black">
                                                <Icon className="h-3.5 w-3.5" />
                                            </span>
                                            <span className="group-hover:text-[#ff5a1f] transition-colors">
                                                {label}
                                            </span>
                                            <ArrowUpRight
                                                size={12}
                                                aria-hidden="true"
                                                className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#ff5a1f]"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>

                {/* ================= Giant wordmark ================= */}
                <div
                    aria-hidden="true"
                    className="relative z-10 mt-10 overflow-hidden pb-2 sm:mt-14 sm:pb-4"
                >
                    <p className="ft-wordmark px-2 pb-[0.16em] text-center text-[clamp(3.2rem,19.5vw,18rem)] font-semibold lowercase leading-[.9] tracking-[-0.08em] text-white/90 drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-colors duration-700 hover:text-[#ff5a1f]">
                        bugsmoker<span className="text-[#ff5a1f]">.</span>
                    </p>
                </div>

                {/* ================= Bottom bar ================= */}
                {/* <div className="relative z-10 border-t border-white/15 bg-black/25 backdrop-blur-md">
                    <div className="mx-auto flex max-w-[1440px] flex-col-reverse gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
                                &copy; {new Date().getFullYear()} Bugsmoker. All rights reserved.
                            </p>
                            <ul className="flex items-center gap-5">
                                {LEGAL.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            href={l.href}
                                            className="inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 transition-colors duration-300 hover:text-[#ff5a1f]"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                       
                    </div>
                </div> */}
            </div>
        </footer>
    );
}
