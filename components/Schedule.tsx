"use client";

import { motion } from "framer-motion";

export default function Schedule() {
    return (
        <section id="schedule" className="py-20 relative overflow-hidden text-white">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                    alt="Schedule Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 to-red-900/90 mix-blend-multiply" />
            </div>

            {/* Abstract Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/20 rounded-full blur-3xl z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                            Ingin Berobat? <br /> Daftar Online Lebih Mudah & Cepat
                        </h2>
                        <p className="text-red-100 text-lg mb-8 leading-relaxed">
                            Hindari antrean panjang dengan mendaftar secara online. Pilih dokter dan jadwal sesuai kebutuhan Anda.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="bg-white/20 p-2 rounded-full mr-4">🗓️</span>
                                <span>Pilih Jadwal Fleksibel</span>
                            </li>
                            <li className="flex items-center">
                                <span className="bg-white/20 p-2 rounded-full mr-4">⚡</span>
                                <span>Proses Cepat & Tanpa Ribet</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/3 bg-white text-gray-900 p-8 rounded-2xl shadow-2xl"
                    >
                        <h3 className="text-xl font-bold mb-6 text-center">Jadwal Operasional Klinik</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="font-semibold text-gray-600">Senin - Jumat</span>
                                <span className="text-primary font-bold">24 Jam</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="font-semibold text-gray-600">Sabtu - Minggu</span>
                                <span className="text-primary font-bold">24 Jam</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="font-semibold text-gray-600">UGD</span>
                                <span className="text-primary font-bold">Siap 24 Jam</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
                            Daftar Sekarang
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
