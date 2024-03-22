const express = require('express')
const filmRouter = require('./FilmRouter')
const roomRouter = require('./RoomRouter')
const categoryRouter = require('./CategoryRouter')

const route = express.Router()

route.use('/films', filmRouter)
route.use('/rooms', roomRouter)
route.use('/categories', categoryRouter)

module.exports = route 