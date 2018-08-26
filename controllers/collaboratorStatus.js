'use strict'

var CollaboratorStatus = require('../models/collaboratorStatus');

function getAllStatus(req, res){
  var companyId = req.params.company;

  if(!companyId){
    res.status(404).send({message: 'No se proporciono el id de la empresa'});
  }else{
    var find = CollaboratorStatus.find({company: companyId});
    find.populate({
      path: 'companyCourse',
    }).exec(function(err, colStatus){
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!colStatus){
          res.status(404).send({message: 'No se han asignado cursos a los colaboradores'});
        }else{
          res.status(200).send({colStatus});
        }
      }
    });
  }
}

function getStatus(req, res){
  var statusId = req.params.id;

  CollaboratorStatus.findById(statusId).populate({path: 'course'}).exec((err, colStatus) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!colStatus){
        res.status(404).send({message: 'El status no existe'});
      }else{
        res.status(200).send({colStatus});
      }
    }
  });
}

function saveStatus(req, res){
  var colStatus = new CollaboratorStatus();

  var params = req.body;

  colStatus.attempt = params.attempt;
  colStatus.status = params.status;
  colStatus.result = params.result;
  colStatus.company = params.company;
  colStatus.companyCourse = params.companyCourse;
  colStatus.collaborator = params.collaborator;

  colStatus.save((err, statusStored) => {
    if(err){
      res.status(500).send({message: 'Error al guardar el status'});
    }else{
      if(!statusStored){
        res.status(404).send({message: 'No se ha registrado el status'});
      }else{
        res.status(200).send({status: statusStored});
      }
    }
  });
}

function updateStatus(req, res){
  var statusId = req.params.id;
  var update = req.body;

  CollaboratorStatus.findByIdAndUpdate(statusId, update, (err, statusUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el status del colaborador'});
    }else{
      if(!statusUpdated){
        res.status(404).send({message: 'No se han podido actualizarel status del colaborador'});
      }else{
        res.status(200).send({status: statusUpdated});
      }
    }
  });
}

function deleteStatus(req, res){
  var statusId = req.params.id;

  CollaboratorStatus.findByIdAndRemove(statusId, (err, statusRemoved) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!statusRemoved){
        res.status(404).send({message: 'No se ha borrado el status'});
      }else{
        res.status(200).send({status: statusRemoved});
      }
    }
  });
}

module.exports = {
  getAllStatus,
  saveStatus,
  getStatus,
  updateStatus,
  deleteStatus
};
