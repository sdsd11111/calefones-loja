"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wrench, ShieldCheck, Zap, MessageCircle, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const services = [
    {
        title: "Reparación de Calefones",
        description: "¿Tu equipo no enciende o tiene fugas? Realizamos reparación de calefones en Loja con repuestos originales para todas las marcas (Instamatic, Yang).",
        technical: "Diseño de ductos de evacuación con protección eólica para ráfagas de hasta 61 km/h y optimización estequiométrica para la altitud de Loja.",
        icon: <Settings className="text-white" size={24} />,
        image: "/images/service-installation.webp",
        delay: 0.1
    },
    {
        title: "Mantenimiento de Calefones",
        description: "Alarga la vida de tu equipo por más de 15 años. Nuestro mantenimiento preventivo elimina el sarro y cuida tu inversión.",
        technical: "Limpieza profunda de serpentín (descalcificación), calibración de microswitches y cambio preventivo de diafragma de caucho virgen.",
        icon: <ShieldCheck className="text-white" size={24} />,
        image: "/images/service-maintenance.webp",
        delay: 0.2
    },
    {
        title: "Inspección y Diagnóstico",
        description: "Detectamos si hay un problema de presión de agua o gas. Inspección técnica a domicilio para solucionar fallas de encendido.",
        technical: "Purga de aire en tuberías y diagnóstico de patologías de presión de agua mediante inspección sistemática de la red.",
        icon: <Wrench className="text-white" size={24} />,
        image: "/images/service-repair.webp",
        delay: 0.3
    },
    {
        title: "Instalación Certificada",
        description: "Instalación segura bajo norma INEN. Garantizamos agua caliente sin riesgo de monóxido.",
        technical: "Instalación técnica de bombas presurizadoras bajo el tanque para evitar daños en el diafragma del calefón.",
        icon: <Zap className="text-white" size={24} />,
        image: "/images/service-optimization.webp",
        delay: 0.4
    }
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="servicios" className="py-16 bg-white">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-4"
                    >
                        SOLUCIONES TÉCNICAS AVANZADAS
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-[1.1] mb-4">
                        Solución de <span className="text-brand-blue">Calefones en Loja</span><br className="hidden sm:block" />
                        <span className="text-brand-red">Servicios Integrales</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        En Loja, la humedad y los sedimentos minerales exigen un cuidado superior.
                        Nuestros protocolos protegen tu inversión frente a las condiciones locales.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col cursor-pointer"
                            onClick={() => setSelectedService(service)}
                        >
                            {/* IMAGE CONTAINER */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                                {/* Floating Icon Badge */}
                                <div className="absolute top-6 left-6 p-4 bg-brand-blue/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                                    {service.icon}
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-6 right-6 pointer-events-none">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white bg-brand-red/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                                        Solo Repuestos Originales
                                    </span>
                                </div>
                            </div>

                            {/* CONTENT AREA */}
                            <div className="p-10 relative bg-white flex-1 flex flex-col">
                                {/* Glassmorphism Background Hover Overlay */}
                                <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <h4 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
                                        {service.title}
                                    </h4>

                                    <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto">
                                        {/* Technical Detail (Revelado en hover) */}
                                        <div className="pt-6 border-t border-gray-100 group-hover:border-blue-100 transition-colors">
                                            <div className="flex items-start space-x-3">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-red/30">
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                </div>
                                                <p className="text-sm text-gray-500 leading-relaxed italic group-hover:text-gray-700 transition-colors">
                                                    <span className="font-bold text-brand-dark not-italic group-hover:text-brand-blue">Especificación Clínica:</span> {service.technical}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Action Button */}
                <div className="text-center">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-3 bg-brand-blue hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-2xl shadow-xl transition-all"
                        onClick={() => window.open('https://wa.me/593994454838', '_blank')}
                    >
                        <MessageCircle size={24} />
                        <span>Consultar Servicio vía WhatsApp</span>
                        <ChevronRight size={20} />
                    </motion.button>
                </div>

            </div>

            {/* Service Details Modal */}
            <Transition appear show={!!selectedService} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={() => setSelectedService(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-md" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white text-left align-middle shadow-2xl transition-all flex flex-col md:flex-row">

                                    {/* Modal Close Button */}
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 md:p-3 bg-gray-50/80 hover:bg-gray-100 rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <X size={20} className="text-brand-dark" />
                                    </button>

                                    {/* Image Column */}
                                    <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto md:min-h-[400px]">
                                        {selectedService && (
                                            <img
                                                src={selectedService.image}
                                                alt={selectedService.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Details Column */}
                                    <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col">
                                        <div className="mb-6 md:mb-8">
                                            <span className="text-[10px] md:text-xs font-black tracking-widest text-brand-blue uppercase bg-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 inline-block">
                                                SERVICIO TÉCNICO ESPECIALIZADO
                                            </span>
                                            <Dialog.Title as="h3" className="text-2xl md:text-4xl font-black text-brand-dark leading-tight mb-3 md:mb-4">
                                                {selectedService?.title}
                                            </Dialog.Title>
                                            <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                                                {selectedService?.description}
                                            </p>

                                            <div className="p-4 md:p-6 bg-brand-blue/10 rounded-2xl border border-brand-blue/20">
                                                <div className="flex items-start space-x-3">
                                                    <CheckCircle2 size={24} className="text-brand-blue shrink-0 mt-0.5 md:mt-1" />
                                                    <p className="text-sm md:text-base text-gray-700 italic font-medium leading-relaxed">
                                                        <span className="font-bold text-brand-blue block not-italic uppercase text-[10px] tracking-widest mb-1">Especificación de Ingeniería:</span>
                                                        {selectedService?.technical}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-3 md:y-4">
                                            <h4 className="text-[10px] md:text-sm font-black text-brand-dark uppercase tracking-widest border-b border-gray-100 pb-2">Ventajas de "Calefones Loja"</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
                                                {["Técnicos certificados", "Repuestos 100% originales", "Garantía en mano de obra", "Atención inmediata en Loja"].map((item, i) => (
                                                    <div key={i} className="flex items-center space-x-2 md:space-x-3">
                                                        <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                                                        <span className="text-gray-700 font-bold text-[11px] md:text-sm tracking-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
                                            <div className="flex items-center space-x-3 hidden md:flex">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                                                    <ShieldCheck className="text-brand-red" size={20} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Servicio <br /> Garantizado</span>
                                            </div>
                                            <button
                                                onClick={() => window.open(`https://wa.me/593994454838?text=Hola, necesito información sobre el servicio de ${selectedService?.title}`, '_blank')}
                                                className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-2xl shadow-xl transition-all text-sm md:text-base"
                                            >
                                                <MessageCircle size={20} />
                                                <span>Agendar Servicio</span>
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section >
    );
}
