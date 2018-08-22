'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'hitchcock';

exports.createToken = function(company){
  var payload = {
    sub: company._id,
    email: company.email,
    name: company.name,
    surname: company.rfc,
    role: company.cp,
    image: company.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secret);
};
