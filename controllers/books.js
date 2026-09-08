const Book = require('../models/books');
const Author = require('../models/authors');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    console.error('Error in getAllBooks:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (err) {
    console.error('Error in getBookById:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { id, title, authorId, year, genre } = req.body;
    if (!id || !title || !authorId || !year || !genre) {
      return res.status(400).json({ message: 'Missing required book fields: id, title, authorId, year, genre' });
    }

    const existingBook = await Book.getBookById(id);
    if (existingBook) {
      return res.status(400).json({ message: 'Book ID already exists' });
    }

    // Verify referenced author exists
    const author = await Author.getAuthorById(authorId);
    if (!author) {
      return res.status(400).json({ message: 'Referenced authorId does not exist' });
    }

    await Book.createBook({
      id,
      title,
      authorId,
      year: Number(year),
      genre
    });

    res.status(201).json({ message: 'Book created successfully' });
  } catch (err) {
    console.error('Error in createBook:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, authorId, year, genre } = req.body;

    const existingBook = await Book.getBookById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (authorId) {
      const author = await Author.getAuthorById(authorId);
      if (!author) {
        return res.status(400).json({ message: 'Referenced authorId does not exist' });
      }
    }

    await Book.updateBook(bookId, {
      title,
      authorId,
      year: Number(year),
      genre
    });

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error('Error in updateBook:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const existingBook = await Book.getBookById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.deleteBook(bookId);
    res.status(204).send();
  } catch (err) {
    console.error('Error in deleteBook:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};