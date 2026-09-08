const mongodb = require('../db/connect');

const getAllAuthors = async () => {
  return await mongodb.getDb().collection('authors').find().toArray();
};

const getAuthorById = async (authorId) => {
  return await mongodb.getDb().collection('authors').findOne({ id: authorId });
};

const createAuthor = async (authorData) => {
  return await mongodb.getDb().collection('authors').insertOne(authorData);
};

const updateAuthor = async (authorId, authorData) => {
  return await mongodb.getDb().collection('authors').updateOne(
    { id: authorId },
    { $set: authorData }
  );
};

const deleteAuthor = async (authorId) => {
  return await mongodb.getDb().collection('authors').deleteOne({ id: authorId });
};

const authorHasBooks = async (authorId) => {
  const book = await mongodb.getDb().collection('books').findOne({ authorId: authorId });
  return !!book;
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks
};