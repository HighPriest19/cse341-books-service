const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Swagger Documentation Route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Your other routes (books, authors, etc.)
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;