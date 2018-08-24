'use strict'

var express = require('express');
var QuestionController = require('../controllers/question');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/question/:id', md_auth.ensureAuth, QuestionController.getQuestion);
api.post('/question', md_auth.ensureAuth, QuestionController.saveQuestion);
api.get('/questions/:course', md_auth.ensureAuth, QuestionController.getQuestions);
api.put('/question/:id', md_auth.ensureAuth, QuestionController.updateQuestion);
api.delete('/question/:id', md_auth.ensureAuth, QuestionController.deleteQuestion);

module.exports = api;
