const express = require('express')
const route = require('./routes')
const svConfig = require('./configs/server.config')

const app = express()
const port = 3001

svConfig.config(app)

app.get('/', (req, res) => {
    res.send('Welcome to my API');
})
// routes
app.use('/api/v1/admin', route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))