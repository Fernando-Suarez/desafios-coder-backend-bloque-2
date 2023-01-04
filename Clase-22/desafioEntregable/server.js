//* modulos

const express = require('express');

// const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { dataFaker } = require('./utils/faker');

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
app.use('/public', express.static(__dirname + '/public'));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* Endpoints

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
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

const guardarProducto = async (nuevoProducto) => {
	await contenedorMysql.save(nuevoProducto);
	const productos = await contenedorMysql.getAll();
	io.sockets.emit('lista productos', productos);
};

//* funciones socket chat
const enviarMensajesSocket = async (socket) => {
	const mensajes = await contenedorMongoDb.getAll();
	socket.emit('lista mensajes', mensajes);
};

const guardarMensaje = async (nuevoMensaje) => {
	nuevoMensaje.fecha = new Date().toLocaleString();
	console.log(nuevoMensaje);
	await contenedorMongoDb.save({
		author: nuevoMensaje,
		mensaje: nuevoMensaje.mensaje,
		fecha: nuevoMensaje.fecha,
	});
	const mensajes = await contenedorMongoDb.getAll();
	console.log(mensajes);
	io.sockets.emit('lista mensajes', mensajes);
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* sockets
io.on('connection', (socket) => {
	enviarProductosSocket(socket);
	enviarMensajesSocket(socket);

	socket.on('nuevo producto', (newProduct) => {
		guardarProducto(newProduct);
	});
	socket.on('nuevo mensaje', (newMensaje) => {
		guardarMensaje(newMensaje);
	});
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
