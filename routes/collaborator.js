'use strict'

var express = require('express');
var CollaboratorController = require('../controllers/collaborator');
var api = express.Router();
var md_auth = require('../middlewares/authenticatedCol');

var multipart = require('connect-multiparty');

api.get('/collaborator/:id', md_auth.ensureAuth, CollaboratorController.getCollaborator);
api.post('/collaborator', md_auth.ensureAuth, CollaboratorController.saveCollaborator);
api.get('/collaborators/:company', md_auth.ensureAuth, CollaboratorController.getCollaborators);
api.put('/update-collaborator/:id', md_auth.ensureAuth, CollaboratorController.updateCollaborator);
api.delete('/delete-collaborator/:id', md_auth.ensureAuth, CollaboratorController.deleteCollaborator);
api.post('/login-collaborator', CollaboratorController.loginCollaborator);

module.exports = api;
