import admin from 'firebase-admin';
import { getFirestore} from 'firebase-admin/firestore';
import serviceAccount from  './keyFirebase.json' assert {type: 'json'};

console.log('conectando...');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const queryProductos = db.collection('productos');
const queryCarrito = db.collection('carrito');
console.log('conectado');

export { queryProductos,queryCarrito };