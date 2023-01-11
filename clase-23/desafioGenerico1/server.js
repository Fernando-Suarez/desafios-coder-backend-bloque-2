// Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello:
// Definir una ruta “cookies”.
// Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
// Definir un método GET que devuelva todas las cookies presentes.
// Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.
// NOTA 1: Utilizar la librería express como estructura de servidor.
// NOTA 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
// Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
// NOTA 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
// NOTA 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//post recibe un objeto con el nombre de la cookie,su valor y el tiempo de duracion en segundos.
app.post('/cookies', (req, res) => {
	try {
		const { nombre, valor, tiempoSeg } = req.body;
		if (nombre == undefined) {
			res.json({ error: 'falta nombre ' });
		} else if (valor == undefined) {
			res.json({ error: 'falta valor ' });
		} else {
			res.cookie(nombre, valor, { maxAge: tiempoSeg }).json({ proceso: 'ok' });
		}
	} catch (error) {
		console.log(error);
	}
});

//get todas las cookies presentes
app.get('/cookies', (req, res) => {
	try {
		res.json({ cookies: req.cookies });
	} catch (error) {
		console.log(error);
	}
});

//delete recibe el nombre de la cookie por parametro de ruta y la elimine
app.delete('/cookies/:nombre', (req, res) => {
	try {
		const { nombre } = req.params;
		if (!nombre) {
			res.json({ error: 'parametro no encontrado' });
		} else {
			res.clearCookie(nombre).json({ proceso: 'ok' });
		}
	} catch (error) {
		console.log(error);
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`servidor escuchado en el puerto http://localhost:${PORT}`);
});
