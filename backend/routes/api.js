const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SectionContent, Service, Doctor, Facility, User, HeroSlide } = require('../models');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeywarnohusada';

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Username tidak ditemukan.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Password salah.' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Section Content (Protected)
router.put('/sections/:name', auth, async (req, res) => {
  try {
    const section = await SectionContent.findOne({ where: { section_name: req.params.name } });
    if (!section) return res.status(404).json({ error: 'Section not found' });
    
    await section.update(req.body);
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Managing Services (Protected)
router.post('/services', auth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/services/:id', auth, async (req, res) => {
  try {
      const service = await Service.findByPk(req.params.id);
      if(!service) return res.status(404).json({error: 'Service not found'});
      await service.update(req.body);
      res.json(service);
  } catch(err) { res.status(500).json({error: err.message}); }
});

router.delete('/services/:id', auth, async (req, res) => {
  try {
      const service = await Service.findByPk(req.params.id);
      if(!service) return res.status(404).json({error: 'Service not found'});
      await service.destroy();
      res.json({message: 'Service deleted'});
  } catch(err) { res.status(500).json({error: err.message}); }
});

// Managing Facilities (Protected)
router.post('/facilities', auth, async (req, res) => {
    try {
      const facility = await Facility.create(req.body);
      res.json(facility);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
  
router.put('/facilities/:id', auth, async (req, res) => {
    try {
        const facility = await Facility.findByPk(req.params.id);
        if(!facility) return res.status(404).json({error: 'Facility not found'});
        await facility.update(req.body);
        res.json(facility);
    } catch(err) { res.status(500).json({error: err.message}); }
});
  
router.delete('/facilities/:id', auth, async (req, res) => {
    try {
        const facility = await Facility.findByPk(req.params.id);
        if(!facility) return res.status(404).json({error: 'Facility not found'});
        await facility.destroy();
        res.json({message: 'Facility deleted'});
    } catch(err) { res.status(500).json({error: err.message}); }
});

// Managing Doctors (Protected)
router.post('/doctors', auth, async (req, res) => {
    try {
      const doctor = await Doctor.create(req.body);
      res.json(doctor);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
  
router.put('/doctors/:id', auth, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if(!doctor) return res.status(404).json({error: 'Doctor not found'});
        await doctor.update(req.body);
        res.json(doctor);
    } catch(err) { res.status(500).json({error: err.message}); }
});
  
router.delete('/doctors/:id', auth, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if(!doctor) return res.status(404).json({error: 'Doctor not found'});
        await doctor.destroy();
        res.json({message: 'Doctor deleted'});
    } catch(err) { res.status(500).json({error: err.message}); }
});

// Managing Hero Slides (Protected)
router.post('/hero-slides', auth, async (req, res) => {
    try {
      const slide = await HeroSlide.create(req.body);
      res.json(slide);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
  
router.put('/hero-slides/:id', auth, async (req, res) => {
    try {
        const slide = await HeroSlide.findByPk(req.params.id);
        if(!slide) return res.status(404).json({error: 'Slide not found'});
        await slide.update(req.body);
        res.json(slide);
    } catch(err) { res.status(500).json({error: err.message}); }
});
  
router.delete('/hero-slides/:id', auth, async (req, res) => {
    try {
        const slide = await HeroSlide.findByPk(req.params.id);
        if(!slide) return res.status(404).json({error: 'Slide not found'});
        await slide.destroy();
        res.json({message: 'Slide deleted'});
    } catch(err) { res.status(500).json({error: err.message}); }
});


// Get all sections content
router.get('/sections', async (req, res) => {
  try {
    const sections = await SectionContent.findAll();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get section by name
router.get('/sections/:name', async (req, res) => {
  try {
    const section = await SectionContent.findOne({ where: { section_name: req.params.name } });
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get facilities
router.get('/facilities', async (req, res) => {
  try {
    const facilities = await Facility.findAll();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all hero slides
router.get('/hero-slides', async (req, res) => {
    try {
      const slides = await HeroSlide.findAll();
      res.json(slides);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
