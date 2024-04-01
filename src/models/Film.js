const binder = require('../utils/binder')
const Model = require('./Model')

class Film extends Model {
    constructor() {
        super()
    }
    async getFilms() {
        try {
            await this.connect()
            return this.connection.query('select f.*, count(s.id) as showtime_count from film f left join showtime s on f.id = s.film_id group by f.id')
        } catch (err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }

    async createFilm(filmData) {
        try {
            const sql = 'INSERT INTO film(name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid) VALUES(?,?,?,?,?,?,?,?,?,?)'
            const values = binder.filmBinder(filmData)
            await this.connect()
            return this.connection.execute(sql, values)
        } catch (err) {
            console.log('Error log from >>> models/Film/createFilm >>>', err)
            return Promise.resolve([null, null])
        }
    }
    async deleteFilm(id) {
        try {
            const sql = 'DELETE FROM film WHERE id = ?'
            await this.connect()
            return this.connection.execute(sql, [id])
        } catch (err) {
            console.log('Error log from >>> models/Film/deleteFilm >>>', err)
            return Promise.resolve([null, null])
        }
    }
    async updateFilm(id, data) {
        try {
            let sql = ''

            // có file gửi đến thì cập nhật, ko thì giữ nguyên
            if (data.poster) {
                sql = 'UPDATE film SET name = ?, director = ?, launchdate = ?, time = ?, description = ?, poster = ?, finishtime = ?, actors = ?, rated = ?, categoryid = ? WHERE id = ?'
            } else {
                sql = 'UPDATE film SET name = ?, director = ?, launchdate = ?, time = ?, description = ?, finishtime = ?, actors = ?, rated = ?, categoryid = ? WHERE id = ?'
            }
            await this.connect()
            let values = binder.filmBinder(data)
            values.push(id)
            if (!data.poster) {
                values.splice(5, 1) // bỏ giá trị của poster ra
            }
            return this.connection.execute(sql, values)
        } catch (err) {
            console.log('Error log from >>> models/Film/updateFilm >>>', err)
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            const sql = 'SELECT * FROM film WHERE id = ?'
            await this.connect()
            const [result, field] = await this.connection.execute(sql, [id])
            return [result[0], field]
        } catch (err) {
            console.log('Error log from >>> models/Film/find >>>', err)
            return Promise.resolve([null, null])
        }
    }

    async searchByName(query) {
        try {
            const sql = 'SELECT * FROM film WHERE name like = ?'
            await this.connect()
            return this.connection.execute(sql, [`%${query}%`])
        } catch (err) {
            console.log('Error log from >>> models/Film/searchByName >>>', err)
            return Promise.resolve([null, null])
        }
    }
}

module.exports = new Film()
