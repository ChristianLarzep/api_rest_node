'use strict'

var express = require('express');
var CourseController = require('../controllers/course');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/course'});

api.get('/course/:id', md_auth.ensureAuth, CourseController.getCourse);
api.post('/register-course', md_auth.ensureAuth, CourseController.saveCourse);
api.get('/courses/:page?', md_auth.ensureAuth, CourseController.getCourses);
api.put('/update-course/:id', md_auth.ensureAuth, CourseController.updateCourse);
api.delete('/delete-course/:id', md_auth.ensureAuth, CourseController.deleteCourse);
api.post('/upload-image-course/:id',[md_auth.ensureAuth, md_upload], CourseController.uploadImage);
api.get('/get-image-course/:imageFile', CourseController.getIMageFile);

module.exports = api;
