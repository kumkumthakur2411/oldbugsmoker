"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Check, ChevronRight, Loader2 } from "lucide-react";

const ENDPOINT = "/api/contact";
const MESSAGE_MAX = 600;

// Put sunflower.png in your /public folder (or change this path)
const IMAGE_SRC = "/sunflower.png";

// Big faded word behind the image (like "PUMA" in the reference)
const WATERMARK = "BUGSMOKER";

const INITIAL_FORM = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

/* Flat soft-grey input with italic placeholder, like the reference */
const inputClass = (hasError) =>
    `block w-full rounded-md px-4 py-3.5 text-base text-black outline-none transition-all duration-300 placeholder:italic placeholder:text-black/45 focus:bg-white focus:ring-2 ${
        hasError
            ? "bg-red-50 ring-2 ring-red-500 focus:ring-red-500"
            : "bg-neutral-200/60 focus:ring-[#ff5a1f]"
    }`;

function FieldError({ id, children }) {
    if (!children) return null;
    return (
        <p id={id} role="alert" className="mt-1.5 text-xs text-red-600">
            {children}
        </p>
    );
}

export default function EnquiryForm({ isOpen, onClose }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState("");
    const firstFieldRef = useRef(null);

    /* Content rises in one piece after another once the popup has opened */
    const reveal = (i) => ({
        className: `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`,
        style: { transitionDelay: isOpen ? `${220 + i * 70}ms` : "0ms" },
    });

    /* Lock page scroll while open */
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    /* Close on Escape */
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    /* Focus the first field once the popup has slid in */
    useEffect(() => {
        if (!isOpen || status === "success") return;
        const t = setTimeout(() => firstFieldRef.current?.focus(), 600);
        return () => clearTimeout(t);
    }, [isOpen, status]);

    /* After closing from the success screen, return to a fresh form */
    useEffect(() => {
        if (isOpen || status !== "success") return;
        const t = setTimeout(() => {
            setStatus("idle");
            setForm(INITIAL_FORM);
            setErrors({});
        }, 700);
        return () => clearTimeout(t);
    }, [isOpen, status]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const errs = {};
        if (form.name.trim().length < 2) errs.name = "Please enter your name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
            errs.email = "Please enter a valid email address.";
        if (form.phone.trim()) {
            const digits = form.phone.replace(/\D/g, "");
            if (digits.length < 7 || digits.length > 15 || !/^[+\d\s().-]+$/.test(form.phone))
                errs.phone = "Please enter a valid phone number.";
        }
        if (form.message.trim().length < 5)
            errs.message = "Please tell us a little about your project.";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        const found = validate();
        setErrors(found);
        if (Object.keys(found).length) {
            const first = ["name", "email", "phone", "message"].find((k) => found[k]);
            document.getElementById(`enquiry-${first}`)?.focus();
            return;
        }

        setStatus("sending");
        setErrorMessage("");

        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    message: form.message.trim(),
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Failed to send your message.");
            }

            setStatus("success");
            setForm(INITIAL_FORM);
        } catch (err) {
            setStatus("error");
            setErrorMessage(err.message || "Something went wrong. Please try again.");
        }
    };

    const handleReset = () => {
        setStatus("idle");
        setForm(INITIAL_FORM);
        setErrors({});
        setErrorMessage("");
    };

    const sending = status === "sending";

    return (
        <div
            className={`fixed inset-0 z-50 transition-[visibility] duration-500 ${
                isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            aria-hidden={!isOpen}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Centered in the screen */}
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center p-3 sm:p-6">
                <div
                    className={`pointer-events-auto relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[880px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-neutral-100 font-['Outfit',sans-serif] text-black shadow-2xl shadow-black/40 transition-[translate,scale,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:block sm:max-h-[calc(100dvh-3rem)] ${
                        isOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-6 scale-95 opacity-0"
                    }`}
                >
                    {/* Close: plain bold X, top-right */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close enquiry form"
                        className="absolute right-3 top-3 z-30 flex h-11 w-11 cursor-pointer items-center justify-center text-black transition-colors duration-300 hover:text-[#ff5a1f] sm:right-4 sm:top-4"
                    >
                        <X size={22} strokeWidth={3} />
                    </button>

                    {/* ---------- Decoration: faded word + image ----------
                        Phones: a short strip above the form.
                        sm and up: fills the card behind the form. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none relative h-36 shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:h-auto"
                    >
                        {/* Giant faded word, top-left */}
                        <span className="absolute left-4 top-3 select-none whitespace-nowrap text-[3.6rem] font-extrabold uppercase leading-none tracking-[-0.04em] text-black/[0.06] sm:left-8 sm:top-8 sm:text-[6.2rem]">
                            {WATERMARK}
                        </span>

                        {/* Image, bottom-left (like the shoe in the reference) */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={IMAGE_SRC}
                            alt=""
                            draggable={false}
                            className={`absolute bottom-0 left-4 h-[78%] w-auto max-w-none select-none object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.2)] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:bottom-8 sm:left-10 sm:h-[52%] ${
                                isOpen
                                    ? "translate-y-0 scale-100 opacity-100"
                                    : "translate-y-8 scale-90 opacity-0"
                            }`}
                            style={{ transitionDelay: isOpen ? "250ms" : "0ms" }}
                        />
                    </div>

                    {/* ---------- Content: right side on desktop ---------- */}
                    <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:ml-[42%] sm:flex sm:max-h-[calc(100dvh-3rem)] sm:min-h-[min(580px,calc(100dvh-3rem))] sm:flex-col sm:justify-center sm:px-0 sm:py-12 sm:pr-10">
                        <div {...reveal(0)}>
                            <h2
                                id="enquiry-title"
                                className="text-[clamp(2.3rem,10vw,3.5rem)] font-extrabold leading-[.92] tracking-[-0.04em]"
                            >
                                say&apos; hello<span className="text-[#ff5a1f]">.</span>
                            </h2>
                            <p className="mt-2.5 text-sm leading-[1.6] text-black/80 sm:text-[15px]">
                                Tell us what you need and get a reply within{" "}
                                <strong className="font-bold text-black">24 hours</strong>.
                            </p>
                        </div>

                        {status === "success" ? (
                            <div role="status" className="py-6">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff5a1f] text-black">
                                    <Check size={26} strokeWidth={2.6} aria-hidden="true" />
                                </span>

                                <h3 className="mt-5 text-[clamp(1.8rem,7vw,2.3rem)] font-extrabold uppercase leading-[.95] tracking-[-0.04em]">
                                    message sent<span className="text-[#ff5a1f]">.</span>
                                </h3>
                                <p className="mt-2 max-w-xs text-sm leading-[1.7] text-black/70">
                                    Thank you! We&apos;ll get back to you within 24 hours.
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-black px-6 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#ff5a1f] hover:text-black"
                                    >
                                        Done
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="inline-flex min-h-11 cursor-pointer items-center text-sm text-black/60 underline-offset-4 transition-colors hover:text-[#ff5a1f] hover:underline"
                                    >
                                        Send another
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* Name */}
                                    <div {...reveal(1)}>
                                        <label htmlFor="enquiry-name" className="sr-only">
                                            Name
                                        </label>
                                        <input
                                            ref={firstFieldRef}
                                            id="enquiry-name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="your name"
                                            value={form.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
                                            className={inputClass(errors.name)}
                                        />
                                        <FieldError id="enquiry-name-error">{errors.name}</FieldError>
                                    </div>

                                    {/* Email */}
                                    <div {...reveal(2)}>
                                        <label htmlFor="enquiry-email" className="sr-only">
                                            Email
                                        </label>
                                        <input
                                            id="enquiry-email"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="email"
                                            placeholder="enter your email"
                                            value={form.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
                                            className={inputClass(errors.email)}
                                        />
                                        <FieldError id="enquiry-email-error">{errors.email}</FieldError>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div {...reveal(3)}>
                                    <label htmlFor="enquiry-phone" className="sr-only">
                                        Phone (optional)
                                    </label>
                                    <input
                                        id="enquiry-phone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        placeholder="phone number (optional)"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                                        className={inputClass(errors.phone)}
                                    />
                                    <FieldError id="enquiry-phone-error">{errors.phone}</FieldError>
                                </div>

                                {/* Message */}
                                <div {...reveal(4)}>
                                    <label htmlFor="enquiry-message" className="sr-only">
                                        Message
                                    </label>
                                    <textarea
                                        id="enquiry-message"
                                        rows={4}
                                        maxLength={MESSAGE_MAX}
                                        placeholder="tell us about your project…"
                                        value={form.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                                        className={`${inputClass(errors.message)} resize-none`}
                                    />
                                    <FieldError id="enquiry-message-error">{errors.message}</FieldError>
                                </div>

                                {/* Error banner */}
                                {errorMessage && (
                                    <p
                                        role="alert"
                                        className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                    >
                                        {errorMessage}
                                    </p>
                                )}

                                {/* Submit: bar with an attached arrow block, like the reference */}
                                <div {...reveal(5)}>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="group flex w-full cursor-pointer overflow-hidden rounded-md text-sm font-bold uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <span className="flex-1 bg-black px-4 py-4 text-left text-white transition-colors duration-300 group-hover:bg-neutral-800">
                                            {sending ? "Sending…" : "Send message"}
                                        </span>
                                        <span className="flex w-14 items-center justify-center bg-[#ff5a1f] text-black transition-colors duration-300 group-hover:bg-white">
                                            {sending ? (
                                                <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                                            ) : (
                                                <ChevronRight
                                                    size={22}
                                                    strokeWidth={3}
                                                    aria-hidden="true"
                                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                                />
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}