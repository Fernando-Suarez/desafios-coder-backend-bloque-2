// Realizar un proyecto en Node.js que sobre la base colegio realice las siguientes acciones:
// Actualizar el dni del estudiante Lucas Blanco a 20355875
// Agregar un campo 'ingreso' a todos los documentos con el valor false
// Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
// Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
// Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
// Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
// Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS.
// Por ejemplo:
// {"_id":"604df61b5e39a84ba41313e4","nombre":"Fabio","apellido":"Pieres","edad":39,"dni":"4315388","curso":"1B","nota":9,"ingreso":false} -> Fecha creación:  14/3/2021 08:40:11
// Implementar estas funciones utilizando Promises en Mongoose con sintaxis async/await, utilizando la importación en formato ES Modules (import)
// Verificar la información de la base 'colegio'.

import { connect } from 'mongoose';
import { Estudiantes } from './models/estudiantes.js';

const connectionMG = async () => {
	try {
		await connect('mongodb://127.0.0.1:27017/colegio');
	} catch (err) {
		console.log(err);
		throw 'conection failed';
	}
};
console.log('conectando...');
await connectionMG();
console.log('base de datos conectada');

//* muestra toda la coleccion
const alumnos = await Estudiantes.find();
console.log(alumnos);

//* update dni lucas blanco
// const updateAlumno = await Estudiantes.updateOne(
// 	{ nombre: 'Lucas', apellido: 'Blanco' },
// 	{ $set: { dni: '20355875' } }
// );
// console.log(updateAlumno);

//* agregar campo ingreso a todos los documentos con el valor false
// const agregarPropiedad = await Estudiantes.updateMany(
// 	{},
// 	{ $set: { ingreso: false } },
// 	{ upsert: true }
// );
// console.log(agregarPropiedad);

//*modificar el valor a true del campo 'ingreso' de los estudiandes del curso '1A'

// const modificarPropiedad = await Estudiantes.updateMany(
// 	{ curso: '1A' },
// 	{ $set: { ingreso: true } },
// 	{ upsert: true }
// );
// console.log(modificarPropiedad);

//*listar estudiantes con nota > 4 y sin los campos "__v" , "_id"

// const listarAprobados = await Estudiantes.find(
// 	{ nota: { $gte: 4 } },
// 	{ __v: 0, _id: 0 }
// );
// console.log(listarAprobados);

//*listar estudiantes con el campo ingreso valor:true sin los campos "__v", "_id"
// const listarIngresos = await Estudiantes.find(
// 	{ ingreso: true },
// 	{ __v: 0, _id: 0 }
// );
// console.log(listarIngresos);

//*borrar estudiantes con el campo ingreso valor:true
// const borrarIngresos = await Estudiantes.deleteMany({ ingreso: true });
// console.log(borrarIngresos);
