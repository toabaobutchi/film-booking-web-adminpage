const filmModel = require('../models/Film')
class FilmController {
    // GET: /api/v1/admin/films
    async index(req, res) {
        try {
            const query = req.query.q
            let result = null
            if (!query) {
                const [data] = await filmModel.getFilms()
                result = data
            } else {
                const [data] = await filmModel.searchByName(query)
                result = data
            }
            if (result === null) {
                res.status(500).json({ message: 'Database was not connected properly' })
            } else res.json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // POST: /api/v1/admin/films
    async create(req, res) {
        try {
            const clientData = req.body
            clientData.poster = req.file.filename
            const [result] = await filmModel.createFilm(clientData)
            if (result === null) {
                res.status(500).json({ message: 'Database was not connected properly' })
            } else res.json(result.affectedRows)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // PUT: /api/v1/admin/films/{id}
    async update(req, res) {
        try {
            const clientData = req.body
            const id = req.params.id
            clientData.poster = req.file?.filename ?? ''
            if (!id) {
                res.status(400).json({ message: 'No nesscessary parameters for request' })
            } else {
                const [result] = await filmModel.updateFilm(id, clientData)
                if (result === null) {
                    res.status(500).json({ message: 'Database was not connected properly' })
                } else res.json(result.affectedRows)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // DELETE: /api/v1/admin/films/:id
    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) res.status(400).json({ message: 'No nesscessary parameters for request' })
            else {
                const [result] = await filmModel.deleteFilm(id)
                if (result === null) {
                    res.status(500).json({ message: 'Database was not connected properly' })
                } else res.json(result.affectedRows)
            }
        } catch (err) {
            console.log(err)
            let message = 'Internal Server Error! Please visit log at server!'
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
                message = 'Can not delete because of its constraint'
            }
            res.status(500).json({ message })
        }
    }

    // GET: /api/v1/admin/films/:id
    async find(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                res.status(400).json({ message: 'No nesscessary parameters for request' })
            } else {
                const [result] = await filmModel.find(id)
                if (result === null) {
                    res.status(500).json({ message: 'Database was not connected properly' })
                } else res.json(result)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }
}

module.exports = new FilmController()
