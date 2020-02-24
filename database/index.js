const { Database, aql } = require('arangojs');

const db = new Database();

const findListing = (req, res) => {
  const listingId = req.params.id;
  db.useDatabase('dbmsbnb');
  db.useBasicAuth('root', '');
  db.query(aql`
    FOR listing IN dbmsbnb FILTER listing._key == ${listingId} RETURN listing
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
