const express = require('express')
const route = express.Router()
const filmModel = require('../../models/Film')


// GET /api/v1/admin/films
// get all films
route.get('/', async (req, res) => { 
    try {
        const [result] = await filmModel.getFilms()
        res.json(result);
    }
    catch(err) {
        console.log("Error\'s thrown at { FilmRoute/index.js/route.get(\'/\') }: ", err)
    }
})

// POST /api/v1/admin/films
route.post('/', async (req, res) => {
    try {
        const data = req.body
        
    }
    catch (err) {
        
    }
    
})

module.exports = route