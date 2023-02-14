const storage = require('../daos/index');
const contenedorCarrito = storage().carrito;
const contenedorProductos = storage().productos;

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
	const borrarCarrito = await contenedorCarrito.deleteById(id);
	if (borrarCarrito) res.json({ succes: true, msg: 'carrito eliminado' });
	else res.json({ error: true, msg: 'Id carrito no encontrado' });
};

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

const getProductsCart = async (req, res) => {
	const { id } = req.params;
	const carritoId = await contenedorCarrito.getById(id);
	if (carritoId) res.json({ succes: true, productos: carritoId.productos });
	else res.json({ error: true, msg: 'Id carrito no encontrado' });
};
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

const postProductCartId = async (req, res) => {
	const { productoId } = req.body;
	const { id } = req.params;
	const carritoId = await contenedorCarrito.getById(id);
	if (!carritoId)
		return res.json({ error: true, msg: 'carrito no encontrado' });
	const producto = await contenedorProductos.getById(productoId);
	console.log(producto);

	if (!producto)
		return res.json({ error: true, msg: 'producto no encontrado' });
	carritoId.productos.push(producto);
	const productoAgregado = await contenedorCarrito.updateById(id, carritoId);
	res.json({
		succes: true,
		msg: `producto id ${producto.id} agregado al carrito id ${carritoId.id}`,
	});
};

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

const deleteCartProductId = async (req, res) => {
	try {
		const { id, id_prod } = req.params;
		await contenedorCarrito.deleteProductById(id, id_prod);
		res.json({
			succes: true,
			msg: `producto con ID ${id_prod} eliminado del carrito con ID ${id}`,
		});
	} catch (error) {
		return res.json(`${error}`);
	}
};
module.exports = {
	postCreateCart,
	deleteCartId,
	getProductsCart,
	postProductCartId,
	deleteCartProductId,
};
