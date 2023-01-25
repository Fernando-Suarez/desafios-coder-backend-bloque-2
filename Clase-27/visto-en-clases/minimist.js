const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));

console.log(args);
//*---------------------------------------------------------------------------------------------------------------------------------------------
// Ante un argumento que comienza con un guión solo, crea un atributo cuyo nombre será la primera letra dsp del guión, y cuyo valor será todo lo restante hasta el próximo argumento
// Si queremos usar palabras como nombres de atributos, debemos anteponerle un doble guión, y su valor será el argumento siguiente.
// Si luego de un argumento guionado (simple o doble), no se encuentra ningún otro argumento, o el argumento siguiente también es guionado, el primero se interpreta como un valor booleano con valor true.
// Si existen valores sueltos que no vienen precedidos por ningún argumento guionado, todos ellos se agrupan en un array bajo el nombre _ (guión bajo).

// console.log(parseArgs(['1', '2', '3', '4']));
// // { _: [ 1, 2, 3, 4 ] }

// console.log(parseArgs(['-a', '1', '-b', '2', '3', '4']));
// // { _: [ 3, 4 ], a: 1, b: 2 }

// console.log(parseArgs(['--n1', '1', '--n2', '2', '3', '4']));
// // { _: [ 3, 4 ], n1: 1, n2: 2 }

// console.log(parseArgs(['-a', '1', '-b', '2', '--colores', '--cursiva']));
// // { _: [], a: 1, b: 2, colores: true, cursiva: true }

// console.log(parseArgs(['-a', '1', '-b', '2', '-c', '-x']));
// // { _: [], a: 1, b: 2, c: true, x: true }

//*--------------------------------------------------------------------------------------------------------------------------------------------
// Además también podemos agregar algunas opciones adicionales. Entre ellas, podemos definir algunos valores por defecto para argumentos que no estén presentes:
// const options = { default: { nombre: 'pepe', apellido: 'copado' } };

// console.log(
// 	parseArgs(
// 		['-a', '1', '-b', '2', 'un-valor-suelto', '--nombre', 'juanita'],
// 		options
// 	)
// );
// { _: [ 'un-valor-suelto' ], a: 1, b: 2, nombre: 'juanita', apellido: 'copado' }

//*---------------------------------------------------------------------------------------------------------------------------------------------
// Y podemos agregarle algunos alias para renombrar los valores ingresados como argumentos, dándoles nombres más descriptivos

// const options = { alias: { a: 'campoA', b: 'campoB' } };

// console.log(parseArgs(['-a', '1', '-b', '2'], options));
// // { _: [], a: 1, campoA: 1, b: 2, campoB: 2 }
