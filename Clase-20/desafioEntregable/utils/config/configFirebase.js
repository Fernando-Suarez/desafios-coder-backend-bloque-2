import admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './keyFirebase.json' assert { type: 'json' };

console.log('conectando...');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
console.log('conectado');

const db = getFirestore();
const fieldValue = FieldValue;
const queryProductos = db.collection('productos');
const queryCarrito = db.collection('carrito');

export { queryProductos, queryCarrito, fieldValue };
