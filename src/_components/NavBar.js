"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import EnquiryForm from "@/_components/Form";

/* ------------------------------------------------------------------ */
/* Social & Action SVGs                                                */
/* ------------------------------------------------------------------ */

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EnquiryIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="14" y2="13" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Route/Scroll Observer (isolated in Suspense for Cache Components)   */
/* ------------------------------------------------------------------ */

function NavbarRouteWatcher({ onScrolledChange, onHeroSectionChange }) {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      onScrolledChange(scrollY > 20);

      if (pathname === "/") {
        const manifestoEl = document.getElementById("manifesto-section");
        const footerEl = document.querySelector("footer");

        if (footerEl && footerEl.getBoundingClientRect().top <= 80) {
          onHeroSectionChange(false);
        } else if (manifestoEl) {
          const rect = manifestoEl.getBoundingClientRect();
          onHeroSectionChange(rect.top > 80);
        } else {
          onHeroSectionChange(scrollY < window.innerHeight - 80);
        }
      } else {
        onHeroSectionChange(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname, onScrolledChange, onHeroSectionChange]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Navbar Component                                                    */
/* ------------------------------------------------------------------ */

const Navbar = ({ isLoaded: propIsLoaded }) => {
  const navRef = useRef(null);

  // Track if user has scrolled down on ANY page
  const [isScrolled, setIsScrolled] = useState(false);

  // Quick Enquiry Modal State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Track if we are currently in the home page hero section
  const [isHeroSection, setIsHeroSection] = useState(false);

  // Global event listener to open enquiry modal from any page/button
  useEffect(() => {
    const handleGlobalOpen = () => setIsEnquiryOpen(true);
    window.addEventListener("open-enquiry-modal", handleGlobalOpen);
    return () => window.removeEventListener("open-enquiry-modal", handleGlobalOpen);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <NavbarRouteWatcher
          onScrolledChange={setIsScrolled}
          onHeroSectionChange={setIsHeroSection}
        />
      </Suspense>

      {/* Header */}
      <header
        ref={navRef}
        className="pointer-events-none absolute top-0 left-0 right-0 z-40 w-full h-auto px-4 sm:px-8 
        md:px-14 lg:px-16 pt-4 sm:pt-6 md:pt-8 text-[10px] sm:text-[11px] font-semibold uppercase 
        tracking-wide transition-colors duration-300 text-[rgb(36,36,36)]"
      >
        <div className="pointer-events-auto w-full max-w-[1400px] mx-auto flex items-start justify-between gap-2 sm:gap-4">
          <div className="text-[9.5px] sm:text-[11px] leading-[1.25]">
            <Link href="/" className="">
              <p>We make</p>
              <p>
                Tech <span className="text-[15px]">🌻</span>
              </p>
              <p>Beautiful</p>
            </Link>
          </div>

          <div className="flex flex-col text-[10px] sm:text-[11px] space-y-0.5 sm:space-y-1">
            <Link href="/services" className="transition-colors hover:text-[#ff5a1f]">
              Services
            </Link>
            <Link href="/blog" className="transition-colors hover:text-[#ff5a1f]">
              Our Blogs
            </Link>
            <Link href="/aboutus" className="transition-colors hover:text-[#ff5a1f]">
              About us
            </Link>
          </div>

          <div className="text-[10px] sm:text-[11px]">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-1 transition-opacity hover:opacity-80 font-bold"
            >
              <span>Contact us</span>
              <ArrowUpRight
                size={12}
                className="text-[#ff5a1f] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ================= Floating Right Dock Widget ================= */}
      <aside
        aria-label="Quick Connect and Enquiry"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2 select-none"
      >
        {/* Top: Social Icons Card */}
        <div className="flex flex-col items-center gap-2 rounded-l-2xl border-y border-l border-neutral-200/90 bg-white/95 py-3 px-2 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
          {/* Facebook */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group relative flex h-8 w-8 items-center justify-center rounded-full text-[#1877F2] transition-transform duration-200 hover:scale-110 hover:bg-neutral-100"
          >
            <FacebookIcon className="h-4 w-4" />
            <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-md transition-all group-hover:block">
              Facebook
            </span>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="group relative flex h-8 w-8 items-center justify-center rounded-full text-black transition-transform duration-200 hover:scale-110 hover:bg-neutral-100"
          >
            <XTwitterIcon className="h-3.5 w-3.5" />
            <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-md transition-all group-hover:block">
              X / Twitter
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group relative flex h-8 w-8 items-center justify-center rounded-full text-[#0A66C2] transition-transform duration-200 hover:scale-110 hover:bg-neutral-100"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
            <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-md transition-all group-hover:block">
              LinkedIn
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group relative flex h-8 w-8 items-center justify-center rounded-full text-[#E4405F] transition-transform duration-200 hover:scale-110 hover:bg-neutral-100"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-md transition-all group-hover:block">
              Instagram
            </span>
          </a>

          {/* Phone (Green pill button) */}
          <a
            href="tel:+918791802003"
            aria-label="Call Bugsmoker"
            className="group relative mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-600 transition-all duration-200 hover:scale-110 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-mono font-medium text-white shadow-md transition-all group-hover:block">
              +91 8791802003
            </span>
          </a>
        </div>

        {/* Bottom: QUICK ENQUIRY Tab */}
        <button
          type="button"
          onClick={() => setIsEnquiryOpen(true)}
          aria-label="Open Quick Enquiry Form"
          className="group relative flex flex-col items-center rounded-l-2xl border-y border-l border-white/20 bg-gradient-to-b from-[#a81c1c] via-[#8c1414] to-[#700d0d] px-2.5 py-4 text-white shadow-[0_8px_25px_rgba(168,28,28,0.45)] transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_12px_30px_rgba(168,28,28,0.6)] cursor-pointer"
        >
          {/* Circular Badge with Chat Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[#8c1414]">
            <EnquiryIcon className="h-4 w-4" />
          </div>

          {/* Vertical Text: QUICK ENQUIRY */}
          <span className="mt-3 [writing-mode:vertical-rl] rotate-180 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            QUICK ENQUIRY
          </span>
        </button>
      </aside>

      {/* Bottom Sheet Enquiry Form Popup */}
      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};

export default Navbar;