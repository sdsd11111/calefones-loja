"use client";

import { motion, useInView } from 'framer-motion';
import { Star, QrCode, Award } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: "Milton Labanda Jaramillo",
        initials: "ML",
        text: "Muy buen servicio así como la atención al cliente.",
        rating: 5,
        color: "bg-brand-blue",
        time: "Hace 2 meses"
    },
    {
        id: 2,
        name: "Paola Lissette Garcia Velez",
        initials: "PG",
        text: "Excelente servicio y los calefones son originales muy recomendable",
        rating: 5,
        color: "bg-brand-red",
        time: "Hace 2 meses"
    },
    {
        id: 3,
        name: "Sofía Toledo",
        initials: "ST",
        text: "Excelente servicio, eficaz, rápido y seguro. Muy recomendados",
        rating: 5,
        color: "bg-brand-blue",
        time: "Hace 5 meses"
    },
    {
        id: 4,
        name: "Gabriela Burguan",
        initials: "GB",
        text: "Excelente atención y respuesta para la instalación del calefon.",
        rating: 5,
        color: "bg-brand-red",
        time: "Hace 2 meses"
    }
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const [animateStars, setAnimateStars] = useState(false);

    useEffect(() => {
        if (isInView) {
            setAnimateStars(true);
        }
    }, [isInView]);

    return (
        <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-96 h-96 bg-brand-blue rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-7xl text-brand-dark mb-8 leading-tight uppercase tracking-tighter font-heading">
                        La confianza de más de <span className="text-brand-blue">1,000 hogares</span> en Loja nos respalda
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-bold max-w-3xl mx-auto leading-relaxed mb-8">
                        Más de 20 años transformando el frío de la ciudad en la comodidad de una ducha caliente.
                    </p>

                    {/* Google Rating Badge as a click-through link */}
                    <motion.a
                        href="https://share.google/mFCmdYJ7umyeIW3Ma"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-brand-blue/30 transition-all cursor-pointer group overflow-hidden"
                    >
                        <div className="p-6 sm:p-8 text-center sm:text-left flex flex-col justify-center">
                            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-2">
                                <span className="text-5xl font-black text-brand-dark mb-2 sm:mb-0 leading-none">4.9</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={animateStars ? { scale: 1, rotate: 0 } : {}}
                                            transition={{
                                                delay: i * 0.1 + 0.5,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 10
                                            }}
                                        >
                                            <Star
                                                size={28}
                                                className="fill-yellow-400 text-yellow-400 drop-shadow-sm"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm sm:text-base font-bold text-gray-500">
                                Basado en <span className="text-brand-blue">33 opiniones</span> de Google
                            </p>
                        </div>
                        <div className="bg-brand-blue/5 border-t sm:border-t-0 sm:border-l border-brand-blue/10 flex items-center justify-center p-4 sm:px-8 group-hover:bg-brand-blue transition-colors">
                            <span className="text-brand-blue font-black uppercase tracking-widest text-xs group-hover:text-white transition-colors">
                                Verificar <br className="hidden sm:block" /> reseñas
                            </span>
                        </div>
                    </motion.a>
                </motion.div>

                {/* Infinite Slider */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex space-x-6"
                        animate={{
                            x: [0, -1600], // Adjust based on card width
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={`${testimonial.id}-${index}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(index * 0.1, 0.4) }}
                                className="flex-shrink-0 w-[380px] bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                            >
                                {/* Avatar & Name */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`w-14 h-14 ${testimonial.color} text-white rounded-full flex items-center justify-center font-black text-lg`}>
                                        {testimonial.initials}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-brand-dark font-heading">{testimonial.name}</h4>
                                        <p className="text-xs text-gray-400 font-bold">{testimonial.time}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex space-x-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            whileInView={{ scale: 1, rotate: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: i * 0.08,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 10
                                            }}
                                        >
                                            <Star
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-600 font-medium leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Certification Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center">
                            <Award className="text-brand-red" size={40} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                                Certificación Oficial
                            </p>
                            <p className="font-black text-brand-dark text-sm">
                                Técnicos Certificados bajo<br />Norma NTE INEN 2569
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
