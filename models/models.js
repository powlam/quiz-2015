// Definición de todo el modelo de datos

var path = require('path');
var Sequelize = require('sequelize');

//Crear la tabla
var sequelize = new Sequelize(null, null, null,
	{	dialect:'sqlite',
		storage:'quiz.sqlite' }
);

var Quiz = sequelize.import(path.join(__dirname, 'quiz')); //importar info de quiz.js
exports.Quiz = Quiz; //para poderse usar desde otros puntos de la app

//Inicialización de la BBDD
sequelize.sync().success( function() {
	Quiz.count().success( function(count) {
		if (count === 0) {
			//Si está vacía, la inicializo
			Quiz.create(
				{	pregunta: '¿Capital de Italia?',
					respuesta: 'Roma' }
			).success(function() {
				console.log('BBDD inicializada.');
			});
		}
	});
});
