const knex = require("../db/knex.js");
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const hasher = require('../config/hasher');
module.exports = {
  create: (req, res)=>{
    hasher.hash(req.body).then((user)=>{
      knex('users').insert(user).then(()=>{
        res.json({message: 'User has been created'})
      }).catch((err)=>{
        res.status(403).send({message: err});
      })
    })
  },

  login: (req, res)=>{
    knex('users').where("email", req.body.email)
      .then((user)=>{
        if(user[0]){
          hasher.check(user[0], req.body).then((isMatch)=>{
            if(isMatch){
              // USER IS VALID
              let token = jwt.sign(user[0], secret.jwt)
              res.json({token});
            }else{
              res.status(400).send({message: 'invalid email/password'})
            }
          })
        }else{
          res.status(400).send({message: 'invalid email/password'})
        }
      })
  }
}
