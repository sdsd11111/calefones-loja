import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TerminosPage() {
    return (
        <main className="min-h-screen bg-white py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center space-x-2 text-brand-blue font-black mb-12 hover:translate-x-1 transition-transform">
                    <ArrowLeft size={20} />
                    <span>REGRESAR AL INICIO</span>
                </Link>

                <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-brand-blue/10 rounded-2xl">
                        <ShieldCheck className="text-brand-blue" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Términos y <span className="text-brand-blue">Condiciones</span></h1>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-8 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">1. Aceptación de los Términos</h2>
                        <p>Al acceder y utilizar el sitio web de Calefones Loja, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">2. Servicios Técnicos y Garantías</h2>
                        <p>Calefones Loja ofrece servicios de instalación, mantenimiento y reparación de calefones en la ciudad de Loja. Todas las reparaciones realizadas con repuestos originales cuentan con una garantía limitada, la cual será especificada en la factura de servicio.</p>
                        <p>La garantía no cubre daños causados por mal uso, variaciones extremas en la presión de agua fuera de los rangos técnicos del equipo, o manipulación por personal no autorizado.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">3. Propiedad Intelectual</h2>
                        <p>Todo el contenido presente en este sitio, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de Calefones Loja y está protegido por las leyes de propiedad intelectual de Ecuador.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">4. Limitación de Responsabilidad</h2>
                        <p>Calefones Loja no se hace responsable por daños indirectos derivados del uso de sus servicios si estos fueron causados por instalaciones previas deficientes o condiciones estructurales del inmueble que no fueron reportadas al técnico.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">5. Modificaciones</h2>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
