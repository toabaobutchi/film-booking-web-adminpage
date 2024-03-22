const express = require('express')
const route = express.Router()
const filmController = require('../../controllers/FilmController')
// const multer = require('multer')
// const upload = multer({ dest: './src/uploads/' })
const upload = require('../../configs/upload')

// GET /api/v1/admin/films
route.get('/', filmController.index)

// POST /api/v1/admin/films
route.post('/', upload.single("poster"), filmController.create)

// PUT /api/v1/admin/films
route.put('/:id', filmController.update)

// PUT /api/v1/admin/films/{id}
route.delete('/:id', filmController.delete)

// GET /api/v1/admin/films/{id}
route.get('/:id', filmController.find)

module.exports = route