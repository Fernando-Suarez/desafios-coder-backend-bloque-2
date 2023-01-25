// Realizar una aplicación en Javascript ejecutada a través de Node.JS que al ejecutarse de la siguiente manera:
// node main.js 1 2 3 -m dev -p 8080 -d
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }
// Y con el siguiente llamado:
// node main.js 1 2 3
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }

const parseArgs = require('minimist');
const options = { alias: { m: 'modo', p: 'puerto', d: 'debug' } };
const defecto = { default: { modo: 'prod', puerto: '0', debug: false } };

const args = parseArgs(process.argv.slice(2), options, defecto);

// console.log(args);

console.log(args);
