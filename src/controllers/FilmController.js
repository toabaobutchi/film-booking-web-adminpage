const filmModel = require('../models/Film')
class FilmController {
    // GET: /api/v1/admin/films
    async index(req, res) {
        try {
            const query = req.query.id
            if (!query) {
                const [result] = await filmModel.getFilms()
                res.json(result);
            }
            else {
                const [result] = await filmModel.searchByName(query)
                res.json(result);
            }
        }
        catch (err) {
            res.status(400).json([])
        }
    }

    // POST: /api/v1/admin/films
    async create(req, res) {
        try {
            const clientData = req.body
            clientData.poster = req.file.filename
            const [result] = await filmModel.createFilm(clientData)
            return res.json(result.affectedRows)
        }
        catch (err) {
            return res.json(-1)
        }
    }

    // PUT: /api/v1/admin/films/
    async update(req, res) {
        try {
            const clientData = req.body

            const [result] = filmModel.updateFilm(clientData);
            res.json(result.affectedRows)

        }
        catch (err) {
            res.status(400).json(-1)
        }
    }

    // DELETE: /api/v1/admin/films/:id
    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) res.json(0)
            else {
                const [result] = await filmModel.deleteFilm(id);
                res.json(result.affectedRows)
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json(-1)
        }
    }

    // GET: /api/v1/admin/films/:id
    async find(req, res) {
        try {

            const id = req.params.id
            if (!id) res.json({})
            else {
                const [result] = await filmModel.find(id);
                res.json(result)
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).json({})
        }
    }
}

module.exports = new FilmController()