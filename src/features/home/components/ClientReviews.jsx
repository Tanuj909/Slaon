"use client";

import React, { useEffect, useRef, useState } from 'react';

const ClientReviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Regular Client",
            image: "https://images.unsplash.com/photo-1494790108777-2fdad95f6b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "Absolutely love this place! The signature haircut transformed my look completely. The stylist really listened to what I wanted and delivered beyond expectations. The ambiance is so relaxing too.",
            date: "March 2024"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "First-time Visitor",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "Came for a hot stone massage and left feeling like a new person. The therapist was professional and knew exactly where to focus. Already booked my next appointment!",
            date: "March 2024"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Bride",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "The bridal package was worth every penny! My entire bridal party felt like royalty. The makeup lasted all night and the hairstyles stayed perfect through dancing. Thank you!",
            date: "February 2024"
        },
        {
            id: 4,
            name: "David Williams",
            role: "Loyal Customer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "Best barber in town! Consistent quality every single time. The attention to detail and the hot towel treatment at the end is the perfect finishing touch.",
            date: "February 2024"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            role: "Spa Enthusiast",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 5,
            text: "The hydrating facial is absolutely divine! My skin hasn't glowed this much in years. The products they use smell amazing and feel so luxurious.",
            date: "January 2024"
        },
        {
            id: 6,
            name: "James Anderson",
            role: "Business Professional",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            rating: 4,
            text: "Great atmosphere and skilled staff. The manicure was precise and lasted weeks. Would highly recommend for anyone looking for quality grooming services.",
            date: "January 2024"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const [itemsVisible, setItemsVisible] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setItemsVisible(3);
            else if (window.innerWidth >= 768) setItemsVisible(2);
            else setItemsVisible(1);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isPaused) {
            startAutoplay();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, itemsVisible]); // Restart if paused state or visible items changes

    const startAutoplay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = reviews.length - itemsVisible;
                const nextIndex = prevIndex + 1;
                // Reset logic
                if (nextIndex > maxIndex) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setCurrentIndex(0);
                        setTimeout(() => {
                            setIsTransitioning(true);
                        }, 50);
                    }, 500); // Match transition duration
                    return nextIndex;
                }
                return nextIndex;
            });
        }, 5000);
    };

    const handlePrev = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startAutoplay();
        }

        setCurrentIndex((prevIndex) => {
            const maxIndex = reviews.length - itemsVisible;
            const nextIndex = prevIndex - 1;
            if (nextIndex < 0) {
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentIndex(maxIndex);
                    setTimeout(() => {
                        setIsTransitioning(true);
                    }, 50);
                }, 500);
                return -1; // Visual position before 0
            }
            return nextIndex;
        });
    };

    const handleNext = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startAutoplay();
        }

        setCurrentIndex((prevIndex) => {
            const maxIndex = reviews.length - itemsVisible;
            const nextIndex = prevIndex + 1;
            if (nextIndex > maxIndex) {
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrentIndex(0);
                    setTimeout(() => {
                        setIsTransitioning(true);
                    }, 50);
                }, 500);
                return nextIndex;
            }
            return nextIndex;
        });
    };

    const goToSlide = (index) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        startAutoplay();
        const maxIndex = reviews.length - itemsVisible;
        setCurrentIndex(Math.min(index, maxIndex));
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-primary' : 'text-gray-300'
                    }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-creamy/30 to-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-primary font-display font-semibold text-sm uppercase tracking-wider">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-earthy-brown font-display">
                        What Our Clients Say
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="text-plum/70 mt-6 max-w-2xl mx-auto font-display">
                        Don't just take our word for it - hear from our wonderful clients about their experiences
                    </p>
                </div>

                {/* Reviews Carousel */}
                <div
                    className="relative px-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-primary text-plum hover:text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-primary/10 -ml-4 md:-ml-8"
                        aria-label="Previous review"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-primary text-plum hover:text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-primary/10 -mr-4 md:-mr-8"
                        aria-label="Next review"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden -mx-4 p-4">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
                                transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
                            }}
                        >
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 px-4 transition-all duration-500
                    ${itemsVisible === 3 ? 'w-1/3' : itemsVisible === 2 ? 'w-1/2' : 'w-full'}
                  `}
                                >
                                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-primary/5 hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between group">
                                        <div>
                                            {/* Quote Icon */}
                                            <div className="text-primary/20 mb-6 group-hover:text-primary/40 transition-colors">
                                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                </svg>
                                            </div>

                                            {/* Rating Stars */}
                                            <div className="flex gap-1 mb-4">
                                                {renderStars(review.rating)}
                                            </div>

                                            {/* Review Text */}
                                            <p className="text-plum/80 text-base leading-relaxed mb-6 font-display line-clamp-4">
                                                "{review.text}"
                                            </p>
                                        </div>

                                        {/* Client Info */}
                                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-primary/5">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                                <img
                                                    src={review.image}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-earthy-brown text-sm">
                                                    {review.name}
                                                </h4>
                                                <p className="text-primary font-display text-xs">
                                                    {review.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientReviews;