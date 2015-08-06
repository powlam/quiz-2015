var models = require('../models/models.js');
var async = require('async');

// GET /quizes/statistics
exports.index = function(req, res) {
	var preguntasTotal = 0;
	var comentariosTotal = 0;
	var comentariosXpregunta = 0;
	var preguntasSinComentario = 0;
	var preguntasConComentario = 0;

	//Necesito realizar varias consultas y, cuando todas terminen, pintar la página.
	//(javascript por defecto realizaría esas tareas de forma asíncrona y la página se pintaría antes de terminar las consultas)
	//Para eso uso async: todas las consultas se realizan en paralelo (async.parallel)
	//y, cuando terminen todas (esto es lo novedoso), se realizan cálculos finales y se pinta la página
	var tareasAsync = []; //array de tareas que se realizarán en paralelo

	tareasAsync.push( function(callback) {
		models.Quiz.count().complete(function(err, count) {
		    preguntasTotal = count;
		    callback(); //tarea terminada!
		});
	});

	tareasAsync.push( function(callback) {
	  	models.Comment.count().complete(function(err, count) {
		    comentariosTotal = count;
		    callback(); //tarea terminada!
		});
	});

	tareasAsync.push( function(callback) {
	  	models.Quiz.count({ 
	  		distinct: 'id',
	  		include: [{ model: models.Comment, required: true}]
	  	}).complete(function(err, count) {
		    preguntasConComentario = count;
		    callback(); //tarea terminada!
	  	});
	});

	async.parallel(tareasAsync, function() {
		//Esto se ejecutará una vez completadas todas las tareas de tareasAsync
		if (preguntasTotal > 0) {
    		comentariosXpregunta = comentariosTotal / preguntasTotal;
			preguntasSinComentario = preguntasTotal - preguntasConComentario;
    	}

		res.render('quizes/statistics', 
			{	preguntasTotal:preguntasTotal,
				comentariosTotal:comentariosTotal,
				comentariosXpregunta:comentariosXpregunta,
				preguntasSinComentario:preguntasSinComentario,
				preguntasConComentario:preguntasConComentario,
				errors:[] }
		);
	});
};
