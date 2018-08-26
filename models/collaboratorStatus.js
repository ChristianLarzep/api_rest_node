'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollaboratorStatusSchema = Schema({
  attempt: Number,
  status: Boolean,
  result: Number,
  company: {type: Schema.ObjectId, ref: 'Company'},
  companyCourse: {type: Schema.ObjectId, ref: 'CompanyCourse'},
  collaborator: {type: Schema.ObjectId, ref: 'Collaborator'}
});

module.exports = mongoose.model('CollaboratorStatus', CollaboratorStatusSchema);

//id_curso, nombre, correo, intentos, status, calificacion, fecha_inicio, fecha_limite
