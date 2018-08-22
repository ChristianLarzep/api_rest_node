'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var company_routes = require('./routes/company');
var course_routes = require('./routes/course');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras

//ruta base
app.use('/api',company_routes);
app.use('/api',course_routes);

module.exports = app;
