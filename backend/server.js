const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/api'));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
});
