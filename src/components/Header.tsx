"use client";

import { Phone } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header if:
            // 1. Scrolling UP (current < last)
            // 2. OR near top (current < 100)
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setHidden(false);
            }
            // Hide if scrolling DOWN and past threshold
            else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                setHidden(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial="visible"
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-white/90 backdrop-blur-xl shadow-sm"
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg relative">
                        <Image
                            src="/Logo.jpg"
                            alt="Calefones Loja Logo"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-brand-dark font-black text-lg sm:text-xl leading-none tracking-tighter">
                            CALEFONES <span className="text-brand-blue">LOJA</span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
                            Venta y Reparación
                        </span>
                    </div>
                </div>

                {/* Simplified CTA Only Header */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => {
                            const contactSection = document.getElementById('contacto');
                            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-brand-red hover:bg-red-700 text-white font-black py-3 px-4 sm:px-8 rounded-xl shadow-xl shadow-brand-red/10 flex items-center space-x-3 transition-all transform hover:scale-105 active:scale-95 text-[10px] sm:text-xs uppercase tracking-widest shrink-0"
                    >
                        <Phone size={16} />
                        <span>Contáctanos</span>
                    </button>
                </div>

            </div>
        </motion.header>
    );
}
