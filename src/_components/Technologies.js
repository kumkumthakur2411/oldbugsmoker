"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiThreedotjs,
    SiFigma,
    SiNodedotjs,
    SiPython,
    SiPostgresql,
    SiDocker,
    SiCloudflare,
    SiGraphql,
    SiGo,
} from "react-icons/si";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // Stops the mobile address bar showing/hiding from re-calculating every trigger
    ScrollTrigger.config({ ignoreMobileResize: true });
}

const BASE_SPEED = 0.45;       // Normal horizontal movement (was 1.1)
const HOVER_SPEED = 0.15;      // Hover movement (was 0.35)
const MAX_SCROLL_BOOST = 0.6;  // Scroll speed boost (was 1.6)
const WAVE_BASE_RATE = 0.008; // Wave animation speed (was 0.02)
const WAVE_SPEED_RATE = 0.001; // Wave speed influence (was 0.002)

/* ICONS */

function BracesIcon() {
    return (
        <span className="font-mono text-lg font-bold sm:text-2xl">
            {"{ }"}
        </span>
    );
}

function SparkleIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
        </svg>
    );
}

function NodeCircuitIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="12" x2="8" y2="12" />
            <circle cx="12" cy="12" r="3.5" />
            <line x1="16" y1="12" x2="22" y2="12" />
        </svg>
    );
}

function CommandIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
    );
}

function LayersIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    );
}

function DotMatrixIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="5.5" r="1.8" />
            <circle cx="12" cy="18.5" r="1.8" />
            <circle cx="5.5" cy="12" r="1.8" />
            <circle cx="18.5" cy="12" r="1.8" />
        </svg>
    );
}

function CodeTagIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="8 7 3 12 8 17" />
            <polyline points="16 7 21 12 16 17" />
        </svg>
    );
}

function IndentIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M4 12h11" />
            <polyline points="11 8 15 12 11 16" />
            <line x1="19" y1="6" x2="19" y2="18" />
        </svg>
    );
}

function WandIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m15 4-2 2 4 4 2-2a2.8 2.8 0 0 0-4-4Z" />
            <path d="m3 21 8.5-8.5" />
            <path d="M4 7V3" />
            <path d="M2 5h4" />
        </svg>
    );
}

function GitBranchIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
    );
}

function SearchSparkleIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
            <path d="M19 5v3" />
            <path d="M17.5 6.5h3" />
        </svg>
    );
}

function RotateIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24L21 7" />
            <polyline points="21 3 21 7 17 7" />
        </svg>
    );
}

function FolderIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
    );
}

/* TECHNOLOGIES */

const ITEMS = [
    { id: "braces", name: "Syntax & Logic", Icon: BracesIcon },
    { id: "sparkle", name: "Creative Direction", Icon: SparkleIcon },
    { id: "nextjs", name: "Next.js 15", Icon: SiNextdotjs },
    { id: "circuit", name: "System Architecture", Icon: NodeCircuitIcon },
    { id: "react", name: "React 19", Icon: SiReact },
    { id: "command", name: "Modern Workflows", Icon: CommandIcon },
    { id: "typescript", name: "TypeScript", Icon: SiTypescript },
    { id: "layers", name: "Component Systems", Icon: LayersIcon },
    { id: "tailwind", name: "Tailwind CSS", Icon: SiTailwindcss },
    { id: "dots", name: "Pixel Precision", Icon: DotMatrixIcon },
    { id: "tags", name: "Semantic Code", Icon: CodeTagIcon },
    { id: "threejs", name: "Three.js / 3D", Icon: SiThreedotjs },
    { id: "indent", name: "Clean Architecture", Icon: IndentIcon },
    { id: "figma", name: "Figma UI / UX", Icon: SiFigma },
    { id: "wand", name: "Design Engineering", Icon: WandIcon },
    { id: "python", name: "Python & AI", Icon: SiPython },
    { id: "git", name: "Version Control", Icon: GitBranchIcon },
    { id: "nodejs", name: "Node.js Engine", Icon: SiNodedotjs },
    { id: "search", name: "Speed Optimization", Icon: SearchSparkleIcon },
    { id: "docker", name: "Docker Containers", Icon: SiDocker },
    { id: "rotate", name: "Continuous Sync", Icon: RotateIcon },
    { id: "postgres", name: "PostgreSQL DB", Icon: SiPostgresql },
    { id: "folder", name: "Modular Assets", Icon: FolderIcon },
    { id: "cloudflare", name: "Edge Network", Icon: SiCloudflare },
    { id: "graphql", name: "GraphQL APIs", Icon: SiGraphql },
    { id: "go", name: "Go Services", Icon: SiGo },
];

const TRACK_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

/* WAVE DISC */

function WaveDisc({ item, decorative = false }) {
    const { Icon, name } = item;

    return (
        <div
            className="wave-disc group relative mr-3 flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-200/90 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-[scale,border-color,box-shadow] duration-300 ease-out hover:z-30 hover:scale-110 hover:border-[#ff5a1f] hover:shadow-[0_12px_28px_rgba(255,90,31,0.22)] sm:mr-4 sm:h-20 sm:w-20 md:mr-5 md:h-[86px] md:w-[86px]"
            aria-label={decorative ? undefined : name}
            aria-hidden={decorative ? "true" : undefined}
        >
            <div className="flex items-center justify-center text-neutral-800 transition-all duration-300 group-hover:scale-110 group-hover:text-[#ff5a1f]">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>

            <div className="pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:-top-12 group-hover:opacity-100">
                <span className="flex whitespace-nowrap rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ff5a1f] shadow-lg">
                    {name}
                </span>
            </div>
        </div>
    );
}

/* MAIN COMPONENT */

export default function Technologies() {
    const rootRef = useRef(null);
    const stageRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        const stage = stageRef.current;
        const track = trackRef.current;

        if (!root || !stage || !track) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Heading reveal */
                gsap.fromTo(
                    ".tech-head > *",
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: ".tech-head",
                            start: "top 88%",
                            once: true,
                        },
                    }
                );

                const discs = gsap.utils.toArray(".wave-disc", track);

                if (!discs.length) return;

                const setTrackX = gsap.quickSetter(track, "x", "px");

                const setDiscY = discs.map((disc) =>
                    gsap.quickSetter(disc, "y", "px")
                );
                const setDiscOpacity = discs.map((disc) =>
                    gsap.quickSetter(disc, "opacity")
                );

                let stepWidth = 100;
                let repeatWidth = ITEMS.length * stepWidth;
                let wavelength = 850;
                let amplitude = 55;

                let xPos = 0;
                let vel = 0;
                let isHovered = false;
                let visible = false;
                let currentSpeed = BASE_SPEED;
                let elapsed = 0;

                const measure = () => {
                    if (discs.length >= 2) {
                        const measuredStep =
                            discs[1].offsetLeft - discs[0].offsetLeft;

                        if (measuredStep > 20) {
                            stepWidth = measuredStep;
                        }
                    }

                    repeatWidth = ITEMS.length * stepWidth;

                    const wavesPerRepeat = Math.max(
                        2,
                        Math.round(repeatWidth / 1000)
                    );

                    wavelength = repeatWidth / wavesPerRepeat;

                    const width = window.innerWidth;

                    amplitude =
                        width < 640 ? 32 :
                        width < 1024 ? 46 : 58;
                };

                const applyPositions = () => {
                    for (let i = 0; i < discs.length; i++) {
                        const screenX = xPos + i * stepWidth;

                        const phase =
                            (screenX / wavelength) * Math.PI * 2;

                        const primaryWave =
                            Math.sin(phase + elapsed) * amplitude;

                        const secondaryWave =
                            Math.sin(phase * 2 - elapsed * 0.65) *
                            (amplitude * 0.12);

                        const tertiaryWave =
                            Math.cos(phase * 0.5 + elapsed * 0.4) *
                            (amplitude * 0.08);

                        const y =
                            primaryWave +
                            secondaryWave +
                            tertiaryWave;

                        setDiscY[i](y);

                        // Depth cue: discs on the crest of the wave are fully
                        // opaque, discs in the trough fade back slightly
                        const depth = (1 - y / amplitude) / 2; // 0 (trough) .. 1 (crest)
                        setDiscOpacity[i](
                            0.62 + 0.38 * gsap.utils.clamp(0, 1, depth)
                        );
                    }
                };

                measure();
                applyPositions();

                const onResize = () => {
                    measure();
                    applyPositions();
                };

                window.addEventListener("resize", onResize);

                const st = ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: (self) => {
                        visible = self.isActive;
                    },
                    onUpdate: (self) => {
                        vel = self.getVelocity();
                    },
                });
                visible = st.isActive;

                const onEnter = (e) => {
                    if (e.pointerType === "mouse") {
                        isHovered = true;
                    }
                };

                const onLeave = () => {
                    isHovered = false;
                };

                stage.addEventListener("pointerenter", onEnter);
                stage.addEventListener("pointerleave", onLeave);

                // Touch screens: scroll-speed boost is capped lower
                const isTouch = window.matchMedia("(pointer: coarse)").matches;
                const maxBoost = isTouch ? MAX_SCROLL_BOOST * 0.6 : MAX_SCROLL_BOOST;

                const tick = (time, deltaTime) => {
                    // Nothing to animate while the section is off-screen
                    if (!visible) return;

                    // Frame-rate independent: 1 = one 60fps frame
                    const dt = Math.min(deltaTime, 64) / 16.667;

                    const boost = gsap.utils.clamp(
                        0,
                        maxBoost,
                        Math.abs(vel) / 400
                    );

                    const targetSpeed = isHovered ? HOVER_SPEED : BASE_SPEED + boost;

                    // Smooth ease toward the target speed
                    currentSpeed +=
                        (targetSpeed - currentSpeed) * (1 - Math.pow(1 - 0.08, dt));

                    xPos -= currentSpeed * dt;

                    if (xPos <= -repeatWidth) {
                        xPos += repeatWidth;
                    }

                    setTrackX(xPos);

                    elapsed += (WAVE_BASE_RATE + currentSpeed * WAVE_SPEED_RATE) * dt;

                    applyPositions();

                    vel *= Math.pow(0.92, dt);
                };

                gsap.ticker.add(tick);

                return () => {
                    gsap.ticker.remove(tick);
                    window.removeEventListener("resize", onResize);

                    stage.removeEventListener("pointerenter", onEnter);
                    stage.removeEventListener("pointerleave", onLeave);

                    st.kill();
                };
            });

            /* REDUCED MOTION */

            mm.add("(prefers-reduced-motion: reduce)", () => {
                const discs = gsap.utils.toArray(".wave-disc", track);

                const stepWidth = 100;
                const wavelength = 850;
                const amplitude = 35;

                discs.forEach((disc, i) => {
                    const phase =
                        (i * stepWidth / wavelength) * Math.PI * 2;

                    gsap.set(disc, {
                        y: Math.sin(phase) * amplitude,
                    });
                });
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="technologies"
            aria-label="Technologies and Tooling"
            className="relative mt-3 w-full select-none overflow-hidden rounded-xl bg-white py-12 font-['Outfit',sans-serif] text-black sm:py-16 md:py-20"
        >
            {/* HEADING */}

            <div className="tech-head relative z-30 mx-auto max-w-3xl px-4 text-center sm:px-8">
                {/* <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff5a1f] sm:text-xs">
                    (Our stack)
                </p> */}
                <h2 className="mt-2 text-balance text-[clamp(1.9rem,7vw,3.5rem)] font-semibold lowercase leading-[.95] tracking-[-0.05em] sm:mt-3">
                    tools we build with
                    <span className="text-[#ff5a1f]">.</span>
                </h2>
            </div>

            {/* EDGE FADES */}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28 md:w-40" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28 md:w-40" />

            {/* WAVING TRACK */}

            <div
                ref={stageRef}
                className="relative mt-2 flex h-[220px] w-full items-center overflow-visible sm:mt-4 sm:h-[260px] md:h-[300px]"
            >
                <div
                    ref={trackRef}
                    className="flex shrink-0 will-change-transform"
                >
                    {TRACK_ITEMS.map((item, index) => (
                        <WaveDisc
                            key={`${item.id}-${index}`}
                            item={item}
                            // Only the first copy is exposed to screen readers
                            decorative={index >= ITEMS.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}