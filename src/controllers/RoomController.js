const roomModel = require('../models/Room')

class Room {
    // GET: /api/v1/admin/rooms
    async index(req, res) {
        try {
            const [result] = await roomModel.getRooms()
            if (result === null) {
                res.status(500).json({ message: 'Database was not connected properly' })
            } else res.json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // POST: /api/v1/admin/rooms
    async create(req, res) {
        try {
            const clientData = req.body
            const [result] = await roomModel.createRoom(clientData)
            if (result === null) {
                res.status(500).json({ message: 'Database was not connected properly' })
            } else res.json(result.affectedRows)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // PUT: /api/v1/admin/rooms/{id}
    async update(req, res) {
        try {
            const clientData = req.body
            const id = req.params.id
            if (!id) {
                res.status(400).json({ message: 'No nesscessary parameters for request' })
            } else {
                const [result] = await roomModel.updateRoom(id, clientData)
                if (result === null) {
                    res.status(500).json({ message: 'Database was not connected properly' })
                } else res.json(result.affectedRows)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // DELETE: /api/v1/admin/rooms/:id
    async delete(req, res) {
        try {
            const id = req.params.id
            if (!id) res.status(400).json({ message: 'No nesscessary parameters for request' })
            else {
                const [result] = await roomModel.deleteRoom(id)
                if (result === null) {
                    res.status(500).json({ message: 'Database was not connected properly' })
                } else res.json(result.affectedRows)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal Server Error! Please visit log at server!' })
        }
    }

    // GET: /api/v1/admin/rooms/:id
    async find(req, res) {
        try {
            const id = req.params.id
            if (!id) res.status(400).json({ message: 'No nesscessary parameters for request' })
            else {
                const [result] = await roomModel.find(id)
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

module.exports = new Room()
