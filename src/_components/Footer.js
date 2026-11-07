"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* ------------------------------------------------------------------ */

const EMAIL = "hello@bugsmoker.com";
const PHONE = "+1 (416) 555-7823";
const PHONE_HREF = "tel:+14165557823";

const NAV = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contactus" },
];

const SERVICES = [
    { label: "Websites", href: "/services" },
    { label: "Apps", href: "/services" },
    { label: "Software", href: "/services" },
    { label: "Hosting & DevOps", href: "/services" },
    { label: "Tech Support", href: "/services" },
];

/* Replace the "#" links with your real profiles */
const SOCIALS = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "X / Twitter", href: "#" },
];

const LEGAL = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

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
            <span className="ft-mask block">{children}</span>
        </span>
    );
}

/* Small mono column label, same style as the other sections */
function ColLabel({ children }) {
    return (
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5a1f] sm:text-xs sm:tracking-[0.22em]">
            ({children})
        </p>
    );
}

/* Footer link: turns orange on hover, little arrow slides in */
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

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
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
            });
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
            <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
                {/* ================= Top: call to action ================= */}
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
                            href="/contactus"
                            className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] py-2 pl-6 pr-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white"
                        >
                            Start a project
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={18} strokeWidth={2.2} />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* ================= Middle: link columns ================= */}
                <div className="mt-12 border-t border-white/15 pt-10 sm:mt-16 sm:pt-12">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-x-8">
                        {/* Brand + contact */}
                        <div className="ft-fade col-span-2 md:col-span-4">
                            <p className="text-[2rem] font-semibold lowercase leading-none tracking-[-0.06em]">
                                bugsmoker<span className="text-[#ff5a1f]">.</span>
                            </p>
                            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-white/60 sm:leading-[1.8]">
                                Beyond the ordinary. Websites, apps and software built with
                                thoughtful design and reliable technology.
                            </p>

                            <div className="mt-6 flex flex-col items-start gap-1">
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="group inline-flex min-h-9 items-center gap-2 text-[15px] font-semibold transition-colors duration-300 hover:text-[#ff5a1f]"
                                >
                                    {EMAIL}
                                    <ArrowUpRight
                                        size={15}
                                        strokeWidth={2.2}
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover:rotate-45"
                                    />
                                </a>
                                <a
                                    href={PHONE_HREF}
                                    className="inline-flex min-h-9 items-center font-mono text-xs tracking-[0.08em] text-white/60 transition-colors duration-300 hover:text-[#ff5a1f]"
                                >
                                    {PHONE}
                                </a>
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

                        {/* Socials */}
                        <div className="ft-fade col-span-2 md:col-span-2 md:col-start-11 md:row-start-1">
                            <ColLabel>Follow</ColLabel>
                            <ul className="mt-4 flex flex-wrap gap-x-6 md:flex-col md:gap-x-0">
                                {SOCIALS.map((l) => (
                                    <li key={l.label}>
                                        <FooterLink href={l.href}>{l.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= Giant wordmark ================= */}
            <div
                aria-hidden="true"
                className="relative mt-8 overflow-hidden sm:mt-12"
            >
                <p className="ft-wordmark px-2 text-center text-[clamp(3.2rem,19.5vw,18rem)] font-semibold lowercase leading-[.78] tracking-[-0.08em] text-white/[0.07] transition-colors duration-700 hover:text-[#ff5a1f]">
                    bugsmoker<span className="text-[#ff5a1f]">.</span>
                </p>
            </div>

            {/* ================= Bottom bar ================= */}
            <div className="relative z-10 border-t border-white/15">
                <div className="mx-auto flex max-w-[1440px] flex-col-reverse gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                            &copy; {new Date().getFullYear()} Bugsmoker. All rights reserved.
                        </p>
                        <ul className="flex items-center gap-5">
                            {LEGAL.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="inline-flex min-h-8 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/50 transition-colors duration-300 hover:text-[#ff5a1f]"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="button"
                        onClick={toTop}
                        aria-label="Back to top"
                        className="group inline-flex w-fit items-center gap-3 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 hover:text-white sm:self-auto"
                    >
                        Back to top
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ff5a1f] group-hover:bg-[#ff5a1f] group-hover:text-black">
                            <ArrowUp size={16} strokeWidth={2.2} aria-hidden="true" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}