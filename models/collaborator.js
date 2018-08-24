'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollaboratorSchema = Schema({
  email: String,
  password: String,
  name: String,
  year: Number,
  month: Number,
  day: Number,
  genre: String,
  role: String,
  company: {type: Schema.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
