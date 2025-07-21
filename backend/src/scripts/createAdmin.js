import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AuthUser } from '../models/auth-user.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await AuthUser.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    await AuthUser.create({
      username: process.env.ADMIN_USERNAME,
      email: 'admin@counsel.com',
      password: hashedPassword
    });

    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser(); 