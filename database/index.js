const { Database, aql } = require('arangojs');
const { USER, UPASS } = require('../key.js');

const db = new Database({
  url: 'http://34.217.148.234:8529',
});

const findListing = (req, res) => {
  const listingId = req.params.id;
  db.useDatabase('airbnb');
  db.useBasicAuth(USER, UPASS);
  db.query(aql`
    FOR listing IN airbnb FILTER listing._key == ${listingId} RETURN listing
    `)
    .then(cursor => (
      cursor.next()
        .then((result) => {
          res.send(result);
        })
    ))
    .catch((err) => {
      console.log(err);
    });
};


module.exports = findListing;
