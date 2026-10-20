"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex P.",
    quote:
      "Por lejos el mejor servicio que me salvó la vida mental y física. Ya no hay forma de volver a quien era.",
    avatar: "/testimonials/alex.jpg",
    heightClass: "h-[300px] sm:h-[320px] md:h-[340px]",
  },
  {
    id: "2",
    name: "Camila M.",
    quote:
      "No solo es un espacio o servicio con un grupo de amigos con los que ahora no paro de hacer planes. Con su hogar en las clases.",
    avatar: "/testimonials/camila.jpg",
    heightClass: "h-[210px] sm:h-[225px] md:h-[240px]",
  },
  {
    id: "3",
    name: "Esteban G.",
    quote:
      "Lo que más destaco es la calidad de la gente, verdaderamente se siente como una familia. Mi proceso ha sido increíble en cada etapa.",
    avatar: "/testimonials/esteban.jpg",
    heightClass: "h-[295px] sm:h-[315px] md:h-[335px]",
  },
  {
    id: "4",
    name: "Sofia R.",
    quote:
      "Una experiencia que supera cualquier expectativa. La dedicación, el cuidado en cada detalle y la vibra hacen que cada día cuente.",
    avatar: "/testimonials/sofia.jpg",
    heightClass: "h-[215px] sm:h-[230px] md:h-[245px]",
  },
  {
    id: "5",
    name: "Mateo V.",
    quote:
      "BugSmoker turned our loose vision into an unforgettable brand world. Every detail has bite, character, and pure creative clarity.",
    avatar: "/testimonials/mateo.jpg",
    heightClass: "h-[310px] sm:h-[330px] md:h-[350px]",
  },
  {
    id: "6",
    name: "Nisha K.",
    quote:
      "Working with them felt like adding an electric extra brain to our team. Fast, thoughtful, and always pushing the work somewhere more interesting.",
    avatar: "/testimonials/alex.jpg",
    heightClass: "h-[220px] sm:h-[235px] md:h-[250px]",
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.offsetWidth || 380;
    const scrollAmount = (cardWidth + 24) * direction;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative w-full bg-white text-[#1a1a1a] py-16 sm:py-24 md:py-28 overflow-hidden select-none">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">

        {/* Header with Title and subtle Navigation buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-['Outfit'] text-[28px] xs:text-[34px] sm:text-[40px] md:text-[46px] lg:text-[50px] font-semibold text-[#181818] tracking-[-0.03em] leading-[1.12]">
            Opiniones reales de
            <br />
            quienes ya lo viven
          </h2>

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2.5 pb-1">
            <button
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous testimonials"
              className={`w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-all duration-200 ${canScrollLeft
                ? "text-black/80 hover:bg-[#181818] hover:text-white hover:border-[#181818] active:scale-95 cursor-pointer"
                : "text-black/20 border-black/10 cursor-not-allowed opacity-40"
                }`}
            >
              <ChevronLeft size={18} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
              aria-label="Next testimonials"
              className={`w-10 h-10 rounded-full border border-black/15 flex items-center justify-center transition-all duration-200 ${canScrollRight
                ? "text-black/80 hover:bg-[#181818] hover:text-white hover:border-[#181818] active:scale-95 cursor-pointer"
                : "text-black/20 border-black/10 cursor-not-allowed opacity-40"
                }`}
            >
              <ChevronRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Carousel / Cards Track */}
        {/* Negative right margin allows the peek effect where cards extend gracefully to the edge */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex items-end gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-none pb-4 pt-8 -mr-6 sm:-mr-10 md:-mr-14 lg:-mr-16 pr-6 sm:pr-10 md:pr-14 lg:pr-16 ${isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab"
            }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className={`group relative flex-shrink-0 w-[290px] xs:w-[330px] sm:w-[370px] md:w-[400px] lg:w-[415px] ${item.heightClass} bg-[#736e4e] rounded-[4px] sm:rounded-[6px] p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.06)]`}
            >
              {/* Top Section: Avatar on left + Quote on right */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                {/* Circular Avatar */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-white/20 bg-neutral-800 shadow-sm">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover object-center grayscale contrast-110"
                  />
                </div>

                {/* Testimonial Quote */}
                <p className="font-['Outfit'] sm:font-['Inter'] text-[13px] sm:text-[14px] md:text-[14.5px] leading-[1.48] sm:leading-[1.5] text-[#edebe3] font-normal tracking-[-0.01em]">
                  {item.quote}
                </p>
              </div>

              {/* Bottom Section: Author Name */}
              <div className="pt-4">
                <span className="font-['Outfit'] text-[13px] sm:text-[14px] font-medium tracking-tight text-[#e5e2d6]">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators / Dots */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-black/20"
            />
          ))}
        </div>

      </div>
    </section>
  );
}