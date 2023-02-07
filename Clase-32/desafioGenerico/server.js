// 1. Realizar un servidor que calcule 10000 números aleatorios entre el 0 y el 9 inclusive.
// El servidor devolverá los números calculados en un array dentro de un objeto en formato JSON: {randoms: [array de randoms]}.
// Se van a utilizar dos rutas en las que el cliente puede requerir la información: '/randoms-nodebug' y '/randoms-debug', la última contendrá un console.log que enviará el array calculado a la consola del servidor.

// 2.	Realizar un análisis de performance a través del profiler (--prof) de node.js y del modo inspect (--inspect) para las dos rutas, utilizando Artillery como generador de carga con 50 usuarios virtuales emitiendo 50 request cada uno.
// Verificar que los tiempos de proceso en la ruta '/randoms-debug' sean mayores a los de la ruta '/randoms-nodebug', debido a la operación sincrónica bloqueante del console.log.

const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.json());
function random() {
	let i = 0;
	let aux = [];
	while (i < 10000) {
		let rand = Math.round(Math.random() * 9);
		aux.push(rand);
		i++;
	}
	return aux;
}
// artillery quick --count 50 -n 50 http://localhost:8080/randoms-nodebug > result-nodebug.txt
app.get('/randoms-nodebug', (req, res) => {
	res.json({ randoms: random() });
});

// artillery quick --count 50 -n 50 http://localhost:8080/randoms-nodebug > result-nodebug.txt
app.get('/randoms-debug', (req, res) => {
	console.log(random());
	res.json({ randoms: random() });
});
app.listen(PORT);
/** correr servidor como* node --prof --inspect server.js**/
