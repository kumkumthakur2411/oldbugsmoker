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
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Stops the mobile address bar showing/hiding from re-calculating every trigger
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Pin + sideways scroll only on wide AND tall enough screens, with motion allowed.
   Short laptop windows fall back to the swipe slider so nothing gets clipped. */
const PIN_QUERY =
  "(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";

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

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

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
     Starts false so server and first client render match; the layout effect
     below switches it on before the first paint. */
  const [pinned, setPinned] = useState(false);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
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
            y: 48,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: track, start: "top 88%", once: true },
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

  /* Arrow buttons for the slider (mouse users can't swipe) */
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".tm-card");
    const step = (card ? card.offsetWidth : 340) + 20;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* Cards: fixed height while pinned, equal height (stretch) in the slider */
  const cardHeight = pinned
    ? "h-[min(62svh,520px)]"
    : "min-h-[380px] sm:min-h-[420px]";

  return (
    <section
      ref={rootRef}
      id="testimonials"
      style={{ zIndex: 30 }}
      className={`relative z-30 mt-3 w-full select-none overflow-hidden rounded-xl border border-white/10 bg-neutral-900 font-['Outfit',sans-serif] text-white ${
        pinned ? "flex h-[calc(100svh-1.5rem)] flex-col" : ""
      }`}
    >
      <div className={pinned ? "flex min-h-0 flex-1 items-center" : ""}>
        <div
          ref={trackRef}
          className={
            pinned
              ? "flex w-max items-center gap-6 px-12 will-change-transform"
              : "flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto overscroll-x-contain px-4 py-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:scroll-pl-8 sm:gap-5 sm:px-8 sm:py-12 [&::-webkit-scrollbar]:hidden"
          }
          style={pinned ? undefined : { WebkitOverflowScrolling: "touch" }}
        >
          {/* ---------- Heading tile (first item in the row) ---------- */}
          <div
            className={`flex shrink-0 snap-start flex-col justify-between gap-6 sm:gap-8 ${cardHeight} ${
              pinned
                ? "w-[min(58vw,820px)] pr-10"
                : "w-[82vw] max-w-[520px] pr-2 sm:w-[70vw] md:w-[52vw]"
            }`}
          >
            <div className="tm-fade flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff5a1f]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.22em]">
                Testimonials // Voices &amp; experiences
              </span>
            </div>

            <h2 className="text-[clamp(2.3rem,11.5vw,3.4rem)] font-semibold lowercase leading-[.9] tracking-[-0.06em] sm:text-[clamp(3rem,6.5vw,7rem)] sm:leading-[.88] sm:tracking-[-0.07em]">
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

            <p className="tm-fade max-w-xs text-sm leading-[1.7] text-white/60 sm:leading-[1.8]">
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
                className={`tm-card flex w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[360px] sm:max-w-none lg:w-[400px] ${stagger}`}
              >
                <div className="tm-card-inner flex w-full">
                  <div
                    className={`group relative flex w-full flex-col justify-between overflow-hidden rounded-xl p-5 sm:p-7 md:p-8 ${cardHeight} ${t.card}`}
                  >
                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className={`font-mono text-xs sm:text-sm ${t.idx}`}>
                        ({pad(i + 1)})
                      </span>
                      <Quote
                        aria-hidden="true"
                        strokeWidth={1.2}
                        className={`-mr-2 -mt-3 h-14 w-14 transition-colors duration-500 sm:h-[72px] sm:w-[72px] ${t.mark}`}
                      />
                    </div>

                    {/* Quote */}
                    <p
                      className={`relative z-10 my-5 break-words text-[17px] font-medium leading-[1.35] tracking-[-0.03em] sm:my-6 sm:text-xl sm:leading-[1.3] lg:text-[22px] ${t.body}`}
                    >
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
                        <p className="truncate text-sm font-semibold sm:text-base">
                          {item.name}
                        </p>
                        <p
                          className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px] ${t.muted}`}
                        >
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
            className={`flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-xl border border-white/15 p-5 sm:w-[360px] sm:max-w-none sm:p-7 md:p-8 lg:w-[400px] ${cardHeight}`}
          >
            <span className="font-mono text-xs text-[#ff5a1f] sm:text-sm">
              (Next)
            </span>

            <h3 className="text-[clamp(2.2rem,10vw,3.2rem)] font-semibold lowercase leading-[.9] tracking-[-0.06em] sm:text-6xl">
              your story
              <br />
              is next
              <span className="text-[#ff5a1f]">.</span>
            </h3>

            <Link
              href="/contactus"
              className="group inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold"
            >
              <span>Start a project</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-white">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Progress bar + controls ---------- */}
      <div className="tm-fade flex items-center gap-3 px-4 pb-5 pt-1 sm:gap-6 sm:px-8 sm:pb-6 lg:px-12">
        <p className="shrink-0 font-mono text-xs tabular-nums sm:text-sm">
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

        {pinned ? (
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            Scroll
          </span>
        ) : (
          <>
            {/* Phones: swipe hint. sm and up: arrow buttons for mouse users */}
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 sm:hidden">
              Swipe
            </span>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-[#ff5a1f] hover:bg-[#ff5a1f] active:bg-[#ff5a1f]"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-[#ff5a1f] hover:bg-[#ff5a1f] active:bg-[#ff5a1f]"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}