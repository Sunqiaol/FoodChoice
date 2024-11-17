const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/getAllFoods',async(req,res)=>{
    try{
        const foods = await Food.findAll();
        res.status(200).json(foods);
    }
    catch(error){
        console.error('Error Fetching Foods', error);
        res.status(500).json({ error: 'An error occurred while fetching Food' });
    }
});


module.exports = router;