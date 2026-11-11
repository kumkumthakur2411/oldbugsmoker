"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // Stops the mobile address bar showing/hiding from re-calculating every trigger
    ScrollTrigger.config({ ignoreMobileResize: true });
}

// Put your video in the /public folder
const VIDEO_SRC = "/video.mp4";
// Optional: a still image shown while the video loads (leave "" to skip)
const POSTER_SRC = "";

// Size of the small video at the start in the center of the screen
const START_FRAME = {
    desktop: { width: "", height: "", borderRadius: "" },
    mobile: { width: "", height: "", borderRadius: "" },
};

// How long the video takes to grow from center to full screen (seconds)
const GROW_DURATION = 1.9;

// Never wait longer than this for the video to be ready (ms)
const VIDEO_TIMEOUT = 3500;

/* Masked line: text slides up from behind its own edge */
function MaskLine({ children }) {
    return (
        <span
            className="block overflow-hidden"
            style={{
                paddingTop: "0.15em",
                paddingBottom: "0.12em",
                marginTop: "-0.15em",
                marginBottom: "-0.12em",
            }}
        >
            <span className="hero-mask block">{children}</span>
        </span>
    );
}

export default function Hero() {
    const sectionRef = useRef(null);
    const frameRef = useRef(null);
    const ringRef = useRef(null);
    const sheenRef = useRef(null);
    const parallaxRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const frame = frameRef.current;
        const ring = ringRef.current;
        const sheen = sheenRef.current;
        const parallax = parallaxRef.current;
        const video = videoRef.current;
        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (
            !section ||
            !frame ||
            !ring ||
            !sheen ||
            !parallax ||
            !video ||
            !overlay ||
            !content
        )
            return;

        const masks = section.querySelectorAll(".hero-mask");
        const fades = section.querySelectorAll(".hero-fade");

        video.muted = true;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)",
                reduce: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { isMobile, reduce } = context.conditions;
                const startBox = isMobile
                    ? START_FRAME.mobile
                    : START_FRAME.desktop;

                /* Reduced motion: no growing, no autoplay, everything simply visible */
                if (reduce) {
                    video.pause();
                    gsap.set(frame, {
                        autoAlpha: 1,
                        width: "100%",
                        height: "100%",
                        borderRadius: "0px",
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        boxShadow: "none",
                    });
                    gsap.set(ring, { autoAlpha: 0 });
                    gsap.set(sheen, { autoAlpha: 0 });
                    gsap.set(overlay, { opacity: 1 });
                    gsap.set(masks, { yPercent: 0 });
                    gsap.set(fades, { opacity: 1, y: 0 });
                    gsap.set(content, { autoAlpha: 1 });
                    return;
                }

                let cancelled = false;

                /* Start state: only the video card in the centre, tilted slightly; text hidden */
                gsap.set(frame, {
                    autoAlpha: 1,
                    width: startBox.width,
                    height: startBox.height,
                    borderRadius: startBox.borderRadius,
                    scale: 0.9,
                    rotateX: 10,
                    rotateY: -5,
                    rotateZ: -1.5,
                    transformOrigin: "50% 50%",
                    boxShadow: "0 28px 70px rgba(0, 0, 0, 0.22)",
                });
                gsap.set(ring, {
                    autoAlpha: 0,
                    width: startBox.width,
                    height: startBox.height,
                    borderRadius: startBox.borderRadius,
                    scale: 0.9,
                    rotateX: 10,
                    rotateY: -5,
                    rotateZ: -1.5,
                    transformOrigin: "50% 50%",
                });
                gsap.set(sheen, { autoAlpha: 0, xPercent: -150 });
                gsap.set(video, { scale: 1, transformOrigin: "50% 50%" });
                gsap.set(overlay, { opacity: 0 });
                gsap.set(masks, { yPercent: 115 });
                gsap.set(fades, { opacity: 0, y: 20 });
                gsap.set(content, { autoAlpha: 1 });

                /* Scroll: gentle parallax on the video, text fades as you leave.
                   These touch different elements from the intro, so they never clash. */
                gsap.to(parallax, {
                    yPercent: 7,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
                gsap.to(content, {
                    y: -50,
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "60% top",
                        scrub: true,
                    },
                });

                /* The intro: centred video launches & grows to full screen, then text arrives */
                const play = () => {
                    if (cancelled) return;

                    const tl = gsap.timeline();

                    // 1) Kinetic accent ring bursts outward from the centred video card
                    tl.fromTo(
                        ring,
                        { autoAlpha: 0.9, scale: 0.9 },
                        {
                            autoAlpha: 0,
                            scale: 1.95,
                            rotateX: 0,
                            rotateY: 0,
                            rotateZ: 0,
                            duration: 1.15,
                            ease: "power3.out",
                        },
                        0
                    );

                    // 2) Video straightens from 3D tilt and grows from centre to full width & height
                    tl.to(
                        frame,
                        {
                            rotateX: 0,
                            rotateY: 0,
                            rotateZ: 0,
                            scale: 1,
                            duration: 1.35,
                            ease: "power3.out",
                        },
                        0
                    );
                    tl.to(
                        frame,
                        {
                            width: "100%",
                            height: "100%",
                            borderRadius: "0px",
                            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                            duration: GROW_DURATION,
                            ease: "expo.inOut",
                        },
                        0.06
                    );

                    // 3) Diagonal light sheen sweeps across the video while it grows
                    tl.fromTo(
                        sheen,
                        { xPercent: -150 },
                        {
                            xPercent: 250,
                            duration: 1.15,
                            ease: "power2.inOut",
                        },
                        0.3
                    );
                    tl.fromTo(
                        sheen,
                        { autoAlpha: 0 },
                        {
                            autoAlpha: 0.45,
                            duration: 0.45,
                            ease: "power2.out",
                        },
                        0.3
                    );
                    tl.to(
                        sheen,
                        {
                            autoAlpha: 0,
                            duration: 0.6,
                            ease: "power2.inOut",
                        },
                        0.8
                    );

                    // 4) Video is now full screen: soft shade so the text stays readable
                    tl.to(
                        overlay,
                        { opacity: 1, duration: 0.8, ease: "power2.out" },
                        GROW_DURATION - 0.15
                    );

                    // 5) Then the text arrives
                    tl.to(
                        masks,
                        {
                            yPercent: 0,
                            duration: 1.1,
                            ease: "power4.out",
                            stagger: 0.12,
                        },
                        "<0.2"
                    );
                    tl.to(
                        fades,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            stagger: 0.1,
                        },
                        "<0.3"
                    );
                };

                /* Wait for the preloader to finish and for the video to be playable,
                   so the growth is never seen on a black box */
                const preloaderDone = new Promise((resolve) => {
                    const noPreloader = !document.querySelector(
                        '[aria-label="Loading"]'
                    );
                    if (window.__preloaderDone || noPreloader) {
                        resolve();
                        return;
                    }
                    window.addEventListener("preloader:done", resolve, {
                        once: true,
                    });
                });

                const videoReady = new Promise((resolve) => {
                    if (video.readyState >= 3) {
                        resolve();
                        return;
                    }
                    const done = () => resolve();
                    video.addEventListener("canplay", done, { once: true });
                    video.addEventListener("error", done, { once: true });
                    setTimeout(done, VIDEO_TIMEOUT);
                });

                video.play().catch(() => {});

                Promise.all([preloaderDone, videoReady]).then(play);

                return () => {
                    cancelled = true;
                };
            }
        );

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-white text-white"
        >
            {/* Video stage: centred card grows to full width & height */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
                style={{ perspective: "1400px" }}
            >
                {/* Expanding accent ring emitted when the video launches */}
                <div
                    ref={ringRef}
                    className="invisible absolute border-2 border-[#ff5a1f]/75 shadow-[0_0_32px_rgba(255,90,31,0.35)] will-change-transform"
                />

                {/* Video frame: starts small in the centre, grows to full screen */}
                <div
                    ref={frameRef}
                    className="invisible relative isolate overflow-hidden bg-neutral-900 will-change-[width,height,transform]"
                >
                    {/* Parallax wrapper (slightly taller than the frame) */}
                    <div
                        ref={parallaxRef}
                        className="absolute inset-x-0 will-change-transform"
                        style={{ top: "-10%", height: "120%" }}
                    >
                        <video
                            ref={videoRef}
                            className="h-full w-full object-cover"
                            src={VIDEO_SRC}
                            poster={POSTER_SRC || undefined}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            disablePictureInPicture
                        />
                    </div>

                    {/* Diagonal sheen that sweeps across during the grow-up */}
                    <div
                        ref={sheenRef}
                        className="invisible pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 will-change-transform"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                        }}
                    />

                    {/* Shade for text legibility (fades in once the video is full screen) */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.12) 100%)",
                        }}
                    />
                </div>
            </div>

            {/* Text content: only appears after the video fills the screen */}
            <div
                ref={contentRef}
                className="pointer-events-none invisible relative z-20 w-full"
            >
                <div className="px-5 pb-14 pt-4 sm:px-8 sm:pb-16 md:px-12 lg:px-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="pointer-events-auto grid grid-cols-1 items-end gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-10">
                            <div className="min-w-0 sm:col-span-8  lg:col-span-12">
                                <h1 className="break-words font-['Outfit'] text-[clamp(2.75rem,11.5vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem]">
                                    <span className="block">
                                        <MaskLine>Naturally &apos;beautiful </MaskLine>
                                    </span>
                                    <span className="block">
                                        <MaskLine>Digitally  &apos;creative </MaskLine>
                                    </span>
                                    {/* <span className="block">
                                        <MaskLine>
                                            Bugsmoker
                                            <span className="text-[#ff5a1f]">.</span>
                                        </MaskLine>
                                    </span> */}
                                </h1>
                            </div>

                            {/* <div className="hero-fade w-full max-w-md lg:col-span-4">
                                <p className="font-['Outfit'] text-[13px] leading-[1.7] text-white/80 sm:text-sm sm:leading-[1.8] md:text-[15px]">
                                    We’re all about making chaotic digital stuff
                                    that actually works for you. And honestly, we
                                    like to keep things light and reckless fun —
                                    because who wants boring, right?
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div
                aria-hidden="true"
                className="hero-fade pointer-events-none absolute inset-x-0 bottom-4 z-20 hidden justify-center sm:flex"
            >
                <span className="relative block h-8 w-px overflow-hidden bg-white/30">
                    <span className="hero-scroll-dot absolute left-0 top-0 block h-1/3 w-px bg-[#ff5a1f]" />
                </span>
            </div>

            <style>{`
                @keyframes hero-scroll {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(300%); }
                }
                .hero-scroll-dot {
                    animation: hero-scroll 1.8s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-scroll-dot { animation: none; }
                }
            `}</style>
        </section>
    );
}