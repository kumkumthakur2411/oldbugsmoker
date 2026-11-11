"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Settings (edit freely)                                              */
/* ------------------------------------------------------------------ */

// The form POSTs JSON here: { name, email, phone, service, message }
// Create this route (app/api/contact/route.js) or point it to your own backend.
const ENDPOINT = "/api/contact";

const EMAIL = "info@bugsmoker.com";
const PHONE = "+91 8791802003";
const PHONE_HREF = "tel:+91 8791802003";

const SERVICES = [
    "Website",
    "Mobile app",
    "Software",
    "Hosting & DevOps",
    "Tech support",
    "Something else",
];

const STEPS = [
    { n: "", title: "We read it", text: "Every message is read by a real person, not a bot." },
    { n: "", title: "Free discovery call", text: "A short chat to understand the problem and the goal." },
    { n: "", title: "Clear, fixed-scope quote", text: "Within 24 hours. No surprises, no hidden extras." },
];

const MESSAGE_MAX = 1000;

const EMPTY = { name: "", email: "", phone: "", service: "", message: "", company: "" };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/* Masked line: text slides up from behind its own edge */
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
            <span className="ct-mask block">{children}</span>
        </span>
    );
}

function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
        e.email = "Please enter a valid email address.";
    if (v.phone.trim()) {
        const digits = v.phone.replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15 || !/^[+\d\s().-]+$/.test(v.phone))
            e.phone = "Please enter a valid phone number.";
    }
    if (!v.service) e.service = "Please choose a service.";
    if (v.message.trim().length < 10)
        e.message = "Tell us a little more (at least 10 characters).";
    return e;
}

/* Underline field used for name / email / phone / message */
function Field({ id, index, label, optional, error, children }) {
    return (
        <div className="ct-field">
            <label
                htmlFor={id}
                className="flex items-baseline justify-between gap-3  text-[10px] font-semibold uppercase tracking-[0.2em] text-black/70 sm:text-xs sm:tracking-[0.22em]"
            >
                <span>
                     {label}
                </span>
                {optional && (
                    <span className="font-normal normal-case tracking-normal text-black/50">
                        optional
                    </span>
                )}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

const inputClass = (hasError) =>
    `mt-2 block w-full rounded-lg border bg-neutral-50 px-4 py-3 text-base text-black outline-none transition-all duration-300 placeholder:text-black/40 focus:border-[#ff5a1f] focus:bg-white focus:ring-4 focus:ring-[#ff5a1f]/15 ${
        hasError ? "border-red-500 bg-red-50/50" : "border-black/15"
    }`;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
    const rootRef = useRef(null);

    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    /* Entrance animation */
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".ct-mask", {
                    yPercent: 115,
                    duration: 1.1,
                    ease: "power4.out",
                    stagger: 0.12,
                });

                gsap.from(".ct-fade", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.25,
                });

                gsap.from(".ct-field, .ct-chips, .ct-submit", {
                    opacity: 0,
                    y: 28,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: ".ct-form", start: "top 85%", once: true },
                });
            });
        }, root);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, []);

    const setField = (name, value) => {
        setValues((v) => ({ ...v, [name]: value }));
        // Clear the error for a field as soon as the person edits it
        if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if (status === "sending") return;

        // Honeypot: bots fill this hidden field, people never see it
        if (values.company) {
            setStatus("success");
            return;
        }

        const found = validate(values);
        setErrors(found);

        if (Object.keys(found).length) {
            // Move focus to the first invalid field
            const first = ["name", "email", "phone", "service", "message"].find(
                (k) => found[k]
            );
            const el =
                first === "service"
                    ? document.getElementById("ct-service-group")
                    : document.getElementById(`ct-${first}`);
            el?.focus();
            return;
        }

        setStatus("sending");

        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name.trim(),
                    email: values.email.trim(),
                    phone: values.phone.trim(),
                    service: values.service,
                    message: values.message.trim(),
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            setStatus("success");
            setValues(EMPTY);
        } catch {
            setStatus("error");
        }
    };

    const sending = status === "sending";

    return (
        <main
            ref={rootRef}
            className="w-full px-2 pb-3 pt-20 font-['Outfit',sans-serif] sm:px-3 sm:pt-24"
        >
            {/* ================= White band: heading ================= */}
            <section className="overflow-hidden rounded-t-xl bg-white px-4 pb-8 pt-8 text-black sm:px-8 sm:pb-12 sm:pt-12 lg:px-12">
                {/* <div className="ct-fade flex items-center gap-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-70 motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60 sm:text-xs sm:tracking-[0.22em]">
                        Contact // Available for new projects
                    </span>
                </div> */}

                <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
                    <h1 className="text-[clamp(2.6rem,12vw,3.8rem)] font-semibold lowercase leading-[.9] tracking-[-0.06em] sm:text-[clamp(3.4rem,8vw,8rem)] sm:leading-[.88] sm:tracking-[-0.07em] lg:col-span-8">
                        <span className="block">
                            <MaskLine>got a project?</MaskLine>
                        </span>
                        <span className="mt-[0.04em] block">
                            <MaskLine>
                                <span className="text-black/35">let&apos;s talk</span>
                                <span className="text-[#ff5a1f]">.</span>
                            </MaskLine>
                        </span>
                    </h1>

                    <p className="ct-fade max-w-xs text-sm leading-[1.7] text-neutral-600 sm:leading-[1.8] lg:col-span-4 lg:justify-self-end lg:text-right">
                        Tell us what&apos;s holding your business back. We reply within 24
                        hours, with a clear, fixed-scope quote.
                    </p>
                </div>
            </section>

            {/* ================= Black band: info + form ================= */}
            <section className="overflow-hidden rounded-b-xl bg-black px-3 py-8 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* ---------- Left: contact info ---------- */}
                    <aside className="ct-fade px-1 sm:px-0 lg:col-span-4">
                       

                        <div className="mt-4 flex flex-col items-start gap-1">
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group inline-flex min-h-10 items-center gap-2 text-xl font-semibold tracking-[-0.03em] transition-colors duration-300 hover:text-[#ff5a1f] sm:text-2xl"
                            >
                                {EMAIL}
                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={2.2}
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:rotate-45"
                                />
                            </a>
                            <a
                                href={PHONE_HREF}
                                className="inline-flex min-h-10 items-center text-sm tracking-[0.08em] text-white/60 transition-colors duration-300 hover:text-[#ff5a1f]"
                            >
                                {PHONE}
                            </a>
                        </div>

                        <div className="mt-10 border-t border-white/15 pt-8 sm:mt-12">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5a1f] sm:text-xs sm:tracking-[0.22em]">
                                (What happens next)
                            </p>

                            <ol className="mt-5 flex flex-col gap-6">
                                {STEPS.map((s) => (
                                    <li key={s.n} className="flex gap-4">
                                        <span className="font-mono text-xs text-[#ff5a1f] sm:text-sm">
                                          .
                                        </span>
                                        <div>
                                            <p className="text-base font-semibold tracking-[-0.03em]">
                                                {s.title}
                                            </p>
                                            <p className="mt-1 text-sm leading-[1.7] text-white/60">
                                                {s.text}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </aside>

                    {/* ---------- Right: form ---------- */}
                    <div className="rounded-xl bg-white p-5 text-black sm:p-8 lg:col-span-8 lg:p-10">
                        {status === "success" ? (
                            <div
                                role="status"
                                className="flex min-h-[360px] flex-col items-start justify-center gap-6"
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5a1f] text-black">
                                    <Check size={26} strokeWidth={2.4} aria-hidden="true" />
                                </span>
                                <h2 className="text-[clamp(2rem,8vw,3.4rem)] font-semibold lowercase leading-[.92] tracking-[-0.06em]">
                                    message sent
                                    <span className="text-[#ff5a1f]">.</span>
                                </h2>
                                <p className="max-w-md text-sm leading-[1.7] text-black/70 sm:leading-[1.8]">
                                    Thank you! We&apos;ve got your message and will reply within 24
                                    hours.
                                </p>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <button
                                        type="button"
                                        onClick={() => setStatus("idle")}
                                        className="group inline-flex min-h-11 items-center gap-3 text-sm font-semibold"
                                    >
                                        <span>Send another message</span>
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-black">
                                            <ArrowUpRight size={18} strokeWidth={2.2} />
                                        </span>
                                    </button>
                                    <Link
                                        href="/"
                                        className="inline-flex min-h-11 items-center text-sm text-black/60 underline-offset-4 transition-colors hover:text-[#ff5a1f] hover:underline"
                                    >
                                        Back to home
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={onSubmit}
                                noValidate
                                className="ct-form grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-10 md:grid-cols-2"
                            >
                                {/* Name */}
                                <Field id="ct-name"  label="Your name" error={errors.name}>
                                    <input
                                        id="ct-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your name "
                                        value={values.name}
                                        onChange={(e) => setField("name", e.target.value)}
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? "ct-name-error" : undefined}
                                        className={inputClass(errors.name)}
                                    />
                                </Field>

                                {/* Email */}
                                <Field id="ct-email" label="Email" error={errors.email}>
                                    <input
                                        id="ct-email"
                                        name="email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={(e) => setField("email", e.target.value)}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "ct-email-error" : undefined}
                                        className={inputClass(errors.email)}
                                    />
                                </Field>

                                {/* Phone */}
                                <div className="md:col-span-2">
                                    <Field
                                        id="ct-phone"
                                        index="03"
                                        label="Phone number"
                                        optional
                                        error={errors.phone}
                                    >
                                        <input
                                            id="ct-phone"
                                            name="phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            placeholder="Enter your phone no. "
                                            value={values.phone}
                                            onChange={(e) => setField("phone", e.target.value)}
                                            aria-invalid={!!errors.phone}
                                            aria-describedby={errors.phone ? "ct-phone-error" : undefined}
                                            className={inputClass(errors.phone)}
                                        />
                                    </Field>
                                </div>

                                {/* Service type: single-choice chips */}
                                <div className="ct-chips md:col-span-2">
                                    <p
                                        id="ct-service-label"
                                        className=" text-[10px] font-semibold uppercase tracking-[0.2em] text-black/70 sm:text-xs sm:tracking-[0.22em]"
                                    >
                                        What do you need?
                                    </p>

                                    <div
                                        id="ct-service-group"
                                        role="radiogroup"
                                        aria-labelledby="ct-service-label"
                                        aria-invalid={!!errors.service}
                                        aria-describedby={errors.service ? "ct-service-error" : undefined}
                                        tabIndex={-1}
                                        className="mt-4 flex flex-wrap gap-2 outline-none sm:gap-3"
                                    >
                                        {SERVICES.map((s) => {
                                            const selected = values.service === s;
                                            return (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={selected}
                                                    onClick={() => setField("service", s)}
                                                    className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black sm:px-5 ${
                                                        selected
                                                            ? "border-[#ff5a1f] bg-[#ff5a1f] text-black"
                                                            : "border-black/20 bg-white text-black hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {errors.service && (
                                        <p
                                            id="ct-service-error"
                                            role="alert"
                                            className="mt-3 text-xs text-red-600"
                                        >
                                            {errors.service}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="md:col-span-2">
                                    <Field id="ct-message" index="05" label="Your message" error={errors.message}>
                                        <textarea
                                            id="ct-message"
                                            name="message"
                                            rows={5}
                                            maxLength={MESSAGE_MAX}
                                            placeholder="Tell us about your project, goals and timeline…"
                                            value={values.message}
                                            onChange={(e) => setField("message", e.target.value)}
                                            aria-invalid={!!errors.message}
                                            aria-describedby={errors.message ? "ct-message-error" : undefined}
                                            className={`${inputClass(errors.message)} resize-none`}
                                        />
                                       
                                    </Field>
                                </div>

                                {/* Honeypot (hidden from people, bots tend to fill it) */}
                                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                    <label htmlFor="ct-company">Company</label>
                                    <input
                                        id="ct-company"
                                        name="company"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={values.company}
                                        onChange={(e) => setField("company", e.target.value)}
                                    />
                                </div>

                                {/* Submit */}
                                <div className="ct-submit flex flex-col items-start gap-4 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#ff5a1f] py-2 pl-6 pr-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-start"
                                    >
                                        {sending ? "Sending…" : "Send message"}
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#ff5a1f] group-hover:text-black">
                                            <ArrowUpRight size={18} strokeWidth={2.2} />
                                        </span>
                                    </button>

                                    <p className="text-xs leading-[1.7] text-black/55 sm:max-w-[16rem] sm:text-right">
                                        By sending this you agree to be contacted about your
                                        project. We never share your details.
                                    </p>
                                </div>

                                {status === "error" && (
                                    <p
                                        role="alert"
                                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:col-span-2"
                                    >
                                        Something went wrong sending your message. Please try
                                        again, or email us at{" "}
                                        <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                                            {EMAIL}
                                        </a>
                                        .
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}