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
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const routes = require('./routes/routesUsuarios');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuarios = require('./models/modeloMongoUsuarios');
const dotenv = require('dotenv').config();
const { fork } = require('child_process');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//
//* puerto en yags por defecto
const args = yargs.default({ PORT: 8080 }).alias({ p: 'PORT' }).argv;
const PORT = args.p;

//*.env
const DB_MONGO = process.env.DB_MONGO_PASS;
const HOST = process.env.HOST;
const SECRET_MONGO = process.env.SECRET_REDIS;

//* Instancias
const app = express();
const { contenedorMongoDb } = require('./contenedores/contenedorMongo');
const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

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
//----------------------------------------------------------------------------------------------------------------------------------------------

//*------------------------------------

//*persistencia Mongo
mongoose
	.connect(
		`mongodb+srv://fernandosuarez:${DB_MONGO}@cluster0.ye0zt3v.mongodb.net/ecommerce`
	)
	.then(() => console.log('Connect to mongo'))
	.catch((error) => {
		console.log(error);
		throw 'connection failded';
	});

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
			Usuarios.findOne({ username: username }, function (err, user) {
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
					email: req.body.email,
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
app.use(express.static(`./public`));
app.use(
	session({
		//*persistencia por mongo
		store: MongoStore.create({
			mongoUrl: `mongodb+srv://fernandosuarez:${DB_MONGO}@cluster0.ye0zt3v.mongodb.net/ecommerce`,
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
	res.render('main', { layout: 'index', username: user.username });
});

app.get('/api/productos-test', checkAuthentication, (req, res) => {
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
	};
	res.render('main', { layout: 'info', dataProcess: dataProcess });
});

app.get('/api/randoms', (req, res) => {
	let { cant } = req.query;
	process.env.CANT = cant;
	// const sum = calculo();
	let objetoAleatorio = fork('./utils/objRandom.js');

	objetoAleatorio.on('message', (data) => {
		return res.send(data);
	});
});

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
		r: nuevoMensaje,
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
