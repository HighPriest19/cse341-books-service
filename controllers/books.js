const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const requiredBookFields = ['title', 'author', 'genre', 'publishedYear', 'isbn'];

const isValidObjectId = (id) => ObjectId.isValid(id) && String(new ObjectId(id)) === id;

const buildBook = (body) => ({
  title: body.title,
  author: body.author,
  genre: body.genre,
  publishedYear: body.publishedYear,
  isbn: body.isbn
});

const getValidationErrors = (book) => {
  const missingFields = requiredBookFields.filter((field) => book[field] === undefined || book[field] === '');
  const errors = missingFields.map((field) => `${field} is required`);

  if (book.publishedYear !== undefined && !Number.isInteger(book.publishedYear)) {
    errors.push('publishedYear must be an integer');
  }

  return errors;
};

// GET /books
const getAll = async (req, res) => {
  try {
    const lists = await mongodb.getDb().collection('books').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/:id
const getSingle = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Book ID format' });
  }

  try {
    const bookId = new ObjectId(req.params.id);
    const lists = await mongodb.getDb().collection('books').find({ _id: bookId }).toArray();
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /books
const createBook = async (req, res) => {
  const book = buildBook(req.body);
  const validationErrors = getValidationErrors(book);

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const response = await mongodb.getDb().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create book' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /books/:id
const updateBook = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Book ID format' });
  }

  const book = buildBook(req.body);
  const validationErrors = getValidationErrors(book);

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /books/:id
const deleteBook = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Book ID format' });
  }

  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};
