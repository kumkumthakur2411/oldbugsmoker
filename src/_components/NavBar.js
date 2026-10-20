"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowUpRight } from "lucide-react";


const Navbar = ({ isLoaded: propIsLoaded }) => {
  const navRef = useRef(null);

  const pathname = usePathname();



  // Track if user has scrolled down on ANY page
  const [isScrolled, setIsScrolled] = useState(false);

  // Track if we are currently in the home page hero section
  const [isHeroSection, setIsHeroSection] = useState(() => {
    if (typeof window !== "undefined") {
      return pathname === "/" && window.scrollY < 100;
    }
    return pathname === "/";
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 20);

      if (pathname === "/") {
        const manifestoEl = document.getElementById("manifesto-section");
        const footerEl = document.querySelector("footer");

        if (footerEl && footerEl.getBoundingClientRect().top <= 80) {
          // Footer has light cream background, use dark logo
          setIsHeroSection(false);
        } else if (manifestoEl) {
          const rect = manifestoEl.getBoundingClientRect();

          // Switch to black logo as soon as the manifesto section begins / reaches the navbar area
          setIsHeroSection(rect.top > 80);
        } else {
          setIsHeroSection(scrollY < window.innerHeight - 80);
        }
      } else {
        const footerEl = document.querySelector("footer");
        if (footerEl && footerEl.getBoundingClientRect().top <= 80) {
          setIsHeroSection(false);
        } else {
          setIsHeroSection(false);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  // useEffect(() => {
  //     if (!navRef.current) return;
  //     if (isLoaded) {
  //         gsap.fromTo(
  //             navRef.current,
  //             { y: -30, opacity: 0 },
  //             { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  //         );
  //     } else {
  //         gsap.set(navRef.current, { y: -30, opacity: 0, pointerEvents: "none" });
  //     }
  // }, []);

  const logoSrc = isHeroSection ? "/nav/logo.png" : "/nav/black.png";

  return (
    <>
      {/* Desktop Header */}
      <header
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-40 w-full h-[50vh] px-6 sm:px-10 
        md:px-14 lg:px-16 pt-6 md:pt-8 text-[11px] font-semibold uppercase 
        tracking-wide transition-colors duration-300 text-[#18181b]"
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-start justify-between">
          <div>
            <p>We make</p>
            <p>
              Tech <span className="line-through">easy</span>
            </p>
            <p>Beautiful</p>
          </div>

          <div className="flex flex-col">
            <Link href="/services">Services</Link>
            <Link href="/blog">Our Blogs</Link>
            <Link href="/aboutus">About us</Link>
          </div>

          <div>
            <Link
              href="/contactus"
              className="group inline-flex items-center gap-1 transition-opacity hover:opacity-80"
            >
              <span>Contact us</span>
              <ArrowUpRight
                size={13}
                className="text-[#ff5a1f] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </header>

    </>
  );
};

export default Navbar;