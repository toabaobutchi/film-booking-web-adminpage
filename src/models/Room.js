const Model = require('./Model')

class Room extends Model {
    constructor() {
        super()
    }
    async getRooms() {
        try {
            await this.connect()
            return this.connection.query('SELECT * FROM room')
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }

    async createRoom(data) {
        try {
            await this.connect()
            const sql = 'INSERT INTO room(name, seats) VALUES(?, ?)'
            const values = [data.name, data.seats]
            return this.connection.execute(sql, values)
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
    async deleteRoom(id) {
        try {
            await this.connect()
            const sql = 'DELETE FROM room WHERE id = ?'
            const values = [id]
            return this.connection.execute(sql, values)
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
    async updateRoom(id, data) {
        try {
            await this.connect()
            const sql = 'UPDATE room SET name = ?, seats = ? WHERE id = ?'
            const values = [data.name, data.seats, id]
            return this.connection.execute(sql, values)
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            await this.connect()
            const sql = 'DELETE FROM room WHERE id = ?'
            const [result, field] = await this.connection.execute(sql, [id])
            return [result[0], field]
        } catch (err) {
            console.log(err)
            return [null, null]
        }
    }
}

module.exports = new Room()
