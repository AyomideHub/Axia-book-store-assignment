const express = require('express')
const router = express.Router()
const  {authenticateUser } = require('../middlewares/authentication')
const {createbook, deletebook, updatebook, getBooks} = require('../controllers/book.controller')

//router.get('/book/:id', authenticateUser,  getbook)
router.get('/books', authenticateUser,  getBooks)
router.post('/create-book', authenticateUser,  createbook)
router.delete('/delete-book/:id', authenticateUser,  deletebook)
router.patch('/update-book/:id', authenticateUser,  updatebook)



module.exports = router