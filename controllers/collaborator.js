'use strict'

var path = require('path')
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Collaborator = require('../models/collaborator');
var Company = require('../models/company');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwtCol');

function getCollaborators(req, res){
  var companyId = req.params.company;

  if(!companyId){
    res.status(404).send({message: 'No se proporciono el id de la empresa'});
  }else{
    var find = Collaborator.find({company: companyId});
    find.populate({
      path: 'company',
    }).exec(function(err, collaborators){
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!collaborators){
          res.status(404).send({message: 'No hay colaopradores'});
        }else{
          res.status(200).send({collaborators});
        }
      }
    });
  }
}

function getCollaborator(req, res){
  var collaboratorId = req.params.id;

  Collaborator.findById(collaboratorId).populate({path: 'company'}).exec((err, collaborator) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!collaborator){
        res.status(404).send({message: 'El colaborador no existe'});
      }else{
        res.status(200).send({collaborator});
      }
    }
  });
}

function saveCollaborator(req, res){
  var collaborator = new Collaborator();

  var params = req.body;
  collaborator.email = params.email;
  collaborator.name = params.name;
  collaborator.year = params.year;
  collaborator.month = params.moth;
  collaborator.day = params.day;
  collaborator.genre = params.genre;
  collaborator.role = "COLLABORATOR";
  collaborator.company = params.company;

  if(params.password){
    //Escriptar password
    bcrypt.hash(params.password, null, null, function(err, hash){
      collaborator.password = hash;

     const {email, password, name, year, month, day, genre, company} = collaborator;
     var fields = [email, password, name, year, month, day, genre, company];

      if(fields.includes(null)){
        res.status(200).send({message: 'Rellena todos los campos'});
      }else{
          //Guardar colaborador
          collaborator.save((err, collaboratorStored) => {
            if(err){
              res.status(500).send({message: 'Error al guardar el colaborador'});
            }else{
              if(!collaboratorStored){
                res.status(404).send({message: 'No se ha registrado el colaborador'});
              }else{
                res.status(200).send({colaborador: collaboratorStored});
              }
            }
          });
      }
    });

  }else{
    res.status(200).send({message: 'Introduce la contraseña'});
  }
}

function loginCollaborator(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  Collaborator.findOne({email: email.toLowerCase()}, (err, collaborator) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!collaborator){
        res.status(404).send({message: 'El colaborador no existe'});
      }else{
        //Comprobar contraseña
        bcrypt.compare(password, collaborator.password, function(err, check){
          if(check){
            //devolver los datos del usuario logueado
            if(params.gethash){
              //devolver token de jwt
              res.status(200).send({
                token: jwt.createToken(collaborator)
              });
            }else{
              res.status(200).send({collaborator});
            }
          }else{
            res.status(404).send({message: 'Contraseña incorrecta'});
          }
        });
      }
    }
  });
}

function updateCollaborator(req, res){
  var collaboratorId = req.params.id;
  var update = req.body;

  if(update.password){
    //Escriptar password
    bcrypt.hash(req.body.password, null, null, function(err, hash){
      update.password = hash;

      Collaborator.findByIdAndUpdate(collaboratorId, update, (err, collaboratorUpdated) => {
        if(err){
          res.status(500).send({message: 'Error al actualizar el colaborador'});
        }else{
          if(!collaboratorUpdated){
            res.status(404).send({message: 'No se han podido actualizar los datos del colaborador'});
          }else{
            res.status(200).send({colaborador: collaboratorUpdated});
          }
        }
      });
    });
  }else{
    Collaborator.findByIdAndUpdate(collaboratorId, update, (err, collaboratorUpdated) => {
      if(err){
        res.status(500).send({message: 'Error al actualizar el colaborador'});
      }else{
        if(!collaboratorUpdated){
          res.status(404).send({message: 'No se han podido actualizar los datos del colaborador'});
        }else{
          res.status(200).send({colaborador: collaboratorUpdated});
        }
      }
    });
  }
}

function deleteCollaborator(req, res){
  var collaboratorId = req.params.id;

  Collaborator.findByIdAndRemove(collaboratorId, (err, collaboratorRemoved) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!collaboratorRemoved){
        res.status(404).send({message: 'No se ha borradoel colaborador'});
      }else{
        res.status(200).send({colaborador: collaboratorRemoved});
      }
    }
  });
}

module.exports = {
  getCollaborators,
  saveCollaborator,
  getCollaborator,
  updateCollaborator,
  deleteCollaborator,
  loginCollaborator
};
