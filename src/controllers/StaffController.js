const staffModel = require('../models/Staff')
const jwt = require('../utils/JWTHelper')

class StaffController {
    async login(req, res) {
        try {
            const data = req.body
            
            const [result] = await staffModel.getStaff({ email: data.email, password: data.password })
            console.log(result)
            // return JWT
            return res.json({ token: jwt.createToken(result) })
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }
}

module.exports = new StaffController()
