const express = require('express')
const route = express.Router()
const filmModel = require('../../models/Film')


// GET /api/v1/films
// get all films
route.get('/', async (req, res) => { 
    try {
        const [result] = await filmModel.getFilms()
        res.json(result)
    }
    catch(err) {
        console.log(err)
    }
})

route.post('/', async (req, res) => {
    res.json(req.body);
})

module.exports = route