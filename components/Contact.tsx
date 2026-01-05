"use client";

import { motion } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

interface ContactProps {
    data: any;
}

export default function Contact({ data }: ContactProps) {
    if (!data) return null;
    const { description, extra_data } = data;
    const { address, phone, email, map_url } = extra_data || {};

    return (
        <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/3"
                    >
                        <div className="text-2xl font-bold text-white tracking-wide mb-6">
                            Warno<span className="text-primary">Husada</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {description}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaWhatsapp className="text-xl" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                <FaEnvelope className="text-xl" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:w-1/3"
                    >
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-primary inline-block pb-2">Kontak Kami</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                                <span>{address}</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-3 text-primary" />
                                <span>{phone}</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-primary" />
                                <span>{email}</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Map Embed Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:w-1/3 h-64 bg-gray-800 rounded-xl overflow-hidden relative"
                    >
                        {/* Using a static map image or iframe */}
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666427009761!2d106.82496411476886!3d-6.175110295529155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e76f4c7d%3A0x7z!2zSmw!5e0!3m2!1sen!2sid!4v1614000000000!5m2!1sen!2sid"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Klinik Pratama Rawat Inap Warno Husada. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
