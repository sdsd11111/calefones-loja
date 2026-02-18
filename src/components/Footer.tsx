import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-16 md:mb-20 text-center md:text-left">

                    {/* Col 1: Bio & Trust */}
                    <div className="flex flex-col items-center md:items-start space-y-8">
                        <div className="flex flex-col items-center md:items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg relative">
                                <Image
                                    src="/Logo.jpg"
                                    alt="Calefones Loja Logo"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-black text-2xl uppercase tracking-tighter">Calefones <span className="text-brand-blue">Loja</span></span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm font-medium">
                            Calefones Loja - Especialistas en Venta, Mantenimiento y Reparación de sistemas de agua caliente.
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-4">
                            <div className="text-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 flex-1">
                                <span className="block text-2xl font-black text-brand-blue">+1,000</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Hogares Servidos</span>
                            </div>
                            <div className="text-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 flex-1">
                                <span className="block text-2xl font-black text-brand-red">20+</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Años Expertos</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Navigation */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-gray-500">Explorar</h4>
                        <ul className="space-y-4 flex flex-col items-center md:items-start">
                            {['Inicio', 'Productos', 'Servicios', 'Mantenimiento', 'Contacto'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-brand-blue font-bold transition-all flex items-center group justify-center md:justify-start">
                                        <div className="w-0 group-hover:w-2 h-0.5 bg-brand-blue mr-0 group-hover:mr-2 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Brand Partners */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 text-gray-500">Marcas Autorizadas</h4>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-white rounded-xl flex items-center justify-center h-20 sm:h-24 shadow-inner overflow-hidden p-2">
                                <img src="/images/logo-instamatic.webp" alt="Instamatic Documented" className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="bg-white rounded-xl flex items-center justify-center h-20 sm:h-24 shadow-inner overflow-hidden p-2">
                                <img src="/images/logo-yang.webp" alt="YANG Technology" className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest mt-4">Distribución y Soporte Técnico</p>
                    </div>

                    {/* Col 4: Location Support */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-gray-500">Atención Directa</h4>
                        <div className="space-y-6 flex flex-col items-center md:items-start">
                            <div className="flex flex-col items-center md:items-start space-y-3 text-sm">
                                <span className="text-gray-300 font-medium text-center md:text-left">Calle Olmedo entre Azuay y Mercadillo (Junto a San Sebastian), Loja, Ecuador.</span>
                            </div>
                            <div className="p-4 bg-brand-blue/10 rounded-2xl border border-brand-blue/20 flex items-center space-x-3 w-fit md:w-auto">
                                <ShieldCheck className="text-brand-blue shrink-0" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 text-left">Certificación <br /> Técnica NTE INEN 2569</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[10px] sm:text-xs font-medium text-center md:text-left">
                        Diseñado por <a href="https://cesarreyesjaramillo.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-black hover:text-white transition-colors">Cesar Reyes</a> | <span className="font-black text-gray-400">Calefones Loja {new Date().getFullYear()}</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-600">
                        <Link href="/terminos" className="hover:text-brand-blue transition-colors">Legislación Local</Link>
                        <Link href="/terminos" className="hover:text-brand-blue transition-colors">Garantías</Link>
                        <Link href="/privacidad" className="hover:text-brand-blue transition-colors">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
