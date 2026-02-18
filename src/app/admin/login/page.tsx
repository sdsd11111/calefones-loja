"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'CalefonesLoja' && password === 'Contraseña123') {
            localStorage.setItem('admin_session', 'active');
            router.push('/admin/dashboard');
        } else {
            setError('Credenciales incorrectas. Verifique e intente nuevamente.');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link href="/" className="inline-flex items-center space-x-2 text-brand-dark font-black mb-8 hover:text-brand-blue transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest">Regresar al Inicio</span>
                </Link>

                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/10 border border-gray-100">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-500/20 rotate-3">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Panel de <span className="text-brand-blue">Control</span></h1>
                        <p className="text-gray-400 text-sm font-bold mt-2">Acceso exclusivo para administradores</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start space-x-3 mb-8"
                        >
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p className="text-xs font-black uppercase tracking-tight leading-relaxed">{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-[0.2em] mb-3 ml-1">Usuario</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-sm"
                                    placeholder="Usuario"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-[0.2em] mb-3 ml-1">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brand-dark hover:bg-black text-white font-black py-5 px-8 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-400 text-[10px] font-black uppercase tracking-widest mt-8">
                    Calefones Loja | Seguridad Integral
                </p>
            </motion.div>
        </main>
    );
}
