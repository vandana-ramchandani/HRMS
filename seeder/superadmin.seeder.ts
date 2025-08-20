import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../models/user.model';
import { hashPassword } from '../utils/helpers/encrypt-decrypt';
import connectDB from '../config/db';

dotenv.config();

export const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const existingSuperAdmin = await UserModel.findOne({ role: 'superAdmin' });
    if (existingSuperAdmin) {
      console.log('Superadmin already exists.');
      return;
    }

    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

    if (!superAdminPassword) {
      throw new Error('SUPERADMIN_PASSWORD is not defined in the environment variables.');
    }

    const hashedPassword = await hashPassword(superAdminPassword);

    const superAdmin = new UserModel({
      name:"Super Admin",
      email: 'superadmin@example.com',
      password: hashedPassword,
      role: 'superAdmin',
    });

    await superAdmin.save();
    console.log('Superadmin created successfully.');
  } catch (error) {
    console.error('Error seeding superadmin:', error);
  } 
  // finally {
    // await mongoose.disconnect();
  // }
};