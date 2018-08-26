'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var company_routes = require('./routes/company');
var course_routes = require('./routes/course');
var question_routes = require('./routes/question');
var collaborator_routes = require('./routes/collaborator');
var company_course_routes = require('./routes/companyCourse');
var collaborator_status = require('./routes/collaboratorStatus');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras

//ruta base
app.use('/api',company_routes);
app.use('/api',course_routes);
app.use('/api',question_routes);
app.use('/api',collaborator_routes);
app.use('/api',company_course_routes);
app.use('/api',collaborator_status);

module.exports = app;
