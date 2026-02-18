import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-white py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center space-x-2 text-brand-blue font-black mb-12 hover:translate-x-1 transition-transform">
                    <ArrowLeft size={20} />
                    <span>REGRESAR AL INICIO</span>
                </Link>

                <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-brand-blue/10 rounded-2xl">
                        <Lock className="text-brand-blue" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Políticas de <span className="text-brand-blue">Privacidad</span></h1>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-8 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">1. Recopilación de Información</h2>
                        <p>Recopilamos información personal básica (Nombre, Sector y Teléfono) únicamente cuando usted decide enviarnos una solicitud de asistencia técnica a través de nuestros formularios o vía WhatsApp.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">2. Uso de los Datos</h2>
                        <p>Sus datos son utilizados exclusivamente para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Coordinar visitas técnicas a su domicilio en Loja.</li>
                            <li>Responder consultas sobre presupuestos de reparación o venta.</li>
                            <li>Enviar recordatorios de mantenimiento preventivo si usted lo solicita.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">3. Protección de Datos</h2>
                        <p>Calefones Loja no comparte, vende ni alquila su información personal a terceros. Mantenemos estrictas medidas de seguridad para proteger sus datos de accesos no autorizados.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">4. Cookies</h2>
                        <p>Este sitio puede utilizar cookies esenciales para mejorar su experiencia de navegación. No utilizamos cookies de rastreo publicitario de terceros.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-brand-dark mb-4 uppercase tracking-tight">5. Contacto</h2>
                        <p>Si tiene alguna duda sobre nuestra política de privacidad, puede contactarnos a través de servicios@calefonesloja.com o visitarnos en nuestro centro técnico en la Calle Olmedo.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
