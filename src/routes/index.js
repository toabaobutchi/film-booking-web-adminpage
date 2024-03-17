const express = require('express')
const filmRouter = require('./FilmRouter')
const roomRouter = require('./RoomRouter')

const route = express.Router()

route.use('/films', filmRouter)
route.use('/rooms', roomRouter)

module.exports = route