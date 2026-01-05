"use client";

import { motion } from "framer-motion";

interface DoctorProps {
    data: any[];
}

export default function Doctors({ data }: DoctorProps) {
    if (!data) return null;

    return (
        <section id="doctors" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-primary font-bold text-lg uppercase tracking-wide mb-2">Tim Dokter</h2>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tenaga Medis Profesional</h1>
                </motion.div>

                <div className="relative overflow-hidden w-full">
                    <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-secondary/30 via-secondary/15 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-secondary/30 via-secondary/15 to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20 // Adjust speed here
                        }}
                    >
                        {[...data, ...data].map((doctor, index) => (
                            <div
                                key={`${doctor.id}-${index}`}
                                className="w-[300px] flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={doctor.photo_url}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                                    <p className="text-primary font-medium mb-4">{doctor.specialization}</p>
                                    <div className="bg-red-50 py-2 px-4 rounded-lg inline-block">
                                        <p className="text-sm text-gray-700 font-semibold">Jadwal Praktik</p>
                                        <p className="text-sm text-gray-600">{doctor.schedule}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
