"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 text-center">
            <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Halaman Tidak Ditemukan</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                    Kembali
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-red-700 transition-colors"
                >
                    Ke Beranda
                </Link>
                <Link
                    href="/admin/dashboard"
                    className="px-6 py-3 border border-primary text-primary rounded-lg font-bold hover:bg-red-50 transition-colors"
                >
                    Ke Dashboard Admin
                </Link>
            </div>
        </div>
    );
}
