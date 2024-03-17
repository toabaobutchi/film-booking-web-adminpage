const db = require('../configs/database')

class Film {
    async getFilms() {
        try {
            const con = await db.connect()
            return con.query('SELECT * FROM phim');
        }
        catch(err) {
            return new Promise((resolve, reject) => {
                reject([['Error at Film::getFilms()'], {}])
            })
        }
    }
}

module.exports = new Film()

