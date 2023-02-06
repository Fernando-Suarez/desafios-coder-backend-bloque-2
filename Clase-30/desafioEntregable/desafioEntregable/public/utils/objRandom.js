// realizar una funcion que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
// Por ej: /randoms?cant=20000.
// Si dicho parámetro no se ingresa, calcular 100.000.000 números.
// El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno.

const objRandom = () => {
	const cant = process.env.CANT;
	if (!cant) {
		cant = 100000000;
	}
	let arr = [];
	let data = {};

	// Creo el array de 0 - 1000, utilizo del 1 al 1000
	for (let i = 0; i <= 1000; i++) {
		arr[i] = 0;
	}

	// Utilizo las posiciones del array para guardar el conteo del número random que aparece.
	for (let i = 0; i <= cant; i++) {
		let random = Math.floor(Math.random() * (1000 - 1) + 1);
		arr[random]++;
	}

	//creo el objeto de salida clave - valor
	for (let i = 0; i < arr.length; i++) {
		data[i] = { vecesqueaparece: arr[i] };
	}
	return data;
};

const objetoRandom = objRandom();

process.send(objetoRandom);
