// Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB local llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.
// Crear una colección llamada ‘estudiantes’ que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
// nombre: tipo string
// apellido: tipo string
// edad: tipo number
// dni: tipo string (campo único)
// curso: tipo string
// nota: tipo number
// Todos los campos deben ser requeridos obligatoriamente ({ required: true })
// Tomar los valores del siguiente array de objetos
// [
//     { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
//     { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
//     { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
//     { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
//     { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
//     { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
//     { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
//     { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
//     { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
//     { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
// ]

// Verificar que los datos estén almacenados en la base y colección que corresponda.

import { connect } from 'mongoose';
import { Estudiantes } from './models/estudiantes.js';

const connectionMG = async () => {
	try {
		await connect('mongodb://127.0.0.1:27017/colegio');
	} catch (err) {
		console.log(err);
		throw 'connection fail';
	}
};
console.log('base de datos conectada');
await connectionMG();

// await Estudiantes.insertMany([
// 	{
// 		nombre: 'Pedro',
// 		apellido: 'Mei',
// 		edad: 21,
// 		dni: '31155898',
// 		curso: '1A',
// 		nota: 7,
// 	},

// 	{
// 		nombre: 'Ana',
// 		apellido: 'Gonzalez',
// 		edad: 32,
// 		dni: '27651878',
// 		curso: '1A',
// 		nota: 8,
// 	},
// 	{
// 		nombre: 'José',
// 		apellido: 'Picos',
// 		edad: 29,
// 		dni: '34554398',
// 		curso: '2A',
// 		nota: 6,
// 	},
// 	{
// 		nombre: 'Lucas',
// 		apellido: 'Blanco',
// 		edad: 22,
// 		dni: '30355874',
// 		curso: '3A',
// 		nota: 10,
// 	},
// 	{
// 		nombre: 'María',
// 		apellido: 'García',
// 		edad: 36,
// 		dni: '29575148',
// 		curso: '1A',
// 		nota: 9,
// 	},
// 	{
// 		nombre: 'Federico',
// 		apellido: 'Perez',
// 		edad: 41,
// 		dni: '320118321',
// 		curso: '2A',
// 		nota: 5,
// 	},
// 	{
// 		nombre: 'Tomas',
// 		apellido: 'Sierra',
// 		edad: 19,
// 		dni: '38654790',
// 		curso: '2B',
// 		nota: 4,
// 	},
// 	{
// 		nombre: 'Carlos',
// 		apellido: 'Fernández',
// 		edad: 33,
// 		dni: '26935670',
// 		curso: '3B',
// 		nota: 2,
// 	},
// 	{
// 		nombre: 'Fabio',
// 		apellido: 'Pieres',
// 		edad: 39,
// 		dni: '4315388',
// 		curso: '1B',
// 		nota: 9,
// 	},
// 	{
// 		nombre: 'Daniel',
// 		apellido: 'Gallo',
// 		edad: 25,
// 		dni: '37923460',
// 		curso: '3B',
// 		nota: 2,
// 	},
// ]);

const verEstudiantes = await Estudiantes.find();
console.log(verEstudiantes);
