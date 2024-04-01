const Model = require("./Model");

class Staff extends Model {
    constructor() {
        super()
    }
    async getStaff({email, password}) {
        try {
            await this.connect()
            const sql = 'SELECT s.username, s.role_id FROM staff s WHERE email = ? AND password = ?'
            const [result, fields] = await this.connection.execute(sql, [email, password])
            return [result[0], fields]
        }
        catch(err) {
            console.log(err)
            return Promise.resolve([null, null])
        }
    }
}

module.exports = new Staff()