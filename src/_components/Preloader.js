"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Put flower.png and tv.png (cutout tv-frame.png) in your /public folder
const IMAGE_SRC = "/flower.png";
const TV_IMAGE_SRC = "/tv-frame.png";

/* Cluster layout: flowers sit close together and overlap only partially.
   size / cx / cy are percentages of the cluster box.
   duration = seconds for one full turn, dir = 1 clockwise, -1 counter-clockwise */
const FLOWERS = [
    { size: 52, cx: 38, cy: 45, duration: 12, dir: 1, z: 1 }, // large, slow
    { size: 38, cx: 66, cy: 38, duration: 7, dir: -1, z: 2 }, // medium, opposite way
    { size: 36, cx: 62, cy: 67, duration: 4, dir: 1, z: 3 }, // small, fastest
];

// Total time the counter / progress line takes to fill (seconds)
const PROGRESS_DURATION = 1.4;

// Quick fade-out duration once 100% completes (seconds)
const EXIT_DURATION = 0.4;

// Never wait longer than this for the images (ms)
const READY_TIMEOUT = 1500;

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);

    // Keep the latest callback without restarting the animation when the parent re-renders
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let cancelled = false;
        let ctx;

        // Keep the page still while the loader is up
        const html = document.documentElement;
        const prevOverflow = html.style.overflow;
        const lenis = window.__lenis;
        html.style.overflow = "hidden";
        lenis?.stop?.();

        const unlock = () => {
            html.style.overflow = prevOverflow;
            lenis?.start?.();
        };

        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const build = () => {
            if (cancelled) return;

            ctx = gsap.context(() => {
                const q = gsap.utils.selector(el);
                const topBar = q(".pl-top");
                const meta = q(".pl-meta");
                const count = q(".pl-count");
                const bar = q(".pl-bar");
                const halo = q(".pl-halo");
                const rings = q(".pl-ring");
                const tv = q(".pl-tv");

                const wrappers = FLOWERS.map((_, i) => q(`.pl-fw-${i}`));
                const rotors = FLOWERS.map((_, i) => q(`.pl-fr-${i}`));

                /* Initial state */
                gsap.set(topBar, { autoAlpha: 0, y: reduce ? 0 : -10 });
                gsap.set(meta, { autoAlpha: 0, y: reduce ? 0 : 12 });
                gsap.set(tv, {
                    autoAlpha: 0,
                    scale: reduce ? 1 : 0.92,
                    y: reduce ? 0 : 14,
                    transformOrigin: "50% 55%",
                });
                gsap.set(halo, {
                    autoAlpha: 0,
                    scale: reduce ? 1 : 0.65,
                    transformOrigin: "50% 50%",
                });
                gsap.set(rings, {
                    autoAlpha: 0,
                    scale: reduce ? 1 : 0.78,
                    transformOrigin: "50% 50%",
                });
                wrappers.forEach((g) =>
                    gsap.set(g, {
                        autoAlpha: 0,
                        scale: reduce ? 1 : 0,
                        transformOrigin: "50% 50%",
                    })
                );

                /* Endless spin for flowers and subtle orbital rings */
                const spins = [];
                if (!reduce) {
                    rotors.forEach((g, i) => {
                        spins.push(
                            gsap.to(g, {
                                rotation: 360 * FLOWERS[i].dir,
                                duration: FLOWERS[i].duration,
                                ease: "none",
                                repeat: -1,
                                transformOrigin: "50% 50%",
                            })
                        );
                    });

                    rings.forEach((ringEl, i) => {
                        spins.push(
                            gsap.to(ringEl, {
                                rotation: i % 2 === 0 ? 360 : -360,
                                duration: i % 2 === 0 ? 28 : 20,
                                ease: "none",
                                repeat: -1,
                                transformOrigin: "50% 50%",
                            })
                        );
                    });
                }

                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    onComplete: () => {
                        spins.forEach((s) => s.kill());
                        if (!window.__preloaderDone) {
                            window.__preloaderDone = true;
                            window.dispatchEvent(new Event("preloader:done"));
                        }
                        onCompleteRef.current?.();
                    },
                });

                /* Editorial top bar + bottom counter & progress */
                tl.to(topBar, { autoAlpha: 1, y: 0, duration: 0.45 }, 0);
                tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.45 }, 0);

                tl.to(
                    tv,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        duration: reduce ? 0.35 : 0.6,
                        ease: "power3.out",
                    },
                    0
                );

                tl.to(
                    halo,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.75,
                        ease: "power2.out",
                    },
                    0.05
                );
                tl.to(
                    rings,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.75,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    0.08
                );

                const counter = { v: 0 };
                tl.to(
                    counter,
                    {
                        v: 100,
                        duration: PROGRESS_DURATION,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            const text = String(Math.round(counter.v)).padStart(
                                3,
                                "0"
                            );
                            count.forEach((c) => {
                                c.textContent = text;
                            });
                        },
                    },
                    0
                );
                tl.to(
                    bar,
                    {
                        scaleX: 1,
                        duration: PROGRESS_DURATION,
                        ease: "power2.inOut",
                    },
                    0
                );

                /* Flowers bloom in, one after another */
                const inStart = 0.15;
                const inGap = 0.15;
                wrappers.forEach((g, i) => {
                    tl.to(
                        g,
                        {
                            autoAlpha: 1,
                            scale: 1,
                            duration: reduce ? 0.3 : 0.65,
                            ease: reduce ? "power2.out" : "back.out(1.3)",
                        },
                        inStart + i * inGap
                    );
                });

                /* Immediate fade-out as soon as 100% completes: no black gap, no exit delay */
                const revealStart = PROGRESS_DURATION;

                tl.add(() => {
                    unlock();
                    window.__preloaderDone = true;
                    window.dispatchEvent(new Event("preloader:done"));
                }, revealStart);

                tl.set(el, { pointerEvents: "none" }, revealStart);
                tl.to(
                    el,
                    {
                        autoAlpha: 0,
                        duration: reduce ? 0.3 : EXIT_DURATION,
                        ease: "power2.out",
                    },
                    revealStart
                );
                tl.set(el, { display: "none" });
            }, el);
        };

        /* Wait for the TV and flower images so nothing pops in mid-animation */
        const preloadImage = (src) =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                if (img.decode) {
                    img.decode().then(resolve, resolve);
                } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });

        const imagesReady = Promise.all([
            preloadImage(IMAGE_SRC),
            preloadImage(TV_IMAGE_SRC),
        ]);
        const timeout = new Promise((resolve) =>
            setTimeout(resolve, READY_TIMEOUT)
        );

        Promise.race([imagesReady, timeout]).then(build);

        return () => {
            cancelled = true;
            ctx?.revert();
            unlock();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className="fixed inset-0 z-[9999] select-none font-['Outfit',sans-serif] text-black will-change-[opacity]"
            style={{
                background:
                    "linear-gradient(180deg, #fffdf9 0%, #fff8ef 52%, #ffffff 100%)",
            }}
        >
            {/* Top studio bar */}
            <div
                aria-hidden="true"
                className="pl-top invisible absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[5%] pt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 sm:pt-8 sm:text-[11px]"
            >
                <span>Bugsmoker Studio</span>
                <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                    <span>Digital Craft</span>
                </span>
            </div>

            {/* Centered retro TV with the sunflower cluster inside the CRT screen */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-4 pt-10 pb-24 sm:pb-28"
            >
                <div
                    className="pl-tv invisible relative select-none"
                    style={{
                        width: "min(78vw, 52vh, 480px)",
                        aspectRatio: "1211 / 1299",
                    }}
                >
                    {/* Soft ambient grounding glow beneath the TV */}
                    <div
                        className="pointer-events-none absolute inset-x-[16%] bottom-[2%] h-[9%] rounded-full blur-2xl"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(25,12,48,0.28) 0%, rgba(25,12,48,0) 75%)",
                        }}
                    />

                    {/* Clipped CRT screen region positioned behind the transparent TV bezel */}
                    <div
                        className="absolute flex items-center justify-center overflow-hidden"
                        style={{
                            left: "17.8%",
                            top: "39.8%",
                            width: "56.5%",
                            height: "42.5%",
                            borderRadius: "18% / 22%",
                            background:
                                "radial-gradient(circle at 50% 48%, #28163e 0%, #140b21 68%, #09050f 100%)",
                        }}
                    >
                        {/* Sunflower cluster container (preserves 1:1 overlap & spin layout) */}
                        <div className="relative flex aspect-square h-[104%] items-center justify-center">
                            {/* Warm radial sunflower glow */}
                            <div
                                className="pl-halo invisible pointer-events-none absolute -inset-[12%] rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(255,196,60,0.34) 0%, rgba(255,90,31,0.14) 46%, rgba(20,11,33,0) 74%)",
                                }}
                            />

                            {/* Subtle rotating rings framing the flowers */}
                            <div className="pl-ring invisible pointer-events-none absolute inset-[6%] rounded-full border border-white/15" />
                            <div className="pl-ring invisible pointer-events-none absolute inset-[-2%] rounded-full border border-dashed border-[#ff5a1f]/45" />

                            {FLOWERS.map((f, i) => (
                                <div
                                    key={i}
                                    className={`pl-fw-${i} invisible absolute will-change-transform`}
                                    style={{
                                        width: `${f.size}%`,
                                        height: `${f.size}%`,
                                        left: `${f.cx - f.size / 2}%`,
                                        top: `${f.cy - f.size / 2}%`,
                                        zIndex: f.z,
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={IMAGE_SRC}
                                        alt=""
                                        draggable={false}
                                        className={`pl-fr-${i} block h-full w-full select-none object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] will-change-transform`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Subtle CRT scanlines + curved screen reflection */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)",
                            }}
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 36%, transparent 62%), inset 0 0 24px rgba(0,0,0,0.65)",
                            }}
                        />
                    </div>

                    {/* Transparent TV bezel foreground frame */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={TV_IMAGE_SRC}
                        alt=""
                        draggable={false}
                        className="relative z-10 block h-full w-full select-none object-contain drop-shadow-[0_18px_32px_rgba(24,10,48,0.18)]"
                    />
                </div>
            </div>

            {/* Bottom meta: label, large editorial counter and gradient progress track */}
            <div
                aria-hidden="true"
                className="pl-meta invisible absolute inset-x-0 bottom-0 z-10 px-[5%] pb-7 sm:pb-[4%]"
            >
                <div className="mb-3 flex items-end justify-between gap-4 sm:mb-4">
                    <div className="flex items-center gap-2.5 pb-1">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-70 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                        </span>
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-black/55 sm:text-[11px]">
                            Loading Experience
                        </span>
                    </div>

                    <div className="flex items-baseline leading-none">
                        <span className="pl-count text-[clamp(2.85rem,7.5vw,5.25rem)] font-bold leading-[0.82] tracking-[-0.05em] tabular-nums text-black">
                            000
                        </span>
                        <span className="ml-1 text-[clamp(1.25rem,3vw,2.2rem)] font-bold leading-none text-[#ff5a1f]">
                            %
                        </span>
                    </div>
                </div>

                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-black/[0.08]">
                    <span className="pl-bar absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#ffaa2b] via-[#ff5a1f] to-[#ff5a1f]" />
                </div>
            </div>
        </div>
    );
}
