// require('dotenv').config();
// const fondo = process.env.FONDO;
// const frente = process.env.FRENTE;
// console.log({ fondo, frente });

const path = require('path');
const dotenv = require('dotenv');
const MODO = process.env.MODO || 'byn';

dotenv.config({
	path:
		MODO == 'byn'
			? path.resolve(__dirname, 'byn.env')
			: path.resolve(__dirname, 'colores.env'),
});

const fondo = process.env.FONDO;
const frente = process.env.FRENTE;

console.log({
	fondo,
	frente,
});
