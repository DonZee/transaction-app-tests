const transactions = require("../controllers/transactions.js");
const users = require("../controllers/users.js");
const jwt = require('jsonwebtoken');
const secret = require('./secret')
module.exports = function(app){

  app.post('/users', users.create);
  app.post('/sessions', users.login);

  app.use(verifyToken);
  app.get('/transactions', transactions.index);
  app.get('/transactions/:id', transactions.show);
  app.post('/transactions', transactions.create);
  app.put('/transactions/:id', transactions.update);
  app.delete('/transactions/:id', transactions.delete);

}

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret.jwt, function(err, decoded) {
      if (err) {
        return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({
        success: false,
        message: 'No token provided.'
    });

  }
}
