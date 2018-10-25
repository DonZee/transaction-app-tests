const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// Get all pets
app.get('/transactions', (req, res)=> {
  knex('transactions').limit(200).then((results) => {
    res.json(results)
  })
  .catch((err) => {
    console.error(err)
  });
});
app.listen(port, function() {
  console.log('Listening on', port);
});
