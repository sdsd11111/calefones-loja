"use client";

import { motion } from 'framer-motion';
import { Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contacto" className="py-24 bg-gray-50/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Column 1: Info & Mini Form (50%) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex flex-col"
                    >
                        {/* Contact Info Header */}
                        <div className="mb-12">
                            <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue text-[10px] font-black tracking-widest uppercase rounded-full mb-6">
                                DIRECCIÓN ESTRATÉGICA
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-dark mb-4 leading-tight">
                                Centro de Ingeniería <br className="hidden sm:block" /> <span className="text-brand-blue">Térmica en Loja</span>
                            </h2>

                            <div className="flex flex-col space-y-6 mt-6 md:mt-8">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex-shrink-0">
                                        <MapPin className="text-brand-red" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-base sm:text-lg font-bold text-brand-dark">Calle Olmedo entre Azuay y Mercadillo</h4>
                                        <p className="text-gray-500 font-bold italic text-sm sm:text-base">"Junto a Radio Centinela del Sur"</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => window.location.href = 'tel:0994454838'}
                                        className="flex-1 flex items-center justify-center space-x-3 bg-brand-dark hover:bg-black text-white font-black py-4 px-4 sm:px-6 rounded-2xl transition-all shadow-lg text-xs sm:text-sm"
                                    >
                                        <Phone size={18} />
                                        <span>LLAMAR AHORA</span>
                                    </button>
                                    <button
                                        onClick={() => window.open('https://wa.me/593994454838', '_blank')}
                                        className="flex-1 flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-black py-4 px-4 sm:px-6 rounded-2xl transition-all shadow-lg text-xs sm:text-sm"
                                    >
                                        <MessageCircle size={18} />
                                        <span>WHATSAPP TÉCNICO</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-3 bg-brand-blue/5 border border-brand-blue/10 p-4 rounded-2xl">
                                    <ShieldCheck className="text-brand-blue shrink-0" size={20} />
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-blue">Stock inmediato de repuestos originales en este local</span>
                                </div>
                            </div>
                        </div>

                        {/* Compact Professional Form */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-500/5 border border-gray-100 mt-auto">
                            <div className="mb-6">
                                <h3 className="text-xl font-black text-brand-dark flex items-center space-x-2">
                                    <Clock className="text-brand-red" size={20} />
                                    <span>Asistencia Prioritaria</span>
                                </h3>
                            </div>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    name: formData.get('name'),
                                    sector: formData.get('sector'),
                                    service: formData.get('service'),
                                    message: formData.get('message'),
                                };

                                try {
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data),
                                    });

                                    if (res.ok) {
                                        alert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.');
                                        (e.target as HTMLFormElement).reset();
                                    } else {
                                        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
                                    }
                                } catch (error) {
                                    console.error('Error sending message:', error);
                                    alert('Hubo un error al enviar el mensaje.');
                                }
                            }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Nombre"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium"
                                    />
                                    <input
                                        name="sector"
                                        type="text"
                                        required
                                        placeholder="Sector/Barrio"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium"
                                    />
                                </div>
                                <select name="service" required className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium appearance-none cursor-pointer">
                                    <option value="Mantenimiento Anual">Mantenimiento Anual</option>
                                    <option value="Reparación Urgente">Reparación Urgente</option>
                                    <option value="Venta / Instalación">Venta / Instalación</option>
                                </select>
                                <textarea
                                    name="message"
                                    required
                                    rows={2}
                                    placeholder="Mensaje breve..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium resize-none"
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-red hover:bg-red-700 text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-brand-red/10 flex items-center justify-center space-x-3 transition-all active:scale-[0.98]"
                                >
                                    <Send size={18} />
                                    <span>SOLICITAR TÉCNICO</span>
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Column 2: Full Color Map (50%) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex"
                    >
                        <div className="relative w-full min-h-[500px] lg:min-h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group flex flex-col">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1136.6322338272583!2d-79.20235508823526!3d-3.9961623867625515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb490000000001%3A0x0000000000000000!2sCalle%20Olmedo%2C%20Loja!5e0!3m2!1ses-419!2sec!4v1700000000000!5m2!1ses-419!2sec"
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            {/* External Link Button Overlay */}
                            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-full px-6 sm:px-10 z-10">
                                <button
                                    onClick={() => window.open('https://maps.app.goo.gl/ahpngRBpppVsMyxc9', '_blank')}
                                    className="w-full bg-white/90 backdrop-blur-md hover:bg-white text-brand-dark font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center space-x-3 transition-all border border-gray-100 group/btn text-xs sm:text-base"
                                >
                                    <ExternalLink size={18} className="text-brand-blue group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    <span>VER EN GOOGLE MAPS</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
