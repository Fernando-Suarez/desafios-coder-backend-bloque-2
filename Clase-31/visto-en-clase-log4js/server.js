const log4js = require('log4js');

log4js.configure({
	//     Definimos 3 apéndices:
	// miLoggerConsole usa el apéndice stdout escribe en la salida estándar (consola).
	//Los otros 2, usan el archivo adjunto.miLoggerFile escribe en el archivo info.log y miLoggerFile2 en el archivo info2.log.

	appenders: {
		miLoggerConsole: { type: 'console' },
		miLoggerFile: { type: 'file', filename: 'info.log' },
		miLoggerFile2: { type: 'file', filename: 'info2.log' },
	},

	//     Definimos 5 categorías con distintos niveles:
	// Las categorías default y consola utilizan el apéndice del tipo consola.
	// Las categorías archivo y archivo2 utilizan los apéndices de tipo file.
	// La categoría todos utiliza apéndice de tipo consola y tipo file.

	categories: {
		default: { appenders: ['miLoggerConsole'], level: 'trace' },
		consola: { appenders: ['miLoggerConsole'], level: 'debug' },
		archivo: { appenders: ['miLoggerFile'], level: 'warn' },
		archivo2: { appenders: ['miLoggerFile2'], level: 'info' },
		todos: { appenders: ['miLoggerConsole', 'miLoggerFile'], level: 'error' },
	},
});

// Definimos 6 niveles de salida: Trace, Debug, Info, Warn, Error, Fatal.
// Los niveles que se imprimen, son desde el especificado en la configuración de categorías para abajo. Por ejemplo, si el nivel configurado es Warn, se imprimirá solo Warn, Error y Fatal.
// La ventaja de esto es que en un entorno de producción podemos solo preocuparnos por las excepciones y errores y no por la información de depuración.
// Otra ventaja es que el código se puede mezclar con varios códigos de impresión de registros. Siempre que modifiquemos el nivel de salida en un archivo de configuración, la salida del registro cambiará sin modificar todo el código.

const logger = log4js.getLogger('default');

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
