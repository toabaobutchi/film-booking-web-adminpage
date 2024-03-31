const Model = require('../models/Model')

class Category extends Model {
    constructor() {
        super()
    }
    async getCategories() {
        try {
            await this.connect()
            return this.connection.query('select c.*, count(f.id) as film_count from category c left join film f on c.id = f.categoryid group by c.id')
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async createCategory(name) {
        try {
            await this.connect()
            return this.connection.execute('INSERT INTO category(name) VALUES(?)', [name])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async deleteCategory(id) {
        try {
            await this.connect()
            return this.connection.execute('DELETE FROM category WHERE id = ?', [id])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async updateCategory(id, name) {
        try {
            await this.connect()
            return this.connection.execute('UPDATE category SET name = ? WHERE id = ?', [name, id])
        } catch (err) {
            return Promise.resolve([null, null])
        }
    }
    async find(id) {
        try {
            await this.connect()
            const [result, field] = await this.connection.execute('SELECT * FROM category WHERE id = ?', [id])
            return [result[0], field]
        } catch (err) {
            return [null, null]
        }
    }
}

module.exports = new Category()
