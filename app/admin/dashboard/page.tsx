"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api, { fetchDoctors, fetchServices, fetchFacilities, fetchHeroSlides } from "@/lib/api";
import { FaUserMd, FaStethoscope, FaHospital, FaSignOutAlt, FaPlus, FaTrash, FaTimes, FaEdit, FaImages } from "react-icons/fa";

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("doctors");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    // Load initial data
    const loadData = async () => {
        setLoading(true);
        try {
            let res;
            if (activeTab === "doctors") res = await fetchDoctors();
            else if (activeTab === "services") res = await fetchServices();
            else if (activeTab === "facilities") res = await fetchFacilities();
            else if (activeTab === "hero-slides") res = await fetchHeroSlides();
            setData(res || []);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin/login");
        } else {
            loadData();
        }
    }, [activeTab, router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/admin/login");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus data ini?")) return;
        try {
            await api.delete(`/${activeTab}/${id}`);
            loadData(); // Refresh
        } catch (err) {
            alert("Gagal menghapus data");
        }
    };

    const handleEdit = (item: any) => {
        setFormData(item);
        setEditingId(item.id);
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/${activeTab}/${editingId}`, formData);
            } else {
                await api.post(`/${activeTab}`, formData);
            }
            setShowModal(false);
            setFormData({});
            setEditingId(null);
            loadData();
        } catch (err) {
            alert("Gagal menyimpan data");
        }
    };

    const renderForm = () => {
        if (activeTab === 'doctors') return (
            <>
                <input className="w-full p-2 border rounded mb-2" placeholder="Nama Dokter" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Spesialisasi" value={formData.specialization || ''} onChange={e => setFormData({ ...formData, specialization: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Jadwal (Contoh: Senin 09:00)" value={formData.schedule || ''} onChange={e => setFormData({ ...formData, schedule: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="URL Foto" value={formData.photo_url || ''} onChange={e => setFormData({ ...formData, photo_url: e.target.value })} />
            </>
        );
        if (activeTab === 'services') return (
            <>
                <input className="w-full p-2 border rounded mb-2" placeholder="Nama Layanan" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <textarea className="w-full p-2 border rounded mb-2" placeholder="Deskripsi" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Icon Name (Ex: Stethoscope)" value={formData.icon || ''} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
            </>
        );
        if (activeTab === 'facilities') return (
            <>
                <input className="w-full p-2 border rounded mb-2" placeholder="Nama Fasilitas" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <textarea className="w-full p-2 border rounded mb-2" placeholder="Deskripsi" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="URL Gambar" value={formData.image_url || ''} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
            </>
        );
        if (activeTab === 'hero-slides') return (
            <>
                <input className="w-full p-2 border rounded mb-2" placeholder="Title (Kecil)" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="Subtitle (Besar)" value={formData.subtitle || ''} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                <textarea className="w-full p-2 border rounded mb-2" placeholder="Deskripsi" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="URL Background Image" value={formData.image_url || ''} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="CTA Primary (ex: Daftar)" value={formData.cta_primary || ''} onChange={e => setFormData({ ...formData, cta_primary: e.target.value })} />
                <input className="w-full p-2 border rounded mb-2" placeholder="CTA Secondary (ex: Hubungi)" value={formData.cta_secondary || ''} onChange={e => setFormData({ ...formData, cta_secondary: e.target.value })} />
            </>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {['doctors', 'services', 'facilities', 'hero-slides'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full flex items-center p-3 rounded-lg transition-colors capitalize ${activeTab === tab ? "bg-red-50 text-primary font-bold" : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {tab === 'doctors' && <FaUserMd className="mr-3" />}
                            {tab === 'services' && <FaStethoscope className="mr-3" />}
                            {tab === 'facilities' && <FaHospital className="mr-3" />}
                            {tab === 'hero-slides' && <FaImages className="mr-3" />}
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button onClick={handleLogout} className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">Manajemen {activeTab}</h2>
                    <button
                        onClick={() => { setFormData({}); setEditingId(null); setShowModal(true); }}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition shadow-lg"
                    >
                        <FaPlus className="mr-2" /> Tambah Data
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">Memuat Data...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600">ID</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Nama</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Info</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500">#{item.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.name || item.title}</td>
                                        <td className="px-6 py-4 text-gray-600 line-clamp-1 max-w-xs block">
                                            {item.description || item.specialization || item.subtitle || "-"}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-500 hover:text-blue-700 p-2 rounded hover:bg-blue-50"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.length === 0 && <div className="p-8 text-center text-gray-500">Belum ada data.</div>}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold capitalize">{editingId ? 'Edit' : 'Tambah'} {activeTab}</h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {renderForm()}
                                <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded mt-4 hover:bg-red-700">
                                    {editingId ? 'Simpan Perubahan' : 'Simpan'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
