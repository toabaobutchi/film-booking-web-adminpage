const db = require('../configs/database')

class User {

    async getUsers() {
        const con = await db.connect();
        return con.query('select * from _user')
    }
}

module.exports = new User()