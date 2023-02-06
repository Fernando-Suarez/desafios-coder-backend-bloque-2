const { Schema, model } = require('mongoose');

const usuariosSchema = new Schema({
	username: { type: String, required: true, max: 100 },
	password: { type: String, required: true, max: 100 },
});

const Usuarios = model('usuarios', usuariosSchema);

module.exports = Usuarios;
