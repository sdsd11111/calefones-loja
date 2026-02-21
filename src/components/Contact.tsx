"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle, Clock, ShieldCheck, ExternalLink, Image as ImageIcon, X as CloseIcon, Loader2, Plus } from 'lucide-react';

// Max 3 image slots
const MAX_IMAGES = 3;

export default function Contact() {
    const [isUploading, setIsUploading] = useState(false);
    // Array of { file, preview } for each slot
    const [images, setImages] = useState<Array<{ file: File; preview: string } | null>>([null, null, null]);

    const fileInputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert('La imagen es muy pesada. Máximo 10MB por foto.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages(prev => {
                const next = [...prev];
                next[index] = { file, preview: reader.result as string };
                return next;
            });
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index: number) => {
        setImages(prev => {
            const next = [...prev];
            next[index] = null;
            return next;
        });
        if (fileInputRefs[index].current) fileInputRefs[index].current!.value = '';
    };

    const filledCount = images.filter(Boolean).length;

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
                            <h2 className="text-2xl sm:text-3xl md:text-5xl text-brand-dark mb-4 leading-tight font-heading">
                                Venta y Reparación de <br className="hidden sm:block" /> <span className="text-brand-blue">Calefones en Loja</span>
                            </h2>

                            <div className="flex flex-col space-y-6 mt-6 md:mt-8">
                                <div className="flex items-start space-x-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl">
                                    <div className="p-4 bg-brand-red/10 rounded-2xl flex-shrink-0">
                                        <MapPin className="text-brand-red" size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-brand-dark font-heading">Calle Olmedo entre Azuay y Mercadillo</h4>
                                        <p className="text-gray-500 font-bold italic text-sm sm:text-base">"Junto a San Sebastián y Radio Centinela del Sur"</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => window.location.href = 'tel:0994454838'}
                                        className="flex-1 flex items-center justify-center space-x-3 bg-brand-dark hover:bg-black text-white font-black py-5 px-6 rounded-2xl transition-all shadow-xl text-xs uppercase tracking-widest"
                                    >
                                        <Phone size={18} />
                                        <span>LLAMAR AHORA</span>
                                    </button>
                                    <button
                                        onClick={() => window.open('https://wa.me/593994454838?text=Hola,%20necesito%20ayuda%20urgente%20con%20mi%20calef%C3%B3n.', '_blank')}
                                        className="flex-1 flex items-center justify-center space-x-3 bg-brand-red hover:bg-red-700 text-white font-black py-5 px-6 rounded-2xl transition-all shadow-xl text-xs uppercase tracking-widest shadow-brand-red/20"
                                    >
                                        <MessageCircle size={18} />
                                        <span>WHATSAPP TÉCNICO</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4 bg-brand-blue/5 border border-brand-blue/10 p-5 rounded-[2rem]">
                                    <div className="p-2 bg-brand-blue/10 rounded-xl">
                                        <ShieldCheck className="text-brand-blue shrink-0" size={24} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-brand-blue leading-tight">Stock inmediato de repuestos <br /> originales en este local</span>
                                </div>
                            </div>
                        </div>

                        {/* Compact Professional Form */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-500/5 border border-gray-100 mt-auto">
                            <div className="mb-6">
                                <h3 className="text-xl text-brand-dark flex items-center space-x-2 font-heading">
                                    <Clock className="text-brand-red" size={20} />
                                    <span>Asistencia Prioritaria</span>
                                </h3>
                            </div>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                if (isUploading) return;

                                setIsUploading(true);
                                try {
                                    const rawFormData = new FormData(e.currentTarget);

                                    // Append up to 3 image files
                                    images.forEach((img, i) => {
                                        if (img?.file) rawFormData.append(`image_${i + 1}`, img.file);
                                    });

                                    const response = await fetch('/api/contact', {
                                        method: 'POST',
                                        body: rawFormData,
                                    });

                                    const result = await response.json();
                                    if (!response.ok) throw new Error(result.error || 'Error al enviar');

                                    const name = rawFormData.get('name');
                                    const sector = rawFormData.get('sector');
                                    const service = rawFormData.get('service');
                                    const brand = rawFormData.get('brand');
                                    const model = rawFormData.get('model');
                                    const msg = rawFormData.get('message') || 'Ninguno';

                                    let messageText = `*🔥 NUEVA SOLICITUD WEB 🔥*\n\n` +
                                        `👤 *Nombre:* ${name}\n` +
                                        `📍 *Sector/Barrio:* ${sector}\n` +
                                        `🛠️ *Servicio:* ${service}\n` +
                                        `🏷️ *Marca:* ${brand}\n` +
                                        `📦 *Modelo:* ${model}\n\n` +
                                        `💬 *Mensaje:* ${msg}`;

                                    if (result.id && result.imageCount > 0) {
                                        const origin = window.location.origin;
                                        messageText += `\n\n*📷 FOTOS DEL CALEFÓN:*`;
                                        for (let i = 1; i <= result.imageCount; i++) {
                                            messageText += `\n• Foto ${i}: ${origin}/api/images/${result.id}?slot=${i}`;
                                        }
                                    }

                                    const whatsappUrl = `https://wa.me/593994454838?text=${encodeURIComponent(messageText)}`;
                                    window.open(whatsappUrl, '_blank');

                                    // Reset form and images
                                    (e.target as HTMLFormElement).reset();
                                    setImages([null, null, null]);
                                    fileInputRefs.forEach(r => { if (r.current) r.current.value = ''; });
                                } catch (error: any) {
                                    console.error('Error:', error);
                                    alert('Hubo un error al procesar tu solicitud: ' + error.message);
                                } finally {
                                    setIsUploading(false);
                                }
                            }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Nombre completo"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium"
                                    />
                                    <input
                                        name="sector"
                                        type="text"
                                        required
                                        placeholder="Sector/Barrio en Loja"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium"
                                    />
                                </div>

                                <select name="service" required defaultValue="" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium appearance-none cursor-pointer">
                                    <option value="" disabled>Selecciona el tipo de servicio...</option>
                                    <option value="Mantenimiento anual">Mantenimiento anual</option>
                                    <option value="Reparación urgente">Reparación urgente</option>
                                    <option value="Venta e instalación">Venta e instalación</option>
                                    <option value="Asesoramiento personalizado">Asesoramiento personalizado</option>
                                </select>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="brand"
                                        type="text"
                                        required
                                        placeholder="Marca (Ej: Instamatic)"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium"
                                    />
                                    <select name="model" required defaultValue="" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium appearance-none cursor-pointer">
                                        <option value="" disabled>Modelo/Pilas...</option>
                                        <option value="1 pila">1 pila</option>
                                        <option value="2 pilas">2 pilas</option>
                                        <option value="No sé">No lo sé</option>
                                    </select>
                                </div>

                                <textarea
                                    name="message"
                                    rows={2}
                                    placeholder="Mensaje o síntoma (Opcional)..."
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-sm font-medium resize-none"
                                ></textarea>

                                {/* Multi-Image Upload (up to 3) */}
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                        Fotos del calefón ({filledCount}/{MAX_IMAGES}) — <span className="text-brand-blue">Diagnóstico más rápido</span>
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {images.map((img, index) => (
                                            <div key={index}>
                                                <input
                                                    type="file"
                                                    ref={fileInputRefs[index]}
                                                    onChange={(e) => handleFileChange(e, index)}
                                                    accept="image/*"
                                                    className="hidden"
                                                    id={`photo-upload-${index}`}
                                                />
                                                {!img ? (
                                                    <label
                                                        htmlFor={`photo-upload-${index}`}
                                                        className="flex flex-col items-center justify-center gap-1.5 p-3 bg-blue-50/50 rounded-xl border border-dashed border-brand-blue/30 hover:border-brand-blue hover:bg-blue-50 transition-all cursor-pointer group aspect-square"
                                                    >
                                                        <Plus className="text-brand-blue/60 group-hover:text-brand-blue transition-colors" size={20} />
                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Foto {index + 1}</span>
                                                    </label>
                                                ) : (
                                                    <div className="relative rounded-xl overflow-hidden border border-brand-blue/20 aspect-square">
                                                        <img src={img.preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-1 right-1 p-1 bg-brand-red text-white rounded-full shadow-md hover:scale-110 transition-transform"
                                                        >
                                                            <CloseIcon size={10} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className={`w-full ${isUploading ? 'bg-gray-400' : 'bg-[#25D366] hover:bg-[#20bd5a]'} text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-[#25D366]/30 flex items-center justify-center space-x-3 transition-all active:scale-[0.98]`}
                                >
                                    {isUploading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <MessageCircle size={20} />
                                    )}
                                    <span>{isUploading ? 'PROCESANDO...' : 'ENVIAR DATOS A WHATSAPP'}</span>
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
            </div >
        </section >
    );
}
