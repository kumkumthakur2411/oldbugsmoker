
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex P.",
    quote:
      "Por lejos el mejor servicio que me salvó la vida mental y física. Ya no hay forma de volver a quien era.",
    avatar: "/testimonials/alex.jpg",
    heightClass: "h-[260px] sm:h-[320px] md:h-[340px]",
  },
  {
    id: "2",
    name: "Camila M.",
    quote:
      "No solo es un espacio o servicio con un grupo de amigos con los que ahora no paro de hacer planes. Con su hogar en las clases.",
    avatar: "/testimonials/camila.jpg",
    heightClass: "h-[190px] sm:h-[225px] md:h-[240px]",
  },
  {
    id: "3",
    name: "Esteban G.",
    quote:
      "Lo que más destaco es la calidad de la gente, verdaderamente se siente como una familia. Mi proceso ha sido increíble en cada etapa.",
    avatar: "/testimonials/esteban.jpg",
    heightClass: "h-[255px] sm:h-[315px] md:h-[335px]",
  },
  {
    id: "4",
    name: "Sofia R.",
    quote:
      "Una experiencia que supera cualquier expectativa. La dedicación, el cuidado en cada detalle y la vibra hacen que cada día cuente.",
    avatar: "/testimonials/sofia.jpg",
    heightClass: "h-[195px] sm:h-[230px] md:h-[245px]",
  },
  {
    id: "5",
    name: "Mateo V.",
    quote:
      "BugSmoker turned our loose vision into an unforgettable brand world. Every detail has bite, character, and pure creative clarity.",
    avatar: "/testimonials/mateo.jpg",
    heightClass: "h-[270px] sm:h-[330px] md:h-[350px]",
  },
  {
    id: "6",
    name: "Nisha K.",
    quote:
      "Working with them felt like adding an electric extra brain to our team. Fast, thoughtful, and always pushing the work somewhere more interesting.",
    avatar: "/testimonials/alex.jpg",
    heightClass: "h-[200px] sm:h-[235px] md:h-[250px]",
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    active: false,
  });

  const checkScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - 5
    );

    const center = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();

    const observer = new ResizeObserver(checkScroll);
    observer.observe(container);

    return () => observer.disconnect();
  }, [checkScroll]);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) return;

    const target =
      card.offsetLeft -
      (container.clientWidth - card.offsetWidth) / 2;

    container.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const scrollByAmount = (direction) => {
    const nextIndex = Math.max(
      0,
      Math.min(
        TESTIMONIALS.length - 1,
        activeIndex + direction
      )
    );

    scrollToCard(nextIndex);
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 || !scrollRef.current) return;

    dragRef.current = {
      startX: event.pageX,
      startScrollLeft: scrollRef.current.scrollLeft,
      moved: false,
      active: true,
    };

    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    const drag = dragRef.current;
    const container = scrollRef.current;

    if (!drag.active || !container) return;

    const distance = event.pageX - drag.startX;

    if (Math.abs(distance) > 4) {
      drag.moved = true;
    }

    if (drag.moved) {
      event.preventDefault();
      container.scrollLeft =
        drag.startScrollLeft - distance;
    }
  };

  const stopDragging = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-white text-[rgb(36,36,36)] font-['Outfit',sans-serif] pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10 md:pb-12 select-none"
    >
      <div className="relative z-10 w-full px-1 sm:px-2 lg:px-3">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 pb-4 sm:pb-6 mb-5 sm:mb-6 md:mb-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[rgb(36,36,36)]/60 font-semibold">
                TESTIMONIALS // VOICES &amp; EXPERIENCES
              </span>
            </div>
            <h2 className="font-['Outfit'] text-[clamp(1.8rem,7vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[rgb(36,36,36)]">
              Good people.
              <br />
              <span className="text-neutral-400">
                Real experiences.
              </span>
            </h2>
          </div>

          {/* Navigation Controls on Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (scrollRef.current) scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
              }}
              className="group inline-flex h-9 w-9 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-xs transition-all duration-200 hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => {
                if (scrollRef.current) scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
              }}
              className="group inline-flex h-9 w-9 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-xs transition-all duration-200 hover:border-[#ff5a1f] hover:bg-[#ff5a1f] hover:text-white active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* Staggered testimonial cards */}
      <div className="w-full relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onClickCapture={(event) => {
            if (dragRef.current.moved) {
              event.preventDefault();
              event.stopPropagation();
              dragRef.current.moved = false;
            }
          }}
          className={`flex items-end gap-3 sm:gap-5 md:gap-6 overflow-x-auto px-1 sm:px-2 lg:px-3 pt-2 pb-2 select-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`group relative flex w-[78vw] max-w-[310px] shrink-0 flex-col justify-between overflow-hidden rounded-[4px] bg-[#736e4e] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1.5 sm:w-[370px] sm:max-w-none sm:p-7 md:w-[400px] md:p-8 ${item.heightClass}`}
              style={{
                scrollSnapAlign: "start",
              }}
            >
              {/* Decorative quote */}
              <div className="pointer-events-none absolute -right-2 -top-4 opacity-[0.08]">
                <Quote
                  size={90}
                  strokeWidth={1.2}
                  className="text-white"
                />
              </div>

              {/* Avatar and quote */}
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3 sm:mb-6">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/30 bg-black/20 sm:h-11 sm:w-11">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="44px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div>
                    <p className="font-['Outfit'] text-sm font-semibold text-white sm:text-[15px]">
                      {item.name}
                    </p>

                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55 sm:text-[9px]">
                      Client experience
                    </p>
                  </div>
                </div>

                <p className="font-['Outfit'] text-[13px] leading-[1.6] tracking-[-0.01em] text-[#f3f0e7] sm:text-[15px] sm:leading-[1.7]">
                  “{item.quote}”
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ff5a1f] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
