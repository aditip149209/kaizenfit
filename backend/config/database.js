const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Or another dialect like 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
