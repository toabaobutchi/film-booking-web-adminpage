const db = require('../configs/database')

class Model {
    constructor() {
        this.connection = null;
    }
    async connect() {
        if (this.connection === null) {
            this.connection = await db.connect()
        }
        return this.connection
    }
}

module.exports = Model
