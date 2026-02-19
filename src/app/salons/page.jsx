"use client";

import React, { useState } from "react";
import Link from "next/link";
import { salons, filters, badgeStyles } from "@/features/salons/data/salonsData";

// ─── Star Icon ────────────────────────────────────────────────────────────────
const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ─── Salon Card ───────────────────────────────────────────────────────────────
function SalonCard({ salon }) {
  const bc = salon.badge ? badgeStyles[salon.badge] : null;

  return (
    <Link
      href={`/salons/${salon.slug}`}
      className="group block bg-white rounded-[20px] overflow-hidden border border-[#3c143212] cursor-pointer shadow-[0_2px_16px_rgba(60,20,50,0.06)] no-underline"
    >
      {/* ── Image ── */}
      <div className="relative h-[210px] overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(30,10,25,0.45)]" />

        {/* Badge */}
        {salon.badge && bc && (
          <span className={`absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px] border font-[DM_Sans] ${bc.bg} ${bc.text} ${bc.border}`}>
            {salon.badge}
          </span>
        )}

        {/* Price */}
        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px] bg-[rgba(253,246,240,0.92)] text-[#7a4020] font-[DM_Sans]">
          {salon.price}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-[22px_22px_20px]">
        <h3 className="text-[1.25rem] font-bold leading-[1.2] mb-1 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif]">
          {salon.name}
        </h3>

        <div className="flex items-center gap-1 text-[0.78rem] mb-3 text-[#3c143280] font-[DM_Sans]">
          <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {salon.location}
        </div>

        {/* Divider */}
        <div className="h-px mb-3.5 bg-[#3c143212]" />

        <p className="text-[0.78rem] font-normal mb-3.5 text-[#3c14328c] font-[DM_Sans]">
          {salon.category}
        </p>

        {/* Tags */}
        {salon.tags && (
          <div className="flex gap-1.5 flex-wrap mb-4">
            {salon.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.68rem] font-medium px-2.5 py-[3px] rounded-full border bg-[#9b587614] text-[#7a2860] border-[#9b587826] font-[DM_Sans]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= Math.round(salon.rating)} />
              ))}
            </div>
            <span className="text-[0.82rem] font-semibold text-[#1e0a18] font-[DM_Sans]">
              {salon.rating}
            </span>
            <span className="text-[0.72rem] text-[#3c143266] font-[DM_Sans]">
              ({salon.reviews})
            </span>
          </div>

          {/* Book Now — acts as a visual button, click handled by the parent Link */}
          <span className="py-2 px-[18px] rounded-full border-[1.5px] border-[#3c14322e] text-[0.75rem] font-semibold text-[#3c1432] tracking-[0.04em] font-[DM_Sans] transition-all duration-[220ms] group-hover:bg-gradient-to-br group-hover:from-[#3c1432] group-hover:to-[#7a2860] group-hover:border-transparent group-hover:text-[#fdf6f0] group-hover:shadow-[0_4px_16px_rgba(60,20,50,0.22)]">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SalonList() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = salons.filter((s) => {
    const matchFilter =
      activeFilter === "All" ||
      s.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      s.tags?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f5f2] font-[DM_Sans,sans-serif] mt-15">

      {/* ── Header ── */}
      <div className="max-w-[1280px] mx-auto px-12 pt-16">
        <div className="flex items-center justify-between flex-wrap gap-8 mb-9">

          {/* Title */}
          <div className="flex-1 min-w-[300px]">
            <h1 className="font-bold leading-[1.1] mb-2 text-[#1e0a18] font-[Cormorant_Garamond,Georgia,serif] text-[clamp(2rem,4vw,3rem)]">
              Discover Premium
              <span className="italic text-[#7a2860] block sm:inline sm:ml-2">
                Salons Near You
              </span>
            </h1>
            <p className="text-[0.9rem] leading-[1.65] max-w-[420px] text-[#3c143280] font-[DM_Sans]">
              Curated spaces where craft meets care — browse and book your next salon experience.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[380px] lg:w-[420px] self-center">
            <span className="absolute left-[15px] top-1/2 -translate-y-1/2 pointer-events-none text-[#3c143259]">
              <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="w-full py-[13px] pr-[18px] pl-[44px] rounded-full border-[1.5px] border-[#3c14321f] bg-white text-[#2a1020] text-[0.88rem] outline-none transition-[border-color,box-shadow] duration-[220ms] shadow-[0_2px_12px_rgba(60,20,50,0.06)] placeholder:text-[#3c143259] focus:border-[#9b587880] focus:shadow-[0_0_0_4px_rgba(155,88,118,0.08)] font-[DM_Sans]"
              type="text"
              placeholder="Search by name or area…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6 bg-[#3c143214]" />

        {/* ── Filters ── */}
        <div className="flex gap-2.5 flex-wrap mb-10 items-center">
          <span className="text-[0.78rem] mr-1 text-[#3c143266] font-[DM_Sans]">Filter:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`py-2 px-5 rounded-full border-[1.5px] text-[0.8rem] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap font-[DM_Sans] ${
                activeFilter === f
                  ? "bg-gradient-to-br from-[#3c1432] to-[#7a2860] border-transparent text-[#fdf6f0] shadow-[0_4px_16px_rgba(60,20,50,0.22)]"
                  : "bg-white border-[#3c14321f] text-[#3c143280] hover:border-[#9b587866] hover:text-[#7a2860]"
              }`}
            >
              {f}
            </button>
          ))}
          {filtered.length !== salons.length && (
            <span className="text-[0.78rem] ml-2 text-[#3c143266] font-[DM_Sans]">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-[1280px] mx-auto px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[#3c143266] font-[DM_Sans]">
              <svg width={40} height={40} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="mx-auto mb-4 opacity-30">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-base">No salons match your search.</p>
            </div>
          ) : (
            filtered.map((salon) => <SalonCard key={salon.id} salon={salon} />)
          )}
        </div>
      </div>
    </div>
  );
}