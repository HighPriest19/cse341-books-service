const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Internal server error
 */
router.get('/', authorsController.getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authorsController.getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a1
 *               name:
 *                 type: string
 *                 example: Jane Austen
 *               birthYear:
 *                 type: integer
 *                 example: 1775
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Bad Request (missing fields or duplicate ID)
 *       500:
 *         description: Internal server error
 */
router.post('/', authorsController.createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Austen
 *               birthYear:
 *                 type: integer
 *                 example: 1775
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authorsController.updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       400:
 *         description: Cannot delete author with active books
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;