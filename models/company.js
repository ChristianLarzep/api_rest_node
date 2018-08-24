'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = Schema({
  email: String,
  password: String,
  name: String,
  cp: String,
  rfc: String,
  street: String,
  suburb: String,
  num_ext: Number,
  num_int: Number,
  municipality: String,
  state: String,
  tel: Number,
  image: String,
  role: String
});

module.exports = mongoose.model('Company', CompanySchema);
