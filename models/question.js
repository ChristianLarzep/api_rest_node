'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = Schema({
  question: String,
  opt1: String,
  opt2: String,
  opt3: String,
  answer: String,
  course: {type: Schema.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('Question', QuestionSchema);
