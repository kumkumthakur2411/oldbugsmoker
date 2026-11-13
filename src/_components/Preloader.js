"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Put flower.png in your /public folder
const IMAGE_SRC = "/flower.png";

// Only the leaves use this colour, change it to match your theme
const LEAF_COLOR = "#2f8f5b";

// Total time the counter / progress ring takes to fill (seconds)
const PROGRESS_DURATION = 1.8;

// Iris-close reveal duration once 100% completes (seconds)
const IRIS_DURATION = 0.85;

// Never wait longer than this for the image (ms)
const READY_TIMEOUT = 1500;

const STATUS = [
    { at: 0, text: "Planting seeds" },
    { at: 30, text: "Growing components" },
    { at: 62, text: "Compiling roots" },
    { at: 92, text: "Ready to bloom" },
];

/* ------------------------------------------------------------------ */
/* Geometry (viewBox 0 0 400 400, centre 200,200)                      */
/* ------------------------------------------------------------------ */

const f = (n) => Math.round(n * 100) / 100;

const polar = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return [f(200 + r * Math.cos(a)), f(200 + r * Math.sin(a))];
};

const PROGRESS_R = 160;
const PROGRESS_C = 2 * Math.PI * PROGRESS_R;

/* Instrument tick ring */
const TICKS = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const major = i % 6 === 0;
    const [x1, y1] = polar(176, deg);
    const [x2, y2] = polar(major ? 190 : 183, deg);
    return { x1, y1, x2, y2, major, accent: i % 18 === 0 };
});

/* Circuit traces that grow outward and end in leaves */
const BRANCHES = Array.from({ length: 8 }, (_, i) => {
    const deg = i * 45 + 22.5;
    const long = i % 2 === 0;
    const jog = (long ? 1 : -1) * 9;
    const rKink = long ? 92 : 88;
    const rEnd = long ? 120 : 106;

    const A = polar(70, deg);
    const B = polar(rKink, deg);
    const C = polar(rKink + 12, deg + jog);
    const D = polar(rEnd, deg + jog);

    return {
        d: `M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${C[0]} ${C[1]} L${D[0]} ${D[1]}`,
        node: B,
        leafAt: D,
        leafRot: f(deg + jog),
    };
});

/* Small flowers orbiting the dashed ring (radius 150 / 400 = 37.5%) */
const ORBITERS = [
    { size: 9, start: 0, duration: 14, dir: 1 },
    { size: 6, start: 180, duration: 20, dir: -1 },
];

/* Drifting pollen / data particles (fixed values = no hydration mismatch) */
const SPORES = [
    { l: 8, t: 78, s: 4 },
    { l: 17, t: 58, s: 3 },
    { l: 26, t: 86, s: 5 },
    { l: 34, t: 66, s: 3 },
    { l: 44, t: 90, s: 4 },
    { l: 53, t: 72, s: 3 },
    { l: 62, t: 88, s: 5 },
    { l: 71, t: 62, s: 3 },
    { l: 79, t: 82, s: 4 },
    { l: 87, t: 68, s: 3 },
    { l: 93, t: 90, s: 5 },
    { l: 14, t: 38, s: 3 },
];

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
                const one = (sel) => q(sel)[0];

                const topBar = q(".pl-top");
                const meta = q(".pl-meta");
                const count = one(".pl-count");
                const status = one(".pl-status");
                const bar = q(".pl-bar");

                const svg = q(".pl-svg");
                const ticks = q(".pl-ticks");
                const dash = q(".pl-dash");
                const track = q(".pl-track");
                const prog = q(".pl-prog");
                const head = q(".pl-head");
                const inner = q(".pl-inner");
                const branches = q(".pl-branch");
                const nodes = q(".pl-node");
                const leaves = q(".pl-leaf");
                const brackets = q(".pl-bracket");

                const glow = q(".pl-glow");
                const flower = q(".pl-flower");
                const flowerImg = q(".pl-flower-img");
                const orbits = ORBITERS.map((_, i) => q(`.pl-orbit-${i}`));
                const spores = q(".pl-spore");

                /* Everything that rotates around the dial centre */
                gsap.set([ticks, dash, head], { svgOrigin: "200 200" });

                /* Progress arc starts fully undrawn */
                gsap.set(prog, {
                    strokeDasharray: PROGRESS_C,
                    strokeDashoffset: PROGRESS_C,
                });

                /* Branch traces start undrawn */
                branches.forEach((p) => {
                    const len = p.getTotalLength();
                    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
                });

                /* Leaves grow from their base */
                gsap.set(leaves, { transformOrigin: "0% 50%" });
                gsap.set(nodes, { transformOrigin: "50% 50%" });

                /* Initial state */
                gsap.set(topBar, { autoAlpha: 0, y: reduce ? 0 : -10 });
                gsap.set(meta, { autoAlpha: 0, y: reduce ? 0 : 12 });

                if (reduce) {
                    gsap.set(svg, { autoAlpha: 1 });
                    gsap.set([glow, flower, ...orbits], { autoAlpha: 1 });
                    gsap.set(brackets, { autoAlpha: 1 });
                    gsap.set(branches, { strokeDashoffset: 0 });
                    gsap.set(
                        [ticks, dash, track, prog, head, inner, nodes, leaves],
                        { opacity: 1 }
                    );
                    orbits.forEach((g, i) =>
                        gsap.set(g, { rotation: ORBITERS[i].start })
                    );
                } else {
                    gsap.set(
                        [ticks, dash, track, prog, head, inner, nodes, leaves],
                        { opacity: 0 }
                    );
                    gsap.set(leaves, { scale: 0 });
                    gsap.set(nodes, { scale: 0 });
                    gsap.set(glow, { autoAlpha: 0, scale: 0.6 });
                    gsap.set(flower, { autoAlpha: 0, scale: 0 });
                    gsap.set(brackets, { autoAlpha: 0, scale: 0.8 });
                    orbits.forEach((g, i) =>
                        gsap.set(g, {
                            autoAlpha: 0,
                            rotation: ORBITERS[i].start,
                        })
                    );
                }

                /* Endless motion: spins, glow pulse, drifting spores */
                const loops = [];
                if (!reduce) {
                    loops.push(
                        gsap.to(ticks, {
                            rotation: 360,
                            duration: 46,
                            ease: "none",
                            repeat: -1,
                        }),
                        gsap.to(dash, {
                            rotation: -360,
                            duration: 30,
                            ease: "none",
                            repeat: -1,
                        }),
                        gsap.to(flowerImg, {
                            rotation: 360,
                            duration: 18,
                            ease: "none",
                            repeat: -1,
                            transformOrigin: "50% 50%",
                        }),
                        gsap.to(glow, {
                            scale: 1.12,
                            duration: 2,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: -1,
                            delay: 0.9,
                            transformOrigin: "50% 50%",
                        })
                    );

                    orbits.forEach((g, i) => {
                        loops.push(
                            gsap.to(g, {
                                rotation: ORBITERS[i].start + 360 * ORBITERS[i].dir,
                                duration: ORBITERS[i].duration,
                                ease: "none",
                                repeat: -1,
                                transformOrigin: "50% 50%",
                            })
                        );
                    });

                    spores.forEach((s, i) => {
                        const d = 4 + (i % 4);
                        const delay = i * 0.35;
                        loops.push(
                            gsap.fromTo(
                                s,
                                { y: 0 },
                                { y: -110, duration: d, ease: "none", repeat: -1, delay }
                            ),
                            gsap.fromTo(
                                s,
                                { opacity: 0 },
                                {
                                    opacity: 0.65,
                                    duration: d / 2,
                                    ease: "sine.inOut",
                                    yoyo: true,
                                    repeat: -1,
                                    delay,
                                }
                            )
                        );
                    });
                }

                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    onComplete: () => {
                        loops.forEach((s) => s.kill());
                        if (!window.__preloaderDone) {
                            window.__preloaderDone = true;
                            window.dispatchEvent(new Event("preloader:done"));
                        }
                        onCompleteRef.current?.();
                    },
                });

                /* Top bar + bottom meta */
                tl.to(topBar, { autoAlpha: 1, y: 0, duration: 0.45 }, 0);
                tl.to(meta, { autoAlpha: 1, y: 0, duration: 0.45 }, 0);

                /* Intro: dial, traces, leaves, flowers */
                if (!reduce) {
                    tl.set(svg, { autoAlpha: 1 }, 0);

                    tl.to(track, { opacity: 1, duration: 0.5 }, 0.05);
                    tl.to(prog, { opacity: 1, duration: 0.3 }, 0.05);
                    tl.to(head, { opacity: 1, duration: 0.3 }, 0.1);
                    tl.fromTo(
                        ticks,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.8 },
                        0.05
                    );
                    tl.to(dash, { opacity: 1, duration: 0.7 }, 0.15);
                    tl.to(inner, { opacity: 1, duration: 0.6 }, 0.2);
                    tl.to(
                        brackets,
                        { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.06 },
                        0.1
                    );

                    tl.to(
                        glow,
                        { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" },
                        0.1
                    );
                    tl.to(
                        flower,
                        { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
                        0.1
                    );
                    tl.to(
                        orbits,
                        { autoAlpha: 1, duration: 0.5, stagger: 0.15 },
                        0.5
                    );

                    /* Circuit traces draw outward, leaves bloom at the ends */
                    tl.to(
                        branches,
                        {
                            strokeDashoffset: 0,
                            duration: 0.55,
                            ease: "power2.out",
                            stagger: 0.08,
                        },
                        0.35
                    );
                    tl.to(
                        nodes,
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.35,
                            ease: "back.out(2.5)",
                            stagger: 0.08,
                        },
                        0.45
                    );
                    tl.to(
                        leaves,
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: "back.out(2)",
                            stagger: 0.08,
                        },
                        0.65
                    );
                }

                /* Progress: counter, status text, bar, ring and head dot all in sync */
                const counter = { v: 0 };
                let statusIdx = -1;
                tl.to(
                    counter,
                    {
                        v: 100,
                        duration: PROGRESS_DURATION,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            const v = Math.round(counter.v);
                            if (count) {
                                count.textContent = String(v).padStart(3, "0");
                            }
                            let idx = 0;
                            for (let i = 0; i < STATUS.length; i++) {
                                if (v >= STATUS[i].at) idx = i;
                            }
                            if (idx !== statusIdx && status) {
                                statusIdx = idx;
                                status.textContent = STATUS[idx].text;
                            }
                        },
                    },
                    0
                );
                tl.to(
                    bar,
                    { scaleX: 1, duration: PROGRESS_DURATION, ease: "power2.inOut" },
                    0
                );
                tl.to(
                    prog,
                    {
                        strokeDashoffset: 0,
                        duration: PROGRESS_DURATION,
                        ease: "power2.inOut",
                    },
                    0
                );
                if (!reduce) {
                    tl.to(
                        head,
                        {
                            rotation: 360,
                            duration: PROGRESS_DURATION,
                            ease: "power2.inOut",
                        },
                        0
                    );
                }

                /* Finish: flower pops, then the screen closes like an iris */
                const done = PROGRESS_DURATION;

                if (!reduce) {
                    tl.to(
                        flower,
                        {
                            scale: 1.18,
                            duration: 0.35,
                            ease: "back.out(2.2)",
                        },
                        done
                    );
                }

                const revealStart = done + (reduce ? 0 : 0.2);

                tl.add(() => {
                    unlock();
                    window.__preloaderDone = true;
                    window.dispatchEvent(new Event("preloader:done"));
                }, revealStart);

                tl.set(el, { pointerEvents: "none" }, revealStart);

                if (reduce) {
                    tl.to(
                        el,
                        { autoAlpha: 0, duration: 0.3, ease: "power2.out" },
                        revealStart
                    );
                } else {
                    tl.to(
                        [topBar, meta],
                        { autoAlpha: 0, duration: 0.25, ease: "power2.out" },
                        revealStart
                    );
                    tl.fromTo(
                        el,
                        { clipPath: "circle(150% at 50% 50%)" },
                        {
                            clipPath: "circle(0% at 50% 50%)",
                            duration: IRIS_DURATION,
                            ease: "power3.inOut",
                        },
                        revealStart
                    );
                }
                tl.set(el, { display: "none" });
            }, el);
        };

        /* Wait for the flower image so nothing pops in mid-animation */
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

        const timeout = new Promise((resolve) =>
            setTimeout(resolve, READY_TIMEOUT)
        );

        Promise.race([preloadImage(IMAGE_SRC), timeout]).then(build);

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
            className="fixed inset-0 z-[9999] select-none overflow-hidden font-['Outfit',sans-serif] text-black will-change-[opacity]"
            style={{
                background:
                    "linear-gradient(180deg, #fffdf9 0%, #fff8ef 52%, #ffffff 100%)",
            }}
        >
            {/* Dot-grid texture */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    maskImage:
                        "radial-gradient(ellipse at 50% 48%, black 20%, transparent 72%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 48%, black 20%, transparent 72%)",
                }}
            />

            {/* Ambient glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff5a1f]/10 blur-3xl sm:h-96 sm:w-96"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#ffaa2b]/15 blur-3xl sm:h-96 sm:w-96"
            />

            {/* Drifting spores */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {SPORES.map((s, i) => (
                    <span
                        key={i}
                        className={`pl-spore absolute rounded-full opacity-0 ${
                            i % 2 === 0 ? "bg-[#ff5a1f]" : "bg-[#ffaa2b]"
                        }`}
                        style={{
                            left: `${s.l}%`,
                            top: `${s.t}%`,
                            width: s.s,
                            height: s.s,
                        }}
                    />
                ))}
            </div>

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

            {/* Centre stage: sunflower inside the instrument dial */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-10 flex items-center justify-center px-4 pb-24 pt-10 sm:pb-28"
            >
                <div
                    className="relative"
                    style={{
                        width: "min(82vw, 56vh, 520px)",
                        aspectRatio: "1 / 1",
                    }}
                >
                    {/* Warm glow behind the flower */}
                    <div
                        className="pl-glow invisible pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,196,60,0.45) 0%, rgba(255,90,31,0.16) 46%, rgba(255,255,255,0) 72%)",
                        }}
                    />

                    {/* HUD corner brackets */}
                    <span className="pl-bracket invisible absolute -left-[2%] -top-[2%] h-5 w-5 border-l-2 border-t-2 border-black/30 sm:h-6 sm:w-6" />
                    <span className="pl-bracket invisible absolute -right-[2%] -top-[2%] h-5 w-5 border-r-2 border-t-2 border-black/30 sm:h-6 sm:w-6" />
                    <span className="pl-bracket invisible absolute -bottom-[2%] -left-[2%] h-5 w-5 border-b-2 border-l-2 border-black/30 sm:h-6 sm:w-6" />
                    <span className="pl-bracket invisible absolute -bottom-[2%] -right-[2%] h-5 w-5 border-b-2 border-r-2 border-black/30 sm:h-6 sm:w-6" />

                    {/* Dial, circuit traces and leaves */}
                    <svg
                        viewBox="0 0 400 400"
                        className="pl-svg invisible absolute inset-0 h-full w-full overflow-visible"
                    >
                        {/* Tick ring */}
                        <g className="pl-ticks">
                            {TICKS.map((t, i) => (
                                <line
                                    key={i}
                                    x1={t.x1}
                                    y1={t.y1}
                                    x2={t.x2}
                                    y2={t.y2}
                                    strokeLinecap="round"
                                    strokeWidth={t.major ? 1.8 : 1}
                                    stroke={
                                        t.accent
                                            ? "#ff5a1f"
                                            : t.major
                                            ? "rgba(0,0,0,0.65)"
                                            : "rgba(0,0,0,0.3)"
                                    }
                                />
                            ))}
                        </g>

                        {/* Dashed orbit ring */}
                        <circle
                            className="pl-dash"
                            cx="200"
                            cy="200"
                            r="150"
                            fill="none"
                            stroke="rgba(0,0,0,0.28)"
                            strokeWidth="1.2"
                            strokeDasharray="2 7"
                            strokeLinecap="round"
                        />

                        {/* Inner ring around the flower */}
                        <circle
                            className="pl-inner"
                            cx="200"
                            cy="200"
                            r="64"
                            fill="none"
                            stroke="rgba(0,0,0,0.1)"
                            strokeWidth="1"
                        />

                        {/* Progress track + arc */}
                        <circle
                            className="pl-track"
                            cx="200"
                            cy="200"
                            r={PROGRESS_R}
                            fill="none"
                            stroke="rgba(0,0,0,0.08)"
                            strokeWidth="2.5"
                        />
                        <circle
                            className="pl-prog"
                            cx="200"
                            cy="200"
                            r={PROGRESS_R}
                            fill="none"
                            stroke="#ff5a1f"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            transform="rotate(-90 200 200)"
                        />
                        <g className="pl-head">
                            <circle
                                cx="200"
                                cy={200 - PROGRESS_R}
                                r="11"
                                fill="#ff5a1f"
                                opacity="0.2"
                            />
                            <circle
                                cx="200"
                                cy={200 - PROGRESS_R}
                                r="4.5"
                                fill="#ff5a1f"
                            />
                        </g>

                        {/* Circuit traces that end in leaves */}
                        {BRANCHES.map((b, i) => (
                            <g key={i}>
                                <path
                                    className="pl-branch"
                                    d={b.d}
                                    fill="none"
                                    stroke="rgba(0,0,0,0.75)"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    className="pl-node"
                                    cx={b.node[0]}
                                    cy={b.node[1]}
                                    r="2.6"
                                    fill="#ff5a1f"
                                />
                                <g
                                    transform={`translate(${b.leafAt[0]} ${b.leafAt[1]}) rotate(${b.leafRot})`}
                                >
                                    <g className="pl-leaf">
                                        <path
                                            d="M0 0 C5 -9 15 -9 21 0 C15 9 5 9 0 0 Z"
                                            fill={LEAF_COLOR}
                                        />
                                        <path
                                            d="M2 0 L18 0"
                                            stroke="rgba(255,255,255,0.65)"
                                            strokeWidth="0.8"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                </g>
                            </g>
                        ))}
                    </svg>

                    {/* Main sunflower */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="pl-flower invisible aspect-square will-change-transform"
                            style={{ width: "30%" }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={IMAGE_SRC}
                                alt=""
                                draggable={false}
                                className="pl-flower-img block h-full w-full select-none object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] will-change-transform"
                            />
                        </div>
                    </div>

                    {/* Small flowers orbiting the dial */}
                    {ORBITERS.map((o, i) => (
                        <div
                            key={i}
                            className={`pl-orbit-${i} invisible pointer-events-none absolute inset-0 will-change-transform`}
                        >
                            <div
                                className="absolute"
                                style={{
                                    left: "50%",
                                    top: "12.5%",
                                    width: `${o.size}%`,
                                    aspectRatio: "1 / 1",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={IMAGE_SRC}
                                    alt=""
                                    draggable={false}
                                    className="block h-full w-full select-none object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom meta: status, large counter, thin progress line */}
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
                        <span className="pl-status font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-black/55 sm:text-[11px]">
                            Planting seeds
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