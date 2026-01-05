"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Beranda", href: "#hero" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Layanan", href: "#services" },
    { name: "Fasilitas", href: "#facilities" },
    { name: "Dokter", href: "#doctors" },
    { name: "Jadwal", href: "#schedule" },
    { name: "Kontak", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.substring(1));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100"
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-primary tracking-wide">
                    Warno<span className="text-gray-800">Husada</span>
                </div>

                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <li key={link.name} className="relative">
                                <Link
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                                        setActiveSection(link.href.substring(1));
                                    }}
                                    className={`relative text-sm font-semibold transition-colors duration-300 ${isActive ? "text-primary glow-text" : "text-gray-600 hover:text-primary"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-0 top-full mt-1 w-full h-[2px] bg-primary shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Button can go here */}
            </div>
        </motion.nav>
    );
}
