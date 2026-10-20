"use client";

import React from "react";
import Image from "next/image";

export default function Project() {
    return (
        <section className="relative w-full min-h-screen bg-[#ece7de] text-[#1c1c1c] overflow-hidden flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-12 select-none">

            {/* Background Vintage Paper Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/project/paper-bg.jpg"
                    alt="Vintage Paper Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-90 contrast-[1.02]"
                />
                {/* Soft paper grain overlay */}
                <div className="absolute inset-0 bg-[#ece7de]/30 mix-blend-multiply" />
            </div>

            {/* Main Editorial Magazine Spread Container */}
            <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-[600px] sm:min-h-[700px] md:min-h-[780px] lg:min-h-[840px] flex flex-col justify-center">

                {/* Center Crease / Fold Line (like an open magazine spread) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-black/5 via-black/15 to-black/5 pointer-events-none z-20">
                    <div className="absolute inset-0 -left-[1px] w-[3px] bg-white/20 blur-[1px]" />
                </div>

                {/* Center Oval Emblem Stamp placed right on the fold */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 items-center justify-center">
                    <div className="group relative flex items-center justify-center w-[64px] h-[40px] xl:w-[70px] xl:h-[44px] rounded-full border border-black/85 bg-[#ece7de]/95 backdrop-blur-xs shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-105 cursor-default">
                        {/* Stamp Icons: 4-pointed star, leaf, 8-pointed starburst */}
                        <svg
                            viewBox="0 0 54 36"
                            className="w-10 h-7 text-black fill-current"
                        >
                            {/* 4-point star on left */}
                            <path
                                d="M14 9 C14 13, 10 13, 6 13 C10 13, 14 13, 14 17 C14 13, 18 13, 22 13 C18 13, 14 13, 14 9 Z"
                                fill="currentColor"
                            />
                            {/* Leaf on top right */}
                            <path
                                d="M32 7 C39 6, 47 10, 47 15 C39 16, 33 12, 32 7 Z"
                                fill="currentColor"
                            />
                            {/* 8-point starburst on bottom right */}
                            <g transform="translate(36, 23)">
                                <path
                                    d="M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M-3.5 -3.5 L0 -1 L3.5 -3.5 L1 0 L3.5 3.5 L0 1 L-3.5 3.5 L-1 0 Z"
                                    fill="currentColor"
                                    transform="scale(0.7)"
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Two-Column Editorial Spread */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-10 items-center w-full">

                    {/* LEFT SPREAD (Cols 1-6): Top Journal Photo + STI Logo + Bottom Legs Photo */}
                    <div className="lg:col-span-6 w-full flex flex-col justify-between py-2 sm:py-6 lg:pr-8 xl:pr-12">

                        {/* Top-Left: Journal Writing Photo */}
                        <div className="flex justify-start w-full">
                            <div className="group relative w-[62%] sm:w-[58%] md:w-[54%] lg:w-[60%] xl:w-[56%] aspect-[3/4] overflow-hidden bg-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-700 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)]">
                                <Image
                                    src="/project/lookbook-1.jpg"
                                    alt="Journaling on warm linen outdoors"
                                    fill
                                    sizes="(max-width: 768px) 60vw, 380px"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>

                        {/* Bottom Row of Left Spread: STI Logo on Left + Legs Photo Shifted to Right */}
                        <div className="mt-8 sm:mt-10 md:mt-12 flex items-end justify-between w-full">

                            {/* STI Brandmark */}
                            <div className="flex flex-col items-start pl-2 sm:pl-4 pb-4 sm:pb-8 select-none">
                                <span className="font-['Outfit'] text-4xl sm:text-5xl md:text-[54px] font-semibold text-black tracking-tight leading-none">
                                    sti
                                </span>

                                {/* Underline symbols: leaf + 2 diamond sparkles */}
                                <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-black">
                                    {/* Stylized small leaf */}
                                    <svg
                                        width="8"
                                        height="10"
                                        viewBox="0 0 8 10"
                                        fill="currentColor"
                                    >
                                        <path d="M1 0 C6 2 8 6 5 10 C3 8 0 5 1 0 Z" />
                                    </svg>
                                    {/* Diamond Sparkle 1 */}
                                    <svg
                                        width="7"
                                        height="7"
                                        viewBox="0 0 10 10"
                                        fill="currentColor"
                                    >
                                        <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
                                    </svg>
                                    {/* Diamond Sparkle 2 */}
                                    <svg
                                        width="7"
                                        height="7"
                                        viewBox="0 0 10 10"
                                        fill="currentColor"
                                    >
                                        <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom-Right of Left Spread: Sunlit Legs Photo */}
                            <div className="w-[46%] sm:w-[44%] md:w-[42%] lg:w-[46%] xl:w-[42%] mr-2 sm:mr-6 lg:mr-8">
                                <div className="group relative w-full aspect-[3/4] overflow-hidden bg-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-700 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)]">
                                    <Image
                                        src="/project/lookbook-2.jpg"
                                        alt="Sunlit aesthetic relaxation on linen"
                                        fill
                                        sizes="(max-width: 768px) 45vw, 300px"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SPREAD (Cols 7-12): Large Hero Photo of Woman in White Activewear */}
                    <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-center py-4 lg:py-6 lg:pl-8 xl:pl-12">

                        {/* Large Hero Portrait Photo */}
                        <div className="group relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px] xl:max-w-[590px] aspect-[4/5] overflow-hidden bg-neutral-200/80 shadow-[0_6px_28px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                            <Image
                                src="/project/lookbook-3.jpg"
                                alt="Smiling woman in white activewear sitting cross-legged"
                                fill
                                priority
                                sizes="(max-width: 1024px) 90vw, 580px"
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            />
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}
