const roomModel = require('../models/Room')

class Room {
    // GET: /api/v1/admin/films
    async index(req, res) {
        try {
            const [result] = await roomModel.getRooms()
            res.json(result);
        }
        catch (err) {
            res.status(400)
        }
    }

    // POST: /api/v1/admin/films
    async create(req, res) {
        try {
            const clientData = req.body
            const [result] = await roomModel.createRoom(clientData)
            return res.json(result.affectedRows)
        }
        catch (err) {
            return res.json(-1)
        }
    }

    // PUT: /api/v1/admin/films/{id}
    async update(req, res) {
        try {
            const clientData = req.body
            const [result] = roomModel.updateFilm(clientData);
            res.json(result.affectedRows)
        }
        catch (err) {
            console.log(err);
            res.status(500)
        }
    }

    // DELETE: /api/v1/admin/films/:id
    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) res.status(404)
            else {
                const [result] = await roomModel.deleteFilm(id);
                res.json(result.affectedRows)
            }
        }
        catch (err) {
            console.log(err);
            res.status(500)
        }
    }

    // GET: /api/v1/admin/films/:id
    async find(req, res) {
        try {
            const id = req.param.id
            if (!id) res.status(404)
            else {
                const [result] = roomModel.find(id);
                res.json(result)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
}

module.exports = new Room()