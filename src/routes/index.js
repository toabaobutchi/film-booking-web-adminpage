const express = require('express')
const filmRouter = require('./FilmRouter')
const roomRouter = require('./RoomRouter')
const categoryRouter = require('./CategoryRouter')
const showTimeRouter = require('./ShowTimeRouter')
const route = express.Router()

route.use('/films', filmRouter)
route.use('/rooms', roomRouter)
route.use('/categories', categoryRouter)
route.use('/show-time', showTimeRouter)

module.exports = route