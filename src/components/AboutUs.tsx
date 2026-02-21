"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, MapPin, Users, Award, ChevronRight, X } from 'lucide-react';
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Counter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = target;
        const totalSteps = 60;
        const increment = end / totalSteps;
        const stepTime = (duration * 1000) / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
};



export default function AboutUs() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const pillars = [
        {
            title: "Respaldo Técnico",
            description: "Equipos con certificaciones NTE INEN 2569 que garantizan seguridad y durabilidad por más de 15 años.",
            icon: <ShieldCheck className="text-brand-red" size={32} />,
            delay: 0.1
        },
        {
            title: "ORIGINALIDAD GARANTIZADA",
            description: "Uso exclusivo de repuestos originales, garantizando seguridad, durabilidad y el correcto funcionamiento del calefón",
            icon: <Award className="text-brand-blue" size={32} />,
            delay: 0.2
        },
        {
            title: "Compromiso Local",
            description: "Ubicados estratégicamente en la Calle Olmedo, junto a San Sebastian, para inmediatez absoluta.",
            icon: <MapPin className="text-brand-blue" size={32} />,
            delay: 0.3
        }
    ];

    return (
        <section id="quienes-somos" className="py-24 bg-brand-dark overflow-hidden relative border-t border-brand-blue/10">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-20 text-white">
                    {/* Narrative Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-brand-blue tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 font-heading">MÁS QUE UNA OPCIÓN</h2>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 md:mb-8 font-heading">
                                Más de <span className="text-brand-blue uppercase">20 años como líderes</span> en el sur del Ecuador
                            </h3>
                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 md:mb-6 font-medium">
                                Más de 1,800 hogares servidos avalan nuestra trayectoria. Estamos ubicados en la <span className="font-bold text-white">Calle Olmedo</span> (entre Azuay y Mercadillo), <span className="font-bold text-white">junto a San Sebastián</span> y la Radio Centinela del Sur, cerca de la Escuela Miguel Riofrío.
                            </p>
                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 md:mb-10 font-medium">
                                En <span className="font-bold text-white uppercase italic">Calefones Loja</span> no solo vendemos calefones; somos un centro de soluciones integrales con liderazgo técnico y acompañamiento real.
                            </p>

                            {/* Statistic Counters */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                <div className="bg-white/5 p-6 rounded-[2rem] shadow-2xl border border-white/10 flex items-center space-x-4 backdrop-blur-sm">
                                    <div className="bg-brand-blue/20 p-3 rounded-2xl shrink-0">
                                        <Users className="text-brand-blue" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">
                                            +<Counter target={1800} />
                                        </div>
                                        <div className="text-gray-400 font-bold uppercase tracking-widest text-[9px] leading-tight">Hogares servidos</div>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 rounded-[2rem] shadow-2xl border border-white/10 flex items-center space-x-4 backdrop-blur-sm">
                                    <div className="bg-brand-red/20 p-3 rounded-2xl shrink-0">
                                        <Wrench className="text-brand-red" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">
                                            +<Counter target={3500} />
                                        </div>
                                        <div className="text-gray-400 font-bold uppercase tracking-widest text-[9px] leading-tight">Asistencias técnicas</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image/Bento Visual Component */}
                    <div className="flex-1 relative w-full">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="col-span-2 h-48 sm:h-64 bg-gray-200 rounded-2xl overflow-hidden relative shadow-lg cursor-pointer group/img"
                                onClick={() => setSelectedImage('/images/about-main.webp')}
                            >
                                <img
                                    src="/images/about-main.webp"
                                    alt="Técnicos expertos en calefones"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent pointer-events-none" />
                                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white font-bold text-sm sm:text-xl uppercase tracking-widest bg-brand-blue/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg backdrop-blur pointer-events-none">
                                    Liderazgo Técnico
                                </div>
                            </motion.div>
                            <div className="h-32 sm:h-48 bg-brand-blue rounded-2xl flex items-center justify-center p-4 sm:p-6 text-center text-white shadow-lg">
                                <div>
                                    <div className="text-2xl sm:text-4xl font-bold mb-1">20+</div>
                                    <div className="text-[10px] sm:text-xs uppercase font-bold tracking-widest opacity-80">Años de Experticia</div>
                                </div>
                            </div>
                            <div className="h-32 sm:h-48 bg-brand-red rounded-2xl flex items-center justify-center p-4 sm:p-6 text-center text-white shadow-lg">
                                <div>
                                    <ShieldCheck size={32} className="mx-auto mb-2" />
                                    <div className="text-[10px] sm:text-xs uppercase font-bold tracking-widest">Servicio Garantizado</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <motion.div
                        className="flex space-x-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {pillars.map((pillar, index) => (
                            <div key={index} className="min-w-[85%] snap-center px-1">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white/5 p-8 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col h-full backdrop-blur-sm"
                                >
                                    <div className="mb-6 p-4 bg-brand-blue/10 rounded-2xl w-fit">
                                        {pillar.icon}
                                    </div>
                                    <h4 className="text-xl text-white mb-3 font-heading">
                                        {pillar.title}
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                        {pillar.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Visual cue for swipe */}
                    <div className="flex justify-center space-x-2 mt-2">
                        {pillars.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue/40" />
                        ))}
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: pillar.delay }}
                            className="bg-white/5 p-10 rounded-[2.5rem] shadow-2xl border border-white/10 hover:border-brand-blue/30 transition-all group backdrop-blur-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                {pillar.icon}
                            </div>
                            <div className="mb-8 p-5 bg-brand-blue/10 rounded-2xl w-fit transform group-hover:scale-110 transition-transform duration-300">
                                {pillar.icon}
                            </div>
                            <h4 className="text-xl text-white mb-4 tracking-tight uppercase tracking-widest text-xs border-b border-white/5 pb-4 font-heading">{pillar.title}</h4>
                            <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>



            {/* Image Modal */}
            <Transition appear show={!!selectedImage} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={() => setSelectedImage(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
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
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all relative">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                    >
                                        <X size={32} />
                                    </button>
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt="Full size view"
                                            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                                        />
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section >
    );
}
