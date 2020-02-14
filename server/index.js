const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/index.js');
// const generateListing = require('../database/mockData.js');

const PORT = process.env.PORT || 3002;
const PUBLIC = path.resolve(__dirname, '..', 'client', 'dist');

const app = express();

app.use(cors());
app.use(express.static(PUBLIC));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post('/listings/:id', function(req, res) {
//   db.create(generateListing(), (err) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(501);
//     } else {
//       res.sendStatus(201);
//     }
//   });
// });

app.get('/listings/:id', (req, res) => {
  db.findOne({ id: req.params.id })
    .exec((err, docs) => {
      if (err) {
        res.sendStatus(501);
      } else {
        res.status(200).send(docs);
      }
    });
});

// app.put('/listings/:id', function(req, res) {
//   db.update({id: 1}, {city: "Seattle"}, (err) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(501);
//     } else {
//       res.sendStatus(201);
//     }
//   })
// });

// app.delete('/listings/:id', function(req, res) {
//   db.deleteOne({numberOfBedrooms: 10}, (err) => {
//     if(err) {
//       console.log(err);
//       res.sendStatus(501);
//     } else {
//       res.sendStatus(200);
//     }
//   })
// });


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = app;
