"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Zap, Droplets, ShieldCheck, Settings, ChevronDown, MapPin } from 'lucide-react';

const faqs = [
    {
        question: "¿Realizan reparación de calefones en Loja a domicilio?",
        answer: "Sí, nuestros técnicos cubren toda la ciudad para la reparación y mantenimiento de calefones en el mismo día.",
        icon: <Zap className="text-brand-blue" size={24} />
    },
    {
        question: "¿Tienen repuestos originales para la venta de calefones?",
        answer: "Contamos con stock de repuestos originales Instamatic y YANG en nuestro local de la Calle Olmedo.",
        icon: <Droplets className="text-brand-blue" size={24} />
    },
    {
        question: "¿Por qué mi calefón no enciende? (Inspección)",
        answer: "Puede ser falta de presión o pilas. Solicita una inspección de calefones técnica para un diagnóstico preciso.",
        icon: <ShieldCheck className="text-brand-blue" size={24} />
    },
    {
        question: "¿Cada cuánto tiempo debo realizar el mantenimiento preventivo?",
        answer: "Para alcanzar la vida útil de 15 años que garantizan nuestras marcas, el mantenimiento debe ser anual. Esto previene fugas de gas, fallas en el microswitch y el desgaste prematuro del diafragma.",
        icon: <Settings className="text-brand-blue" size={24} />
    },
    {
        question: "¿Por qué elegir repuestos originales en lugar de genéricos?",
        answer: "Un serpentín original tiene el espesor de cobre adecuado para soportar la dilatación térmica. Los repuestos genéricos comprometen la seguridad y la durabilidad de tu inversión a largo plazo.",
        icon: <ShieldCheck className="text-brand-blue" size={24} />
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-16 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-blue font-black tracking-widest uppercase text-xs mb-4"
                    >
                        SOPORTE TÉCNICO Y AYUDA
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-brand-dark mb-6"
                    >
                        Consultas <span className="text-brand-red">Frecuentes</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto"
                    >
                        Resolvemos tus dudas con criterios de ingeniería para garantizar tu seguridad y confort en Loja.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className={`border-b border-gray-100 transition-all ${isOpen ? 'pb-6' : 'pb-0'}`}>
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-3 rounded-xl transition-colors ${isOpen ? 'bg-blue-50' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                                            {faq.icon}
                                        </div>
                                        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-brand-blue' : 'text-brand-dark group-hover:text-brand-blue'}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-blue' : ''}`}
                                        size={20}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-[72px] pr-12 pb-4">
                                                <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-brand-red/20 pl-6 py-2">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
