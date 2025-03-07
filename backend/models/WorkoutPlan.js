// backend/models/WorkoutPlan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WorkoutPlan = sequelize.define('WorkoutPlan', {
  PlanID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  Description: {          // add
    type: DataTypes.TEXT,
    allowNull: true
  },
  TrainerID: {
    type: DataTypes.INTEGER,
    allowNull: true,   // Can be null if no trainer
  },
  Name: {      // add
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'WorkoutPlans'   // match the database name.
});

module.exports = WorkoutPlan;
