"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CtaSection() {
    return (
        <section
            id="cta-manifesto"
            className="relative w-full bg-[#ebe8e2] text-[#111111] font-['Outfit',sans-serif] px-5 sm:px-10 md:px-14 lg:px-20 py-16 sm:py-24 md:py-28 lg:py-32 select-none border-t border-black/10"
        >
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
                    {/* Left Column: Studio info on top & bS. logo on bottom */}
                    <div className="lg:col-span-4 flex flex-col justify-between py-1">
                        <div className="font-mono text-[11px] sm:text-xs text-black/60 uppercase tracking-[0.2em] leading-relaxed">
                            <p className="font-semibold text-black/85">Bugsmoker — Beyond the Ordinary</p>
                            <p className="text-black/55 mt-1 font-medium">+1 (416) 555-7823</p>
                        </div>

                        <div className="mt-10 lg:mt-auto pt-6">
                            <Image
                                src="/bs-logo.png"
                                alt="Bugsmoker bS. mark"
                                width={180}
                                height={127}
                                className="w-36 sm:w-44 md:w-48 h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.03]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column: Solid black Outfit manifesto quote & contact touchpoint */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <blockquote className="font-['Outfit'] text-[clamp(1.6rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-black">
                            “We don&apos;t just build digital products — we solve the problems holding your business back. From standout websites to smarter software, we combine thoughtful design and reliable technology to help your business.”
                        </blockquote>

                        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contactus"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#ff5a1f] shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                <span>Let&apos;s Build Together</span>
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={2.4}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>

                            <Link
                                href="/services"
                                className="font-mono text-xs uppercase tracking-widest text-black/60 hover:text-black transition-colors px-3 py-2 cursor-pointer"
                            >
                                [ View Capabilities ]
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
