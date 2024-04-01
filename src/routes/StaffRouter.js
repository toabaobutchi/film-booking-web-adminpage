const express = require('express')
const route = express.Router()
const staffController = require('../controllers/StaffController')

// POST: api/v1/admin/login
route.post('/', staffController.login)

module.exports = route