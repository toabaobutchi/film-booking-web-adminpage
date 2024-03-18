const db = require('../configs/database')

class Film {
    async getFilms() {
        try {
            const con = await db.connect()
            return con.query('SELECT * FROM phim');
        }
        catch(err) {
            return Promise.resolve([null, null])
        }
    }

    async createFilm(filmData) {
        try {
            
        }
        catch (err) {
            
        }
    }
}

module.exports = new Film()

