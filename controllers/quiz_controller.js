var models = require('../models/models.js');

// Autoload - chequeo del parámetro :quizId recogido en cualquier URL
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then( function(quiz) {
		if (quiz) { //id encontrado en BBDD
			req.quiz = quiz;
			next();
		} else { //id no encontrado en BBDD
			next(new Error('No existe quizId='+quizId));
		}
	}).catch( function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res) {
	if (!req.query.search) {
		//Si no se busca nada, se muestran todas las preguntas
		models.Quiz.findAll().then( function(quizes) {
			res.render('quizes/index', 
				{	quizes: quizes }
			);
		}).catch( function(error) { next(error); });
	} else {
		var search = '%'+req.query.search.replace(' ', '%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", search]}).then( function(quizes) {
			res.render('quizes/index', 
				{	quizes: quizes }
			);
		}).catch( function(error) { next(error); });
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show',
		{	quiz: req.quiz }
	);
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', 
		{	quiz: req.quiz, 
			respuesta: resultado }
	);
};
