"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Put flower.png in your /public folder
const IMAGE_SRC = "/flower.png";

/* Cluster layout: flowers sit close together and overlap only partially.
   size / cx / cy are percentages of the cluster box.
   duration = seconds for one full turn, dir = 1 clockwise, -1 counter-clockwise */
const FLOWERS = [
    { size: 52, cx: 38, cy: 45, duration: 12, dir: 1, z: 1 }, // large, slow
    { size: 38, cx: 66, cy: 38, duration: 7, dir: -1, z: 2 }, // medium, opposite way
    { size: 36, cx: 62, cy: 67, duration: 4, dir: 1, z: 3 }, // small, fastest
];

// Total time the counter / progress line takes to fill (seconds)
const PROGRESS_DURATION = 2.2;

/* Curtain reveal settings */
const CURTAIN_DURATION = 0.9; // seconds
const CURVE_VW = 8; // height of the curved bottom edge (in vw)

// Never wait longer than this for the image (ms)
const READY_TIMEOUT = 4000;

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

                const wrappers = FLOWERS.map((_, i) => q(`.pl-fw-${i}`));
                const rotors = FLOWERS.map((_, i) => q(`.pl-fr-${i}`));

                /* Initial state */
                gsap.set(topBar, { autoAlpha: 0, y: reduce ? 0 : -10 });
                gsap.set(meta, { autoAlpha: 0, y: reduce ? 0 : 12 });
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
                        window.__preloaderDone = true;
                        window.dispatchEvent(new Event("preloader:done"));
                        onCompleteRef.current?.();
                    },
                });

                /* Editorial top bar + bottom counter & progress */
                tl.to(topBar, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
                tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);

                tl.to(
                    halo,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.1,
                        ease: "power2.out",
                    },
                    0.1
                );
                tl.to(
                    rings,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.0,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    0.15
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
                    0.2
                );
                tl.to(
                    bar,
                    {
                        scaleX: 1,
                        duration: PROGRESS_DURATION,
                        ease: "power2.inOut",
                    },
                    0.2
                );

                /* Flowers bloom in, one after another */
                const inStart = 0.3;
                const inGap = 0.2;
                wrappers.forEach((g, i) => {
                    tl.to(
                        g,
                        {
                            autoAlpha: 1,
                            scale: 1,
                            duration: reduce ? 0.4 : 0.9,
                            ease: reduce ? "power2.out" : "back.out(1.4)",
                        },
                        inStart + i * inGap
                    );
                });

                /* When the progress line is full, flowers & accents fade away */
                const outStart = 0.2 + PROGRESS_DURATION + 0.1;
                const outGap = 0.25;
                const outDur = 0.5;

                [...wrappers].reverse().forEach((g, i) => {
                    tl.to(
                        g,
                        {
                            autoAlpha: 0,
                            scale: reduce ? 1 : 0.5,
                            duration: outDur,
                            ease: "power2.in",
                        },
                        outStart + i * outGap
                    );
                });

                tl.to(
                    halo,
                    {
                        autoAlpha: 0,
                        scale: reduce ? 1 : 0.8,
                        duration: 0.55,
                        ease: "power2.in",
                    },
                    outStart + 0.1
                );
                tl.to(
                    rings,
                    {
                        autoAlpha: 0,
                        scale: reduce ? 1 : 1.08,
                        duration: 0.5,
                        ease: "power2.in",
                    },
                    outStart + 0.1
                );
                tl.to(
                    topBar,
                    {
                        autoAlpha: 0,
                        y: reduce ? 0 : -8,
                        duration: 0.35,
                        ease: "power2.in",
                    },
                    outStart + 0.2
                );
                tl.to(
                    meta,
                    {
                        autoAlpha: 0,
                        y: reduce ? 0 : 8,
                        duration: 0.35,
                        ease: "power2.in",
                    },
                    outStart + 0.2
                );

                /* Curtain reveal: the screen lifts away with a curved edge */
                const revealStart =
                    outStart + (wrappers.length - 1) * outGap + outDur;

                tl.add(() => unlock(), revealStart);

                if (reduce) {
                    tl.to(
                        el,
                        { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
                        revealStart
                    );
                } else {
                    tl.to(
                        el,
                        {
                            // travel the full height plus the curved edge so nothing stays visible
                            y: () =>
                                -(
                                    window.innerHeight +
                                    (window.innerWidth * CURVE_VW) / 100 +
                                    4
                                ),
                            duration: CURTAIN_DURATION,
                            ease: "power4.inOut",
                        },
                        revealStart
                    );
                }

                tl.set(el, { display: "none" });
            }, el);
        };

        /* Wait for the flower image so nothing pops in mid-animation */
        const imageReady = new Promise((resolve) => {
            const img = new Image();
            img.src = IMAGE_SRC;
            if (img.decode) {
                img.decode().then(resolve, resolve);
            } else {
                img.onload = resolve;
                img.onerror = resolve;
            }
        });
        const timeout = new Promise((resolve) =>
            setTimeout(resolve, READY_TIMEOUT)
        );

        Promise.race([imageReady, timeout]).then(build);

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
            className="fixed inset-0 z-[9999] select-none font-['Outfit',sans-serif] text-black will-change-transform"
            style={{
                background:
                    "linear-gradient(180deg, #fffdf9 0%, #fff8ef 52%, #ffffff 100%)",
            }}
        >
            {/* Curved bottom edge that hangs below the screen and leads the lift */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-full bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]"
                style={{
                    height: `${CURVE_VW}vw`,
                    borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                }}
            />

            {/* Top studio bar */}
            <div
                aria-hidden="true"
                className="pl-top invisible absolute inset-x-0 top-0 flex items-center justify-between px-[5%] pt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45 sm:pt-8 sm:text-[11px]"
            >
                <span>Bugsmoker Studio</span>
                <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
                    <span>Digital Craft</span>
                </span>
            </div>

            {/* Sunflower cluster with warm halo and orbital rings */}
            <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center overflow-hidden pb-16 sm:pb-20"
            >
                <div
                    className="relative flex aspect-square items-center justify-center"
                    style={{ width: "min(68vw, 48vh)" }}
                >
                    {/* Warm radial sunflower glow */}
                    <div
                        className="pl-halo invisible pointer-events-none absolute -inset-[18%] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,196,60,0.26) 0%, rgba(255,90,31,0.10) 44%, rgba(255,255,255,0) 72%)",
                        }}
                    />

                    {/* Subtle rotating rings framing the flowers */}
                    <div className="pl-ring invisible pointer-events-none absolute inset-[2%] rounded-full border border-black/[0.06]" />
                    <div className="pl-ring invisible pointer-events-none absolute -inset-[8%] rounded-full border border-dashed border-[#ff5a1f]/25" />

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
                                className={`pl-fr-${i} block h-full w-full select-none object-contain drop-shadow-[0_14px_24px_rgba(217,119,6,0.18)] will-change-transform`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom meta: label, large editorial counter and gradient progress track */}
            <div
                aria-hidden="true"
                className="pl-meta invisible absolute inset-x-0 bottom-0 px-[5%] pb-7 sm:pb-[4%]"
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
