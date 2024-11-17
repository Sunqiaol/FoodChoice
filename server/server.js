const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes//index');
const sequelize = require('./config/db');
const app = express();
require('dotenv').config();
// Middleware
app.use(cors());



// Routes
app.use('/api', apiRoutes);


// Start the server
const PORT = process.env.PORT || 3307;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

module.exports = app;