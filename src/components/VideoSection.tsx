"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ShieldCheck, Truck, Wind } from 'lucide-react';

export default function VideoSection() {
    const [isOpen, setIsOpen] = useState(false);

    // Animation variants for the modal
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-tight mb-4 px-2">
                        Calefones listos para el <span className="text-brand-blue">clima de Loja</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-medium">
                        Equipos seleccionados y probados para funcionar sin problemas en la altura y el frío de nuestra ciudad.
                    </p>
                </motion.div>

                {/* Cinematic Container */}
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-brand-dark aspect-video md:aspect-[21/9]">

                    {/* Background Video (Muted Loop) - Removed autoPlay to show poster as thumbnail requested by user */}
                    <video
                        muted
                        loop
                        playsInline
                        poster="/images/video-poster.webp"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        src="/video/video.mp4"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

                    {/* Floating content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl"
                        >
                            {/* Central Play Button */}
                            <div className="relative inline-block">
                                {/* Pulse circles */}
                                <span className="absolute inset-0 rounded-full bg-brand-red animate-ping opacity-25" />
                                <span className="absolute inset-0 rounded-full bg-brand-red animate-pulse opacity-40 scale-125" />

                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-brand-red hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group/btn"
                                >
                                    <Play size={32} fill="white" className="ml-1 group-hover/btn:scale-110 transition-transform" />
                                </button>
                                <p className="mt-4 text-white font-black uppercase tracking-widest text-sm drop-shadow-md">
                                    Reproducir Video
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Badges - Redesigned for mobile to avoid crowding */}
                    <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2 md:right-6 hidden sm:flex flex-col md:flex-row justify-center md:justify-between items-center gap-1.5 md:gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-1.5 bg-brand-dark/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-[9px] md:text-sm font-bold w-fit"
                        >
                            <ShieldCheck size={12} className="text-brand-blue" />
                            <span>Certificación NTE INEN 2569</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-1.5 bg-brand-dark/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white text-[9px] md:text-sm font-bold w-fit"
                        >
                            <Truck size={12} className="text-brand-red" />
                            <span>Servicio a Domicilio en Loja</span>
                        </motion.div>
                    </div>

                    {/* Simple mobile badges (only for very small screens where the others are hidden) */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center space-x-2 sm:hidden px-2">
                        <div className="bg-brand-dark/40 backdrop-blur-sm px-2 py-1 rounded text-[8px] text-white border border-white/10">
                            NTE INEN 2569
                        </div>
                        <div className="bg-brand-dark/40 backdrop-blur-sm px-2 py-1 rounded text-[8px] text-white border border-white/10">
                            Domicilio Loja
                        </div>
                    </div>

                </div>

            </div>

            {/* Video Lightbox / Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative w-full max-w-5xl md:aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-2"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all"
                            >
                                <X size={24} />
                            </button>

                            {/* Local Video Player */}
                            <video
                                className="w-full h-full object-contain"
                                src="/video/video.mp4"
                                controls
                                autoPlay
                                playsInline
                            />
                        </motion.div>

                        {/* Close modal by clicking background */}
                        <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
