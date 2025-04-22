import { Sequelize } from "sequelize";

import configInfo from "./db.config.js";
import { config } from "dotenv";

const sequelize = new Sequelize(
    configInfo.DB,
    configInfo.USER,
    configInfo.PASSWORD,
    {
        host: configInfo.HOST,
        dialect: configInfo.DIALECT, 
        logging: false,
    }
);

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Successfully connected to database'),
        await sequelize.sync();
        console.log("Database and tables synced")
    }
    catch(error){
        console.error("error connecting/syncing to database: ", error.message);
        console.error(error);
    }
}

export {sequelize, connectDB};

