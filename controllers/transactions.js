const knex = require("../db/knex.js");

module.exports = {
  index: (req, res)=> {
    let page = req.query.page || 1;
    knex('transactions').limit(200).offset(parseInt(page-1) * 200).then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.error(err)
    });
  },

  show: (req, res)=>{
    knex('transactions')
        .join('users', 'users.id', 'transactions.user_id')
        .select('transactions.*', 'users.email')
        .where('transactions.id', req.params.id)
        .then((results)=>{
          res.json(results[0])
        })
  },

  create: (req, res) => {
    knex('transactions').insert({
        type: req.body.type,
        user_id: req.decoded.id,
        buisness_name: req.body.buisness_name,
        amount: req.body.amount
    }, '*').then((results)=>{
      res.json(results[0]);
    });
  },

  update: (req, res)=>{
    knex('transactions').update({
        type: req.body.type,
        buisness_name: req.body.buisness_name,
        amount: req.body.amount
    }, '*').where('id', req.params.id).then((results)=>{
      res.json(results[0]);
    })
  },

  delete: (req, res)=>{
    knex('transactions')
        .del()
        .where('id', req.params.id)
        .then(()=>{
          res.json({message: "Success"});
        })
  }
}
