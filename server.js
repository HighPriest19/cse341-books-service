require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB Connection Error:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}`);
    });
  }
});