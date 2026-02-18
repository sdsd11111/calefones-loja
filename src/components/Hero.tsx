"use client";

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen lg:min-h-[85vh] flex items-center overflow-hidden bg-white">
            {/* BACKGROUND SPLIT & MOBILE BG */}
            <div className="absolute inset-0 flex flex-col lg:flex-row">
                <div className="flex-1 bg-white lg:bg-gradient-to-br lg:from-white lg:to-blue-50/50" />

                <div className="absolute inset-0 lg:hidden">
                    <img
                        src="/images/hero-bg.webp"
                        alt="Background"
                        className="w-full h-full object-cover opacity-100"
                    />
                </div>

                {/* Desktop Background Image (Visible only on large screens) */}
                <div className="flex-1 relative hidden lg:block">
                    <img
                        src="/images/hero-bg.webp"
                        alt="Servicio técnico profesional"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center">

                    {/* CONTENT LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 text-center lg:text-left pt-0 lg:pt-12 pb-16 lg:py-24 flex flex-col items-center lg:items-start"
                    >
                        <div className="inline-flex items-center space-x-2 bg-blue-100/80 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold mb-6">
                            <CheckCircle size={16} />
                            <span>+1,000 hogares servidos en Loja</span>
                        </div>

                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-12 lg:mb-6 drop-shadow-sm lg:drop-shadow-none">
                            Calefones en Loja: Expertos en <span className="text-brand-blue">Venta, Reparación y Mantenimiento</span>
                        </h1>

                        <p className="hidden lg:block text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                            La solución definitiva para el agua caliente en tu hogar. Somos <span className="font-bold text-brand-dark">"Calefones Loja"</span>, ingeniería y servicio técnico garantizado en la <span className="font-bold text-brand-dark">Calle Olmedo</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="hidden lg:flex w-full sm:w-auto bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl items-center justify-center space-x-2 transition-all group text-sm sm:text-base">
                                <MessageCircle size={20} />
                                <span>Agendar Reparación</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto bg-brand-blue lg:bg-white border-2 border-brand-blue text-white lg:text-brand-blue hover:bg-blue-700 lg:hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-all text-sm sm:text-base shadow-xl lg:shadow-none"
                            >
                                Ver Venta de Calefones
                            </button>
                        </div>
                    </motion.div>



                </div>
            </div>
        </section>
    );
}
