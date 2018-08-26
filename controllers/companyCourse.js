'use strict'

var CompanyCourse = require('../models/companyCourse');

var Course = require('../models/course');

function getCourses(req, res){
  var companyId = req.params.company;

  if(!companyId){
    res.status(404).send({message: 'No se proporciono el id de la empresa'});
  }else{
    var find = CompanyCourse.find({company: companyId});
    find.populate({
      path: 'course'
    }).exec(function(err, companyCourses){
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!companyCourses){
          res.status(404).send({message: 'No empresa no tiene cursos'});
        }else{
          res.status(200).send({companyCourses});
        }
      }
    });
  }
}

function getCourse(req, res){
  var courseId = req.params.id;

  CompanyCourse.findById(courseId).populate({path: 'course'}).exec((err, course) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!course){
        res.status(404).send({message: 'La empresa no tien este curso'});
      }else{
        res.status(200).send({course});
      }
    }
  });
}

function addDays(date, days){
  date.setDate(date.getDate() + days);
  return date.toDateString();
}

function saveCourse(req, res){
  var companyCourse = new CompanyCourse();

  var fecha = new Date();

  var params = req.body;
  companyCourse.numCol = params.numCol;
  companyCourse.company = params.company;
  companyCourse.course = params.course;

  Course.findById(params.course).populate({path: 'course'}).exec((err, course) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!course){
        res.status(404).send({message: 'El curso no existe'});
      }else{
        companyCourse.initDate = fecha.toDateString();
        let finalD = addDays(fecha, course.duration);
        companyCourse.finalDate = finalD;

        companyCourse.save((err, courseStored) => {
          if(err){
            res.status(500).send({message: 'Error en el servidor'});
          }else{
            if(!courseStored){
              res.status(404).send({message: 'No se a guardado el curso'});
            }else{
              res.status(200).send({course: courseStored});
            }
          }
        })
      }
    }
  });
}

function deleteCourse(req, res){
  var courseId = req.params.id;
  var fecha = new Date();

  CompanyCourse.deleteMany({finalDate : fecha.toDateString()}, (err, courseRemoved) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!courseRemoved){
        res.status(404).send({message: 'No se ha borrado el curso'});
      }else{
        res.status(200).send({course: courseRemoved});
      }
    }
  });
}

module.exports = {
  getCourses,
  saveCourse,
  getCourse,
  deleteCourse
};
