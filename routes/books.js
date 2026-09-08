const router = require('express').Router();
const booksController = require('../controllers/books');

// GET all books
router.get('/', booksController.getAllBooks);

// GET book by ID
router.get('/:id', booksController.getBookById);

// POST create book
router.post('/', booksController.createBook);

// PUT update book
router.put('/:id', booksController.updateBook);

// DELETE book
router.delete('/:id', booksController.deleteBook);

module.exports = router;