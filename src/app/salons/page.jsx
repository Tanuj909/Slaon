"use client";

import React, { useState } from 'react';

const salons = [
  {
    id: 1,
    name: "Lumineux Studio",
    location: "Hauz Khas, New Delhi",
    category: "Hair · Skin · Bridal",
    rating: 4.9,
    reviews: 312,
    price: "₹₹₹",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    tags: ["Bridal", "Organic"],
  },
  {
    id: 2,
    name: "Maison Blanche",
    location: "Khan Market, New Delhi",
    category: "Nails · Facials · Waxing",
    rating: 4.8,
    reviews: 218,
    price: "₹₹₹",
    badge: "Editor's Pick",
    image: "https://plus.unsplash.com/premium_photo-1661963320607-aebac6fcb40d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww",
    tags: ["Nail Art", "Premium"],
  },
  {
    id: 3,
    name: "Velvet & Co.",
    location: "Vasant Vihar, New Delhi",
    category: "Hair · Massage · Spa",
    rating: 4.7,
    reviews: 189,
    price: "₹₹",
    badge: null,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    tags: ["Spa", "Relaxation"],
  },
  {
    id: 4,
    name: "Aurelia Beauty",
    location: "Connaught Place, New Delhi",
    category: "Hair Color · Keratin · Cuts",
    rating: 4.9,
    reviews: 401,
    price: "₹₹₹",
    badge: "Most Booked",
    image: "https://plus.unsplash.com/premium_photo-1664048712891-f9b6b0c62369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww",
    tags: ["Color Specialist"],
  },
  {
    id: 5,
    name: "The Ritual Room",
    location: "Lajpat Nagar, New Delhi",
    category: "Ayurvedic · Body Wrap · Facial",
    rating: 4.6,
    reviews: 143,
    price: "₹₹",
    badge: null,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww",
    tags: ["Ayurvedic", "Holistic"],
  },
  {
    id: 6,
    name: "Plume & Petal",
    location: "Saket, New Delhi",
    category: "Lash · Brow · Skin",
    rating: 4.8,
    reviews: 276,
    price: "₹₹₹",
    badge: "New",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&auto=format&fit=crop&q=80",
    tags: ["Lash Extensions", "Brow Lamination"],
  },
  {
    id: 7,
    name: "Studio Saffron",
    location: "Greater Kailash, New Delhi",
    category: "Bridal · Makeup · Hair",
    rating: 4.7,
    reviews: 334,
    price: "₹₹₹",
    badge: null,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=80",
    tags: ["Bridal", "Makeup"],
  },
  {
    id: 8,
    name: "Aura & Co.",
    location: "Defence Colony, New Delhi",
    category: "Massage · Facial · Waxing",
    rating: 4.5,
    reviews: 97,
    price: "₹₹",
    badge: null,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80",
    tags: ["Affordable", "Walk-ins"],
  },
  {
    id: 9,
    name: "Gilded Leaf",
    location: "Mehrauli, New Delhi",
    category: "Hair · Nails · Spa",
    rating: 4.9,
    reviews: 521,
    price: "₹₹₹₹",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&auto=format&fit=crop&q=80",
    tags: ["Luxury", "Members Only"],
  },
];

const filters = ["All", "Hair", "Skin", "Nails", "Bridal", "Spa", "Massage"];

const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 20 20" fill={filled ? "#c4956a" : "#e0d0c8"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const badgeColors = {
  "Top Rated": { bg: "rgba(155,88,118,0.12)", color: "#7a2860", border: "rgba(155,88,118,0.2)" },
  "Editor's Pick": { bg: "rgba(196,149,106,0.12)", color: "#a0622a", border: "rgba(196,149,106,0.25)" },
  "Most Booked": { bg: "rgba(60,20,50,0.09)", color: "#3c1432", border: "rgba(60,20,50,0.15)" },
  "New": { bg: "rgba(80,160,120,0.1)", color: "#2a7a5a", border: "rgba(80,160,120,0.2)" },
  "Luxury": { bg: "rgba(196,149,106,0.15)", color: "#8a5020", border: "rgba(196,149,106,0.3)" },
};

export default function SalonList() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = salons.filter(s => {
    const matchFilter = activeFilter === "All" || s.category.toLowerCase().includes(activeFilter.toLowerCase()) || s.tags?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9f5f2] font-serif mt-15">
      {/* Scoped styles only for things Tailwind can't do in JSX: pseudo-elements, child selectors, hover gradients */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sl-search::placeholder { color: rgba(60,20,50,0.35); }
        .sl-search:focus { border-color: rgba(155,88,118,0.5); box-shadow: 0 0 0 4px rgba(155,88,118,0.08); }

        .sl-filter-active {
          background: linear-gradient(135deg, #3c1432, #7a2860);
          border-color: transparent;
          color: #fdf6f0;
          box-shadow: 0 4px 16px rgba(60,20,50,0.22);
        }
        .sl-filter-inactive:hover { border-color: rgba(155,88,118,0.4); color: #7a2860; }

        .sl-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(60,20,50,0.14); }
        .sl-card:hover .sl-img { transform: scale(1.06); }

        .sl-cta:hover {
          background: linear-gradient(135deg, #3c1432, #7a2860);
          border-color: transparent;
          color: #fdf6f0;
          box-shadow: 0 4px 16px rgba(60,20,50,0.22);
        }
      `}</style>

      {/* Header - Fixed Alignment */}
      <div className="max-w-[1280px] mx-auto px-12 pt-16">
        <div className="flex items-center justify-between flex-wrap gap-8 mb-9">
          {/* Left side - Title and subtitle */}
          <div className="flex-1 min-w-[300px]">
            <h1
              className="font-bold leading-[1.1] mb-2 text-[#1e0a18]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Discover Premium
              <span className="italic text-[#7a2860] block sm:inline sm:ml-2">Salons Near You</span>
            </h1>
            <p
              className="text-[0.9rem] leading-[1.65] max-w-[420px]"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.5)' }}
            >
              Curated spaces where craft meets care — browse and book your next salon experience.
            </p>
          </div>

          {/* Right side - Search bar - vertically centered with the heading */}
          <div className="relative w-full sm:w-[380px] lg:w-[420px] self-center">
            <span
              className="absolute left-[15px] top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'rgba(60,20,50,0.35)' }}
            >
              <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="sl-search w-full py-[13px] pr-[18px] pl-[44px] rounded-full border-[1.5px] bg-white text-[#2a1020] text-[0.88rem] outline-none transition-[border-color,box-shadow] duration-[220ms] shadow-[0_2px_12px_rgba(60,20,50,0.06)]"
              style={{ borderColor: 'rgba(60,20,50,0.12)', fontFamily: "'DM Sans', sans-serif" }}
              type="text"
              placeholder="Search by name or area…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-px mb-6" style={{ background: 'rgba(60,20,50,0.08)' }} />

        {/* Filters */}
        <div className="flex gap-2.5 flex-wrap mb-10 items-center">
          <span
            className="text-[0.78rem] mr-1"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.4)' }}
          >
            Filter:
          </span>
          {filters.map(f => (
            <button
              key={f}
              className={`py-2 px-5 rounded-full border-[1.5px] text-[0.8rem] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap ${activeFilter === f
                  ? 'sl-filter-active'
                  : 'sl-filter-inactive bg-white'
                }`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderColor: activeFilter === f ? 'transparent' : 'rgba(60,20,50,0.12)',
                color: activeFilter === f ? '#fdf6f0' : 'rgba(60,20,50,0.55)',
              }}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
          {filtered.length !== salons.length && (
            <span
              className="text-[0.78rem] ml-2"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.4)' }}
            >
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1280px] mx-auto px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.length === 0 ? (
            <div
              className="col-span-full text-center py-20"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.4)' }}
            >
              <svg width={40} height={40} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="mx-auto mb-4 opacity-30">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-base">No salons match your search.</p>
            </div>
          ) : filtered.map(salon => {
            const bc = salon.badge ? badgeColors[salon.badge] : null;
            return (
              <div
                key={salon.id}
                className="sl-card bg-white rounded-[20px] overflow-hidden border cursor-pointer transition-[transform,box-shadow] duration-[320ms] shadow-[0_2px_16px_rgba(60,20,50,0.06)]"
                style={{ borderColor: 'rgba(60,20,50,0.07)' }}
                onMouseEnter={() => setHoveredId(salon.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative h-[210px] overflow-hidden">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="sl-img w-full h-full object-cover transition-transform duration-[600ms]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(30,10,25,0.45) 100%)' }}
                  />

                  {/* Badge */}
                  {salon.badge && (
                    <div
                      className="absolute top-3.5 left-3.5 px-[11px] py-1 rounded-full text-[0.68rem] font-semibold tracking-[0.06em] backdrop-blur-[8px]"
                      style={{ background: bc.bg, color: bc.color, border: `1px solid ${bc.border}`, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {salon.badge}
                    </div>
                  )}

                  {/* Price */}
                  <div
                    className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold tracking-[0.04em] backdrop-blur-[8px]"
                    style={{ background: 'rgba(253,246,240,0.92)', color: '#7a4020', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {salon.price}
                  </div>
                </div>

                {/* Body */}
                <div className="p-[22px_22px_20px]">
                  <h3
                    className="text-[1.25rem] font-bold leading-[1.2] mb-1 text-[#1e0a18]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {salon.name}
                  </h3>

                  <div
                    className="flex items-center gap-1 text-[0.78rem] mb-3"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.48)' }}
                  >
                    <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {salon.location}
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-3.5" style={{ background: 'rgba(60,20,50,0.07)' }} />

                  <p
                    className="text-[0.78rem] font-normal mb-3.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.55)' }}
                  >
                    {salon.category}
                  </p>

                  {/* Tags */}
                  {salon.tags && (
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {salon.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[0.68rem] font-medium px-2.5 py-[3px] rounded-full border"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: 'rgba(155,88,118,0.08)',
                            color: '#7a2860',
                            borderColor: 'rgba(155,88,118,0.15)',
                          }}
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
                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(salon.rating)} />)}
                      </div>
                      <span
                        className="text-[0.82rem] font-semibold text-[#1e0a18]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {salon.rating}
                      </span>
                      <span
                        className="text-[0.72rem]"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(60,20,50,0.4)' }}
                      >
                        ({salon.reviews})
                      </span>
                    </div>
                    <button
                      className="sl-cta py-2 px-[18px] rounded-full border-[1.5px] bg-transparent text-[0.75rem] font-semibold text-[#3c1432] cursor-pointer transition-all duration-[220ms] tracking-[0.04em]"
                      style={{ fontFamily: "'DM Sans', sans-serif", borderColor: 'rgba(60,20,50,0.18)' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}