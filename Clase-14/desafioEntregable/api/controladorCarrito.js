const Contenedor = require('./contenedor');
const contenedorCarrito = new Contenedor('./db/carrito.json');
const contenedorProductos = new Contenedor('./db/productos.json');

// POST: '/' - Crea un carrito y devuelve su id.
const postCreateCart = async (req, res) => {
	const date = new Date();
	const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
	const nuevoCarrito = { timestamp: fechaYHora, productos: [] };
	const guardarCarrito = await contenedorCarrito.save(nuevoCarrito);
	res.json({ succes: true, carritoId: guardarCarrito });
};
// DELETE: '/:id' - Vacía un carrito y lo elimina.

const deleteCartId = async (req, res) => {
	const { id } = req.params;
	await contenedorCarrito.deleteById(parseInt(id));
	res.json({ succes: true, msg: 'carrito eliminado' });
};

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

const getProductsCart = async (req, res) => {
	const { id } = req.params;
	const carritoId = await contenedorCarrito.getById(parseInt(id));
	res.json({ succes: true, productos: carritoId.productos });
};
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

const postProductCartId = async (req, res) => {
	const { productoId } = req.body;
	const { id } = req.params;
	const carritoId = await contenedorCarrito.getById(parseInt(id));
	if (!carritoId)
		return res.json({ error: true, msg: 'carrito no encontrado' });
	const producto = await contenedorProductos.getById(parseInt(productoId));
	if (!producto)
		return res.json({ error: true, msg: 'producto no encontrado' });
	carritoId.productos.push(producto);
	const productoAgregado = await contenedorCarrito.updateById(
		parseInt(id),
		carritoId
	);
	res.json({ succes: true, producto: productoAgregado });
};

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

const deleteCartProductId = async (req, res) => {
	const { id, id_prod } = req.params;
	await contenedorCarrito.deleteProductById(parseInt(id), parseInt(id_prod));
	res.json({
		succes: true,
		msg: `producto con ID ${id_prod} eliminado del carrito con ID ${id}`,
	});
};

module.exports = {
	postCreateCart,
	deleteCartId,
	getProductsCart,
	postProductCartId,
	deleteCartProductId,
};
