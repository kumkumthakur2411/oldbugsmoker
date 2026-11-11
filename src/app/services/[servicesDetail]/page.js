import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/data.json";
import Navbar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import WebDevSections from "@/_components/WebDevSections";

export function generateStaticParams() {
    return Object.keys(data.services || {}).map((key) => ({
        servicesDetail: key,
    }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.servicesDetail;
    const service = data.services?.[slug];

    if (!service) return {};

    return {
        title:
            service.metadata?.title ||
            `${service.hero?.titlePlain || "Service"} | Bugsmoker`,
        description:
            service.metadata?.description || service.hero?.description || "",
    };
}

export default async function ServicePage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams?.servicesDetail;
    const service = data.services?.[slug];

    if (!service) {
        notFound();
    }

    const { hero } = service;
    const rawTitle = hero?.title || hero?.titlePlain || "";
    const titleParts = rawTitle.split(/<br\s*\/?>/i);

    return (
        <main className="relative min-h-screen w-full bg-white text-black overflow-x-hidden">
         

            {/* Hero Section */}
            <section className="relative w-full bg-white text-black">
                <div className="flex flex-col md:min-h-screen md:flex-row">
                    {/* Image */}
                    <div className="relative h-[44svh] min-h-[300px] w-full shrink-0 overflow-hidden bg-neutral-900 sm:h-[52svh] md:h-screen md:w-1/2">
                        {hero?.image && (
                            <Image
                                src={hero.image}
                                alt={hero.imageAlt || hero.titlePlain || "Bugsmoker service"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-center transition-transform duration-1000 ease-out md:hover:scale-105"
                            />
                        )}

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
                    <div className="relative flex w-full flex-col justify-between px-5 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-8 md:min-h-screen md:w-1/2 md:flex-none md:justify-end md:px-12 md:pb-12 lg:px-16 lg:pb-16">
                        <div>
                            {/* Heading */}
                            <h1 className="font-['Outfit'] text-[clamp(1.5rem,10vw,5rem)] font-bold leading-[0.92] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,6.5rem)] md:text-[clamp(3.2rem,5.5vw,6.5rem)] md:leading-[0.94] capitalize">
                                {titleParts.length >= 2 ? (
                                    <>
                                        <span className="block">{titleParts[0].trim()}</span>
                                        <span className="mt-1 block">
                                            {titleParts.slice(1).join(" ").trim()}{" "}
                                            <span className="text-[#ff5a1f]">.</span>
                                        </span>
                                    </>
                                ) : (
                                    <span className="block">
                                        {titleParts[0].trim()}{" "}
                                        <span className="text-[#ff5a1f]">.</span>
                                    </span>
                                )}
                            </h1>

                            {/* Description */}
                            {hero?.description && (
                                <div className="mt-6 border-t border-black/15 pt-4 sm:mt-7 sm:pt-5 md:mt-8 md:pt-6">
                                    <p className="max-w-md font-['Outfit'] text-sm leading-[1.75] text-neutral-600 sm:text-base sm:leading-[1.85]">
                                        {hero.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Bottom detail */}
                        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 sm:mt-8 md:mt-12">
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

            {/* Dynamic sections: featured cards, content, problem, solution, paragraphs, FAQ */}
            <WebDevSections service={service} />

         
        </main>
    );
}
