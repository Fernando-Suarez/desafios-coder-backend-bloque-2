//modulos o requires
const express = require('express');
const cookieParser = require('cookie-parser');

// instancias
const app = express();

//midllewares

app.use(express.json());
app.use(cookieParser('clave secreta'));
app.use(express.urlencoded({ extended: true }));

//endpoints

app.get('/', (req, res) => {
	res
		.cookie('name', 'fernando', { signed: true, httpOnly: true })
		.json({ msg: 'hola mundo , mi primera cookie' });
});

app.get('/verlascookies', (req, res) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.json({ msg: 'abri la terminal para ver las cookies' });
});

// servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
