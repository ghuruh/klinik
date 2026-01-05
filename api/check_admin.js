const { User, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

const checkAdmin = async () => {
  try {
    const user = await User.findOne({ where: { username: 'admin' } });
    if (!user) {
      console.log('User admin NOT found. Creating...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin created.');
    } else {
      console.log('User admin found.');
      // Verify password
      const isMatch = await bcrypt.compare('admin123', user.password);
      console.log('Password match for "admin123":', isMatch);
      
      if (!isMatch) {
         console.log('Resetting password...');
         const hashedPassword = await bcrypt.hash('admin123', 10);
         await user.update({ password: hashedPassword });
         console.log('Password reset to admin123');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
     process.exit();
  }
};

checkAdmin();
