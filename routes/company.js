'use strict'

var express = require('express');
var CompanyController = require('../controllers/company');

var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/company'});

api.post('/register-company', CompanyController.saveCompany);
api.post('/login-company', CompanyController.loginCompany);
api.put('/update-company/:id',md_auth.ensureAuth, CompanyController.updateCompany);
api.post('/upload-image-company/:id',[md_auth.ensureAuth, md_upload], CompanyController.uploadImage);
api.get('/get-image-company/:imageFile', CompanyController.getIMageFile);

module.exports = api;
