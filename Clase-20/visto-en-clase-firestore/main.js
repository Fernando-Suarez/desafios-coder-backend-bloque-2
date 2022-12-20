const admin = require('firebase-admin');

const serviceAccount = require('./privi.json');

console.log('conectando...');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
console.log('conectado');
