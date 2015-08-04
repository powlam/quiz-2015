// Definición de la tabla Quiz (almacenada en quiz.sqlite)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', //Nombre de la tabla y de la clase en el ORM
		{
			texto: {
				type: DataTypes.STRING,
				validate: { 
					notEmpty: {
						msg: "-> Falta comentario" 
					}
				}
			}
		}
	);
}
