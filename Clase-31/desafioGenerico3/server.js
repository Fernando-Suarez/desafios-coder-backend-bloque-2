// Crear un servidor que tenga una ruta '/sumar' que reciba por query params dos números y devuelva un mensajes con la suma entre ambos.
// Utilizar log4js para crear un módulo capaz de exportar uno de los siguientes dos loggers: uno para el entorno de desarrollo, que logueará de info en adelante por consola, y otro para el entorno de producción, que logueará de debug en adelante a un archivo ‘debug.log’ y solo errores a otro archivo ‘errores.log’.
// El logueo se realizará siguiendo el siguiente criterio:
// En caso de operaciones exitosas, loguear una línea de info
// En caso de ingresar un número no válido, loguear un error
// En caso de fallar el inicio del servidor, loguear un error
// En caso de recibir una petición a un recurso inválido, loguear una warning.
// La decisión de qué logger exportar se tomará en base al valor de una variable de entorno NODE_ENV, cuyo valor puede ser: ‘PROD’ para producción, o cualquier otra cosa (incluyendo nada) para desarrollo.
const express = require('express');
const winston = require('winston');
const PORT = process.env.PORT || 8080;
const app = express();
const NODE_ENV = 'desarrollo';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let logger;

if (!NODE_ENV) {
	logger = winston.createLogger({
		level: 'warn',
		transports: [new winston.transports.Console({ level: 'info' })],
	});
} else {
	logger = winston.createLogger({
		level: 'warn',
		transports: [
			new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
			new winston.transports.File({ filename: 'error.log', level: 'error' }),
		],
	});
}

// logger.log('silly', '127.0.0.1 - log silly');
// logger.log('debug', '127.0.0.1 - log debug');
// logger.log('verbose', '127.0.0.1 - log verbose');
// logger.log('info', '127.0.0.1 - log info');
// logger.log('warn', '127.0.0.1 - log warn');
// logger.log('error', '127.0.0.1 - log error');

app.get('/sumar', (req, res) => {
	const { num1, num2 } = req.query;
	if (isNaN(num1) || isNaN(num2)) {
		logger.log('error', '1 de los 2 valores no es un numero');
	}

	const sumar = +num1 + +num2;
	logger.log('info', 'operacion exitosa - log info');
	res.send(`la suma de ${num1} + ${num2} da como resultado: ${sumar}`);
});
app.get('*', (req, res) => {
	logger.log('warn', 'recurso invalido');
	res.send('recurso invalido');
});

app.listen(PORT, () => {
	console.log(`servidor escuhcado en el puerto http://localhost:${PORT}`);
});
