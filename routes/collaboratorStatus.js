'use strict'

var express = require('express');
var CollaboratorStatusController = require('../controllers/collaboratorStatus');
var api = express.Router();
var md_auth = require('../middlewares/authenticatedCol');

var multipart = require('connect-multiparty');

api.get('/collaborator-status/:id', md_auth.ensureAuth, CollaboratorStatusController.getStatus);
api.get('/all-status/:company', md_auth.ensureAuth, CollaboratorStatusController.getAllStatus);
api.post('/collaborator-status', md_auth.ensureAuth, CollaboratorStatusController.saveStatus);
api.put('/update-status/:id', md_auth.ensureAuth, CollaboratorStatusController.updateStatus);
api.delete('/collaborator-status/:id', md_auth.ensureAuth, CollaboratorStatusController.deleteStatus); //admin role

module.exports = api;
