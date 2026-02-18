"use client";

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/593994454838"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center group"
        >
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40 transition-opacity" />

            <MessageCircle size={28} className="relative z-10" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap border border-gray-100 pointer-events-none">
                ¿Necesitas ayuda técnica?
            </span>
        </motion.a>
    );
}
