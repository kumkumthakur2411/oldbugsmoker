"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, BookOpen } from "lucide-react";

const CONTENT_DATA = {
    EN: {
        badge: "MONOGRAPH / ARCHIVE NO. 04",
        titleLines: [
            "Bugsmoker",
            "forever",
            "changed",
            "our sense of",
            "space & form",
        ],
        subtitle:
            "IF YOU LOOK INTO OUR ARCHIVED INSTALLATIONS OR WITNESS OUR EXHIBITIONS ACROSS THE WORLD, YOU WILL SEE A LIVING KALEIDOSCOPE OF PERSPECTIVES.",
        storyParagraphs: [
            "Notice how subtle tensions unfold across these spatial frames. How people pause and interact with one another through quiet glances and shared wonder.",
            "Those fleeting smiles appearing on faces as curiosity takes over—at times, the eyes of several individuals remain fixed upon a single point of light.",
            "Three or four people observing the exact same moment from distinct vantage points. Spaces were once alive with their own natural visual rhythm; today, we channel that living rhythm through physical textures and analog warmth.",
        ],
        offsetQuote: ["DOZENS,", "HUNDREDS OF", "WORLDS..."],
        mainFeatureTag: "PUBLICATIONS AND WORKS",
        mainFeatureSubtag: "ARCHIVE REF. 24",
        secondTitle:
            "WE HAVE ARCHITECTED SCORES OF LIVING SPACES, AND OUR MONOGRAPH TITLED “LIGHT & FLORA” STANDS AS A CLASSIC BENCHMARK ACROSS CONTEMPORARY EXPERIENTIAL DESIGN",
        secondParagraph:
            "Beyond this, Bugsmoker Atelier has authored 17 celebrated architectural publications and spatial installations, including our pioneering study on botanical coexistence in urban centers: a project documenting over 20,000 square meters of curated spatial interventions across New York, Tokyo, and Paris—reaffirming our commitment to the poetic synthesis of organic life and digital memory.",
        stats: [
            {
                value: "100",
                unit: "K+",
                labelTop: "GLOBAL VISITORS",
                labelBottom: "& READERS",
            },
            {
                value: "300",
                unit: "SPACES",
                labelTop: "BESPOKE WORKS",
                labelBottom: "& MONOGRAPHS",
            },
        ],
        footerStampLeft: "BUGSMOKER ATELIER",
        footerStampCenter: "NEW YORK • TOKYO • PARIS",
        footerStampRight: "EDITION 2025",
    },
    RU: {
        badge: "МОНОГРАФИЯ / АРХИВ № 04",
        titleLines: [
            "iPhone",
            "навсегда",
            "изменил",
            "мир",
            "фотографии",
        ],
        subtitle:
            "ЕСЛИ ВЫ ПОСМОТРИТЕ НА МОИ СТАРЫЕ ФОТОГРАФИИ ИЛИ ЖЕ НА СНИМКИ ЛЮБЫХ ДРУГИХ ФОТОГРАФОВ, КОТОРЫЕ СНИМАЛИ НА УЛИЦЕ, ВЫ УВИДИТЕ ЦЕЛЫЙ КАЛЕЙДОСКОП ВЗГЛЯДОВ.",
        storyParagraphs: [
            "Не упустите линии поперек этих кадров и тогда увидите, как люди взаимодействуют друг с другом через простые улыбки и переглядывания с целью предотвратить столкновения.",
            "Они улыбки, мелькающие на лицах людей, проходящих с интересом бровки... порой взгляды сразу нескольких людей были устремлены в одно место. Иногда три или четыре человека одновременно смотрели на то, что там происходит.",
            "Улицы были живой, в них была своя визуальная динамика. А сейчас все, что вы видите на улице — это телефоны.",
        ],
        offsetQuote: ["ДЮЖИНЫ,", "СОТНИ", "ТЕЛЕФОНОВ..."],
        mainFeatureTag: "PUBLICATIONS AND",
        mainFeatureSubtag: "BOOKS",
        secondTitle:
            "ОН НАПИСАЛ МНОЖЕСТВО КНИГ, А ЕГО САМАЯ ПЕРВАЯ КНИГА ПОД НАЗВАНИЕМ “CAPE LIGHT” СЧИТАЕТСЯ КЛАССИКОЙ СРЕДИ ПРОИЗВЕДЕНИЙ О ЦВЕТНОЙ ФОТОГРАФИИ",
        secondParagraph:
            "Кроме того, Джоэл Мейеровиц является автором еще 17 других не менее популярных книг, включая недавнее издание его проекта: книгу «Наследие: сохранение дикой природы в парках Нью-Йорка». Это амбициозный проект по документированию и созданию фотоархива 28 000 акров парковой зоны Нью-Йорка «Наследие: сохранение дикой природы в парках Нью-Йорка» — первая долгосрочная визуальная документация парков Нью-Йорка с 1930-х годов, когда они были сфотографированы в рамках правительственной программы WPA Франклина Рузвельта.",
        stats: [
            {
                value: "100",
                unit: "ТЫС.",
                labelTop: "ПРОДАНО",
                labelBottom: "ЭКЗЕМПЛЯРОВ",
            },
            {
                value: "300",
                unit: "ЛЕТ",
                labelTop: "СУЩЕСТВОВАНИЯ",
                labelBottom: "КНИГИ",
            },
        ],
        footerStampLeft: "BOSCO",
        footerStampCenter: "New York 2024",
        footerStampRight: "ЭКЗЕМПЛЯР № 01",
    },
};

const TRIPTYCH_IMAGES = [
    {
        src: "/home/1.png",
        alt: "Archive frame 01 - CRT floral installation at dusk",
        label: "FRAME 01",
    },
    {
        src: "/home/new1.png",
        alt: "Archive frame 02 - Botanical spatial study",
        label: "FRAME 02",
    },
    {
        src: "/home/new2.png",
        alt: "Archive frame 03 - Analog light frequencies",
        label: "FRAME 03",
    },
];

export default function Aboutus() {
    const [lang, setLang] = useState("EN");
    const [activeImage, setActiveImage] = useState(null);

    const t = CONTENT_DATA[lang];

    return (
        <section
            id="about"
            className="relative w-full text-[#0d0d0d] font-['Outfit',sans-serif] pt-14 sm:pt-16 md:pt-20 pb-0"
        >
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply" />
            <div className="relative z-10 w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="px-4 sm:px-8 md:px-12 lg:px-14 py-0">

                    {/* Centered Editorial Statement with Inline Image Badges */}
                    <div className="relative my-0 max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4 text-center">
                        <h2 className="font-['Outfit'] text-[clamp(2.2rem,5.5vw,5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#0d0d0d] text-center">
                            {lang === "RU" ? (
                                <>
                                    iPhone{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/1.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:-rotate-3 active:scale-95"
                                        title="Frame 01"
                                    >
                                        <Image
                                            src="/home/1.webp"
                                            alt="Archive frame 01"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    навсегда изменил<br className="hidden sm:inline" />{" "}
                                    наш мир{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/new1.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                                        title="Frame 02"
                                    >
                                        <Image
                                            src="/home/new1.webp"
                                            alt="Archive frame 02"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    фотографии.<br className="hidden md:inline" />{" "}
                                    Создаем смелые миры{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/new2.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95"
                                        title="Frame 03"
                                    >
                                        <Image
                                            src="/home/new2.png"
                                            alt="Archive frame 03"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    с аналоговой душой{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/hero.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                                        title="Principal work"
                                    >
                                        <Image
                                            src="/home/hero.png"
                                            alt="Principal work"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    —<br className="hidden sm:inline" />{" "}
                                    ведь кому нужна скука?
                                </>
                            ) : (
                                <>
                                    Bugsmoker{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/1.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:-rotate-3 active:scale-95"
                                        title="Archive frame 01 - CRT floral installation at dusk"
                                    >
                                        <Image
                                            src="/home/1.webp"
                                            alt="Archive frame 01 - CRT floral installation at dusk"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    forever changed<br className="hidden sm:inline" />{" "}
                                    our sense of{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/new1.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                                        title="Archive frame 02 - Botanical spatial study"
                                    >
                                        <Image
                                            src="/home/new1.webp"
                                            alt="Archive frame 02 - Botanical spatial study"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    space &amp; form.<br className="hidden md:inline" />{" "}
                                    Building bold digital worlds{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/new2.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:-rotate-2 active:scale-95"
                                        title="Archive frame 03 - Analog light frequencies"
                                    >
                                        <Image
                                            src="/home/new2.png"
                                            alt="Archive frame 03 - Analog light frequencies"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    with analog soul{" "}
                                    <span
                                        onClick={() => setActiveImage("/home/hero.png")}
                                        className="group inline-flex relative align-middle -mt-1 mx-1 sm:mx-2 h-[0.9em] w-[1.4em] sm:h-[0.92em] sm:w-[1.48em] rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-black/15 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                                        title="Curated spatial installation"
                                    >
                                        <Image
                                            src="/home/hero.png"
                                            alt="Curated spatial installation"
                                            fill
                                            sizes="120px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </span>{" "}
                                    —<br className="hidden sm:inline" />{" "}
                                    because who wants boring, right?
                                </>
                            )}
                        </h2>
                    </div>

                    {/* Featured Image Spread (Removed per user request) */}
                    {/* <div className="mb-12 sm:mb-16">
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-end">
                            <div
                                onClick={() => setActiveImage("/home/hero.png")}
                                className="col-span-9 sm:col-span-9 relative aspect-[4/3] bg-black/10 overflow-hidden border border-black/15 shadow-xs group cursor-pointer"
                            >
                                <Image
                                    src="/home/hero.png"
                                    alt="Principal archival work"
                                    fill
                                    sizes="(max-width: 768px) 75vw, 580px"
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-2 py-1 rounded text-[10px] tracking-wider uppercase font-medium flex items-center gap-1 backdrop-blur-xs">
                                        <ZoomIn size={12} /> Inspect Frame
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-3 sm:col-span-3 flex flex-col justify-end">
                                <div className="mb-2 text-right">
                                    <p className="text-[7px] sm:text-[9px] uppercase tracking-wider font-bold text-black/80 leading-tight">
                                        {t.mainFeatureTag}
                                    </p>
                                    <p className="text-[6px] sm:text-[8px] uppercase tracking-widest text-black/50">
                                        {t.mainFeatureSubtag}
                                    </p>
                                </div>

                                <div
                                    onClick={() => setActiveImage("/home/5.png")}
                                    className="relative aspect-[3/4] bg-black/10 overflow-hidden border border-black/20 shadow-xs cursor-pointer group"
                                >
                                    <Image
                                        src="/home/5.png"
                                        alt="Contact sheet plate"
                                        fill
                                        sizes="(max-width: 768px) 25vw, 160px"
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Bold Headline Across Spread & Narrative Fine-Print Paragraph (Removed per user request) */}
                    {/* <div className="mb-12 sm:mb-16">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black uppercase tracking-[-0.02em] leading-[1.12] text-black text-center sm:text-left">
                            {t.secondTitle}
                        </h3>

                        <div className="mt-6 sm:mt-8 max-w-[620px] mx-auto text-center sm:text-left">
                            <p className="text-[10.5px] sm:text-[12px] leading-[1.7] text-black/75 tracking-tight font-normal">
                                {t.secondParagraph}
                            </p>
                        </div>
                    </div> */}


                    {/* Archival Metrics & Thumbnail (Removed so Portfolio flows directly after statement) */}
                    {/* <div className="pt-6 border-t border-black/15">
                        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
                            <div
                                onClick={() => setActiveImage("/home/3.png")}
                                className="col-span-4 sm:col-span-3 relative aspect-[3/4] bg-black/10 overflow-hidden border border-black/15 shadow-xs cursor-pointer group"
                            >
                                <Image
                                    src="/home/3.png"
                                    alt="Conservatory with analogue screens and flowers"
                                    fill
                                    sizes="(max-width: 768px) 30vw, 180px"
                                    className="object-cover object-center grayscale contrast-[1.08] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <span className="absolute bottom-1 right-1 text-[7px] font-mono tracking-wider bg-white/90 text-black px-1 py-0.2 rounded-xs select-none">
                                    PL. 09
                                </span>
                            </div>

                            <div className="col-span-8 sm:col-span-9 grid grid-cols-2 gap-4 sm:gap-8">
                                {t.stats.map((stat, sIdx) => (
                                    <div key={sIdx} className="flex flex-col">
                                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                                            <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] leading-none text-black">
                                                {stat.value}
                                            </span>
                                            <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-black/70">
                                                {stat.unit}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-black/70 leading-snug">
                                            <p>{stat.labelTop}</p>
                                            <p>{stat.labelBottom}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* ============================================================== */}
            {/* LIGHTBOX MODAL: FULL RESOLUTION IMAGE INSPECTION                */}
            {/* ============================================================== */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setActiveImage(null)}
                                className="absolute top-2 right-2 sm:top-0 sm:-right-12 z-20 p-2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
                                aria-label="Close image modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative w-full h-[70vh] rounded-xs overflow-hidden border border-white/20 shadow-2xl">
                                <Image
                                    src={activeImage}
                                    alt="Full resolution archival photograph"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Caption */}
                            <div className="mt-4 text-center text-white/80 text-xs sm:text-sm font-mono tracking-wider uppercase">
                                {activeImage} // ARCHIVAL REPRODUCTION
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
