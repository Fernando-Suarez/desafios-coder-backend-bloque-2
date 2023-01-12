//modulos
const express = require('express');
const session = require('express-session');
const app = express();

//*persistencia por session filestore
// const Filestore = require('session-file-store')(session);
//*----------------------------------

//*persistencia por redis
// const redis = require('redis');
// const client = redis.createClient({
// 	legacyMode: true,
// });
// client.connect();
// const RedisStore = require('connect-redis')(session);
//*------------------------------------

//*persitencia mongo
const MongoStore = require('connect-mongo');
//*--------------------------------------
//midllewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		//* persistencia por session filestore
		// store: new Filestore({ path: './sesiones', ttl: 300, retries: 0 }),
		//*----------------------------

		//*persistencia por redis
		// store: new RedisStore({
		// 	host: 'localhost',
		// 	port: 6379,
		// 	client: client,
		// 	ttl: 300,
		// }),
		//*------------------------------

		//*persistencia por mongo
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce',
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		//*----------------------------------
		secret: 'secreto',
		resave: false, //session memoria : true
		saveUninitialized: false, //session filestore y session memoria :true
	})
);

//endpoints
app.get('/', (req, res) => {
	if (req.session.cont) {
		req.session.cont++;
		res.send(`has visitado la pagina ${req.session.cont}`);
	} else {
		req.session.cont = 1;
		res.send('has visitado la pagina 1 vez');
	}
});

//servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
