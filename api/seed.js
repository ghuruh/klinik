const { sequelize, SectionContent, Service, Doctor, Facility, User, HeroSlide } = require('./models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset database
    console.log('Database synced.');

    // 1. Hero Section
    await SectionContent.create({
      section_name: 'hero',
      title: 'Klinik Pratama Rawat Inap Warno Husada',
      subtitle: 'Layanan Kesehatan Profesional & Terpercaya',
      description: 'Kami hadir memberikan pelayanan kesehatan terbaik dengan fasilitas lengkap dan tenaga medis berpengalaman untuk Anda dan keluarga.',
      image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop', // Modern clinic image
      extra_data: {
        cta_primary: 'Daftar Online',
        cta_secondary: 'Hubungi Kami'
      }
    });

    // 2. About Section
    await SectionContent.create({
      section_name: 'about',
      title: 'Tentang Kami',
      subtitle: 'Dedikasi untuk Kesehatan Anda',
      description: 'Klinik Pratama Rawat Inap Warno Husada didirikan dengan visi menjadi pusat layanan kesehatan terdepan yang mengutamakan kualitas, kenyamanan, dan kepercayaan pasien. Kami memiliki fasilitas rawat inap yang modern dan didukung oleh tim dokter serta perawat yang profesional.',
      image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop'
    });

    // 3. Contact Section (Address & Info)
    await SectionContent.create({
      section_name: 'contact',
      title: 'Kontak & Lokasi',
      description: 'Hubungi kami untuk informasi lebih lanjut atau kunjungi klinik kami.',
      extra_data: {
        address: 'Jl. Raya Warno Husada No. 123, Kota Sehat',
        phone: '+62 812 3456 7890',
        email: 'info@warnohusada.com',
        map_url: 'https://maps.google.com/?q=-6.175392,106.827153'
      }
    });

    // 4. Services
    const services = [
      { name: 'Poli Umum', description: 'Pemeriksaan kesehatan umum oleh dokter berpengalaman.', icon: 'Stethoscope' },
      { name: 'Poli Gigi', description: 'Perawatan kesehatan gigi dan mulut yang komprehensif.', icon: 'Tooth' },
      { name: 'Rawat Inap', description: 'Fasilitas rawat inap 24 jam dengan kamar yang nyaman.', icon: 'Bed' },
      { name: 'Laboratorium', description: 'Layanan pemeriksaan laboratorium lengkap dan akurat.', icon: 'Flask' },
      { name: 'UGD 24 Jam', description: 'Pelayanan gawat darurat siap siaga 24 jam.', icon: 'Ambulance' }
    ];
    await Service.bulkCreate(services);

    // 5. Facilities
    const facilities = [
      { name: 'Kamar VIP', description: 'Kamar rawat inap dengan fasilitas premium.', image_url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Ruang Tunggu', description: 'Ruang tunggu luas, bersih, dan ber-AC.', image_url: 'https://images.unsplash.com/photo-1517581177697-a53316d353ec?q=80&w=1000&auto=format&fit=crop' },
      { name: 'Apotek Lengkap', description: 'Menyediakan obat-obatan lengkap dan terjamin.', image_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop' }
    ];
    await Facility.bulkCreate(facilities);

    // 6. Doctors
    const doctors = [
      { name: 'dr. Andi Wijaya', specialization: 'Dokter Umum', schedule: 'Senin - Jumat: 08:00 - 14:00', photo_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop' },
      { name: 'drg. Siti Aminah', specialization: 'Dokter Gigi', schedule: 'Rabu - Sabtu: 16:00 - 20:00', photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop' },
      { name: 'dr. Budi Santoso', specialization: 'Spesialis Anak', schedule: 'Senin, Kamis: 10:00 - 13:00', photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop' }
    ];
    await Doctor.bulkCreate(doctors);

    // 7. Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    // 8. Hero Slides
    const slides = [
       {
         title: 'SELAMAT DATANG DI',
         subtitle: 'Klinik Pratama Warno Husada',
         description: 'Melayani dengan hati, fasilitas modern, dan tenaga medis profesional.',
         image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
         cta_primary: 'Daftar Online',
         cta_secondary: 'Hubungi Kami'
       },
       {
         title: 'LAYANAN TERBAIK',
         subtitle: 'Fasilitas Rawat Inap Modern',
         description: 'Kenyamanan pasien adalah prioritas kami dengan fasilitas kamar yang bersih dan lengkap.',
         image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0674e31?auto=format&fit=crop&q=80',
         cta_primary: 'Lihat Fasilitas',
         cta_secondary: 'Jadwal Dokter'
       }
    ];
    await HeroSlide.bulkCreate(slides);

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
