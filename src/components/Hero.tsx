"use client";

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen lg:min-h-[85vh] flex items-center overflow-hidden bg-white">
            {/* BACKGROUND SPLIT & MOBILE BG */}
            <div className="absolute inset-0 flex flex-col lg:flex-row">
                <div className="flex-1 bg-brand-celeste lg:bg-gradient-to-br lg:from-white lg:to-brand-celeste" />

                <div className="absolute inset-0 lg:hidden">
                    <img
                        src="/images/hero-bg.webp"
                        alt="Background"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-brand-celeste/40" />
                </div>

                {/* Desktop Background Image (Visible only on large screens) */}
                <div className="flex-1 relative hidden lg:block">
                    <img
                        src="/images/hero-bg.webp"
                        alt="Servicio técnico profesional"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-celeste via-brand-celeste/20 to-transparent" />
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
                        <div className="inline-flex items-center space-x-2 bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-brand-red/20 uppercase tracking-widest text-[10px]">
                            <CheckCircle size={16} />
                            <span>Líderes con +20 años en el Sur del Ecuador</span>
                        </div>

                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-tight mb-12 lg:mb-6 drop-shadow-sm lg:drop-shadow-none font-heading">
                            Calefones en Loja: Expertos en <span className="text-brand-blue">asesoramiento, reparación, mantenimiento y venta</span>
                        </h1>

                        <p className="hidden lg:block text-base sm:text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                            La solución definitiva para el agua caliente en tu hogar. Somos <span className="font-bold text-brand-dark">"Calefones Loja"</span>, líderes con <span className="font-bold text-brand-dark">más de 20 años de experiencia</span>. Servicio técnico profesional en la <span className="font-bold text-brand-dark">Calle Olmedo</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-brand-red hover:bg-red-700 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-brand-red/30 group"
                                onClick={() => window.open('https://wa.me/593994454838?text=Hola,%20vengo%20de%20la%20web.%20Quiero%20agendar%20una%20visita%20t%C3%A9cnica%20lo%20antes%20posible.', '_blank')}
                            >
                                <MessageCircle size={22} className="group-hover:animate-bounce" />
                                <span className="text-sm md:text-base uppercase tracking-widest">Solicitar Técnico Ahora</span>
                            </motion.button>

                            <button
                                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto bg-white border-2 border-brand-dark text-brand-dark hover:bg-gray-50 font-black py-5 px-10 rounded-2xl transition-all text-xs uppercase tracking-widest shadow-lg transform hover:scale-105 active:scale-95"
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
