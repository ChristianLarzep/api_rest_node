'use strict'

var express = require('express');
var CompanyCourseController = require('../controllers/companyCourse');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/company-course/:id', md_auth.ensureAuth, CompanyCourseController.getCourse);
api.post('/company-course', md_auth.ensureAuth, CompanyCourseController.saveCourse);
api.get('/company-courses/:company', md_auth.ensureAuth, CompanyCourseController.getCourses);
api.delete('/company-course/:id', md_auth.ensureAuth, CompanyCourseController.deleteCourse); //admin role

module.exports = api;
