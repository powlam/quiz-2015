var models = require('../models/models.js');

// Autoload - chequeo del parámetro :quizId recogido en cualquier URL
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(
		{	where: 
				{	id:Number(quizId) },
			include: [
				{	model:models.Comment }
			]
		}
	)
	.then( function(quiz) {
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
				{	quizes: quizes,
					errors:[] }
			);
		}).catch( function(error) { next(error); });
	} else {
		var search = '%'+req.query.search.replace(' ', '%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", search], order:"pregunta ASC" }).then( function(quizes) {
			res.render('quizes/index', 
				{	quizes: quizes,
					errors:[] }
			);
		}).catch( function(error) { next(error); });
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show',
		{	quiz: req.quiz,
			errors:[] }
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
			respuesta: resultado,
			errors:[] }
	);
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{	pregunta:'',
			respuesta:'',
			tema:'' }
	);
	res.render('quizes/new', 
		{	guia:
			{	pregunta:'Pregunta',
				respuesta:'Respuesta',
				tema:'' },
			quiz:quiz,
			errors:[] }
	);
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then( function(err) {
		if (err) {
			res.render('quizes/new',
				{	guia:
					{	pregunta:'Pregunta',
						respuesta:'Respuesta',
						tema:'' },
					quiz:quiz,
					errors:err.errors }
			);
		} else {
			quiz.save({ fields:['pregunta', 'respuesta', 'tema'] }).then( function() {
				res.redirect('/quizes');
			});
		}
	});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', 
		{	guia:
			{	pregunta:'Pregunta',
				respuesta:'Respuesta',
				tema:'' },
			quiz:quiz,
			errors:[] }
	);
};

// PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then( function(err) {
		if (err) {
			res.render('quizes/edit',
				{	guia:
					{	pregunta:'Pregunta',
						respuesta:'Respuesta',
						tema:'' },
					quiz:req.quiz,
					errors:err.errors }
			);
		} else {
			req.quiz.save({ fields:['pregunta', 'respuesta', 'tema'] }).then( function() {
				res.redirect('/quizes');
			});
		}
	});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch( function(error) { next(error); });
};
