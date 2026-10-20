"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
    return (<>
        <section className="relative w-full min-h-[50vh] bg-white text-black flex items-center justify-center px-6
         sm:px-10 md:px-14 lg:px-16 pt-28 pb-10 md:pt-36  overflow-hidden">
            <div className="w-full max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center pt-[250px] pb-[25px]">

                    {/* Left Column: Big Bold Title */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <h1 className="font-['Outfit'] font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem] 2xl:text-[8.5rem] tracking-tight leading-[0.88] text-black select-none">
                            <span>We're</span>
                            <br />
                            <span>Bugsmoker</span>
                        </h1>
                    </div>

                    {/* Middle Column: Description & Centered Pill Button */}
                    <div className="lg:col-span-4 flex flex-col items-start justify-center max-w-sm sm:max-w-md lg:max-w-[340px] xl:max-w-[370px]">
                        <p className="font-['Outfit'] sm:font-['Inter'] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] text-[#4a4a4a] font-normal">
                            We’re all about making chaotic digital stuff that actually works for you. And honestly, we like to keep things light and reckless fun—because who wants boring, right?
                        </p>

                        <div className="w-full flex justify-center mt-7 sm:mt-9">
                            <Link
                                href="#learn-more"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white text-[13px] sm:text-sm font-medium tracking-wide transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Hero Image */}
                    <div className="lg:col-span-2 flex items-center justify-center lg:justify-end">
                        <div className="relative group w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none">
                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-black/5 bg-neutral-100 transition-all duration-500 group-hover:shadow-2xl">
                                <Image
                                    src="/home/1.png"
                                    alt="Bugsmoker"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 35vw, 25vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                </div>




            </div>
        </section>
        <div className="w-full">
            <div className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[680px] xl:h-[720px] 
                    overflow-hidden shadow-2xl shadow-black/10 
                    border-y sm:border border-neutral-200/80 bg-neutral-900 group">
                <Image
                    src="/home/new1.png"
                    alt="Bugsmoker Hero Banner"
                    fill
                    priority
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />

                {/* Dark Cinematic Overlay */}
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px] transition-colors duration-500 z-10" />

                {/* Content Layer Over Banner */}
                <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-16 max-w-4xl mx-auto">
                    {/* Brand Pill Badge */}


                    {/* Bold Headline */}
                    <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06] max-w-3xl">
                        Crafting chaotic digital worlds that people actually remember.
                    </h2>

                    {/* Subtitle / Description */}
                    {/* <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 max-w-xl font-['Outfit'] sm:font-['Inter'] leading-[1.6] font-normal">
                        We fuse unconventional aesthetics with razor-sharp execution to build bold digital experiences that stand out in the noise.
                    </p> */}

                    {/* CTA Button */}
                    <div className="mt-7 sm:mt-9">
                        <Link
                            href="#services"
                            className="group/btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[#ff5a1f] hover:text-white hover:shadow-xl hover:shadow-[#ff5a1f]/25 active:scale-95 cursor-pointer select-none"
                        >
                            <span>Contact Us</span>
                            <ArrowUpRight
                                size={16}
                                strokeWidth={2.4}
                                className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
