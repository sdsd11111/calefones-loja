"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, MessageCircle, Info, CheckCircle2, Factory, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
    {
        id: 1,
        name: "Calefón RCA 6 Lts",
        price: 85.00,
        origin: "China",
        capacity: "6L",
        points: "1 punto",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Este modelo de calefón de 6 litros es una solución práctica y eficiente para espacios reducidos y con consumos bajos. Es ideal para un servicio en específico, como duchas individuales o lavamanos, permitiendo un consumo eficiente de gas.",
        images: ["/images/Calefón RCA 6 LTS.webp", "/images/Calefón Instamatic 20 Lts adentro.webp"],
        features: ["Práctico y eficiente", "Ideal para espacios reducidos", "Bajo consumo de gas"]
    },
    {
        id: 2,
        name: "Calefón RCA 10 Lts",
        price: 135.00,
        origin: "China",
        capacity: "10L",
        points: "2 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Este modelo proporciona un mayor caudal de agua caliente para un solo servicio, permitiendo una ducha más estable y confortable, incluso ante variaciones de presión. Un tamaño versátil para quienes quieren comodidad sin complicaciones.",
        images: ["/images/catalog/Calefón RCA 10 LTS externa.webp", "/images/catalog/Calefón RCA 10 LTS interna.webp"],
        features: ["Mayor caudal de agua", "Ducha estable y confortable", "Tamaño versátil"]
    },
    {
        id: 3,
        name: "Calefón RCA 20 Lts",
        price: 165.00,
        origin: "China",
        capacity: "20L",
        points: "3 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "El calefón RCA de 20 litros es un modelo diseñado para brindar un servicio funcional y confiable. Abastece con normalidad hasta dos servicios simultáneos, lo que lo convierte en una opción adecuada para hogares que buscan agua caliente estable a un costo accesible.",
        images: ["/images/catalog/Calefón RCA 20 LTS externa.webp", "/images/catalog/Calefón RCA 20 LTS interna.webp"],
        features: ["Servicio funcional y confiable", "Abastece dos servicios simultáneos", "Costo accesible"]
    },
    {
        id: 4,
        name: "Calefón FLAMEX 20 Lts",
        price: 310.00,
        origin: "TAIWAN",
        capacity: "20L",
        points: "4 puntos",
        warranty: "24 meses",
        installation: "Incluida",
        description: "Ideal para viviendas de 1 a 2 plantas, el calefón FLAMEX de 20 litros ofrece un consumo eficiente, constante y seguro. Destaca por su durabilidad de 8 a 10 años y por utilizar componentes de fácil mantenimiento, con repuestos accesibles y compatibles.",
        images: ["/images/catalog/Calefon FLAMEX 20 litros externa.webp", "/images/catalog/Calefon FLAMEX 20 litros interna.webp"],
        features: ["Consumo eficiente y seguro", "Alta durabilidad (8-10 años)", "Fácil mantenimiento"]
    },
    {
        id: 5,
        name: "Calefón INSTAMATIC 20 Lts",
        price: 345.00,
        origin: "TAIWAN",
        capacity: "20L",
        points: "5 puntos",
        warranty: "24 meses",
        installation: "Incluida",
        description: "Un calefón con historia y respaldo real. El modelo INSTAMATIC lleva más de 20 años siendo una de las marcas más utilizadas en Loja, elegido por su estabilidad, confianza y fácil acceso al soporte técnico a lo largo del tiempo.",
        images: ["/images/catalog/Calefon INSTAMATIC 20 LTS externa.webp", "/images/catalog/Calefon INSTAMATIC 20 LTS interna.webp"],
        features: ["Respaldo y confianza", "Estabilidad comprobada", "Fácil acceso a soporte técnico"]
    },
    {
        id: 6,
        name: "Calefón YANG 20 Lts",
        price: 390.00,
        origin: "TAIWAN",
        capacity: "20L",
        points: "5 puntos",
        warranty: "24 meses",
        installation: "Incluida",
        description: "Un calefón reconocido por su alta durabilidad a lo largo de los años. Con más de dos décadas en el mercado, YANG es sinónimo de resistencia, confiabilidad y desempeño constante incluso con el paso del tiempo. Su capacidad para dos servicios y su buen desempeño con baja presión lo convierten en una opción segura y duradera.",
        images: ["/images/product-yang-20l.webp", "/images/Calefón Instamatic 20 Lts adentro.webp"],
        features: ["Alta durabilidad y resistencia", "Desempeño con baja presión", "Confiabilidad constante"]
    },
    {
        id: 7,
        name: "Calefón RCA 26 Lts",
        price: 185.00,
        origin: "China",
        capacity: "26L",
        points: "5 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Este modelo está pensado para quienes buscan mayor caudal de agua caliente sin elevar demasiado la inversión, el Calefón RCA 26 litros ofrece un rendimiento estable y eficiente para dos servicios simultáneos. Su mayor capacidad se traduce en más comodidad en cada ducha, manteniendo un equilibrio ideal entre consumo, funcionalidad y precio.",
        images: ["/images/catalog/Calefón RCA 26 LTS externa.webp", "/images/catalog/Calefón RCA 26 LTS interna.webp"],
        features: ["Mayor caudal de agua", "Rendimiento estable para dos servicios", "Equilibrio ideal"]
    },
    {
        id: 8,
        name: "Calefón VAPER 26 Lts",
        price: 320.00,
        origin: "TAIWAN",
        capacity: "26L",
        points: "5 puntos",
        warranty: "18 meses",
        installation: "Incluida",
        description: "Este modelo de 26 litros destaca por su equilibrio entre eficiencia, confort y desempeño ya que su capacidad permite abastecer dos servicios simultáneos con un flujo constante de agua caliente, siendo una excelente opción para hogares que buscan rendimiento estable y una experiencia cómoda en el uso diario.",
        images: ["/images/catalog/Calefón VAPER 26 LTS externa.webp", "/images/catalog/Calefón VAPER 26 LTS interna.webp"],
        features: ["Equilibrio entre eficiencia y confort", "Flujo constante de agua caliente", "Rendimiento estable"]
    },
    {
        id: 9,
        name: "Calefón FLAMEX 26 Lts",
        price: 330.00,
        origin: "TAIWAN",
        capacity: "26L",
        points: "5 puntos",
        warranty: "24 meses",
        installation: "Incluida",
        description: "El calefón FLAMEX de 26 litros es una opción premium por durabilidad y resistencia; está fabricado con materiales de alta calidad que ofrece una vida útil estimada entre 10 y 12 años, manteniendo un funcionamiento estable y eficiente para tres servicios simultáneos. Una inversión accesible, pensada para quienes buscan tranquilidad y rendimiento a largo plazo.",
        images: ["/images/Calefón FLAMEX 26 LTS.webp", "/images/catalog/Calefon FLAMEX 26 litros interna.webp"],
        features: ["Opción premium y resistente", "Vida útil de 10 a 12 años", "Eficiente para tres servicios simultáneos"]
    },
    {
        id: 10,
        name: "Calefón INSTAMATIC 26 LTS",
        price: 365.00,
        origin: "TAIWAN",
        capacity: "26L",
        points: "5 puntos",
        warranty: "24 meses",
        installation: "Incluida",
        description: "Es uno de los modelos más vendidos en Loja, reconocido por su confiabilidad y rendimiento a lo largo de los años. Su capacidad permite abastecer hasta tres servicios simultáneamente, ofreciendo un suministro estable de agua caliente incluso en demandas más exigentes.",
        images: ["/images/catalog/Calefón INSTAMATIC 26 LTS externa.webp", "/images/catalog/Calefón INSTAMATIC 26 LTS interna.webp"],
        features: ["Confiabilidad y rendimiento", "Abastece hasta tres servicios simultáneamente", "Suministro estable de agua caliente"]
    },
    {
        id: 11,
        name: "Calefón ALFA 26 Litros",
        price: 300.00,
        origin: "China",
        capacity: "26L",
        points: "5 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Calefón a Gas de 26 litros Marca ALFA. Una excelente opción que combina gran capacidad con eficiencia energética para hogares con múltiples puntos de consumo.",
        images: ["/images/product-alfa-26l.webp", "/images/Calefón Instamatic 20 Lts adentro.webp"],
        features: ["Gran capacidad 26L", "Eficiencia energética", "Diseño moderno"]
    },
    {
        id: 12,
        name: "Calefón XOHA 20 Lts",
        price: 310.00,
        origin: "China",
        capacity: "20L",
        points: "4 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Calefón a Gas marca XOHA de 20 litros. Ofrece un rendimiento confiable para el uso diario en hogares que buscan calidad a un precio competitivo.",
        images: ["/images/catalog/Calefón XOHA 20 LTS externa.webp", "/images/catalog/Calefón XOHA 20 LTS interna.webp"],
        features: ["Rendimiento confiable", "Precio competitivo", "Sensor de seguridad"]
    },
    {
        id: 13,
        name: "Calefón INDRA 26 Lts",
        price: 310.00,
        origin: "China",
        capacity: "26L",
        points: "5 puntos",
        warranty: "12 meses",
        installation: "Incluida",
        description: "Calefón a Gas de Encendido Automático. El modelo INDRA de 26 litros garantiza agua caliente rápida y segura para toda la familia con un sistema de encendido eficiente.",
        images: ["/images/product-indra-26l.webp", "/images/catalog/Calefón INDRA 26 Lts interno.webp"],
        features: ["Encendido automático", "Instalación incluida", "Alta capacidad"]
    },
    {
        id: 14,
        name: "Calefactor a Gas Exterior",
        price: 285.00,
        origin: "Importado",
        capacity: "N/A",
        points: "N/A",
        warranty: "N/A",
        installation: "No incluida",
        description: "Calefactor a gas de pie para exteriores, ideal para patios, terrazas y jardines. Proporciona un ambiente cálido y confortable en espacios abiertos incluso en noches frías.",
        images: ["/images/Calefactor a Gas Exterior.webp"],
        features: ["Ideal para exteriores", "Ambiente cálido y confortable", "Fácil movilidad"]
    }
];

export default function Catalog() {
    const [filter, setFilter] = useState('Ver todos');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredProducts = filter === 'Ver todos'
        ? products
        : products.filter(p => p.capacity === filter);

    const openWhatsApp = (product: any) => {
        const message = encodeURIComponent(`Hola, estoy interesado en el Calefón ${product.name} de $${product.price.toFixed(2)}.`);
        window.open(`https://wa.me/593981410309?text=${message}`, '_blank');
    };

    return (
        <section id="productos" className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4">

                {/* Header Content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-black tracking-widest uppercase mb-6"
                    >
                        NUESTROS EQUIPOS DISPONIBLES
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-black text-brand-dark leading-[1.1] mb-6">
                        VENTA DE CALEFONES EN LOJA: <span className="text-brand-blue">EQUIPOS ORIGINALES</span>
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start justify-center space-x-3 bg-white p-6 rounded-2xl border border-blue-100 shadow-sm max-w-2xl mx-auto"
                    >
                        <Info className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                        <p className="text-left text-gray-700 font-medium italic">
                            "Distribuidores oficiales de las marcas INSTAMATIC, YANG, FLAMEX y RCA, ofrecemos calefones de distintas capacidades, seleccionados para adaptarse a las necesidades reales de cada hogar y negocio"
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {['Ver todos', '6L', '10L', '20L', '26L'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${filter === f
                                ? 'bg-brand-blue text-white shadow-xl shadow-blue-500/20 scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                                }`}
                        >
                            {f === 'Ver todos' ? 'Ver Todos' : `${f} Litros`}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setCurrentImageIndex(0);
                                }}
                            >
                                {/* Product Image */}
                                <div className="relative h-72 overflow-hidden bg-gray-100">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.warranty !== "N/A" && (
                                            <span className="px-4 py-1.5 bg-brand-red rounded-full text-[10px] font-black tracking-widest uppercase text-white shadow-lg">
                                                Garantía {product.warranty}
                                            </span>
                                        )}
                                        {product.capacity !== "N/A" && (
                                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg backdrop-blur-md border border-white/20 text-white bg-brand-blue/90">
                                                {product.capacity} - {product.installation === 'Incluida' ? 'Instalación Gratis' : ''}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl text-brand-dark group-hover:text-brand-blue transition-colors font-heading">
                                            {product.name}
                                        </h4>
                                    </div>

                                    <div className="flex items-center space-x-4 mb-6">
                                        <span className="text-3xl font-black text-brand-blue">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                            Iva incl.
                                        </span>
                                    </div>

                                    <div className="flex items-center text-sm font-bold text-gray-500 underline decoration-brand-red/30 cursor-pointer">
                                        Ver detalles del equipo
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Accessibility Modal */}
                <Transition appear show={!!selectedProduct} as={Fragment}>
                    <Dialog as="div" className="relative z-[1000]" onClose={() => setSelectedProduct(null)}>
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
                                            onClick={() => setSelectedProduct(null)}
                                            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 md:p-3 bg-gray-50/80 hover:bg-gray-100 rounded-full transition-colors backdrop-blur-sm"
                                        >
                                            <X size={20} className="text-brand-dark" />
                                        </button>

                                        {/* Image Gallery Column */}
                                        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col relative h-[400px] md:h-auto group/slider">
                                            {selectedProduct && (
                                                <div className="relative h-full w-full overflow-hidden bg-white">
                                                    <AnimatePresence mode="wait">
                                                        <motion.img
                                                            key={currentImageIndex}
                                                            src={selectedProduct.images[currentImageIndex]}
                                                            alt={`Product view ${currentImageIndex + 1}`}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </AnimatePresence>

                                                    {/* Navigation Arrows */}
                                                    <div className="absolute inset-0 flex items-center justify-between p-4 md:opacity-0 md:group-hover/slider:opacity-100 opacity-100 transition-opacity pointer-events-none">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentImageIndex((prev) => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1));
                                                            }}
                                                            className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white text-brand-dark transition-all pointer-events-auto"
                                                        >
                                                            <ChevronLeft size={24} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentImageIndex((prev) => (prev === selectedProduct.images.length - 1 ? 0 : prev + 1));
                                                            }}
                                                            className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-white text-brand-dark transition-all pointer-events-auto"
                                                        >
                                                            <ChevronRight size={24} />
                                                        </button>
                                                    </div>

                                                    {/* Dots / Indicators */}
                                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                                                        {selectedProduct.images.map((_: any, idx: number) => (
                                                            <button
                                                                key={idx}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setCurrentImageIndex(idx);
                                                                }}
                                                                className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                                                                    ? 'bg-brand-blue w-6'
                                                                    : 'bg-white/50 hover:bg-white'}`}
                                                            />
                                                        ))}
                                                    </div>

                                                    {/* Label overlay */}
                                                    <div className="absolute top-6 left-6">
                                                        <span className="bg-brand-dark/80 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/10 shadow-xl">
                                                            {currentImageIndex === 0 ? 'Vista Frontal' : currentImageIndex === 1 ? 'Componentes' : 'Empaque'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Details Column */}
                                        <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col">
                                            <div className="mb-6 md:mb-8">
                                                <span className="text-[10px] md:text-xs font-black tracking-widest text-brand-blue uppercase bg-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 inline-block">
                                                    ESPECIFICACIONES DEL EQUIPO
                                                </span>
                                                <Dialog.Title as="h3" className="text-2xl md:text-4xl font-black text-brand-dark leading-tight mb-3 md:mb-4">
                                                    {selectedProduct?.name}
                                                </Dialog.Title>
                                                <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed">
                                                    {selectedProduct?.description}
                                                </p>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                                <div className="border border-gray-100 p-4 rounded-[1.5rem] bg-gray-50/50">
                                                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Garantía</span>
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle2 size={16} className="text-brand-red" />
                                                        <span className="font-bold text-brand-dark text-xs">{selectedProduct?.warranty}</span>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-100 p-4 rounded-[1.5rem] bg-gray-50/50">
                                                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Instalación</span>
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle2 size={16} className="text-brand-blue" />
                                                        <span className="font-bold text-brand-dark text-xs">{selectedProduct?.installation}</span>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-100 p-4 rounded-[1.5rem] bg-gray-50/50">
                                                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Origen</span>
                                                    <div className="flex items-center space-x-2">
                                                        <Factory size={16} className="text-brand-blue" />
                                                        <span className="font-bold text-brand-dark text-xs">{selectedProduct?.origin}</span>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-100 p-4 rounded-[1.5rem] bg-gray-50/50">
                                                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Capacidad</span>
                                                    <span className="font-bold text-brand-dark text-xs">{selectedProduct?.capacity}</span>
                                                </div>
                                            </div>

                                            {/* Technical Benefits */}
                                            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                                                <h4 className="text-[10px] md:text-sm text-brand-dark uppercase tracking-widest border-b border-gray-100 pb-2 font-heading">Beneficios Técnicos</h4>
                                                <div className="grid grid-cols-1 gap-2 md:gap-0">
                                                    {selectedProduct?.features.map((feature: string, i: number) => (
                                                        <div key={i} className="flex items-center space-x-3">
                                                            <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                                            <span className="text-gray-700 font-medium text-xs md:text-sm">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Price & CTA */}
                                            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-100">
                                                <div className="text-center sm:text-left">
                                                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inversión Final</span>
                                                    <span className="text-3xl md:text-4xl font-black text-brand-blue px-2">${selectedProduct?.price.toFixed(2)}</span>
                                                </div>
                                                <button
                                                    onClick={() => openWhatsApp(selectedProduct)}
                                                    className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-2xl shadow-xl transition-all text-sm md:text-base"
                                                >
                                                    <MessageCircle size={20} />
                                                    <span>Consultar Disponibilidad</span>
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            </div >
        </section >
    );
}
