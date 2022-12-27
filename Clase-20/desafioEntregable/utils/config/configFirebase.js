import admin from 'firebase-admin';
import {getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './keyFirebase.json';

console.log('conectando...');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
console.log('conectado');
