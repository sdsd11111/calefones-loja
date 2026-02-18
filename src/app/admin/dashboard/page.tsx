"use client";

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { LayoutDashboard, Megaphone, LogOut, ArrowLeft, Camera, Send, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Announcement {
    id: string;
    title: string;
    description: string;
    image: string;
    ctaText: string;
    active: boolean;
}

export default function AdminDashboard() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        ctaText: 'Solicitar Oferta'
    });

    const [activeTab, setActiveTab] = useState<'announcements' | 'leads'>('announcements');
    const [leads, setLeads] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/announcements')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAnnouncements(data);
            })
            .catch(err => console.error('Error fetching announcements:', err));

        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLeads(data);
            })
            .catch(err => console.error('Error fetching leads:', err));
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const newAnnouncement = await res.json();
            setAnnouncements([newAnnouncement, ...announcements]);
            setFormData({ title: '', description: '', image: '', ctaText: 'Solicitar Oferta' });
        } catch (err) {
            console.error('Error saving announcement:', err);
        }
    };

    const toggleActive = async (id: string) => {
        const announcement = announcements.find(a => a.id === id);
        if (!announcement) return;

        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: !announcement.active })
            });

            if (res.ok) {
                setAnnouncements(announcements.map(a =>
                    a.id === id ? { ...a, active: !a.active } : a
                ));
            }
        } catch (err) {
            console.error('Error toggling active status:', err);
        }
    };

    const deleteAnnouncement = async (id: string) => {
        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setAnnouncements(announcements.filter(a => a.id !== id));
            }
        } catch (err) {
            console.error('Error deleting announcement:', err);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este lead?')) return;
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id));
            }
        } catch (err) {
            console.error('Error deleting lead:', err);
        }
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-50 flex">

                {/* Sidebar */}
                <aside className="w-64 bg-brand-dark text-white p-8 flex flex-col">
                    <Link href="/" className="flex items-center space-x-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 rotate-3">
                            CL
                        </div>
                        <span className="font-black text-lg tracking-tighter">ADMIN PANEL</span>
                    </Link>

                    <nav className="space-y-4 flex-1">
                        <button
                            onClick={() => setActiveTab('announcements')}
                            className={`w-full flex items-center space-x-3 p-4 rounded-2xl border transition-all ${activeTab === 'announcements' ? 'text-brand-blue bg-white/5 border-white/5' : 'text-gray-400 hover:text-white border-transparent'}`}
                        >
                            <Megaphone size={20} />
                            <span className="font-black text-xs uppercase tracking-widest">Anuncios</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`w-full flex items-center space-x-3 p-4 rounded-2xl border transition-all ${activeTab === 'leads' ? 'text-brand-blue bg-white/5 border-white/5' : 'text-gray-400 hover:text-white border-transparent'}`}
                        >
                            <Send size={20} />
                            <span className="font-black text-xs uppercase tracking-widest">Mensajes / Leads</span>
                        </button>
                        <Link href="/" className="flex items-center space-x-3 text-gray-500 hover:text-white p-4 rounded-2xl transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-black text-xs uppercase tracking-widest">Volver al Sitio</span>
                        </Link>
                    </nav>

                    <button
                        onClick={() => { localStorage.removeItem('admin_session'); window.location.href = '/admin/login'; }}
                        className="flex items-center space-x-3 text-brand-red p-4 rounded-2xl hover:bg-red-500/10 transition-colors mt-auto"
                    >
                        <LogOut size={20} />
                        <span className="font-black text-xs uppercase tracking-widest">Cerrar Sesión</span>
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-12 overflow-y-auto">
                    <div className="max-w-6xl">
                        <div className="mb-12">
                            <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2">
                                Gestión de <span className="text-brand-blue text-glow">{activeTab === 'announcements' ? 'Anuncios' : 'Leads'}</span>
                            </h1>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                                {activeTab === 'announcements' ? 'Publica ofertas y avisos en la landing page' : 'Mensajes recibidos desde el formulario de contacto'}
                            </p>
                        </div>

                        {activeTab === 'announcements' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Form Column */}
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 h-fit">
                                    <h2 className="text-lg font-black text-brand-dark mb-8 flex items-center space-x-2">
                                        <Megaphone className="text-brand-blue" size={20} />
                                        <span>CREAR NUEVO ANUNCIO</span>
                                    </h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-widest mb-2 ml-1">Título de la Oferta</label>
                                            <input
                                                type="text" required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-sm"
                                                placeholder="Ej. Oferta Relámpago"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-widest mb-2 ml-1">Descripción</label>
                                            <textarea
                                                required rows={2}
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-sm resize-none"
                                                placeholder="Mantenimiento preventivo con..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-widest mb-2 ml-1">Texto Botón</label>
                                            <input
                                                type="text" required
                                                value={formData.ctaText}
                                                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-bold text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-brand-dark uppercase tracking-widest mb-2 ml-1">Imagen del Anuncio</label>
                                            <div className="relative group cursor-pointer">
                                                <input
                                                    type="file" accept="image/*" onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center group-hover:bg-blue-50/50 group-hover:border-brand-blue/30 transition-all overflow-hidden">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <>
                                                            <Camera className="text-gray-300 mb-2" size={24} />
                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subir Imagen</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-brand-blue hover:bg-blue-700 text-white font-black py-4 px-8 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-95"
                                        >
                                            <Send size={18} />
                                            <span>PUBLICAR ANUNCIO</span>
                                        </button>
                                    </form>
                                </div>

                                {/* List Column */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-black text-brand-dark mb-4 flex items-center space-x-2">
                                        <LayoutDashboard className="text-brand-dark" size={20} />
                                        <span>ANUNCIOS ACTIVOS ({announcements.length})</span>
                                    </h2>

                                    <div className="space-y-4">
                                        {announcements.map((a) => (
                                            <div key={a.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center space-x-4 group">
                                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    {a.image && <img src={a.image} className="w-full h-full object-cover" alt={a.title} />}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-brand-dark leading-tight">{a.title}</h4>
                                                    <p className="text-xs text-gray-400 font-bold truncate max-w-[150px]">{a.description}</p>
                                                    <button
                                                        onClick={() => toggleActive(a.id)}
                                                        className={`mt-2 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border transition-all ${a.active ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                                                    >
                                                        {a.active ? 'Activo' : 'Inactivo'}
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => deleteAnnouncement(a.id)}
                                                    className="p-3 text-gray-300 hover:text-brand-red hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        ))}

                                        {announcements.length === 0 && (
                                            <div className="text-center py-20 bg-gray-100/50 rounded-[2.5rem] border border-dashed border-gray-200">
                                                <p className="text-gray-400 font-black text-xs uppercase tracking-widest">No hay anuncios activos</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Leads View
                            <div className="space-y-4">
                                {leads.map((lead) => (
                                    <div key={lead.id} className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="px-3 py-1 bg-blue-50 text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-full">{lead.service}</span>
                                                <span className="text-gray-300 text-xs font-bold">•</span>
                                                <span className="text-gray-400 text-xs font-bold">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-lg font-black text-brand-dark">{lead.name}</h3>
                                            <p className="text-brand-blue font-bold text-xs uppercase tracking-wider mb-2">{lead.sector}</p>
                                            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                {lead.message}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteLead(lead.id)}
                                            className="p-4 bg-red-50 text-red-400 hover:bg-brand-red hover:text-white rounded-2xl transition-all self-start md:self-center"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}

                                {leads.length === 0 && (
                                    <div className="text-center py-20 bg-gray-100/50 rounded-[2.5rem] border border-dashed border-gray-200">
                                        <p className="text-gray-400 font-black text-xs uppercase tracking-widest">No hay mensajes recientes</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </main>

            </div>
        </AdminGuard>
    );
}
