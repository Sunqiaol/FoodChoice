const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');


const food = db.define('food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
      }


}, {
    tableName: 'food', // Explicitly define the table name
    timestamps: false,  // Disable timestamps if not needed
});

module.exports = food;