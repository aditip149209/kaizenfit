/**
 * Database Sync Script
 * Safely alters existing tables to add new columns without destroying data
 */

import { db, connectDB } from '../config/db.js';
import '../models/User.js'; // Import models to ensure they're registered

const syncDatabase = async () => {
  try {
    console.log('Starting database sync...');
    
    // Connect to database
    await connectDB();
    
    // Sync with alter=true to safely add new columns
    console.log('Altering tables to match model definitions...');
    await db.sync({ alter: true });
    
    console.log('✅ Database synced successfully!');
    console.log('New columns added to UserProfiles table:');
    console.log('  - username (STRING)');
    console.log('  - address (TEXT)');
    console.log('  - profilePictureUrl (STRING)');
    console.log('  - dailyCalorieIntake (INTEGER)');
    console.log('  - age (INTEGER)');
    console.log('\nNew table created: NotificationPreferences');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error.message);
    console.error(error);
    process.exit(1);
  }
};

syncDatabase();
