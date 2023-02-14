//* modulos
const yargs = require('yargs')(process.argv.slice(2));
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { dataFaker } = require('./utils/faker');
const { mensajeNormalizr } = require('./utils/normalizr');
const session = require('express-session');
const bCrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
const routes = require('./routes/routesUsuarios');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuarios = require('./DB/models/modeloMongoUsuarios');
const compression = require('compression');
const { logger } = require('./utils/logger');
// const mongoose = require('mongoose');
if (process.env.NODE_ENV != 'production') {
	require('dotenv').config();
}

//* Instancias
const app = express();
const { upload } = require('./utils/multer');
const storage = require('./daos/index');
const contenedorMensajes = storage().mensajes;
const contenedorProductos = storage().productos;
const contenedorCarrito = storage().carrito;

const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);
const mongoDB = require('./DB/options/configMongoDB');

//--------------------------------------------------------------------------------------------------------------------------------------------//
//* puerto en yags por defecto
const args = yargs.default({ PORT: 8080 }).alias({ p: 'PORT' }).argv;
const PORT = args.p;

//*.env
const HOST = process.env.HOST;
const SECRET_MONGO = process.env.SECRET_MONGO;
const DB_MONGO_URL = process.env.DB_MONGO_URL;

// desafio 15 ---------------------------------------------------------------------------------------------------------------------------------

const numCPUs = require(`os`).cpus().length;

const CLUSTER = yargs.argv.CLUSTER;

//*config Handlebars

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		layoutsDir: './views/layouts',
	})
);
//----------------------------------------------------------------------------------------------------------------------------------------------

//*------------------------------------

//*persistencia Mongo
// mongoose;
// .connect(`${DB_MONGO_URL}`)
// .then(() => console.log('Connect to mongo'))
// .catch((error) => {
// 	console.log(error);
// 	throw 'connection failded';
// });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

//* funcion passport password validacion
const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

//* funcion passport encryptar password
const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//* funcion autentificacion
function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
}

//*passport config LocalStrategy Login
passport.use(
	'login',
	new LocalStrategy((username, password, done) => {
		Usuarios.findOne({ username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				console.log(`User Not Found With Username ${username}`);
				return done(null, false);
			}
			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

//* passport config LocalStrategy Sign UP
passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true,
		},
		(req, username, password, done) => {
			Usuarios.findOne({ email: username }, function (err, user) {
				if (err) {
					console.log('Error in SignUp: ' + err);
					return done(err);
				}

				if (user) {
					console.log('User already exists');
					return done(null, false);
				}

				const newUser = {
					username: username,
					password: createHash(password),
					telefono: req.body.telefono,
					edad: req.body.edad,
					direccion: req.body.direccion,
					nombre: req.body.nombre,
					avatar: req.file.filename,
					carrito: [],
				};
				Usuarios.create(newUser, (err, userWithId) => {
					if (err) {
						console.log('Error in Saving user: ' + err);
						return done(err);
					}
					console.log(user);
					console.log('User Registration succesful');
					return done(null, userWithId);
				});
			});
		}
	)
);

//* passport serializar y deserializar
passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	Usuarios.findById(id, done);
});
//-------------------------------------------------------------------------------------------------------------------------------------------
//* Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('./assets'));
app.use('/views', express.static('./views'));
app.use('/avatar', express.static(__dirname + '/public/avatar'));
app.use(
	session({
		//*persistencia por mongo
		store: MongoStore.create({
			mongoUrl: `${DB_MONGO_URL}`,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		//*----------------------------------
		secret: `${SECRET_MONGO}`,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 600000,
		},
		resave: false,
		saveUninitialized: false,
	})
);

//*de identificacion

//passport iniciar
app.use(passport.initialize());
app.use(passport.session());
//* Endpoints

app.get('/', checkAuthentication, (req, res) => {
	const user = req.user;
	logger.log('info', 'Ruta: / - Metodo: GET');
	res.render('main', { layout: 'index', username: user.username });
});

app.get('/api/productos-test', checkAuthentication, (req, res) => {
	logger.log('info', 'Ruta: /api/productos-test - Metodo: GET');
	res.render('main', { layout: 'faker' });
});

app.get('/info', (req, res) => {
	const dataProcess = {
		argEntrada: process.argv,
		pathEjecucion: process.execPath,
		sistema: process.platform,
		processId: process.pid,
		nodeVersion: process.version,
		proyectURL: process.cwd(),
		rss: process.memoryUsage().rss,
		procesadores: numCPUs,
	};
	logger.log('info', 'Ruta: /info - Metodo: GET');
	console.log(dataProcess);
	res.render('main', { layout: 'info', dataProcess: dataProcess });
});

// app.get('*', (req, res) => {
// 	logger.log('warn', 'Ruta: inexistente - Metodo: GET');
// });

//*Endpoints passport
app.get('/login', routes.getLogin);
app.post(
	'/login',
	passport.authenticate('login', { failureRedirect: '/faillogin' }),
	routes.postLogin
);
app.get('/faillogin', routes.getFaillogin);
app.get('/signup', routes.getSignup);
app.post(
	'/signup',
	upload.single('avatar'),
	passport.authenticate('signup', { failureRedirect: '/failsignup' }),
	routes.postSignup
);
app.get('/failsignup', routes.getFailsignup);
app.get('/logout', routes.getLogout);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* Servidor
HTTPserver.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto ${HOST}:${PORT}`);
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* funciones socket productos
const enviarProductosSocket = async (socket) => {
	try {
		const productos = await contenedorProductos.getAll();
		socket.emit('lista productos', productos);
	} catch (error) {
		logger.log('error', 'error al enviar productos db');
	}
};

const enviarProductosRandom = async (socket) => {
	try {
		const productos = dataFaker();
		socket.emit('lista random', productos);
	} catch (error) {
		logger.log('error', ' error al enviar productos random');
	}
};

const guardarProducto = async (nuevoProducto) => {
	try {
		await contenedorProductos.save(nuevoProducto);
		const productos = await contenedorProductos.getAll();
		io.sockets.emit('lista productos', productos);
	} catch (error) {
		logger.log('error', 'no se pudo guardar el producto');
	}
};

//* funciones socket chat
const enviarMensajesSocket = async (socket) => {
	try {
		const mensajes = await contenedorMensajes.getAll();
		//modificar con normalizer
		const mensajeNormalizado = mensajeNormalizr(mensajes);
		socket.emit('lista mensajes', {
			id: 'mensajes',
			mensajes: mensajeNormalizado,
		});
	} catch (error) {
		logger.log('error', 'no se pudieron enviar los mensajes');
	}
};

const guardarMensaje = async (nuevoMensaje) => {
	try {
		nuevoMensaje.fecha = new Date().toLocaleString();
		await contenedorMensajes.save({
			r: nuevoMensaje,
			text: nuevoMensaje.text,
			fecha: nuevoMensaje.fecha,
		});
		const mensajes = await contenedorMensajes.getAll();
		io.sockets.emit('lista mensajes', mensajes);
	} catch (error) {
		logger.log('error', 'no se pudo guardar el mensaje');
	}
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
