// La diferencia principal entre las funciones execFile() y exec() es que el primer argumento de execFile() es ahora una ruta a un archivo ejecutable en vez de un comando.
// El resultado del archivo ejecutable se guarda en un búfer como exec(), al que accedemos a través de una función callback con los parámetros error, stdout y stderr.
// Ahora requerimos el método execFile del módulo child_process.
// Como observamos en el código, ahora el primer parámetro es la ruta, en este caso, de un script de bash.
// Luego, el código funciona de igual forma que con el comando exec.

const { execFile } = require('child_process');

execFile(__dirname + '/google.bat', (error, stdout, stderr) => {
	if (error) {
		console.error(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	}
	console.log(`stodut: ${stdout}`);
});
