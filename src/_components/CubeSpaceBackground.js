"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

export default function CubeSpaceBackground({
    bgImage = "/home/cube-bg.jpg",
    className = "",
}) {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [dimensions, setDimensions] = useState({ cols: 12, rows: 8 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            setIsMobile(mobile);
            if (mobile) {
                setDimensions({ cols: 6, rows: 9 });
            } else if (width < 1024) {
                setDimensions({ cols: 9, rows: 7 });
            } else {
                setDimensions({ cols: 12, rows: 8 });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Track scroll on desktop and mobile
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const sectionHeight = rect.height || 1;
            // Progress from 0 (at top of page) to 1 (scrolled through section)
            const progress = Math.min(
                Math.max(0, -rect.top / (sectionHeight * 0.7 || 1)),
                1
            );
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Generate grid cells with deterministic pseudo-random thresholds
    const cells = useMemo(() => {
        const list = [];
        const { cols, rows } = dimensions;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Deterministic pseudo-random seed between 0.05 and 0.85
                const hash = (c * 37 + r * 59 + (c ^ r) * 23) % 100;
                const threshold = 0.06 + (hash / 100) * 0.78;
                // Periodic wave delay for mobile auto animation
                const animDelay = ((c * 7 + r * 13) % 19) * 0.18;
                const animDuration = 3.2 + ((c + r) % 5) * 0.45;
                list.push({
                    id: `${r}-${c}`,
                    row: r,
                    col: c,
                    threshold,
                    animDelay,
                    animDuration,
                });
            }
        }
        return list;
    }, [dimensions]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden select-none ${className}`}
        >
            {/* Background Stage/Concert Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt="Hero Stage Atmosphere"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center brightness-95 contrast-105"
                />
                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Zero-Gap Cube Grid Overlay */}
            <div
                className="absolute inset-0 z-10 grid w-full h-full pointer-events-auto"
                style={{
                    gridTemplateColumns: `repeat(${dimensions.cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${dimensions.rows}, minmax(0, 1fr))`,
                }}
            >
                {cells.map((cell) => {
                    // On desktop: Dissolved when scroll reaches cell's threshold
                    const isDissolvedOnScroll = scrollProgress >= cell.threshold;

                    return (
                        <div
                            key={cell.id}
                            className={`relative w-full h-full transition-all duration-500 ease-out ${
                                isMobile
                                    ? "mobile-cube-auto"
                                    : isDissolvedOnScroll
                                    ? "opacity-0 scale-98 pointer-events-none"
                                    : "opacity-100 hover:opacity-0 hover:scale-95 cursor-pointer"
                            }`}
                            style={{
                                backgroundColor: "#c5c5c5",
                                ...(isMobile
                                    ? {
                                          animation: `cubeFade ${cell.animDuration}s infinite ease-in-out`,
                                          animationDelay: `${cell.animDelay}s`,
                                          // Scroll on mobile further dissolves cubes
                                          opacity: Math.max(
                                              0,
                                              1 - scrollProgress * 1.5
                                          ),
                                      }
                                    : {}),
                            }}
                        />
                    );
                })}
            </div>

            {/* Mobile Keyframe Animation */}
            <style jsx global>{`
                @keyframes cubeFade {
                    0%,
                    100% {
                        opacity: 0.95;
                    }
                    45% {
                        opacity: 0;
                    }
                    75% {
                        opacity: 0.95;
                    }
                }
            `}</style>
        </div>
    );
}
