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
      await db.sync({ force: true }); // Sync tables
      console.log('_/ Database and tables synced');
    } catch (error) {
      console.error('X Error syncing database:', error.message);
      console.error(error); // Full error stack trace
    }
  };
  
export default {
    db, connectDB
};


