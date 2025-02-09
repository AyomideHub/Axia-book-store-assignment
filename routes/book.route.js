const express = require('express')
const router = express.Router()
const {createbook, deletebook, updatebook, getBooks, getBook} = require('../controllers/book.controller')

router.get('/',  getBooks).post('/',  createbook)
router.get('/:id',  getBook).delete('/:id',  deletebook).patch('/:id',  updatebook)



module.exports = router