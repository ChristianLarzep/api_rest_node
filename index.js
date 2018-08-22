'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;  //Se usa la variable de entorno o 3977

mongoose.Promise = global.Promise; //Quitar aviso de Mongoose Promise de consola
mongoose.connect('mongodb://localhost:27017/cursos_backend',{ useNewUrlParser: true}, (err, res) => {
    if(err){
      throw err;
    } else{
      console.log("La base de datos esta corriendo correctamente...");

      app.listen(port, function(){
        console.log("Servidor de apirest spotysong escuchando en http://localhost:"+port);
      })
    }
});
