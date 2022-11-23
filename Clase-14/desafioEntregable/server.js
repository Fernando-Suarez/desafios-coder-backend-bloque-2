//* imports
const express = require('express');
const { Router } = express;
const routerProductos = require('./routes/routerProductos.js');
const routerCarrito = require('./routes/routesCarrito.js');

//* Instancias
const app = express();
//*middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

//* routes productos y carrito

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

//*GET endopoints no validos

app.get('/*', (req, res) => {
	res.status(404).json({ msg: 'ruta no encontrada' });
});

//* servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Servidor escuchado en el puerto http://localhost:${PORT}`);
});
