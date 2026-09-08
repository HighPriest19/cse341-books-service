const Author = require('../models/authors');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.getAllAuthors();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (err) {
    console.error('Error in getAllAuthors:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  } catch (err) {
    console.error('Error in getAuthorById:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;
    if (!id || !name || !birthYear) {
      return res.status(400).json({ message: 'Missing required author fields: id, name, birthYear' });
    }

    const existingAuthor = await Author.getAuthorById(id);
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author ID already exists' });
    }

    await Author.createAuthor({ id, name, birthYear: Number(birthYear) });
    res.status(201).json({ message: 'Author created successfully' });
  } catch (err) {
    console.error('Error in createAuthor:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name, birthYear } = req.body;

    const existingAuthor = await Author.getAuthorById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    await Author.updateAuthor(authorId, { name, birthYear: Number(birthYear) });
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (err) {
    console.error('Error in updateAuthor:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    const existingAuthor = await Author.getAuthorById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const hasBooks = await Author.authorHasBooks(authorId);
    if (hasBooks) {
      return res.status(400).json({ message: 'Cannot delete author with associated books' });
    }

    await Author.deleteAuthor(authorId);
    res.status(204).send();
  } catch (err) {
    console.error('Error in deleteAuthor:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};