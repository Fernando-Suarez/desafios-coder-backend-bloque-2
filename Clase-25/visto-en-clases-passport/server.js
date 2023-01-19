//modulos
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();
const Usuarios = require('./models/usuariosSchema');

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

//*persitencia mongo
// const MongoStore = require('connect-mongo');
mongoose
	.connect(
		'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce'
	)
	.then(() => console.log('Connect to mongo'))
	.catch((error) => {
		console.log(error);
		throw 'connection failded';
	});

//* funcion passport password validacion
const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

//* funcion passport encryptar password
const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

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
			if (!isValidPassword) {
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
					firstName: req.body.firstName,
					lastName: req.body.lastName,
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

//*--------------------------------------
//*midllewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
			maxAge: 86400000, // un dia
		},
		rolling: true,
		resave: true,
		saveUninitialized: false,
	})
);
//passport
app.use(passport.initialize());
app.use(passport.session());
//*------------------------------
// app.use(
// 	session({
// 		//*persistencia por mongo
// 		store: MongoStore.create({
// 			mongoUrl:
// 				'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce',
// 			mongoOptions: {
// 				useNewUrlParser: true,
// 				useUnifiedTopology: true,
// 			},
// 		}),
// 		//*----------------------------------
// 		secret: 'secreto',
// 		resave: false, //session memoria : true
// 		saveUninitialized: false, //session filestore y session memoria :true
// 	})
// );

//endpoints
// app.get('/', (req, res) => {
// 	if (req.session.cont) {
// 		req.session.cont++;
// 		res.send(`has visitado la pagina ${req.session.cont}`);
// 	} else {
// 		req.session.cont = 1;
// 		res.send('has visitado la pagina 1 vez');
// 	}
// });

//servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
