"use client";

import { motion } from "framer-motion";

interface FacilityProps {
    data: any[];
}

export default function Facilities({ data }: FacilityProps) {
    if (!data) return null;

    return (
        <section id="facilities" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-primary font-bold text-lg uppercase tracking-wide mb-2">Fasilitas Kami</h2>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Kenyamanan Anda Prioritas Kami</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((facility, index) => (
                        <motion.div
                            key={facility.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group overflow-hidden rounded-2xl shadow-lg h-64 md:h-80"
                        >
                            <img
                                src={facility.image_url}
                                alt={facility.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white text-xl font-bold mb-1">{facility.name}</h3>
                                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {facility.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
