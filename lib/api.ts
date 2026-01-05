import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const fetchSections = async () => (await api.get('/sections')).data;
export const fetchHeroSlides = async () => (await api.get('/hero-slides')).data;
export const fetchServices = async () => (await api.get('/services')).data;
export const fetchFacilities = async () => (await api.get('/facilities')).data;
export const fetchDoctors = async () => (await api.get('/doctors')).data;

export default api;
