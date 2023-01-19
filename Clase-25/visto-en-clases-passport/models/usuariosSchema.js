const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
	username: { type: String, required: true, max: 100 },
	password: { type: String, required: true, max: 100 },
});

const Usuarios = model('usuarios', usuarioSchema);

exports.module = Usuarios;
