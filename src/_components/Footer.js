import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
            {/* Background */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/footer.png')" }}
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10130f]/85 via-[#10130f]/65 to-[#10130f]/40" />

            <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-gradient-to-t from-[#10130f]/90 via-[#10130f]/35 to-transparent" />

            <div className="mx-auto flex min-h-[680px] max-w-[1800px] flex-col justify-between px-6 pb-6 pt-12 sm:px-10 sm:pt-16 lg:min-h-[760px] lg:px-16 lg:pt-20">
                {/* Desktop + Mobile Brand */}
                <div className="grid grid-cols-1 gap-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-20">
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            aria-label="Bugsmoker home"
                            className="inline-block"
                        >
                            <span className="block text-[clamp(2.8rem,6vw,7.5rem)] font-bold leading-[0.8] tracking-[-0.085em] text-[#f5f1df]">
                                bugsmoker
                            </span>
                        </Link>

                        <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.32em] text-white/70 sm:text-xs sm:tracking-[0.38em]">
                            We make tech easy
                        </p>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
                            Turning business challenges into digital possibilities.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3">
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
                            <Link
                                href="/contact"
                                className=" inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs text-white/90 transition-colors hover:bg-white hover:text-black sm:mt-8 lg:hidden"
                            >
                                Have  project in mind?
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        {/* Mobile contact link */}

                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden lg:grid lg:col-span-7 lg:grid-cols-3 lg:gap-8 lg:pt-2">
                        <FooterLinks title="Services" links={services} />
                        <FooterLinks title="Company" links={company} />
                        <FooterLinks title="Legal" links={legal} />
                    </div>

                    {/* Simple mobile navigation */}
                    <div className="grid grid-cols-2 gap-8 pt-7 lg:hidden">
                        <FooterLinks title="Explore" links={company} />
                        <FooterLinks title="The essentials" links={legal} />
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-white/20 pt-5 sm:mt-16">
                    <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.1em] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
                        <p>© 2026 Bugsmoker. All rights reserved.</p>

                        <div className="flex items-center gap-4 sm:gap-5">
                            <Link
                                href="/privacy-policy"
                                className="transition-colors hover:text-white lg:hidden"
                            >
                                Privacy
                            </Link>

                            <Link
                                href="/terms-and-conditions"
                                className="transition-colors hover:text-white lg:hidden"
                            >
                                Terms
                            </Link>

                            <Link
                                href="/contact"
                                className="transition-colors hover:text-white"
                            >
                                Say hello ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}