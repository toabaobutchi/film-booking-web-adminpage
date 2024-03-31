const categoryModel = require('../models/Category')

class CategoryController {
    async index(req, res) {
        try {
            const [result] = await categoryModel.getCategories()
            res.json(result)
        } catch (err) {
            console.log(err)
        }
    }
    async create(req, res) {
        try {
            const name = req.body.name
            const [result] = await categoryModel.createCategory(name)
            res.json(result.affectedRows)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id
            const [result] = await categoryModel.deleteCategory(id)
            res.json(result.affectedRows)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    
    async update(req, res) {
        try {
            const id = req.params.id
            const name = req.body.name
            const [result] = await categoryModel.updateCategory(id, name)
            res.json(result.affectedRows)
        } catch (err) {
            console.log(err)
            res.status(500)
        }
    }
}

module.exports = new CategoryController()
