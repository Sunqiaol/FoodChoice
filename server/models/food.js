const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');


const food = db.define('food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.JSON, // Store the array of strings as JSON
        allowNull: true, // Make it required (optional)
    },
    ingredients: {
        type: DataTypes.JSON, // JSON column for storing array of strings
        allowNull: true, // Make it required
    },

    


}, {
    tableName: 'food', // Explicitly define the table name
    timestamps: false,  // Disable timestamps if not needed
});

module.exports = food;