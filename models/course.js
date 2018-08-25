'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = Schema({
  name: String,
  description: String,
  cost: Number,
  duration: Number,
  link: String,
  image: String
});

module.exports = mongoose.model('Course', CourseSchema);
