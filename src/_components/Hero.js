
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
    return (
        <>
            {/* Hero Intro Section */}
            <section className="relative w-full bg-white text-black flex items-center justify-center
                px-5 sm:px-8 md:px-12 lg:px-16
                pt-24 sm:pt-28 md:pt-32 lg:pt-36
                pb-10 sm:pb-14 overflow-hidden">

                <div className="w-full max-w-[1400px] mx-auto mt-[50vh] sm:mt-64">
                    <div className="grid grid-cols-1 lg:grid-cols-12
                        gap-8 sm:gap-10 lg:gap-8 xl:gap-12
                        items-center">

                        {/* Left: Main Heading */}
                        <div className="lg:col-span-6 flex flex-col justify-center min-w-0">
                            <h1 className="font-['Outfit'] font-bold
                                text-[clamp(3.2rem,12vw,5rem)]
                                sm:text-7xl md:text-8xl
                                lg:text-[6.5rem] xl:text-[7.8rem]
                                2xl:text-[8.5rem]
                                tracking-tight leading-[0.88]
                                text-black select-none break-words">
                                <span>We're</span>
                                <br />
                                <span>Bugsmoker</span>
                            </h1>
                        </div>

                        {/* Middle: Description — hidden on mobile/tablet */}
                        <div className="lg:col-span-4 flex-col items-start
    justify-center w-full max-w-md lg:max-w-[340px] xl:max-w-[370px]">

                            <p className="font-['Outfit'] sm:font-['Inter']
        text-[13px] sm:text-sm md:text-[15px]
        leading-[1.7] text-[#4a4a4a] font-normal">
                                We’re all about making chaotic digital stuff
                                that actually works for you. And honestly, we
                                like to keep things light and reckless fun—
                                because who wants boring, right?
                            </p>
                        </div>

                        {/* Right: Hero Image — hidden on mobile/tablet */}
                        <div className="hidden lg:flex lg:col-span-2 items-center
    justify-center lg:justify-end w-full min-w-0">

                            <div className="relative group w-full
        max-w-[360px] sm:max-w-[420px] lg:max-w-none">

                                <div className="relative w-full aspect-[4/3]
            rounded-xl sm:rounded-2xl md:rounded-3xl
            overflow-hidden shadow-xl shadow-black/5
            border border-black/5 bg-neutral-100">

                                    <Image
                                        src="/home/1.png"
                                        alt="Bugsmoker"
                                        fill
                                        priority
                                        sizes="25vw"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Full-Width Hero Banner */}
            <section className="w-full px-0 sm:px-5 lg:px-8 pb-8 sm:pb-12">
                <div className="relative w-full
                    min-h-[400px] h-[65svh] max-h-[720px]
                    sm:min-h-[480px] sm:h-[580px]
                    md:h-[620px] lg:h-[680px] xl:h-[720px]
                    overflow-hidden
                    shadow-xl shadow-black/10
                    border-y sm:border border-neutral-200/80
                    bg-neutral-900
                    sm:rounded-xl lg:rounded-2xl group">

                    <Image
                        src="/home/new1.png"
                        alt="Bugsmoker Hero Banner"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center
                            transition-transform duration-1000
                            ease-out group-hover:scale-[1.02]"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/55
                        backdrop-blur-[0.5px] z-10" />

                    {/* Banner Content */}
                    <div className="relative z-20 min-h-[400px] h-full
                        w-full flex flex-col items-center justify-center
                        text-center
                        px-5 py-12
                        sm:px-8 sm:py-14
                        md:px-12 lg:px-16">

                        <h2 className="font-['Outfit'] font-bold text-white
                            tracking-tight leading-[1.08]
                            text-[clamp(1.8rem,6vw,2.5rem)]
                            sm:text-4xl md:text-5xl
                            lg:text-6xl
                            w-full max-w-3xl">
                            Crafting chaotic digital worlds that people
                            actually remember.
                        </h2>

                        {/* CTA Button */}
                        <div className="mt-7 sm:mt-9">
                            <Link
                                href="#services"
                                className="group/btn inline-flex items-center
                                    justify-center gap-2.5
                                    px-6 sm:px-8 py-3 sm:py-3.5
                                    rounded-full bg-white text-black
                                    text-xs sm:text-sm font-semibold
                                    tracking-wide whitespace-nowrap
                                    transition-all duration-300
                                    hover:bg-[#ff5a1f] hover:text-white
                                    hover:shadow-xl
                                    hover:shadow-[#ff5a1f]/25
                                    active:scale-95 cursor-pointer
                                    select-none"
                            >
                                <span>Contact Us</span>
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={2.4}
                                    className="transition-transform duration-300
                                        group-hover/btn:-translate-y-0.5
                                        group-hover/btn:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
