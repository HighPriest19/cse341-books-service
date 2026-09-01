const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

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
  try {
    const bookId = new ObjectId(req.params.id);
    const lists = await mongodb.getDb().collection('books').find({ _id: bookId }).toArray();
    if (lists.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: 'Invalid Book ID format' });
  }
};

// POST /books
const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      isbn: req.body.isbn
    };
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
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      isbn: req.body.isbn
    };
    const response = await mongodb.getDb().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid Book ID format' });
  }
};

// DELETE /books/:id
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid Book ID format' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};