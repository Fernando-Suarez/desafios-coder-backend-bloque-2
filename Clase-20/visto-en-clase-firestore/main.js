const admin = require('firebase-admin');
const {getFirestore, Timestamp} = require('firebase-admin/firestore')

const serviceAccount = require('./privi.json');

console.log('conectando...');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
console.log('conectado');

const db = getFirestore();

const agregarCarrito = async (data) => {
	try {
		const respuesta = await db.collection('productos').doc().set(data);
		return respuesta;
	} catch (error) {
		console.log(error);
	}
}

agregarCarrito({
	nombre: 'spiderman 2',
	categoria: 'ps4',
	precio: 1500,
	
})
