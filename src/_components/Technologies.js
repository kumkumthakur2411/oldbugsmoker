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
    SiFramer,
    SiFigma,
    SiGraphql,
    SiNodedotjs,
    SiPython,
    SiPostgresql,
    SiDocker,
    SiCloudflare,
    SiRedis,
    SiGo,
} from "react-icons/si";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Data (edit freely)                                                  */
/* ------------------------------------------------------------------ */

const ROWS = [
    {
        dir: "left",
        tiles: [
            { name: "Next.js", Icon: SiNextdotjs },
            { name: "React", Icon: SiReact },
            { name: "TypeScript", Icon: SiTypescript },
            { name: "Tailwind CSS", Icon: SiTailwindcss },
            { name: "Three.js", Icon: SiThreedotjs },
            { name: "Framer Motion", Icon: SiFramer },
            { name: "Figma", Icon: SiFigma },
            { name: "GraphQL", Icon: SiGraphql },
        ],
    },
    {
        dir: "right",
        tiles: [
            { name: "Node.js", Icon: SiNodedotjs },
            { name: "Python", Icon: SiPython },
            { name: "PostgreSQL", Icon: SiPostgresql },
            { name: "Docker", Icon: SiDocker },
            { name: "Cloudflare", Icon: SiCloudflare },
            { name: "Redis", Icon: SiRedis },
            { name: "Go", Icon: SiGo },
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Tile                                                                */
/* ------------------------------------------------------------------ */

function Tile({ tile, dark }) {
    const { Icon, name } = tile;

    return (
        <div
            className={`group relative mr-3 flex h-[96px] w-[180px] shrink-0 cursor-default items-center gap-3 rounded-xl px-4 transition-all duration-300 hover:scale-[1.03] hover:bg-[#ff5a1f] hover:text-black sm:mr-4 sm:h-[130px] sm:w-[260px] sm:gap-4 sm:px-6 ${
                dark
                    ? "bg-black text-white"
                    : "border border-black/10 bg-neutral-100 text-black"
            }`}
        >
            <Icon
                aria-hidden="true"
                className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 sm:h-11 sm:w-11"
            />
            <span className="min-w-0 truncate text-base font-semibold tracking-[-0.03em] sm:text-2xl">
                {name}
            </span>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Technologies() {
    const rootRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                /* Rows slide up when the section enters */
                gsap.from(".tech-row", {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: root, start: "top 85%" },
                });

                /* Opposite directions, faster with scroll speed, slow on hover */
                const rows = gsap.utils.toArray(".tech-row", root);
                let vel = 0;

                ScrollTrigger.create({
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        vel = self.getVelocity();
                    },
                });

                const loops = rows.map((row, i) => {
                    const track = row.querySelector(".tech-track");
                    const toRight = row.dataset.dir === "right";
                    const duration = 45 + i * 7;

                    const tl = toRight
                        ? gsap.fromTo(
                              track,
                              { xPercent: -50 },
                              { xPercent: 0, ease: "none", duration, repeat: -1 }
                          )
                        : gsap.to(track, {
                              xPercent: -50,
                              ease: "none",
                              duration,
                              repeat: -1,
                          });

                    const state = { tl, hovered: false };

                    const onEnter = (e) => {
                        if (e.pointerType === "mouse") state.hovered = true;
                    };
                    const onLeave = () => {
                        state.hovered = false;
                    };
                    row.addEventListener("pointerenter", onEnter);
                    row.addEventListener("pointerleave", onLeave);

                    state.off = () => {
                        row.removeEventListener("pointerenter", onEnter);
                        row.removeEventListener("pointerleave", onLeave);
                    };
                    return state;
                });

                const tick = () => {
                    const boost = gsap.utils.clamp(0, 6, Math.abs(vel) / 300);
                    loops.forEach((l) => {
                        const target = l.hovered ? 0.12 : 1 + boost;
                        const current = l.tl.timeScale();
                        l.tl.timeScale(current + (target - current) * 0.08);
                    });
                    vel *= 0.9;
                };
                gsap.ticker.add(tick);

                return () => {
                    gsap.ticker.remove(tick);
                    loops.forEach((l) => {
                        l.off();
                        l.tl.kill();
                    });
                };
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="technologies"
            aria-label="Technologies we work with"
            className="relative mt-3 w-full select-none overflow-hidden rounded-xl bg-white py-8 font-['Outfit',sans-serif] text-black sm:py-12 md:py-16"
        >
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-32 lg:w-44" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-32 lg:w-44" />

            <div className="flex flex-col gap-3 sm:gap-4">
                {ROWS.map((row, r) => {
                    /* Each half repeats the list so it always covers wide screens.
                       The track loops by exactly one half, so there is no jump. */
                    const half = [...row.tiles, ...row.tiles];

                    return (
                        <div
                            key={r}
                            data-dir={row.dir}
                            className="tech-row overflow-hidden motion-reduce:overflow-x-auto"
                        >
                            <div className="tech-track flex w-max will-change-transform">
                                {[0, 1].map((copy) => (
                                    <div
                                        key={copy}
                                        className="flex shrink-0"
                                        aria-hidden={copy === 1}
                                    >
                                        {half.map((tile, i) => (
                                            <Tile
                                                key={`${r}-${copy}-${i}`}
                                                tile={tile}
                                                dark={(i + r) % 2 === 0}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}