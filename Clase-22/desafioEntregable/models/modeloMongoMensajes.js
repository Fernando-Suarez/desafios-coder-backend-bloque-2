const { Schema, model } = require('mongoose');
const messageSchema = new Schema(
	{
		author: {
			id: { type: String },
			nombre: { type: String },
			apellido: { type: String },
			edad: { type: Number },
			alias: { type: String },
			avatar: { type: String },
		},
		mensaje: { type: String },
		fecha: { type: String },
	},
	{
		versionKey: false,
	}
);

const modeloMensaje = model('mensajes', messageSchema);

module.exports = { modeloMensaje };
