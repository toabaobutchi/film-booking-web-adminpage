const db = require('../configs/database')

class Category {
    constructor() {
        this.con = null
    }
    async connect() {
        if (this.con != null) return this.con
        else {
            return await db.connect()
        }
    }
    async getCategories() {
        try {
            const con = await db.connect()
            return con.query('SELECT * FROM category')
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async createCategory(name) {
        try {
            const con = await db.connect()
            return con.execute('INSERT INTO category(name) VALUES(?)', [name])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async deleteCategory(id) {
        try {
            const con = await db.connect()
            return con.execute('DELETE FROM category WHERE id = ?', [id])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async updateCategory(id, name) {
        try {
            const con = await db.connect()
            return con.execute('UPDATE category SET name = ? WHERE id = ?', [name, id])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            const con = await db.connect()
            const [result, field] = await con.execute('SELECT * FROM category WHERE id = ?', [id])
            return [result[0], field]
        } catch (err) {
            return [null, null]
        }
    }
}

module.exports = new Category()
