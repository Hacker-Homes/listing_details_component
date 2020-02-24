require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const findListing = require('../database/index.js');

const PORT = process.env.PORT || 3002;
const PUBLIC = path.resolve(__dirname, '..', 'client', 'dist');

const app = express();

app.use(cors());
app.use(express.static(PUBLIC));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listings/:id', (req, res) => {
  findListing(req, res);
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = app;
