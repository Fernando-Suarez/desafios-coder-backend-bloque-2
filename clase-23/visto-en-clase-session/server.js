//modulos o requires
const express = require('express');
const session = require('express-session');

// instancias
const app = express();

//midllewares

app.use(express.json());
app.use(
	session({
		secret: 'secreto',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(express.urlencoded({ extended: true }));

//de identificacion
function auth(req, res, next) {
	if (req.session?.user === 'pepe' && req.session?.admin) {
		return next();
	}
	return res.status(401).send('error de autorización!');
}

//endpoints

// guardar datos en session
app.get('/', (req, res) => {
	if (req.session.cont) {
		req.session.cont++;
		res.send('nos visitaste ' + req.session.cont);
	} else {
		req.session.cont = 1;
		res.send('nos visitaste ' + 1);
	}
});

//login con session

app.get('/login', (req, res) => {
	const { username, password } = req.query;
	if (username !== 'pepe' || password !== 'pepepass') {
		return res.send('login failed');
	}
	req.session.user = username;
	req.session.admin = true;
	res.send('login success!');
});

// eliminar datos de session o cerrar session
app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			res.send('Logout ok');
		} else {
			res.send({ status: 'Logout error', body: err });
		}
	});
});

//aplicacion de midlleware de identificacion
app.get('/privado', auth, (req, res) => {
	res.send('si estas viendo esto es porque ya te logueaste!');
});

// servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
