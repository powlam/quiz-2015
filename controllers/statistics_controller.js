var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res) {
	var preguntasTotal = 0;
	var comentariosTotal = 0;
	var comentariosXpregunta = 0;
	var preguntasSinComentario = 0;
	var preguntasConComentario = 0;
/*
	models.Quiz.findAndCount().then( function(result) {
		preguntasTotal = result.count;
		if (preguntasTotal === 0) return;

		models.Comment.findAndCount().then( function(result) {
			comentariosTotal = result.count;
			if (comentariosTotal === 0) {
				preguntasSinComentario = preguntasTotal;
				return;
			}

			comentariosXpregunta = comentariosTotal / preguntasTotal;

//			models.Quiz.findAll({where: ["pregunta like ?", search], order:"pregunta ASC" }).then( function(quizes) {
//				preguntasConComentario = quizes.length;
//				preguntasSinComentario = preguntasTotal - preguntasConComentario;
//			}).catch( function(error) { next(error); });

		}).catch( function(error) { next(error); });
	}).catch( function(error) { next(error); });
*/
	res.render('quizes/statistics', 
		{	preguntasTotal:preguntasTotal,
			comentariosTotal:comentariosTotal,
			comentariosXpregunta:comentariosXpregunta,
			preguntasSinComentario:preguntasSinComentario,
			preguntasConComentario:preguntasConComentario,
			errors:[] }
	);
};
