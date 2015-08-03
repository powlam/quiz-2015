// Definición de la tabla Quiz (almacenada en quiz.sqlite)

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Quiz', //Nombre de la tabla y de la clase en el ORM
		{
			pregunta: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg:"-> Falta pregunta"
					}
				}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: { 
					notEmpty: {
						msg:"-> Falta respuesta"
					}
				}
			},
			tema: {
				type: DataTypes.STRING,
				validate: { 
					isIn: {
	  					args: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']],
						msg: "-> Tema desconocido" 
					}
				}
			}
		}
	);
}
