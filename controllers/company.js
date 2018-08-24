'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs'); //<---------
var Company = require('../models/company');  //<---------
var jwt = require('../services/jwt');

function saveCompany(req, res){  //<------------------
  var company = new Company();

  var params = req.body;

  company.email = params.email;
  company.name = params.name;
  company.cp = params.cp;
  company.rfc = params.rfc;
  company.street = params.street;
  company.suburb = params.suburb;
  company.num_ext = params.num_ext;
  company.num_int = params.num_int;
  company.municipality = params.municipality;
  company.state = params.state;
  company.tel = params.tel;
  company.image = 'null';
  company.role = "ROLE_COMPANY";

  if(params.password){
    //Escriptar password
    bcrypt.hash(params.password, null, null, function(err, hash){
      company.password = hash;

     const {email, name, cp, rfc, street, suburb, num_ext, num_int, municipality, state, tel} = company;
     var fields = [email, name, cp, rfc, street, suburb, num_ext, num_int, municipality, state, tel];

      if(fields.includes(null)){
        res.status(200).send({message: 'Rellena todos los campos'});
      }else{
          //Guardar usuario
          company.save((err, companyStored) => {
            if(err){
              res.status(500).send({message: 'Error al guardar la empresa'});
            }else{
              if(!companyStored){
                res.status(404).send({message: 'No se ha registrado la empresa'});
              }else{
                res.status(200).send({company: companyStored});
              }
            }
          });
      }
    });

  }else{
    res.status(200).send({message: 'Introduce la contraseña'});
  }
}

function loginCompany(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  Company.findOne({email: email.toLowerCase()}, (err, company) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!company){
        res.status(404).send({message: 'La empresa no existe'});
      }else{
        //Comprobar contraseña
        bcrypt.compare(password, company.password, function(err, check){
          if(check){
            //devolver los datos del usuario logueado
            if(params.gethash){
              //devolver token de jwt
              res.status(200).send({
                token: jwt.createToken(company)
              });
            }else{
              res.status(200).send({company});
            }
          }else{
            res.status(404).send({message: 'Contraseña incorrecta'});
          }
        });
      }
    }
  });
}

function updateCompany(req, res){
  var companyId = req.params.id;
  var update = req.body;

  if(update.password){
    //Escriptar password
    bcrypt.hash(req.body.password, null, null, function(err, hash){
      update.password = hash;

      Company.findByIdAndUpdate(companyId, update, (err, companyUpdated) => {
        if(err){
          res.status(500).send({message: 'Error al actualizar la empresa'});
        }else{
          if(!companyUpdated){
            res.status(404).send({message: 'No se han podido actualizar los datos de la empresa'});
          }else{
            res.status(200).send({company: companyUpdated});
          }
        }
      });
    });
  }else{
    Company.findByIdAndUpdate(companyId, update, (err, companyUpdated) => {
      if(err){
        res.status(500).send({message: 'Error al actualizar la empresa'});
      }else{
        if(!companyUpdated){
          res.status(404).send({message: 'No se han podido actualizar los datos de la empresa'});
        }else{
          res.status(200).send({company: companyUpdated});
        }
      }
    });
  }
}

function uploadImage(req, res){
  var companyId = req.params.id;
  var file_name = 'No subido ...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    var extentions = ['png','jpg','gif'];

    if(extentions.includes(file_ext)){
      Company.findByIdAndUpdate(companyId, {image: file_name}, (err, companyUpdated) => {
          if(!companyUpdated){
            res.status(404).send({message: 'No se ha podido actualizar la empresa'});
          }else{
            res.status(200).send({company: companyUpdated});
          }
      });
    }else{
      res.status(200).send({message: 'Extension del archivo no valida'});
    }
  }else{
    res.status(404).send({message: 'No has subido ninguna imagen...'});

  }
}

function getIMageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/company/'+imageFile;
  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'No existe la imagen...'});
    }
  });
}

module.exports = {
  saveCompany,
  loginCompany,
  updateCompany,
  uploadImage,
  getIMageFile
}
