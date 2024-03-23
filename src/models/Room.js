const db = require('../configs/database')

class Room {
    async getRooms() {
        try {
            const con = await db.connect();
            return con.query('SELECT * FROM room')
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }

    async createRoom(data) {
        try {
            const con = await db.connect();
            const sql = 'INSERT INTO room(name, seats) VALUES(?, ?)'
            const values = [data.name, data.seats];
            return con.excute(sql, values)
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async deleteRoom(id) {
        try {
            const con = await db.connect();
            const sql = 'DELETE FROM room WHERE id = ?'
            const values = [id];
            return con.excute(sql, values)
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async updateRoom(id, data) {
        try {
            const con = await db.connect();
            const sql = 'UPDATE room SET name = ?, seats = ? WHERE id = ?'
            const values = [data.name, data.seats, id];
            return con.excute(sql, values)
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            const con = await db.connect();
            const sql = 'DELETE FROM room WHERE id = ?'
            const [result, field] = await con.excute(sql, [id])
            return [result[0], field]
        }
        catch (err) {
            return [null, null]
        }
    }
}

module.exports = new Room()