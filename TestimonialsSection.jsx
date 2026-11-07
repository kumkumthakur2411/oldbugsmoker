"use client";

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex P.",
    quote:
      "Por lejos el mejor servicio que me salvó la vida mental y física. Ya no hay forma de volver a quien era.",
    avatar: "/testimonials/alex.jpg",
  },
  {
    id: "2",
    name: "Camila M.",
    quote:
      "No solo es un espacio o servicio con un grupo de amigos con los que ahora no paro de hacer planes. Con su hogar en las clases.",
    avatar: "/testimonials/camila.jpg",
  },
  {
    id: "3",
    name: "Esteban G.",
    quote:
      "Lo que más destaco es la calidad de la gente, verdaderamente se siente como una familia. Mi proceso ha sido increíble en cada etapa.",
    avatar: "/testimonials/esteban.jpg",
  },
  {
    id: "4",
    name: "Sofia R.",
    quote:
      "Una experiencia que supera cualquier expectativa. La dedicación, el cuidado en cada detalle y la vibra hacen que cada día cuente.",
    avatar: "/testimonials/sofia.jpg",
  },
  {
    id: "5",
    name: "Mateo V.",
    quote:
      "BugSmoker turned our loose vision into an unforgettable brand world. Every detail has bite, character, and pure creative clarity.",
    avatar: "/testimonials/mateo.jpg",
  },
  {
    id: "6",
    name: "Nisha K.",
    quote:
      "Working with them felt like adding an electric extra brain to our team. Fast, thoughtful, and always pushing the work somewhere more interesting.",
    avatar: "/testimonials/alex.jpg",
  },
];

const TOTAL = TESTIMONIALS.length;

/* Cards cycle through white, black and orange */
const THEMES = [
  {
    card: "bg-white text-black",
    muted: "text-black/50",
    body: "text-neutral-800",
    idx: "text-[#ff5a1f]",
    ring: "border-black/15",
    mark: "text-black/[0.06] group-hover:text-[#ff5a1f]",
    bar: "bg-[#ff5a1f]",
  },
  {
    card: "bg-black text-white border border-white/10",
    muted: "text-white/50",
    body: "text-white/85",
    idx: "text-[#ff5a1f]",
    ring: "border-white/25",
    mark: "text-white/[0.07] group-hover:text-[#ff5a1f]",
    bar: "bg-[#ff5a1f]",
  },
  {
    card: "bg-[#ff5a1f] text-black",
    muted: "text-black/60",
    body: "text-black/90",
    idx: "text-black",
    ring: "border-black/30",
    mark: "text-black/15 group-hover:text-black/30",
    bar: "bg-black",
  },
];

const pad = (n) => String(n).padStart(2, "0");

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
      <span className="mask-inner block">{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);

  /* true on desktop with motion allowed: the section pins and scrolls sideways.
     Starts false so server and client markup match; the layout effect sets it. */
  const [pinned, setPinned] = useState(false);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setProgress = (p) => {
      const clamped = Math.min(1, Math.max(0, p));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
      if (counterRef.current) {
        counterRef.current.textContent = pad(
          Math.min(TOTAL, Math.floor(clamped * TOTAL) + 1)
        );
      }
    };
    setProgress(0);

    let removeScrollListener = null;

    const ctx = gsap.context(() => {
      /* Heading entrance */
      if (!reduce) {
        gsap.from(".tm-line .mask-inner", {
          yPercent: 115,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root, start: "top 80%" },
        });
        gsap.from(".tm-fade", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
          scrollTrigger: { trigger: root, start: "top 80%" },
        });
      }

      if (pinned) {
        /* Desktop: pin the section and move the row sideways with scroll */
        const getDist = () =>
          Math.max(track.scrollWidth - root.clientWidth + 96, 0);

        const tween = gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top+=12",
            end: () => `+=${getDist() + 250}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });

        /* Cards scale and straighten as they enter from the right */
        gsap.utils.toArray(".tm-card-inner", track).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.2, scale: 0.9, rotate: 3 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                containerAnimation: tween,
                start: "left 98%",
                end: "left 62%",
                scrub: true,
              },
            }
          );
        });
      } else {
        /* Mobile and tablet: native swipe, progress follows scrollLeft */
        const onScroll = () => {
          const max = track.scrollWidth - track.clientWidth;
          setProgress(max > 0 ? track.scrollLeft / max : 0);
        };
        track.addEventListener("scroll", onScroll, { passive: true });
        removeScrollListener = () =>
          track.removeEventListener("scroll", onScroll);

        if (!reduce) {
          gsap.from(".tm-card-inner", {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: track, start: "top 85%" },
          });
        }
      }
    }, root);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(refreshTimer);
      if (removeScrollListener) removeScrollListener();
      ctx.revert();
    };
  }, [pinned]);

  const cardHeight = pinned
    ? "h-[min(62svh,520px)]"
    : "min-h-[380px] sm:min-h-[400px]";

  return (
    <section
      ref={rootRef}
      id="testimonials"
      style={{ zIndex: 30 }}
      className={`relative z-30 mt-3 w-full select-none overflow-hidden rounded-xl border border-white/10 bg-neutral-900 text-white ${
        pinned ? "flex h-[calc(100svh-1.5rem)] flex-col" : ""
      }`}
    >
      <div className={pinned ? "flex min-h-0 flex-1 items-center" : ""}>
        <div
          ref={trackRef}
          className={
            pinned
              ? "flex w-max items-center gap-6 px-12 will-change-transform"
              : "flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-10 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:px-8 sm:py-12 [&::-webkit-scrollbar]:hidden"
          }
          style={pinned ? undefined : { WebkitOverflowScrolling: "touch" }}
        >
          {/* ---------- Heading tile (first item in the row) ---------- */}
          <div
            className={`flex shrink-0 snap-start flex-col justify-between gap-8 ${cardHeight} ${
              pinned
                ? "w-[min(58vw,820px)] pr-10"
                : "w-[86vw] max-w-[520px] pr-2"
            }`}
          >
            <div className="tm-fade flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5a1f]" />
              <span className="t-label text-white/60">
                Testimonials // Voices &amp; experiences
              </span>
            </div>

            <h2 className="t-display lowercase">
              <span className="tm-line block">
                <MaskLine>good people.</MaskLine>
              </span>
              <span className="tm-line mt-[0.04em] block">
                <MaskLine>
                  <span className="text-white/35">real experiences</span>
                  <span className="text-[#ff5a1f]">.</span>
                </MaskLine>
              </span>
            </h2>

            <p className="tm-fade t-body max-w-xs text-white/60">
              Kind words from the founders and teams we&apos;ve built with.
            </p>
          </div>

          {/* ---------- Testimonial cards ---------- */}
          {TESTIMONIALS.map((item, i) => {
            const t = THEMES[i % THEMES.length];
            const stagger = pinned
              ? i % 2 === 0
                ? "-translate-y-4"
                : "translate-y-6"
              : "";

            return (
              <article
                key={item.id}
                className={`tm-card w-[80vw] max-w-[340px] shrink-0 snap-start sm:w-[380px] sm:max-w-none lg:w-[400px] ${stagger}`}
              >
                <div className="tm-card-inner">
                  <div
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-5 sm:p-7 md:p-8 ${cardHeight} ${t.card}`}
                  >
                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className={`t-label ${t.idx}`}>
                        ({pad(i + 1)})
                      </span>
                      <Quote
                        aria-hidden="true"
                        size={72}
                        strokeWidth={1.2}
                        className={`-mr-2 -mt-3 transition-colors duration-500 ${t.mark}`}
                      />
                    </div>

                    {/* Quote */}
                    <p className={`t-card-title relative z-10 my-6 ${t.body}`}>
                      “{item.quote}”
                    </p>

                    {/* Author */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div
                        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border bg-neutral-300 sm:h-12 sm:w-12 ${t.ring}`}
                      >
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          sizes="48px"
                          draggable={false}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="t-body truncate !font-semibold">
                          {item.name}
                        </p>
                        <p className={`t-label mt-0.5 ${t.muted}`}>
                          Client experience
                        </p>
                      </div>
                    </div>

                    {/* Hover accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full ${t.bar}`}
                    />
                  </div>
                </div>
              </article>
            );
          })}

          {/* ---------- End tile ---------- */}
          <div
            className={`flex w-[80vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-xl border border-white/15 p-5 sm:w-[380px] sm:max-w-none sm:p-7 md:p-8 lg:w-[400px] ${cardHeight}`}
          >
            <span className="t-label text-[#ff5a1f]">(Next)</span>

            <h3 className="t-title lowercase">
              your story
              <br />
              is next
              <span className="text-[#ff5a1f]">.</span>
            </h3>

            <Link
              href="/contactus"
              className="t-body group inline-flex w-fit items-center gap-3 !font-semibold"
            >
              <span>Start a project</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Progress bar ---------- */}
      <div className="tm-fade flex items-center gap-4 px-4 pb-5 pt-1 sm:gap-6 sm:px-8 sm:pb-6 lg:px-12">
        <p className="t-small shrink-0 tabular-nums">
          <span className="text-[#ff5a1f]">
            (<span ref={counterRef}>01</span>)
          </span>
          <span className="text-white/40"> / {pad(TOTAL)}</span>
        </p>

        <div className="relative h-[2px] flex-1 bg-white/15">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left bg-[#ff5a1f]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <span className="t-label shrink-0 text-white/50">
          {pinned ? "Scroll" : "Swipe"}
        </span>
      </div>
    </section>
  );
}
