import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function TopBar() {
    return (
        <div className="bg-brand-dark text-white/90 py-2.5 border-b border-white/5 text-[11px] font-bold uppercase tracking-wider">
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Left: Location */}
                <div className="flex items-center space-x-2 group cursor-pointer">
                    <MapPin size={14} className="text-brand-blue group-hover:text-brand-red transition-colors" />
                    <span className="hidden sm:inline">Calle Olmedo entre Azuay y Mercadillo, Loja</span>
                    <span className="sm:hidden">Calle Olmedo, Loja</span>
                </div>

                {/* Right: Contact & Socials */}
                <div className="flex items-center space-x-6">

                    <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone size={14} className="text-brand-blue" />
                            <span className="hidden md:inline">Atención de Emergencias Loja: 0994454838</span>
                            <span className="md:hidden">Emergencias: 0994454838</span>
                        </div>

                        <div className="w-px h-3 bg-white/20" />

                        <div className="flex items-center space-x-2">
                            <Mail size={14} className="text-brand-blue" />
                            <span className="lowercase font-medium">servicios@calefonesloja.com</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                            <Instagram size={16} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                            <Facebook size={16} />
                        </a>
                        <a href="https://wa.me/593994454838" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                            <MessageCircle size={16} />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
