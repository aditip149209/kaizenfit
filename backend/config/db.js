import { Sequelize } from "sequelize";

import configInfo from "./db.config.js";

export const db = new Sequelize(
    configInfo.DB,
    configInfo.USER,
    configInfo.PASSWORD,
    {
        host: configInfo.HOST,
        dialect: configInfo.DIALECT,
        logging: false,
    }
);


export const connectDB = async () => {
    try {
      await db.authenticate(); // Test connection
      console.log('_/ Successfully connected to database');
      const shouldForceSync = process.env.DB_SYNC_FORCE === 'true';
      const shouldAlterSync = process.env.DB_SYNC_ALTER === 'true';

      if (shouldForceSync) {
        await db.sync({ force: true });
        console.log('_/ Database synced with force=true');
      } else if (shouldAlterSync) {
        await db.sync({ alter: true });
        console.log('_/ Database synced with alter=true');
      } else {
        await db.sync();
        console.log('_/ Database synced in safe mode (no force/alter)');
      }
    } catch (error) {
      console.error('X Error syncing database:', error.message);
      console.error(error); // Full error stack trace
      throw error;
    }
  };
  
export default {
    db, connectDB
};


