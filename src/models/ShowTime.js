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
    async getBriefShowtimesForRoom(roomId) {
        try {
            await this.connect()
            const sql = `select date(s.time) as showtime_date, group_concat(distinct '{ "showtime_id": ', s.id,', "showtime_time": "', substring(time(s.time), 1, 5), '" }' separator ';') as showtime from room r join showtime s on r.id = s.room_id where r.id = ? group by date(s.time)`
            return this.connection.execute(sql, [roomId])
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
    async find(id) {
        try {
            await this.connect()
            const sql =
                'select s.*, r.name as room_name, count(t.id) as ticket_count, f.name as film_name from showtime s left join ticket t on s.id = t.showtime_id join room r on r.id = s.room_id join film f on f.id = s.film_id where s.id = ? group by s.id'
            const [result, fields] = await this.connection.execute(sql, [id])
            return [result[0], fields]
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }

    async delete(id) {
        try {
            await this.connect()
            const sql = 'DELETE FROM showtime WHERE id = ?'
            return this.connection.execute(sql, [id])
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
}

module.exports = new ShowTime()
