"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="text-3xl font-bold text-primary tracking-wide">
                    Warno<span className="text-gray-800">Husada</span>
                </div>
            </motion.div>

            <motion.div
                className="w-16 h-16 border-4 border-red-200 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 text-gray-500 font-medium"
            >
                Memuat Halaman...
            </motion.p>
        </div>
    );
}
