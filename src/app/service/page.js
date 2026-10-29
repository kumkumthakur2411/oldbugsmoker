import React from "react";
import Image from "next/image";
import Navbar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import WebDevSections from "@/_components/WebDevSections"; // adjust path to where you save it

export const metadata = {
    title: "Web Development | Bugsmoker",
    description:
        "We craft high-performance, bespoke websites and scalable web applications engineered to elevate your brand.",
};

export default function ServicePage() {
    const description =
        "We craft high-performance, bespoke websites and scalable web applications engineered to elevate your brand. From fluid interactive animations to robust full-stack engineering and search optimization, we transform complex technical challenges into seamless digital experiences that captivate modern audiences, accelerate user engagement, and drive measurable, sustainable commercial growth for your company.";

    return (
        <main className="relative min-h-screen w-full bg-white text-black overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}

            <section className="relative w-full bg-white text-black">
                <div className="flex min-h-screen flex-col md:min-h-screen md:flex-row">
                    {/* Image */}
                    <div className="relative h-[44svh] min-h-[300px] w-full shrink-0 overflow-hidden bg-neutral-900 sm:h-[52svh] md:h-screen md:w-1/2">
                        <Image
                            src="/home/1.png"
                            alt="Web Development - Bugsmoker"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-1000 ease-out md:hover:scale-105"
                        />

                        {/* Soft navbar contrast */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/70 to-transparent md:hidden" />

                        {/* Image depth */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                        {/* Image label */}
                        <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white sm:bottom-6 sm:left-8 md:bottom-8 md:left-10">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                            Digital experiences, built better
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative flex w-full flex-1 flex-col justify-between px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-9 md:w-1/2 md:flex-none md:justify-end md:px-10 md:pb-12 lg:px-16 lg:pb-16">
                        <div>
                            {/* Eyebrow */}



                            {/* Heading */}
                            <h1 className="font-['Outfit'] text-[clamp(1.5rem,10vw,5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.075em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.85] md:tracking-[-0.07em]">
                                <span className="block">Web</span>
                                <span className="mt-1 block">Development <span className="text-[#ff5a1f]">.</span></span>
                            </h1>

                            {/* Description */}
                            <div className="mt-7 border-t border-black/15 pt-5 sm:mt-8 sm:pt-6 md:mt-8">
                                {/* <div className="mb-3 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
                                        What we do
                                    </span>
                                    <span className="text-xs text-[#ff5a1f]">↘</span>
                                </div> */}

                                <p className="max-w-md font-['Outfit'] text-sm leading-[1.8] text-neutral-600 sm:text-base sm:leading-[1.85]">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom detail */}
                        <div className="mt-9 flex items-center justify-between border-t border-black/10 pt-4 md:mt-12">
                            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 sm:text-xs">
                                From idea to impact
                            </span>

                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-lg transition-colors duration-300 hover:bg-black hover:text-white">
                                ↘
                            </span>
                        </div>
                    </div>
                </div>
            </section>


            {/* Featured cards, content, problem, solution, FAQ */}
            <WebDevSections />

            <Footer />
        </main>
    );
}