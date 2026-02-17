import React from 'react';
import { Scissors, Camera, Share2, Globe, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-plum text-creamy pt-20 pb-10 px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-terracotta text-3xl">content_cut</span>
                            <span className="text-2xl font-extrabold tracking-tight">LUXE</span>
                        </div>
                        <p className="text-creamy/60 leading-relaxed">
                            Dedicated to the art of luxury grooming and holistic well-being. Redefining elegance since 2010.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-creamy/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm">camera_alt</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-creamy/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm">share</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-creamy/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-sm">public</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-creamy/60">
                            <li><a href="#" className="hover:text-terracotta transition-colors">Our Salons</a></li>
                            <li><a href="#" className="hover:text-terracotta transition-colors">Special Offers</a></li>
                            <li><a href="#" className="hover:text-terracotta transition-colors">Gift Cards</a></li>
                            <li><a href="#" className="hover:text-terracotta transition-colors">Meet the Team</a></li>
                            <li><a href="#" className="hover:text-terracotta transition-colors">Gallery</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Visit Us</h4>
                        <ul className="space-y-4 text-creamy/60">
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-terracotta">location_on</span>
                                <span>123 Elegance Blvd, Suite 100<br />Beverly Hills, CA 90210</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-terracotta">call</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="material-symbols-outlined text-terracotta">mail</span>
                                <span>appointments@luxesalon.com</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Stay Elegant</h4>
                        <p className="text-creamy/60 mb-4">Join our list for exclusive beauty tips and seasonal offers.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                className="bg-creamy/5 border-creamy/20 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary placeholder-creamy/30 text-creamy outline-none"
                                placeholder="Email Address"
                                type="email"
                            />
                            <button className="bg-primary text-creamy font-bold py-2 rounded-lg hover:brightness-110 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-creamy/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-creamy/40">
                    <p>© 2024 Luxe Salon & Spa. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-creamy transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-creamy transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
