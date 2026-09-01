const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET /books - Fetch all books
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('books').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/:id - Fetch single book by ID
const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('books').find({ _id: bookId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(400).json({ message: 'Invalid Book ID format' });
  }
};

module.exports = {
  getAll,
  getSingle
};