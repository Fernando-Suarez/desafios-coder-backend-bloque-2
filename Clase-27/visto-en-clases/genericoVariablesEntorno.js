// Realizar una aplicación en nodeJS que al pasar las siguientes variables de entorno:
// MODO=dev PUERTO=8080 DEBUG=true
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'dev', puerto: 8080, debug: true }
// Y que al ejecutarlo sin pasar ninguna variable de entorno construya y muestre por pantalla el siguiente objeto:
// { modo: 'prod', puerto: 0, debug: false }

const express = require('express');

const app = express();

const config = require('./variablesDeEntornoDesafio');

console.log(config);
