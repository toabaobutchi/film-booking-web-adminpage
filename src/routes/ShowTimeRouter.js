const express = require('express')
const route = express.Router()
const showTimeController = require('../controllers/ShowTimeController')

// lấy dữ liệu show-time của một phim
// GET: /api/v1/admin/show-time/films/{filmId}
route.get('/films/:filmId', showTimeController.index)

// lấy dữ liệu show-time từ 1 phòng
// GET: /api/v1/admin/show-time/rooms/{roomId}
route.get('/rooms/:roomId', showTimeController.getForRoom)

// POST: /api/v1/admin/show-time
route.post('/', showTimeController.addShowtime)

// GET: /api/v1/admin/show-time/{id}
route.get('/:id', showTimeController.find)

// DELETE: /api/v1/admin/show-time/{id}
route.delete('/:id', showTimeController.delete)

module.exports = route