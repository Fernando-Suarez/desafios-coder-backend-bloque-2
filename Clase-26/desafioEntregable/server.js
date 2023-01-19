//* modulos

const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { dataFaker } = require('./utils/faker');
const { mensajeNormalizr } = require('./utils/normalizr');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Instancias
const app = express();
const { contenedorMongoDb } = require('./api/contenedorMongo');
const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`./public`));

//*de identificacion

function auth(req, res, next) {
	if (req.session?.user === 'pepe' && req.session?.password === 'pepepass') {
		return next();
	}
	// return res.status(401).send('error de autorización!');
	return res.redirect('/login');
}
//*config Handlebars

app.set('view engine', 'hbs');
app.set('views', './public/views');
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		layoutsDir: './public/views/layouts',
	})
);

//*persistencia Mongo
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce',
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			ttl: 60,
		}),
		secret: 'secreto',
		resave: false,
		saveUninitialized: false,
	})
);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//*Endpoints session

//login con session

app.get('/login', (req, res) => {
	res.render('main', { layout: 'login' });
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (username != 'pepe' && password != 'pepepass') {
		return res.json({ msg: 'login failed' });
	} else {
		req.session.user = username;
		req.session.password = password;
		req.session.admin = true;
		res.redirect('/');
	}
});

// eliminar datos de session o cerrar session
app.get('/logout', (req, res) => {
	const user = req.session.user;
	req.session.destroy((err) => {
		if (!err) {
			res.render('main', { layout: 'logout', username: user });
		} else {
			res.send({ status: 'Logout error', body: err });
		}
	});
});

//* Endpoints

// app.get('/', (req, res) => {
// 	res.sendFile('index.html', { root: './' });
// });

app.get('/', auth, (req, res) => {
	const user = req.session.user;
	res.render('main', { layout: 'index', username: user });
});

app.get('/api/productos-test', auth, (req, res) => {
	res.render('main', { layout: 'faker' });
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
