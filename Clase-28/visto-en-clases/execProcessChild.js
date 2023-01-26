// Requerimos el comando exec del módulo child_process.
// En la ejecución de la función exec, el primer argumento es el comando ls-lh. Este, enumera todos los archivos y carpetas del directorio actual en formato largo, con un tamaño total de archivo en unidades legibles por el ser humano en la parte superior del resultado.
// El segundo argumento es el callback, el cual a su vez tiene 3 parámetros.
// Si el comando no se ejecuta, se imprime el motivo en error.
//  Si el comando se ejecutó correctamente, cualquier dato que escriba al flujo de resultado estándar se captura en stdout y cualquier dato que escriba al flujo error estándar se captura en stderr.

const { exec } = require('child_process');
exec('dir', (error, stdout, stderr) => {
	if (error) {
		console.error(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
});
