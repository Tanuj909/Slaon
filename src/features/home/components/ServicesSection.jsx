"use client";

import React, { useState, useRef, useEffect } from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Signature Haircuts",
      description: "Precision styling tailored to your face shape and personal aesthetic.",
      image: "https://images.unsplash.com/photo-1553521041-d168abd31de3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D"
    },
    {
      title: "Luxury Skin Care",
      description: "Revitalizing facials and treatments using premium organic elixirs.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1IXVoviff2vw-vfbnEth3cRVJbetSWlpORQGs3h5LjLLD9H5OdOEei1FUdQTUx9HFAf_MxM0Lrgpda-Z_epKsSlJcRRIs7TB4H1V0C1r1lj0rJjgoot-9crr5L57tchCg-2Z4duk8w9AR97Qs-4NeiUD5JfFfoYyOwa2ZEHDqHI-8SJv56It59aYjrDxFqIsmUHwqPZkgz_qcsqDXuKvSoWfMhqqy8Vnavtk1btUXMAb_CqVj7tLvht43W98PU1-beQy4dfEZIRu9"
    },
    {
      title: "Artistic Manicures",
      description: "Custom nail art and therapeutic hand care for every occasion.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdblC_ad2bLjbNG1gzwDGiwBgnmnDTCAgGOKwuSqEUmyOYpGuolnD0WzzmcKtE1Em6Mcv7NtmPzmprSV80ruWKJ6GbHU7m-3K6zMc7I9oS8H1SLDb8rnZOSQlXxe4D_steWmcj_l9dTGc7byOoXU0WO3JtSqWXd1-bJ1vOAkxuhgyK4M9hCf05IeQi06ReZBzJImNKTCSEdXkPAK3lu_a0tOjMvhLWHXJE47-VY2FYGrVTw04JK6IqB2RSncxzG95UJtUq057UkIi5"
    },
    {
      title: "Bridal Packages",
      description: "Complete transformation services for your most special day.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwatrTnvnmq9fKbDCD54TxCGWmSdF8uG7JHsAv0tsf_y3mGeYufo8SXtIpO5SGh5ZdtVgEvAvpcofmIXhg8ePC2wo6M5VSUlq5LDaZDwcuFsbofUOH--p6xj8SwLQYhQHiGmOllpVgvnClOpKg14NyUI5yuRUD3iJPUSkg-SnqU2y0z1bsZbaP25NgGW7wYH5jmHzl_5tQmksd7ezywNc_n6PnQhu8DraI5qkvvtgaDvi3GdA0mqj-nYxXuwNKtpY9G7YxDel5-Br"
    },
    {
      title: "Color & Highlights",
      description: "Vibrant, long-lasting color treatments crafted by expert colorists.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop"
    },
    {
      title: "Deep Massage",
      description: "Tension-melting body therapy using aromatic botanical oils.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop"
    },
    {
      title: "Lash & Brow",
      description: "Frame your eyes with sculpted brows and voluminous lash extensions.",
      image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzaHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Spa Rituals",
      description: "Full-body wellness journeys blending ancient and modern techniques.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);

  const visibleCards = 4;
  const maxIndex = services.length - visibleCards;

  const goTo = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [maxIndex]);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);
  };

  // Drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset < -threshold) { goTo(currentIndex + 1); resetAutoPlay(); }
    else if (dragOffset > threshold) { goTo(currentIndex - 1); resetAutoPlay(); }
    setDragOffset(0);
  };

  const onTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    setDragOffset(e.touches[0].clientX - startX);
  };

  const onTouchEnd = () => {
    const threshold = 60;
    if (dragOffset < -threshold) { goTo(currentIndex + 1); resetAutoPlay(); }
    else if (dragOffset > threshold) { goTo(currentIndex - 1); resetAutoPlay(); }
    setDragOffset(0);
  };

  const translateX = `calc(-${currentIndex * (100 / visibleCards)}% + ${isDragging ? dragOffset : 0}px)`;

  return (
    <section style={{
      padding: '96px 24px',
      maxWidth: '1300px',
      margin: '0 auto',
      fontFamily: "'Georgia', serif",
    }}>
      <style>{`
        .service-card {
          flex: 0 0 calc(25% - 18px);
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          user-select: none;
        }
        .service-card:hover {
          box-shadow: 0 32px 60px rgba(80, 30, 60, 0.35);
        }
        .service-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .service-card:hover img {
          transform: scale(1.1);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(60, 20, 50, 0.92) 0%, rgba(60, 20, 50, 0.15) 55%, transparent 100%);
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        .service-card:hover .card-overlay {
          opacity: 0.95;
        }
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 28px;
          width: 100%;
        }
        .card-title {
          color: #fff8f2;
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 8px;
          transition: transform 0.3s ease;
        }
        .service-card:hover .card-title {
          transform: translateY(-6px);
        }
        .card-desc {
          color: rgba(255, 248, 242, 0.88);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .service-card:hover .card-desc {
          opacity: 1;
          transform: translateY(0);
        }
        .card-btn {
          background: transparent;
          border: 1.5px solid rgba(255, 248, 242, 0.7);
          color: #fff8f2;
          padding: 8px 22px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s, background 0.2s, color 0.2s;
          letter-spacing: 0.05em;
        }
        .service-card:hover .card-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .card-btn:hover {
          background: #fff8f2;
          color: #3c1432;
        }
        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(100, 40, 80, 0.4);
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(100,40,80,0.12);
        }
        .nav-btn:hover:not(:disabled) {
          background: #3c1432;
          border-color: #3c1432;
          transform: scale(1.08);
        }
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .nav-btn svg {
          transition: stroke 0.2s;
        }
        .nav-btn:hover:not(:disabled) svg {
          stroke: #fff;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(100, 40, 80, 0.25);
          cursor: pointer;
          transition: background 0.25s, transform 0.25s, width 0.25s;
          border: none;
        }
        .dot.active {
          background: #3c1432;
          width: 28px;
          border-radius: 4px;
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <p style={{ color: '#9b5876', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: "'Georgia', serif" }}>
          Crafted With Care
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#3c1432', margin: 0, lineHeight: 1.15, fontFamily: "'Georgia', serif" }}>
          Our Premium Services
        </h2>
        <div style={{ width: '64px', height: '3px', background: 'linear-gradient(90deg, #9b5876, #3c1432)', margin: '16px auto 0', borderRadius: '2px' }} />
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative' }}>
        {/* Track wrapper */}
        <div
          style={{ overflow: 'hidden', borderRadius: '4px', cursor: isDragging ? 'grabbing' : 'grab', paddingRight: '24px' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '24px',
              transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: `translateX(${translateX})`,
              willChange: 'transform',
            }}
          >
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.image} alt={service.title} draggable={false} />
                <div className="card-overlay" />
                <div className="card-content">
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                  <button className="card-btn">Explore</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className="nav-btn"
          onClick={() => { prev(); resetAutoPlay(); }}
          disabled={currentIndex === 0}
          style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3c1432" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="nav-btn"
          onClick={() => { next(); resetAutoPlay(); }}
          disabled={currentIndex === maxIndex}
          style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3c1432" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '36px' }}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => { goTo(i); resetAutoPlay(); }}
          />
        ))}
      </div> */}
    </section>
  );
};

export default ServicesSection;