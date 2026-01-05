"use client";

import { motion } from "framer-motion";

interface AboutProps {
    data: any;
}

export default function About({ data }: AboutProps) {
    if (!data) return null;

    const { title, subtitle, description, image_url } = data;

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <img
                            src={image_url}
                            alt="About Us"
                            className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h3 className="text-primary font-bold text-lg mb-2 uppercase tracking-wide">{title}</h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{subtitle}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {description}
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Pelayanan Profesional & Ramah",
                                "Fasilitas Modern & Lengkap",
                                "Biaya Terjangkau",
                                "Lokasi Strategis"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <span className="w-6 h-6 mr-3 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
