//* modulos

const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { dataFaker } = require('./utils/faker');
const { mensajeNormalizr } = require('./utils/normalizr');
const session = require('express-session');
const bCrypt = require('bcrypt');
const mongoose = require('mongoose');
const routes = require('./routes/routesUsuarios');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuarios = require('./models/modeloMongoUsuarios');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

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
//*persistencia por redis
const redis = require('redis');
const client = redis.createClient({
	legacyMode: true,
});
client
	.connect()
	.then(() => console.log('CONNECTED to Redis'))
	.catch((e) => {
		console.error(e);
		throw 'can not conect Redis';
	});
const RedisStore = require('connect-redis')(session);
//*------------------------------------

//*persistencia Mongo
mongoose
	.connect(
		'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce'
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
		//*persistencia por redis
		store: new RedisStore({
			host: '127.0.0.1',
			port: 6379,
			client: client,
			ttl: 300,
		}),
		secret: 'secreto',
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 600000, // 10 min
		},
		rolling: true,
		resave: true,
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
