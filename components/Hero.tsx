"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHeroSlides } from "@/lib/api";

export default function Hero() {
    const [slides, setSlides] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetchHeroSlides().then((res) => {
            if (res.length > 0) setSlides(res);
            // Fallback to static if no slides? Or maybe default slides
        });
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    if (slides.length === 0) return null; // Or a loading skeleton

    const slide = slides[current];

    return (
        <section className="relative h-screen overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
                        <div className="max-w-2xl text-white">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg font-bold uppercase tracking-wider mb-2 text-red-400"
                            >
                                {slide.title}
                            </motion.h2>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                            >
                                {slide.subtitle}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="text-lg text-gray-200 mb-8"
                            >
                                {slide.description}
                            </motion.p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition transform hover:-translate-y-1">
                                    {slide.cta_primary}
                                </button>
                                <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition transform hover:-translate-y-1">
                                    {slide.cta_secondary}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${current === idx ? "bg-red-500 w-8" : "bg-white/50"}`}
                    />
                ))}
            </div>
        </section>
    );
}
