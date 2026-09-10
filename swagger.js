const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Authors API',
    description: 'API documentation for Books and Authors service'
  },
  host: 'cse341-books-service.onrender.com', // Updated from localhost:3000
  schemes: ['https', 'http']                  // Added https
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);