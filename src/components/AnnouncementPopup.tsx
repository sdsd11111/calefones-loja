"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Tag } from 'lucide-react';

interface Announcement {
    id: string;
    title: string;
    description: string;
    image: string;
    ctaText: string;
    active: boolean;
}

export default function AnnouncementPopup() {
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch('/api/announcements')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const activeOne = data.find(a => a.active);
                    if (activeOne) {
                        setAnnouncement(activeOne);
                        const timer = setTimeout(() => setIsVisible(true), 1500);
                        return () => clearTimeout(timer);
                    }
                }
            })
            .catch(err => console.error('Error fetching active announcement:', err));
    }, []);

    if (!announcement) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-[100] w-auto sm:w-[380px]"
                >
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/20 border border-gray-100 overflow-hidden relative group">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-brand-dark hover:bg-brand-red hover:text-white shadow-lg transition-all"
                        >
                            <X size={16} />
                        </button>

                        {/* Content Flex */}
                        <div className="flex flex-col">

                            {/* Image Header */}
                            <div className="h-44 relative overflow-hidden">
                                <img
                                    src={announcement.image}
                                    alt={announcement.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <h4 className="text-xl font-black text-brand-dark leading-tight mb-2 uppercase tracking-tighter">
                                    {announcement.title}
                                </h4>
                                <p className="text-gray-500 text-sm font-bold leading-relaxed mb-6 line-clamp-2">
                                    {announcement.description}
                                </p>

                                <button
                                    onClick={() => window.open(`https://wa.me/593994454838?text=Hola! Me interesa el anuncio: ${announcement.title}`, '_blank')}
                                    className="w-full bg-brand-blue hover:bg-blue-700 text-white font-black py-4 px-6 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 transition-all"
                                >
                                    <MessageCircle size={18} />
                                    <span>{announcement.ctaText}</span>
                                </button>
                            </div>

                        </div>

                        {/* Progress bar timer (visual only) */}
                        <div className="h-1 bg-gray-100 w-full">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 10, ease: 'linear' }}
                                onAnimationComplete={() => setIsVisible(false)}
                                className="h-full bg-brand-blue"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
