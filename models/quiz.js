// Definición de la tabla Quiz (almacenada en quiz.sqlite)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Quiz', //Nombre de la tabla y de la clase en el ORM
		{	pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING }
	);
}
