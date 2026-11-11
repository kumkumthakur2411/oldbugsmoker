import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/*
  Custom 404 page (App Router: src/app/not-found.js).
  Needs /public/sunflower.png (same image as the enquiry popup).
*/

export const metadata = {
    title: "404 — Page Not Found | Bugsmoker",
    description: "The page you are looking for could not be found.",
};

const IMAGE_SRC = "/sunflower.png";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-neutral-100 px-5 pt-24 pb-16 font-['Outfit',sans-serif] text-black">
            <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
               

                {/* Faded 404 with the sunflower standing in front of it */}
                <div className="relative mt-4 flex h-[clamp(14rem,48vw,22rem)] w-full items-end justify-center">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 
                        select-none text-[clamp(9rem,38vw,21rem)] font-extrabold leading-none tracking-[-0.06em] text-black/[0.06]"
                    >
                        4<span classname="text-white">0</span>4
                    </span>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={IMAGE_SRC}
                        alt=""
                        draggable={false}
                        className="nf-sway relative z-10 h-[88%] w-auto select-none object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.2)]"
                    />
                </div>

                {/* Copy */}
                <h1
                    className="nf-rise mt-6 text-[clamp(2rem,8vw,3.4rem)] font-extrabold uppercase leading-[.95] tracking-[-0.04em]"
                    style={{ animationDelay: "120ms" }}
                >
                    this page wandered off<span className="text-[#ff5a1f]">.</span>
                </h1>
                <p
                    className="nf-rise mt-3 max-w-sm text-sm leading-[1.7] text-black/70 sm:text-[15px]"
                    style={{ animationDelay: "200ms" }}
                >
                    Looks like it went to chase the sun. Let&apos;s get you back to
                    somewhere familiar.
                </p>

                {/* Actions */}
                <div
                    className="nf-rise mt-7 flex flex-col items-center gap-x-6 gap-y-3 sm:flex-row"
                    style={{ animationDelay: "280ms" }}
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#ff5a1f] py-2 pl-6 pr-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                        Back to home
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-black">
                            <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
                        </span>
                    </Link>

                    <Link
                        href="/contact-us"
                        className="inline-flex min-h-11 items-center text-sm font-medium text-black/70 underline-offset-4 transition-colors duration-300 hover:text-[#ff5a1f] hover:underline"
                    >
                        or tell us what you were looking for
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes nf-sway {
                    0%, 100% { transform: rotate(-3deg); }
                    50% { transform: rotate(3deg); }
                }
                @keyframes nf-rise {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .nf-sway {
                    transform-origin: 50% 100%;
                    animation: nf-sway 4.5s ease-in-out infinite;
                }
                .nf-rise {
                    opacity: 0;
                    animation: nf-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @media (prefers-reduced-motion: reduce) {
                    .nf-sway { animation: none; }
                    .nf-rise { animation: none; opacity: 1; }
                }
            `}</style>
        </main>
    );
}
