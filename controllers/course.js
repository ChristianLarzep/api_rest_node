'use strict'
var fs = require('fs');
var path = require('path');
var Course = require('../models/course');
var jwt = require('../services/jwt');

function saveCourse(req, res){
  var course = new Course();

  var params = req.body;

  course.name = params.name;
  course.description = params.description;
  course.cost = params.cost;
  course.duration = params.duration;
  course.link = params.link;
  course.image = 'null';

  const {name, description, cost, duration, link} = course;
  var fields = [name, description, cost, duration, link];

  if(fields.includes(null)){
    res.status(200).send({message: 'Rellena todos los campos'});
  }else{
      course.save((err, courseStored) => {
        if(err){
          res.status(500).send({message: 'Error al guardar el curso'});
        }else{
          if(!courseStored){
            res.status(404).send({message: 'No se ha registrado el curso'});
          }else{
            res.status(200).send({course: courseStored});
          }
        }
      });
  }
}

function updateCourse(req, res){
  var courseId = req.params.id;
  var update = req.body;

  Course.findByIdAndUpdate(courseId, update, (err, courseUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el curso'});
    }else{
      if(!courseUpdated){
        res.status(404).send({message: 'No se han podido actualizar los datos del curso'});
      }else{
        res.status(200).send({curso: courseUpdated});
      }
    }
  });
}

function getCourses(req, res){
  var courseId = req.params.course;

  if(!courseId){
    var find = Course.find({}).sort('name');
  }else{
    var find = Course.find({course: artistId}).sort('name');
  }

  find.populate({path: 'course'}).exec((err, courses) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!courses){
        res.status(404).send({message: 'No hay cursos'});
      }else{
        res.status(200).send({courses});
      }
    }
  });
}

function getCourse(req, res){
  var courseId = req.params.id;

  Course.findById(courseId).populate({path: 'course'}).exec((err, course) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!course){
        res.status(404).send({message: 'El curso no existe'});
      }else{
        res.status(200).send({course});
      }
    }
  });
}

function deleteCourse(req, res){
  var courseId = req.params.id;

  Course.findByIdAndRemove(courseId, (err, courseRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar el curso'});
    }else{
      if(!courseRemoved){
        res.status(404).send({message: 'El curso no ha sido eliminado'});
      }else{
        res.status(404).send({album: courseRemoved});
      }
    }
  });
}

function uploadImage(req, res){
  var courseId = req.params.id;
  var file_name = 'No subido ...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    var extentions = ['png','jpg','gif'];

    if(extentions.includes(file_ext)){
      Course.findByIdAndUpdate(courseId, {image: file_name}, (err, courseUpdated) => {
          if(!courseUpdated){
            res.status(404).send({message: 'No se ha podido actualizar el curso'});
          }else{
            res.status(200).send({curso: courseUpdated});
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
  var path_file = './uploads/course/'+imageFile;
  fs.exists(path_file, function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message: 'No existe la imagen...'});
    }
  });
}

module.exports = {
  saveCourse,
  updateCourse,
  uploadImage,
  getIMageFile,
  getCourses,
  getCourse,
  deleteCourse
}
