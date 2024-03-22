const express = require('express')
const multer = require('multer') // for upload file
const route = require('./routes')
const {config} = require('./configs/server.config')

const app = express()
const port = 3001
app.use(express.static('public'))
// config
config(app)

// routes
app.get('/', (req, res) => {
    res.send({message: 'API'});
})
app.use('/api/v1/admin', route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))