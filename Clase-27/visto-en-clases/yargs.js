const yargs = require('yargs')(process.argv.slice(2));

//* pasarle argumentos por defecto
// const args = yargs.default({
// 	nombre: 'pepe',
// 	apellido: 'pepepass',
// }).argv;

//* cambiar el nombre del argumento

// const args = yargs.alias({
// 	n: 'nombre',
// 	a: 'apellido',
// }).argv;

//*pasar un argumento boolean
const args = yargs.boolean('vivo').argv;

console.log(args);
