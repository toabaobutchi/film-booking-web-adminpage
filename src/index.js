const express = require('express')
const user = require('./models/User')

const app = express()
const port = 3000

// route
app.get('/', async (req, res) => {
    try {
        const [result] = await user.getUsers()
        res.json(result)
    }
    catch (err) {
        res.send(err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))