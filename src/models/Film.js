const db = require('../configs/database')
const binder = require('../utils/binder')

class Film {
    async getFilms() {
        try {
            const con = await db.connect()
            return con.query('SELECT * FROM film');
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }

    async createFilm(filmData) {
        try {
            const sql = 'INSERT INTO film(name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid) VALUES(?,?,?,?,?,?,?,?,?,?)'
            const values = binder.filmBinder(filmData)
            const con = await db.connect()
            return con.execute(sql, values)
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async deleteFilm(id) {
        try {
            console.log(id)
            const sql = 'DELETE FROM film WHERE id = ?'
            const con = await db.connect()
            return con.execute(sql, [id])
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async updateFilm(id, data) {
        try {
            const sql = 'UPDATE film SET name = ?, director = ?, launchdate = ?, time = ?, description = ?, poster = ?, finishtime = ?, actors = ?, rated = ?, categoryid = ? WHERE id = ?'
            const con = await db.connect()
            let values = binder.filmBinder(data).push(id)
            return con.execute(sql, values)
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            const sql = 'SELECT * FROM film WHERE id = ?'
            const con = await db.connect()
            const [result, field] = await con.execute(sql, [id])
            return [result[0], field]
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }

    async searchByName(query) {
        try {
            const sql = 'SELECT * FROM film WHERE name like = ?'
            const con = await db.connect()
            return con.execute(sql, [`%${query}%`])
        }
        catch (err) {
            return Promise.resolve([null, null])
        }
    }
}

module.exports = new Film()

