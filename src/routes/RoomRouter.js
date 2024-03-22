const express = require('express')
const route = express.Router()
const roomController = require('../controllers/RoomController')

// GET: /api/v1/admin/rooms
route.get('/', roomController.index)

// POST: /api/v1/admin/rooms
route.post('/', roomController.create)

// PUT: /api/v1/admin/rooms/{id}
route.put('/:id', roomController.update)

// DELETE: /api/v1/admin/rooms/{id}
route.delete('/:id', roomController.delete)

// GET: /api/v1/admin/rooms/{id}
route.get('/:id', roomController.find)

module.exports = route;