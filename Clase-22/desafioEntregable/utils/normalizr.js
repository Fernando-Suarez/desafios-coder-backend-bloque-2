// const db = [
// 	{
// 		author: {
// 			email: 'hola@hola.com',
// 			nombre: 'juan',
// 			apellido: 'perez',
// 			edad: 30,
// 			alias: 'juancito',
// 			avatar: 'www.google.com',
// 		},
// 		_id: '63b5d8e8cbaf14d988b58326',
// 		text: 'hola como estan?',
// 		fecha: '4/1/2023, 16:52:07',
// 	},
// 	{
// 		author: {
// 			email: 'fernando@hola.com',
// 			nombre: 'fernando',
// 			apellido: 'suarez',
// 			edad: 34,
// 			alias: 'fernandosu',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75c32a7b9b2c5054fd8fe',
// 		text: 'hola asdfdsaf',
// 		fecha: '5/1/2023, 20:24:34',
// 	},
// 	{
// 		author: {
// 			email: 'hola@hola.com',
// 			nombre: 'hola',
// 			apellido: 'chau',
// 			edad: 30,
// 			alias: 'holachau',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75c81a7b9b2c5054fd902',
// 		text: 'hola a todos',
// 		fecha: '5/1/2023, 20:25:53',
// 	},
// 	{
// 		author: {
// 			email: 'fernando@hola.com',
// 			nombre: 'fernando',
// 			apellido: 'suarez',
// 			edad: 34,
// 			alias: 'fernandosu',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75c8ca7b9b2c5054fd905',
// 		text: 'welcome',
// 		fecha: '5/1/2023, 20:26:04',
// 	},
// 	{
// 		author: {
// 			email: 'hola@hola.com',
// 			nombre: 'hola',
// 			apellido: 'chau',
// 			edad: 30,
// 			alias: 'holachau',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75c97a7b9b2c5054fd908',
// 		text: 'buenas tardes',
// 		fecha: '5/1/2023, 20:26:15',
// 	},
// 	{
// 		author: {
// 			email: 'hola@hola.com',
// 			nombre: 'hola',
// 			apellido: 'chau',
// 			edad: 30,
// 			alias: 'holachau',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75c97a7b9b2c5054fd90b',
// 		text: 'buenas tardes',
// 		fecha: '5/1/2023, 20:26:15',
// 	},
// 	{
// 		author: {
// 			email: 'fernando@hola.com',
// 			nombre: 'fernando',
// 			apellido: 'suarez',
// 			edad: 34,
// 			alias: 'fernandosu',
// 			avatar: 'www.google.com.ar',
// 		},
// 		_id: '63b75ca1a7b9b2c5054fd90e',
// 		text: 'buenas noches',
// 		fecha: '5/1/2023, 20:26:25',
// 	},
// ];

const { normalize, schema } = require('normalizr');

const mensajeNormalizr = (db) => {
	const authorSchema = new schema.Entity(
		'author',
		{},
		{ idAttribute: 'email' }
	);

	const mensajeSchema = new schema.Entity(
		'mensajes',
		{
			author: authorSchema,
		},
		{ idAttribute: '_id' }
	);

	const normalizado = normalize(db, [mensajeSchema]);
	return normalizado;
};

// console.log(JSON.stringify(db).length);
// console.log(JSON.stringify(mensajeNormalizr(db), null, 4).length);
// console.log(mensajeNormalizr(db));
// console.log(JSON.stringify(mensajeDenormalizr(mensajeNormalizr(db))).length);

module.exports = { mensajeNormalizr };
