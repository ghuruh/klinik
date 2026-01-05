import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Facilities from "@/components/Facilities";
import Doctors from "@/components/Doctors";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";

// Data Fetching Helper
async function getSections() {
  try {
    const res = await fetch("http://localhost:5000/api/sections", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return [];
  }
}

async function getServices() {
  try {
    const res = await fetch("http://localhost:5000/api/services", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

async function getFacilities() {
  try {
    const res = await fetch("http://localhost:5000/api/facilities", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch facilities:", error);
    return [];
  }
}

async function getDoctors() {
  try {
    const res = await fetch("http://localhost:5000/api/doctors", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}

export default async function Home() {
  // Parallel fetching
  const [sections, services, facilities, doctors] = await Promise.all([
    getSections(),
    getServices(),
    getFacilities(),
    getDoctors(),
  ]);

  // Filter sections
  const heroData = sections.find((s: any) => s.section_name === "hero");
  const aboutData = sections.find((s: any) => s.section_name === "about");
  const contactData = sections.find((s: any) => s.section_name === "contact");

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About data={aboutData} />
      <Services data={services} />
      <Facilities data={facilities} />
      <Doctors data={doctors} />
      <Schedule />
      <Contact data={contactData} />
    </main>
  );
}
