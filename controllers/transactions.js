const knex = require("../db/knex.js");

module.exports = {
  index: (req, res)=> {
    knex('transactions').limit(200).then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.error(err)
    });
  },
}
