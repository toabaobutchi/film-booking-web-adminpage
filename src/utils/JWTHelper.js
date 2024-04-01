require('dotenv').config()
const jwt = require('jsonwebtoken')
class JWTHelper {
    constructor() {
        this.jwt_secret_key = process.env.JWT_SECRET_KEY
    }
    createToken(data) {
        try {
            return jwt.sign(data, this.jwt_secret_key)
        }
        catch (err) {
            console.log(err)
            return null
        }
    }
    verifyToken(token) {
        try {
            return jwt.sign(token, this.jwt_secret_key)
        }
        catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = new JWTHelper()