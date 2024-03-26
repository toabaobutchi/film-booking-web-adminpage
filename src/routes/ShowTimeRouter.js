const express = require('express')
const route = express.Router()
const showTimeController = require('../controllers/ShowTimeController')

// lấy dữ liệu show-time của một phim
// GET: /api/v1/admin/show-time/films/{filmId}
route.get('/films/:filmId', showTimeController.index)

// lấy dữ liệu show-time từ 1 phòng
// GET: /api/v1/admin/show-time/rooms/{roomId}
route.get('/rooms/:roomId', showTimeController.getForRoom)

module.exports = route