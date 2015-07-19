// Definición de todo el modelo de datos

var path = require('path');

// BBDD sqlite3 (local) o postgres (Heroku)
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

// ORM
var Sequelize = require('sequelize');

//Crear la tabla
var sequelize = new Sequelize(DB_name, user, pwd,
	{	dialect:protocol,
		protocol:protocol,
		port:port,
		host:host,
		storage:storage, //solo para SQLite
		omitNull:true }  //solo para Postgres
);

var Quiz = sequelize.import(path.join(__dirname, 'quiz')); //importar info de quiz.js
exports.Quiz = Quiz; //para poderse usar desde otros puntos de la app

//Inicialización de la BBDD
sequelize.sync().then( function() {
	Quiz.count().then( function(count) {
		if (count === 0) {
			//Si está vacía, la inicializo
			Quiz.create(
				{	pregunta: '¿Capital de Italia?',
					respuesta: 'Roma' })
			.then( function() {
				console.log('BBDD inicializada.');
			});
		}
	});
});
