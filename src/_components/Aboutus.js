"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, BookOpen } from "lucide-react";

const CONTENT_DATA = {
    EN: {
        badge: "MONOGRAPH / ARCHIVE NO. 04",
        titleLines: [
            "BUGSMOKER",
            "FOREVER",
            "CHANGED",
            "OUR SENSE OF",
            "SPACE & FORM",
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
            "IPHONE",
            "НАВСЕГДА",
            "ИЗМЕНИЛ",
            "МИР",
            "ФОТОГРАФИИ",
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
            className="relative w-full text-[#0d0d0d] font-['Outfit',sans-serif] "
        >
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply  " />
            <div className="relative z-10 w-full  mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                <div className=" p-6 sm:p-10 md:p-14 lg:p-16">

                    <div className="relative mb-12 sm:mb-16">
                        {/* Opening Giant Quotation Mark */}
                        <div className="flex items-start gap-3 sm:gap-4">
                            <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-black leading-none select-none text-black -mt-1 sm:-mt-2">
                                “
                            </span>

                            {/* Huge Stacked Uppercase Headline */}
                            <div className="flex flex-col">
                                {t.titleLines.map((line, idx) => (
                                    <h2
                                        key={idx}
                                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] leading-[0.88] text-black"
                                    >
                                        {line}
                                    </h2>
                                ))}
                            </div>
                        </div>

                        {/* Sub-Headline in Crisp Spaced Uppercase */}
                        <p className="mt-8 sm:mt-10 text-[11px] sm:text-[13px] md:text-[14px] uppercase font-bold tracking-[0.06em] leading-[1.45] text-black/85 max-w-[700px]">
                            {t.subtitle}
                        </p>

                        {/* Stepped / Narrow Editorial Body Paragraph */}
                        <div className="mt-6 sm:mt-8 max-w-[520px] mx-auto text-center space-y-2 sm:space-y-3">
                            {t.storyParagraphs.map((para, pIdx) => (
                                <p
                                    key={pIdx}
                                    className="text-[10px] sm:text-[11.5px] leading-[1.65] text-black/75 tracking-tight font-normal"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="mb-12 sm:mb-16">
                        {/* 3 Horizontal Photos Side-by-Side */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {TRIPTYCH_IMAGES.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(img.src)}
                                    className="group relative aspect-[16/10] overflow-hidden bg-black/10 cursor-pointer border border-black/10 shadow-xs transition-all duration-300 hover:shadow-md"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 768px) 33vw, 240px"
                                        className="object-cover object-center grayscale contrast-[1.12] brightness-[0.98] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    {/* Subtle frame sheen */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="p-1 rounded bg-black/70 text-white text-[9px] backdrop-blur-xs flex items-center gap-1">
                                            <ZoomIn size={10} />
                                        </span>
                                    </div>
                                    {/* Frame metadata label in tiny text */}
                                    <span className="absolute bottom-1 right-1 text-[7px] sm:text-[8px] font-mono tracking-wider bg-white/90 text-black px-1 py-0.2 rounded-xs select-none">
                                        {img.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Offset / Right-Aligned Bold Graphic Subtitle */}
                        <div className="mt-6 sm:mt-8 flex justify-end">
                            <div className="text-right">
                                {t.offsetQuote.map((line, qIdx) => (
                                    <h3
                                        key={qIdx}
                                        className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] leading-[0.95] text-black"
                                    >
                                        {line}
                                    </h3>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mb-12 sm:mb-16">
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-end">
                            {/* Large Featured Image (occupying ~9 of 12 columns = 75%) */}
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

                            {/* Right Side Column: Negative space + Bottom Mini Thumbnail */}
                            <div className="col-span-3 sm:col-span-3 flex flex-col justify-end">
                                {/* Editorial Micro-Label */}
                                <div className="mb-2 text-right">
                                    <p className="text-[7px] sm:text-[9px] uppercase tracking-wider font-bold text-black/80 leading-tight">
                                        {t.mainFeatureTag}
                                    </p>
                                    <p className="text-[6px] sm:text-[8px] uppercase tracking-widest text-black/50">
                                        {t.mainFeatureSubtag}
                                    </p>
                                </div>

                                {/* Small Contact Sheet Thumbnail with Border */}
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
                    </div>

                    <div className="mb-12 sm:mb-16">
                        {/* Bold Headline Across Spread */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black uppercase tracking-[-0.02em] leading-[1.12] text-black text-center sm:text-left">
                            {t.secondTitle}
                        </h3>

                        {/* Narrative Fine-Print Paragraph */}
                        <div className="mt-6 sm:mt-8 max-w-[620px] mx-auto text-center sm:text-left">
                            <p className="text-[10.5px] sm:text-[12px] leading-[1.7] text-black/75 tracking-tight font-normal">
                                {t.secondParagraph}
                            </p>
                        </div>
                    </div>


                    <div className="pt-6 border-t border-black/15">
                        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
                            {/* Left Column: Portrait Thumbnail Photo */}
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

                            {/* Right Column: Giant Minimalist Swiss Metric Numbers */}
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


                    </div>
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
