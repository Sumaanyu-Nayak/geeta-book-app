require('dotenv').config();
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email: 'admin@geeta.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Name:', existingAdmin.name);
      await mongoose.connection.close();
      return;
    }

    // Create default admin user
    const adminUser = new AdminUser({
      name: 'Admin User',
      email: 'admin@geeta.com',
      password: 'admin123', // Will be hashed automatically
      role: 'super-admin',
      isActive: true,
    });

    await adminUser.save();

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:    admin@geeta.com');
    console.log('Password: admin123');
    console.log('Role:     super-admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
