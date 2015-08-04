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

//Crear la BBDD
var sequelize = new Sequelize(DB_name, user, pwd,
	{	dialect:protocol,
		protocol:protocol,
		port:port,
		host:host,
		storage:storage, //solo para SQLite
		omitNull:true }  //solo para Postgres
);

//Crear las tablas y su relación
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path); //importar info de quiz.js

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path); //importar info de quiz.js

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//para poder usarlos desde otros puntos de la app
exports.Quiz = Quiz;
exports.Comment = Comment;

//Inicialización de la BBDD
sequelize.sync().then( function() {
	Quiz.count().then( function(count) {
		//Si está vacía, la inicializo
		Quiz.destroy({ truncate: true }).then( function() {
			Quiz.bulkCreate( [
				{	pregunta: '¿Capital de Italia?',
					respuesta: 'Roma',
					tema: 'humanidades' },
				{	pregunta: '¿Capital de Portugal?',
					respuesta: 'Lisboa',
					tema: 'humanidades' }
			])
			.then( function() {
				console.log('BBDD inicializada');
			});
		});
	});
});
