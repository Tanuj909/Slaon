"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { salons } from "@/features/salons/data/salonsData";
import { getDetailOrDefault } from "@/features/salons/data/salonDetailData";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Star renderer ────────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <span className="text-[#C8A951]" style={{ fontSize: size, letterSpacing: 2 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

// ─── Days of week ─────────────────────────────────────────────────────────────
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SalonDetails({ params }) {
  const { slug } = use(params);
  const salon = salons.find((s) => s.slug === slug);

  // Lightbox
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const today = DAY_NAMES[new Date().getDay()];

  if (!salon) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center gap-4 font-[Jost,sans-serif]">
        <p className="text-[#7a7065] text-lg">Salon not found.</p>
        <Link href="/salons" className="text-[#C8A951] underline text-sm">← Back to all salons</Link>
      </div>
    );
  }

  const detail = getDetailOrDefault(slug, salon);
  const isOpen = true; // Could be computed from timings

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-[Jost,sans-serif] font-light">

      {/* ═══════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-end">
        {/* Image */}
        <img
          src={salon.image}
          alt={salon.name}
          className="absolute inset-0 w-full h-full object-cover scale-[1.04] animate-[heroZoom_8s_ease-out_forwards]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,28,28,0.82)] via-[rgba(28,28,28,0.38)] to-transparent" />

        {/* Back link */}
        <Link
          href="/salons"
          className="absolute top-6 left-8 flex items-center gap-2 text-white/70 text-[0.82rem] font-medium no-underline hover:text-white transition-colors z-10"
        >
          <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          All Salons
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-[6vw] pb-10 animate-[fadeUp_1.1s_0.3s_both]">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] tracking-[0.06em] font-medium uppercase bg-[#C8A951] text-[#1C1C1C]">
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
              Verified Salon
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] tracking-[0.06em] font-medium uppercase backdrop-blur-md border ${isOpen ? "bg-white/15 text-[#a3e8a3] border-[rgba(163,232,163,0.3)]" : "bg-white/15 text-[#f0a0a0] border-[rgba(240,160,160,0.3)]"}`}>
              <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5" /></svg>
              {isOpen ? "Open Now" : "Closed"}
            </span>
            {salon.badge && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] tracking-[0.06em] font-medium uppercase bg-[rgba(200,169,81,0.18)] text-[#C8A951] border border-[#C8A951]">
                {salon.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white leading-[1.05] tracking-[-0.01em] mb-3" style={{ fontSize: "clamp(32px,5vw,60px)" }}>
            {salon.name.includes(" ") ? (
              <>
                {salon.name.split(" ").slice(0, -1).join(" ")}<br />
                <em className="italic text-[#C8A951]">{salon.name.split(" ").slice(-1)[0]}</em>
              </>
            ) : (
              <em className="italic text-[#C8A951]">{salon.name}</em>
            )}
          </h1>

          <p className="text-[13px] text-white/72 max-w-[480px] mb-3 font-light">
            {detail.about.split(".")[0]}.
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2.5 mb-5">
            <Stars rating={salon.rating} size={16} />
            <span className="text-white/80 text-[13.5px]">{salon.rating} · {salon.reviews} reviews</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3.5 flex-wrap">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-[13px] font-medium tracking-[0.07em] uppercase transition-all duration-300 hover:bg-[#e0c477] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,169,81,0.35)]"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book Appointment
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-[13px] font-medium tracking-[0.07em] uppercase text-white border border-white/45 backdrop-blur-md transition-all duration-300 hover:bg-white/12 hover:border-white/80 hover:-translate-y-0.5"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. ABOUT / OVERVIEW
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Images */}
          <Reveal>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-[14px] overflow-hidden aspect-[4/5] shadow-[0_4px_32px_rgba(28,28,28,0.08)] transition-transform duration-[400ms] hover:scale-[1.02] mt-8">
                <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[14px] overflow-hidden aspect-[4/5] shadow-[0_4px_32px_rgba(28,28,28,0.08)] transition-transform duration-[400ms] hover:scale-[1.02]">
                <img src={detail.gallery[1] || salon.image} alt={salon.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2.5">About Us</span>
            <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15] mb-3" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
              An Experience<br /><em className="italic">Beyond Beauty</em>
            </h2>
            <div className="w-12 h-px bg-[#C8A951] mb-5" />
            <p className="text-[#7a7065] text-[13.5px] leading-[1.75] max-w-[540px] mb-5">
              {detail.about}
            </p>

            {/* Stats */}
            <div className="flex gap-5 flex-wrap mb-5">
              {[
                { num: salon.rating, label: "Avg Rating", extra: <Stars rating={salon.rating} size={12} /> },
                { num: salon.reviews, label: "Reviews" },
                { num: "10+", label: "Years" },
                { num: detail.staff.length * 3, label: "Experts" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="block font-[Cormorant_Garamond,Georgia,serif] font-light text-[26px] text-[#1C1C1C] leading-none">{s.num}</span>
                  {s.extra && <div className="my-0.5">{s.extra}</div>}
                  <div className="text-[11px] tracking-[0.1em] uppercase text-[#7a7065] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Verified badge */}
            <span className="inline-flex items-center gap-2 bg-[#f5edce] border border-[#C8A951] px-[18px] py-2 rounded-full text-[12px] text-[#8a6e1a] font-medium tracking-[0.05em]">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={2}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Verified & Certified Business
            </span>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. LOCATION
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14 bg-[#FDFAF6]" id="location">
        <Reveal>
          <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Find Us</span>
          <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15] mb-8" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
            Our Location
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
          <Reveal>
            <div className="bg-[#FDFAF6] rounded-[14px] p-7 shadow-[0_4px_32px_rgba(28,28,28,0.08)] border border-[rgba(200,169,81,0.18)] h-full flex flex-col">
              <div className="w-11 h-11 rounded-full bg-[#f5edce] flex items-center justify-center mb-5">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <strong className="block text-[12px] tracking-[0.06em] uppercase text-[#7a7065] font-medium font-[Jost] mb-2">Address</strong>
              <p className="text-[14px] leading-[1.7] text-[#1C1C1C] mb-5 flex-1">{salon.location}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.location)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#1C1C1C] text-[#C8A951] text-[13px] font-medium tracking-[0.07em] uppercase transition-all duration-300 hover:bg-[#2e2e2e] hover:-translate-y-0.5 hover:shadow-[0_4px_32px_rgba(28,28,28,0.08)] self-start"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-[14px] overflow-hidden shadow-[0_4px_32px_rgba(28,28,28,0.08)] min-h-[240px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14017.0!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(salon.location)}!5e0!3m2!1sen!2sin!4v1700000000000`}
                className="w-full min-h-[240px] block border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CONTACT
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14" id="contact">
        <Reveal>
          <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Get In Touch</span>
          <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15] mb-2" style={{ fontSize: "clamp(22px,3vw,36px)" }}>Contact Us</h2>
          <div className="w-12 h-px bg-[#C8A951] mb-8" />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <Reveal>
            <div className="bg-[#FDFAF6] rounded-[14px] p-6 border border-[rgba(200,169,81,0.18)] shadow-[0_4px_32px_rgba(28,28,28,0.08)] flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_48px_rgba(28,28,28,0.12)]">
              <div className="w-[52px] h-[52px] bg-[#1C1C1C] rounded-[14px] flex items-center justify-center">
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.65 3.27a2 2 0 0 1 1.81-2.18h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#7a7065] mb-1">Phone Number</div>
                <div className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[18px] text-[#1C1C1C]">{detail.phone}</div>
              </div>
              <a href={`tel:${detail.phone}`} className="self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#C8A951] text-[#1C1C1C] text-[12px] font-medium tracking-[0.07em] uppercase transition-all duration-300 hover:bg-[#e0c477] hover:-translate-y-0.5">
                Call Now
              </a>
            </div>
          </Reveal>
          {/* Email */}
          <Reveal delay={100}>
            <div className="bg-[#FDFAF6] rounded-[14px] p-6 border border-[rgba(200,169,81,0.18)] shadow-[0_4px_32px_rgba(28,28,28,0.08)] flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_48px_rgba(28,28,28,0.12)]">
              <div className="w-[52px] h-[52px] bg-[#1C1C1C] rounded-[14px] flex items-center justify-center">
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#7a7065] mb-1">Email Address</div>
                <div className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[18px] text-[#1C1C1C]">{detail.email}</div>
              </div>
              <a href={`mailto:${detail.email}`} className="self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[rgba(200,169,81,0.18)] text-[#1C1C1C] text-[12px] font-medium tracking-[0.07em] uppercase transition-all duration-300 hover:bg-[#f5edce] hover:border-[#C8A951]">
                Send Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. TIMINGS — dark section
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14 bg-[#1C1C1C]" id="hours">
        <Reveal>
          <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Opening Hours</span>
          <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-white leading-[1.15] mb-2" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
            We're Here For You
          </h2>
          <div className="w-10 h-px bg-[#C8A951] mb-3" />
          <p className="text-white/58 text-[13.5px] max-w-[480px] leading-[1.75] mb-8">
            Visit us any day of the week. Our team is dedicated to serving you with the finest care.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mb-10">
            {detail.timings.map((t) => {
              const isToday = t.day === today;
              const isClosed = !t.open;
              return (
                <div
                  key={t.day}
                  className={`flex items-center justify-between rounded-[14px] px-5 py-3.5 border transition-colors ${
                    isToday
                      ? "bg-[rgba(200,169,81,0.12)] border-[#C8A951]"
                      : "bg-white/5 border-white/10"
                  } ${isClosed ? "opacity-55" : ""}`}
                >
                  <span className={`font-medium text-[14px] font-[Jost] ${isToday ? "text-[#C8A951]" : "text-white/85"}`}>{t.day}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px] text-white/50">{isClosed ? "Closed" : `${t.open} – ${t.close}`}</span>
                    {isToday && <span className="text-[10px] tracking-[0.1em] uppercase bg-[#C8A951] text-[#1C1C1C] px-2.5 py-1 rounded-full font-semibold">Today</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <p className="text-[12px] tracking-[0.14em] uppercase text-[#C8A951] mb-3.5">Public Holidays — Closed</p>
            {["Diwali", "Holi", "Republic Day", "Independence Day"].map((h) => (
              <span key={h} className="inline-block bg-white/6 border border-white/10 text-white/50 rounded-full px-4 py-1.5 text-[13px] m-1">{h}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          6. SERVICES
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14 bg-[#FDFAF6]" id="services">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Our Expertise</span>
              <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15]" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
                Signature Services
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {detail.services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 100}>
              <div className="group relative bg-[#FDFAF6] rounded-[14px] p-5 border border-[rgba(200,169,81,0.18)] shadow-[0_4px_32px_rgba(28,28,28,0.08)] flex flex-col gap-2.5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_48px_rgba(28,28,28,0.12)] hover:border-[#C8A951] h-full">
                {/* Gold top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C8A951] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
                <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[18px] text-[#1C1C1C]">{s.name}</h3>
                <p className="text-[12.5px] text-[#7a7065] leading-[1.65] flex-1">{s.desc}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-[Cormorant_Garamond,Georgia,serif] font-medium text-[19px] text-[#1C1C1C]">
                    {s.price}
                    <span className="text-[12px] font-[Jost] text-[#7a7065] font-light"> starting</span>
                  </span>
                  {s.duration && (
                    <span className="flex items-center gap-1.5 text-[12px] text-[#9e9287]">
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {s.duration}
                    </span>
                  )}
                </div>
                <button className="self-start mt-1 px-[22px] py-2.5 rounded-lg bg-[#1C1C1C] text-[#C8A951] text-[11.5px] font-medium tracking-[0.07em] uppercase transition-all duration-300 hover:bg-[#2e2e2e] hover:shadow-[0_4px_32px_rgba(28,28,28,0.08)]">
                  Book
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. STAFF / ARTISANS
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14" id="team">
        <Reveal>
          <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Meet The Team</span>
          <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15] mb-2" style={{ fontSize: "clamp(22px,3vw,36px)" }}>
            Our Artisans
          </h2>
          <div className="w-10 h-px bg-[#C8A951] mb-3" />
          <p className="text-[#7a7065] text-[13.5px] max-w-[480px] leading-[1.75] mb-8">
            Each member of our team brings a unique mastery and passion that sets {salon.name} apart.
          </p>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-7">
          {detail.staff.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 100}>
              <div className="bg-[#FDFAF6] rounded-[14px] p-5 text-center border border-[rgba(200,169,81,0.18)] shadow-[0_4px_32px_rgba(28,28,28,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_48px_rgba(28,28,28,0.12)]">
                {/* Avatar */}
                <div className="w-[68px] h-[68px] rounded-full mx-auto mb-3 border-[3px] border-[#EDE8E0] shadow-[0_4px_16px_rgba(28,28,28,0.12)] bg-[#EDE8E0] flex items-center justify-center">
                  <span className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[22px] text-[#C8A951]">{m.initials}</span>
                </div>
                <h3 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[16px] text-[#1C1C1C] mb-1">{m.name}</h3>
                <p className="text-[12px] tracking-[0.1em] uppercase text-[#7a7065] mb-3">{m.role}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <Stars rating={m.rating} size={13} />
                  <span className="text-[13px] text-[#7a7065]">{m.rating.toFixed(1)}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. GALLERY
      ═══════════════════════════════════════════ */}
      <section className="px-[6vw] py-14 bg-[#FDFAF6]" id="gallery">
        <Reveal>
          <span className="block text-[11px] tracking-[0.2em] uppercase text-[#C8A951] font-medium mb-2">Portfolio</span>
          <h2 className="font-[Cormorant_Garamond,Georgia,serif] font-light text-[#1C1C1C] leading-[1.15] mb-2" style={{ fontSize: "clamp(22px,3vw,36px)" }}>Gallery</h2>
          <div className="w-10 h-px bg-[#C8A951] mb-3" />
          <p className="text-[#7a7065] text-[13.5px] max-w-[480px] leading-[1.75] mb-8">
            A glimpse into the transformations that define {salon.name}.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="columns-[3_280px] gap-3.5">
            {detail.gallery.map((url, i) => (
              <div
                key={i}
                className="group relative break-inside-avoid mb-3.5 rounded-[14px] overflow-hidden cursor-pointer shadow-[0_4px_32px_rgba(28,28,28,0.08)]"
                onClick={() => setLightboxSrc(url)}
              >
                <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                <div className="absolute inset-0 bg-[rgba(28,28,28,0)] group-hover:bg-[rgba(28,28,28,0.25)] transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100 transition-transform">⊕</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════ */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-[rgba(10,10,10,0.95)] z-[9999] flex items-center justify-center transition-opacity duration-350"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-7 text-white/60 text-[32px] bg-transparent border-none cursor-pointer hover:text-white transition-colors"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Gallery"
            className="max-w-[92vw] max-h-[88vh] rounded-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Keyframes via global style */}
      <style>{`
        @keyframes heroZoom { to { transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  );
}
