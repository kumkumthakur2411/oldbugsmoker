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

            {/* Hero Section (unchanged) */}
            <section className="relative w-full min-h-screen flex flex-col md:flex-row">
                <div className="relative w-full md:w-[50vw] h-[55vh] md:h-screen shrink-0 overflow-hidden bg-neutral-900">
                    <Image
                        src="/home/1.png"
                        alt="Web Development - Bugsmoker"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                </div>

                <div className="relative w-full md:w-[50vw] min-h-[45vh] md:min-h-screen flex flex-col justify-end bg-white text-black px-6 sm:px-10 md:px-12 lg:px-16 pb-12 sm:pb-16 z-10">
                    <div className="w-full max-w-xl self-end">
                        <h1 className="font-['Outfit'] text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-black">
                            web <br /> development
                        </h1>
                        <p className="mt-5 sm:mt-6 font-['Outfit'] text-sm sm:text-[15px] leading-[1.75] text-neutral-700 font-normal">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured cards, content, problem, solution, FAQ */}
            <WebDevSections />

            <Footer />
        </main>
    );
}