"use client";

import { motion } from "framer-motion";
import * as Icons from "react-icons/fa"; // Simplified for dynamic icon loading

interface ServiceProps {
    data: any[];
}

export default function Services({ data }: ServiceProps) {
    if (!data) return null;

    return (
        <section id="services" className="py-20 bg-secondary/50">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-primary font-bold text-lg uppercase tracking-wide mb-2">Layanan Kami</h2>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Solusi Kesehatan Terpadu</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((service, index) => {
                        // Dynamic Icon handling (basic fallback)
                        // In real app, map string to actual component or use library
                        const IconComponent = (Icons as any)[`Fa${service.icon}`] || Icons.FaStethoscope;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
                            >
                                <div className="w-16 h-16 mx-auto bg-red-50 text-primary rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <IconComponent />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
