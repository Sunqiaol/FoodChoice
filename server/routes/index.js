const express = require('express');
const app = express();
const food = require('./food');


app.use('/food',food);




module.exports = app;