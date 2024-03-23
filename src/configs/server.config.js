const bodyParser = require('body-parser')
const cors = require('cors')



const config = (app) => {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    app.use(bodyParser.json())
    app.use(cors())
}

module.exports = { config }