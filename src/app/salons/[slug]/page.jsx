"use client";

import Link from "next/link";
import { use } from "react";
import { salons, badgeStyles } from "@/features/salons/data/salonsData";

// ─── Star Icon ────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <svg width={15} height={15} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ─── Sample services per category keyword ────────────────────────────────────
const SERVICE_MENU = {
  Hair:     { label: "Hair Services",    items: [{ name: "Haircut & Style", price: "₹499" }, { name: "Balayage / Highlights", price: "₹2,499" }, { name: "Keratin Treatment", price: "₹3,999" }, { name: "Hair Spa", price: "₹999" }] },
  Skin:     { label: "Skin Services",    items: [{ name: "Deep Cleanse Facial", price: "₹1,299" }, { name: "Anti-Ageing Treatment", price: "₹2,499" }, { name: "Microdermabrasion", price: "₹1,799" }, { name: "Gold Facial", price: "₹1,499" }] },
  Bridal:   { label: "Bridal Services",  items: [{ name: "Bridal Makeup", price: "₹8,999" }, { name: "Pre-Bridal Package", price: "₹14,999" }, { name: "Engagement Look", price: "₹5,999" }, { name: "Mehendi Party Makeup", price: "₹3,499" }] },
  Nails:    { label: "Nail Services",    items: [{ name: "Gel Manicure", price: "₹799" }, { name: "Nail Art (per nail)", price: "₹150" }, { name: "Pedicure Spa", price: "₹999" }, { name: "Nail Extensions", price: "₹2,499" }] },
  Spa:      { label: "Spa Services",     items: [{ name: "Swedish Massage (60 min)", price: "₹1,999" }, { name: "Aromatherapy", price: "₹2,499" }, { name: "Body Scrub", price: "₹1,499" }, { name: "Hot Stone Therapy", price: "₹2,999" }] },
  Massage:  { label: "Massage Services", items: [{ name: "Deep Tissue Massage", price: "₹1,799" }, { name: "Head & Shoulder", price: "₹699" }, { name: "Foot Reflexology", price: "₹999" }, { name: "Couple Massage", price: "₹3,499" }] },
  Lash:     { label: "Lash & Brow",      items: [{ name: "Classic Lash Extensions", price: "₹1,799" }, { name: "Volume Lashes", price: "₹2,999" }, { name: "Brow Lamination", price: "₹1,299" }, { name: "Brow Tint & Shape", price: "₹699" }] },
  Makeup:   { label: "Makeup",           items: [{ name: "Party Makeup", price: "₹1,999" }, { name: "Editorial Look", price: "₹3,499" }, { name: "Natural Day Makeup", price: "₹999" }, { name: "Airbrush Makeup", price: "₹4,999" }] },
  Ayurvedic:{ label: "Ayurvedic Care",   items: [{ name: "Ayurvedic Facial", price: "₹1,299" }, { name: "Shirodhara", price: "₹2,499" }, { name: "Abhyanga Massage", price: "₹1,999" }, { name: "Herbal Body Wrap", price: "₹2,299" }] },
  Waxing:   { label: "Waxing",           items: [{ name: "Full Arms Wax", price: "₹399" }, { name: "Full Legs Wax", price: "₹599" }, { name: "Eyebrow Shaping", price: "₹149" }, { name: "Full Body Wax", price: "₹1,999" }] },
};

function getServices(category) {
  const keywords = Object.keys(SERVICE_MENU);
  const found = keywords.find((kw) => category.toLowerCase().includes(kw.toLowerCase()));
  return found ? SERVICE_MENU[found] : { label: "Our Services", items: [{ name: "Consultation", price: "Free" }, { name: "Custom Package", price: "On Request" }] };
}

// ─── Timing slots ─────────────────────────────────────────────────────────────
const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

export default function SalonDetails({ params }) {
  const { slug } = use(params);
  const salon = salons.find((s) => s.slug === slug);

  // 404 fallback
  if (!salon) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex flex-col items-center justify-center gap-4 font-[DM_Sans,sans-serif]">
        <p className="text-[#3c143266] text-lg">Salon not found.</p>
        <Link href="/salons" className="text-[#7a2860] underline text-sm">← Back to all salons</Link>
      </div>
    );
  }

  const bc = salon.badge ? badgeStyles[salon.badge] : null;
  const services = getServices(salon.category);

  return (
    <div className="min-h-screen bg-[#f9f5f2] font-[DM_Sans,sans-serif]">

      {/* ── Hero Image ── */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,10,25,0.25)] via-transparent to-[rgba(30,10,25,0.72)]" />

        {/* Back link */}
        <Link
          href="/salons"
          className="absolute top-6 left-8 flex items-center gap-2 text-white/80 text-[0.82rem] font-medium no-underline hover:text-white transition-colors"
        >
          <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Salons
        </Link>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 max-w-[1280px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              {salon.badge && bc && (
                <span className={`inline-block mb-3 px-3 py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] border backdrop-blur-[8px] font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}>
                  {salon.badge}
                </span>
              )}
              <h1 className="text-white font-bold leading-tight text-[clamp(2rem,5vw,3.2rem)] font-[Cormorant_Garamond,Georgia,serif] mb-1">
                {salon.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-white/80 text-[0.85rem]">
                  <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {salon.location}
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/80 text-[0.85rem]">{salon.category}</span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/80 text-[0.85rem] font-semibold">{salon.price}</span>
              </div>
            </div>

            {/* Rating chip */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled={i <= Math.round(salon.rating)} />)}
              </div>
              <span className="text-white font-bold text-[0.95rem]">{salon.rating}</span>
              <span className="text-white/60 text-[0.78rem]">({salon.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="max-w-[1280px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT: Info + Services ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Tags */}
          {salon.tags && (
            <div className="flex gap-2 flex-wrap">
              {salon.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.75rem] font-medium px-3 py-1.5 rounded-full border bg-[#9b587614] text-[#7a2860] border-[#9b587826]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* About */}
          <div className="bg-white rounded-2xl p-7 border border-[#3c143210] shadow-[0_2px_16px_rgba(60,20,50,0.05)]">
            <h2 className="text-[1.15rem] font-bold text-[#1e0a18] mb-3 font-[Cormorant_Garamond,Georgia,serif]">
              About {salon.name}
            </h2>
            <p className="text-[0.88rem] leading-[1.75] text-[#3c143280]">
              {salon.name} is one of New Delhi's most sought-after premium beauty destinations, nestled in the heart of {salon.location}.
              Known for exceptional craft and a warm, welcoming atmosphere, the salon specialises in {salon.category.toLowerCase()}.
              Every visit is tailored to leave you refreshed, confident, and glowing.
            </p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl p-7 border border-[#3c143210] shadow-[0_2px_16px_rgba(60,20,50,0.05)]">
            <h2 className="text-[1.15rem] font-bold text-[#1e0a18] mb-5 font-[Cormorant_Garamond,Georgia,serif]">
              {services.label}
            </h2>
            <div className="flex flex-col divide-y divide-[#3c143210]">
              {services.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-3.5">
                  <span className="text-[0.88rem] text-[#3c1432cc]">{item.name}</span>
                  <span className="text-[0.88rem] font-semibold text-[#7a2860]">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info cards row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🕙", label: "Hours", value: "10 AM – 7 PM" },
              { icon: "📞", label: "Contact", value: "+91 98765 43210" },
              { icon: "💳", label: "Payment", value: "Cards & UPI" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-[#3c143210] shadow-[0_2px_16px_rgba(60,20,50,0.05)] text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-[0.7rem] text-[#3c143260] uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-[0.82rem] font-semibold text-[#1e0a18]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Booking Panel ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-7 border border-[#3c143210] shadow-[0_2px_16px_rgba(60,20,50,0.05)] sticky top-24">
            <h2 className="text-[1.1rem] font-bold text-[#1e0a18] mb-1 font-[Cormorant_Garamond,Georgia,serif]">
              Book an Appointment
            </h2>
            <p className="text-[0.78rem] text-[#3c143260] mb-6">
              Choose your date and time below.
            </p>

            {/* Date */}
            <label className="block mb-1.5 text-[0.75rem] font-semibold text-[#3c143299] uppercase tracking-wider">
              Select Date
            </label>
            <input
              type="date"
              className="w-full mb-5 px-4 py-3 rounded-xl border border-[#3c14321f] bg-[#fdf9f7] text-[#1e0a18] text-[0.88rem] outline-none focus:border-[#9b578880] transition-colors"
              defaultValue={new Date().toISOString().split("T")[0]}
            />

            {/* Time slots */}
            <label className="block mb-3 text-[0.75rem] font-semibold text-[#3c143299] uppercase tracking-wider">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  className="py-2 px-1 rounded-xl border border-[#3c14321f] text-[0.72rem] font-medium text-[#3c1432aa] hover:border-[#7a2860] hover:text-[#7a2860] hover:bg-[#9b587608] transition-all duration-150 focus:bg-gradient-to-br focus:from-[#3c1432] focus:to-[#7a2860] focus:text-white focus:border-transparent"
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px mb-5 bg-[#3c143210]" />

            {/* Price summary */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[0.82rem] text-[#3c143270]">Starting from</span>
              <span className="text-[1.1rem] font-bold text-[#7a2860] font-[Cormorant_Garamond,Georgia,serif]">
                {services.items[0]?.price ?? "On Request"}
              </span>
            </div>

            {/* CTA */}
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#3c1432] to-[#7a2860] text-white text-[0.88rem] font-semibold tracking-[0.04em] shadow-[0_4px_20px_rgba(60,20,50,0.25)] hover:shadow-[0_6px_28px_rgba(60,20,50,0.35)] transition-shadow duration-200">
              Confirm Booking
            </button>

            <p className="text-center text-[0.72rem] text-[#3c143250] mt-3">
              Free cancellation up to 2 hours before
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
