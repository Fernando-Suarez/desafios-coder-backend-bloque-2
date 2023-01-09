//* modulos

const express = require('express');

// const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { dataFaker } = require('./utils/faker');
const { mensajeNormalizr } = require('./utils/normalizr');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Instancias
const app = express();

const { contenedorMysql } = require('./api/contenedor');
const { contenedorSQLite3 } = require('./api/contenedor');
const { contenedorMongoDb } = require('./api/contenedorMongo');
const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`./public`));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* Endpoints

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: './' });
});

app.get('/api/productos-test', (req, res) => {
	res.sendFile('faker.html', { root: './' });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* Servidor
const PORT = process.env.PORT || 8080;
HTTPserver.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* funciones socket productos
const enviarProductosSocket = async (socket) => {
	const productos = dataFaker();
	socket.emit('lista productos', productos);
};

const enviarProductosRandom = async (socket) => {
	const productos = dataFaker();
	socket.emit('lista random', productos);
};

const guardarProducto = async (nuevoProducto) => {
	await contenedorMysql.save(nuevoProducto);
	const productos = await contenedorMysql.getAll();
	io.sockets.emit('lista productos', productos);
};

//* funciones socket chat
const enviarMensajesSocket = async (socket) => {
	const mensajes = await contenedorMongoDb.getAll();
	//modificar con normalizer
	const mensajeNormalizado = mensajeNormalizr(mensajes);
	socket.emit('lista mensajes', {
		id: 'mensajes',
		mensajes: mensajeNormalizado,
	});
};

const guardarMensaje = async (nuevoMensaje) => {
	nuevoMensaje.fecha = new Date().toLocaleString();
	await contenedorMongoDb.save({
		author: nuevoMensaje,
		text: nuevoMensaje.text,
		fecha: nuevoMensaje.fecha,
	});
	const mensajes = await contenedorMongoDb.getAll();
	io.sockets.emit('lista mensajes', mensajes);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* sockets
io.on('connection', (socket) => {
	enviarProductosSocket(socket);
	enviarMensajesSocket(socket);
	enviarProductosRandom(socket);

	socket.on('nuevo producto', (newProduct) => {
		guardarProducto(newProduct);
	});
	socket.on('nuevo mensaje', (newMensaje) => {
		guardarMensaje(newMensaje);
	});
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
