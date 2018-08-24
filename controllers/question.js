'use strict'

var path = require('path')
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Course = require('../models/course');
var Question = require('../models/question');

function getQuestions(req, res){
  var courseId = req.params.course;

  if(!courseId){
    res.status(404).send({message: 'No se proporciono el id del curso'});
  }else{
    var find = Question.find({course: courseId});
    find.populate({
      path: 'course',
    }).exec(function(err, questions){
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!questions){
          res.status(404).send({message: 'No hay preguntas'});
        }else{
          res.status(200).send({questions});
        }
      }
    });
  }
}

function getQuestion(req, res){
  var questionId = req.params.id;

  Question.findById(questionId).populate({path: 'course'}).exec((err, question) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!question){
        res.status(404).send({message: 'La pregunta no existe'});
      }else{
        res.status(200).send({question});
      }
    }
  });
}

function saveQuestion(req, res){
  var question = new Question();

  var params = req.body;
  question.question = params.question;
  question.opt1 = params.opt1;
  question.opt2 = params.opt2;
  question.opt3 = params.opt3;
  question.answer = params.answer;
  question.course = params.course;

  question.save((err, questionStored) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!questionStored){
        res.status(404).send({message: 'No se a guardado la pregunta'});
      }else{
        res.status(200).send({song: questionStored});
      }
    }
  })
}

function updateQuestion(req, res){
  var questionId = req.params.id;
  var update = req.body;

  Question.findByIdAndUpdate(questionId, update, (err, questionUpdated) =>{
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!questionUpdated){
        res.status(404).send({message: 'No se ha actualizado la pregunta'});
      }else{
        res.status(200).send({question: questionUpdated});
      }
    }
  });
}

function deleteQuestion(req, res){
  var questionId = req.params.id;

  Question.findByIdAndRemove(questionId, (err, questionRemoved) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!questionRemoved){
        res.status(404).send({message: 'No se ha borrado la pregunta'});
      }else{
        res.status(200).send({question: questionRemoved});
      }
    }
  });
}



module.exports = {
  getQuestions,
  saveQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion
};
