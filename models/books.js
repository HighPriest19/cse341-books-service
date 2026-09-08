const mongodb = require('../db/connect');

const getAllBooks = async () => {
  return await mongodb.getDb().collection('books').find().toArray();
};

const getBookById = async (bookId) => {
  return await mongodb.getDb().collection('books').findOne({ id: bookId });
};

const createBook = async (bookData) => {
  return await mongodb.getDb().collection('books').insertOne(bookData);
};

const updateBook = async (bookId, bookData) => {
  return await mongodb.getDb().collection('books').updateOne(
    { id: bookId },
    { $set: bookData }
  );
};

const deleteBook = async (bookId) => {
  return await mongodb.getDb().collection('books').deleteOne({ id: bookId });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};