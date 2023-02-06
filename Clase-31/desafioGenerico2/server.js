// Crear un servidor que tenga una ruta '/sumar' que reciba por query params dos números y devuelva un mensajes con la suma entre ambos.
// Utilizar log4js para crear un módulo capaz de exportar uno de los siguientes dos loggers: uno para el entorno de desarrollo, que logueará de info en adelante por consola, y otro para el entorno de producción, que logueará de debug en adelante a un archivo ‘debug.log’ y solo errores a otro archivo ‘errores.log’.
// El logueo se realizará siguiendo el siguiente criterio:
// En caso de operaciones exitosas, loguear una línea de info
// En caso de ingresar un número no válido, loguear un error
// En caso de fallar el inicio del servidor, loguear un error
// En caso de recibir una petición a un recurso inválido, loguear una warning.
// La decisión de qué logger exportar se tomará en base al valor de una variable de entorno NODE_ENV, cuyo valor puede ser: ‘PROD’ para producción, o cualquier otra cosa (incluyendo nada) para desarrollo.

const express = require('express');
const log4js = require('log4js');
const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = 'desarrollo';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let logger = log.getLogger('dev');
// if (NODE_ENV === 'produccion') {
// 	let logger = log.getLogger('produccion');
// } else {
// 	let logger = log.getLogger('desarrollo');
// }

app.get('/sumar/', (req, res) => {
	const { a, b } = req.query;
	const sumar = parseInt(a) + parseInt(b);
	res.send(`la suma de los 2 numeros es: ${sumar}`);
});

app.listen(PORT, () => {
	console.log(`servidor escuchado en el puerto http://localhost:${PORT}`);
});
const log = log4js.configure({
	appenders: {
		loggerConsole: { type: 'console' },
		loggerDebug: { type: 'file', filename: 'debug.log' },
		loggerError: { type: 'file', filename: 'error.log' },
	},

	categories: {
		default: { appenders: ['loggerConsole'], level: 'trace' },
		dev: { appenders: ['loggerConsole'], level: 'info' },
		prod: { appenders: ['loggerDebug, loggerError'], level: 'debug' },
	},
});
