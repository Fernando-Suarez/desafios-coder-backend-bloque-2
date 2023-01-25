// 1. El primer elemento del process.argv, el array, siempre será una ruta del sistema de archivos que apunta al Node ejecutable.
// 2. El segundo elemento es el nombre del archivo JavaScript que se está ejecutando.
// 3. el tercer elemento es el primer argumento que realmente pasó el usuario.

for (let i = 0; i < process.argv.length; i++) {
	console.log(i + '=>' + process.argv[i]);
}
