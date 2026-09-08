const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books & Authors API',
    description: 'API documentation for Books and Authors endpoints',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json'; // Creates swagger.json in the root folder
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);