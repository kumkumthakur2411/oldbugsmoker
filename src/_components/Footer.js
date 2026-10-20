import Link from "next/link";
import {

    ArrowUpRight,
} from "lucide-react";
function Instagram({ size = 20, className = "", ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
    );
}

function Linkedin({ size = 20, className = "", ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            {...props}
        >
            <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.2 0h3.6v1.6h.1A4 4 0 0 1 16.8 8c4 0 4.7 2.6 4.7 6V21h-3.8v-6.2c0-1.5 0-3.5-2.1-3.5s-2.4 1.6-2.4 3.4V21H9.5V9Z" />
        </svg>
    );
}
function Github({ size = 24, strokeWidth = 2, className = "", ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

const services = [
    { label: "Website Development", href: "/services/website-development" },
    { label: "Software Development", href: "/services/software-development" },
    { label: "Website Design", href: "/services/website-design" },
    { label: "Website Optimisation", href: "/services/website-optimisation" },
    { label: "Hosting", href: "/services/hosting" },
    { label: "Technical Support", href: "/services/technical-support" },
];

const company = [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },

];

const legal = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socialLinks = [
    {
        label: "Instagram",
        href: "https://instagram.com/",
        icon: Instagram,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/",
        icon: Linkedin,
    },
    {
        label: "GitHub",
        href: "https://github.com/",
        icon: Github,
    },
];

function FooterLinks({ title, links }) {
    return (
        <div>
            <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                {title}
            </h3>

            <ul className="space-y-2.5">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1 text-sm text-white/75 transition-colors duration-300 hover:text-white sm:text-[15px]"
                        >
                            <span>{link.label}</span>

                            <ArrowUpRight
                                size={13}
                                className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative isolate overflow-hidden bg-[#171b13] text-white">

            {/* FULL FOOTER BACKGROUND */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat "
                style={{
                    backgroundImage: "url('/footer.png')",
                }}
            />

            {/* DARK OVERLAY FOR TEXT READABILITY */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10130f]/85 via-[#10130f]/45 to-[#10130f]/10" />

            {/* BOTTOM GRADIENT */}
            <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-gradient-to-t from-[#10130f]/85 via-[#10130f]/25 to-transparent" />

            <div className="mx-auto flex min-h-[680px] max-w-[1800px] flex-col justify-between px-6 pb-6 pt-12 sm:px-10 sm:pt-16 lg:min-h-[760px] lg:px-16 lg:pt-20">

                {/* TOP CONTENT */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pt-20" >

                    {/* BRAND */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            aria-label="Bugsmoker home"
                            className="inline-block"
                        >
                            <span className="block text-[clamp(2.5rem,6vw,7.5rem)] font-bold leading-[0.8] tracking-[-0.085em] text-[#f5f1df]">
                                bugsmoker
                            </span>
                        </Link>

                        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.38em] text-white/75 sm:text-xs">
                            We make tech easy
                        </p>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
                            Turning business challenges into digital possibilities.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="mt-8 flex items-center gap-3">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                                >
                                    <Icon size={17} strokeWidth={1.7} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3 lg:pt-2">

                        {/* SERVICES */}
                        <FooterLinks
                            title="Services"
                            links={services}
                        />

                        {/* COMPANY + LEGAL */}
                        <div className="flex flex-col gap-10">
                            <FooterLinks
                                title="Company"
                                links={company}
                            />

                            {/* Mobile: below Company | Desktop: third column */}
                            <div className="lg:hidden">
                                <FooterLinks
                                    title="Legal"
                                    links={legal}
                                />
                            </div>
                        </div>

                        {/* LEGAL — desktop only */}
                        <div className="hidden lg:block">
                            <FooterLinks
                                title="Legal"
                                links={legal}
                            />
                        </div>

                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-16 border-t border-white/20 pt-5">
                    <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.12em] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-xs">

                        <p>
                            © 2026 Bugsmoker. All rights reserved.
                        </p>

                        <div className="flex items-center gap-5">
                            <Link
                                href="/privacy-policy"
                                className="transition-colors hover:text-white"
                            >
                                Privacy
                            </Link>

                            <Link
                                href="/terms-and-conditions"
                                className="transition-colors hover:text-white"
                            >
                                Terms
                            </Link>

                            <Link
                                href="/contact"
                                className="transition-colors hover:text-white"
                            >
                                Get in touch ↗
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}