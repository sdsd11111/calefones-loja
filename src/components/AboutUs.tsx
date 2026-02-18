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
            title: "Originalidad Garantizada",
            description: "Uso exclusivo de repuestos originales (serpentines de cobre puro, diafragmas de caucho virgen).",
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
        <section id="quienes-somos" className="py-16 bg-[#F9FAFB] overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                    {/* Narrative Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-brand-blue font-bold tracking-wider uppercase text-xs sm:text-sm mb-4">MÁS QUE UNA OPCIÓN</h2>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight mb-6 md:mb-8">
                                Líderes en <span className="text-brand-red">Calefones en Loja</span> y el Sur del Ecuador
                            </h3>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                                Más de 1,000 hogares servidos nos convierten en la elección correcta. Estamos ubicados estratégicamente <span className="font-bold text-brand-dark">junto a San Sebastian</span> para brindarte soporte inmediato.
                            </p>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 md:mb-10">
                                En <span className="font-bold text-brand-dark">"Calefones Loja"</span>, no solo vendemos equipos; somos un centro de soluciones integrales con liderazgo técnico en el sur del Ecuador.
                            </p>

                            {/* Statistic Counter */}
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-4 sm:space-x-6 max-w-sm w-full">
                                <div className="bg-brand-blue/10 p-3 sm:p-4 rounded-full">
                                    <Users className="text-brand-blue" size={28} />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-black text-brand-dark">
                                        +<Counter target={1000} />
                                    </div>
                                    <div className="text-gray-500 font-medium italic text-xs sm:text-sm">Hogares Lojanos Protegidos</div>
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

                {/* Pillars Section: Grid on Desktop, Slider on Mobile */}
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
                                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
                                >
                                    <div className="mb-4">
                                        {pillar.icon}
                                    </div>
                                    <h4 className="text-lg font-extrabold text-brand-dark mb-2">
                                        {pillar.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Visual cue for swipe */}
                    <div className="flex justify-center space-x-1.5 mt-2">
                        {pillars.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue/20" />
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
                            className="bg-white p-8 sm:p-10 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {pillar.icon}
                            </div>
                            <h4 className="text-lg sm:text-xl font-extrabold text-brand-dark mb-3 sm:mb-4">{pillar.title}</h4>
                            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
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
