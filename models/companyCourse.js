'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyCourseSchema = Schema({
  initDate: String,
  finalDate: String,
  numCol: Number,
  company: {type: Schema.ObjectId, ref: 'Company'},
  course: {type: Schema.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('CompanyCourse', CompanyCourseSchema);
