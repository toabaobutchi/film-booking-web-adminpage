const db = require('../configs/database')
const binder = require('../utils/binder')
const Model = require('./Model')

class ShowTime extends Model {
    constructor() {
        super()
    }
    async getShowTimes(filmId) {
        try {
            await this.connect()
            return this.connection.execute('SELECT id, time, film_id, room.name FROM showtime JOIN room ON room_id = room.id WHERE film_id = ?', [filmId])
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
    async getShowTimesForRoom(roomId) {
        try {
            await this.connect()
            const sql = 'SELECT showtime.time AS stime, film.time AS ftime FROM showtime JOIN film ON film.id = showtime.film_id WHERE room_id = ?'
            return this.connection.execute(sql, [roomId])
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
    async addShowtime(roomId, filmId, showTimesInfo = []) {
        try {
            await this.connect()
            const sql = 'INSERT showtime(room_id, film_id, time, price) VALUES ?'
            const values = binder.showTimeBinder(roomId, filmId, showTimesInfo)
            return this.connection.query(sql, [values], (error, results, fields) => {
                if (error) {
                    console.error('Error inserting data: ' + error)
                    return
                }
                console.log('Inserted ' + results.affectedRows + ' rows.')
            })
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
}

module.exports = new ShowTime()
