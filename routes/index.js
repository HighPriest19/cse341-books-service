const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Swagger UI route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;