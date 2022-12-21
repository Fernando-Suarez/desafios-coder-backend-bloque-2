const Contenedor = require('./contenedor.js');
const contenedorProductos = new Contenedor('./db/productos.json');

//* GET productos

const getProducts = async (req, res) => {
	const productos = await contenedorProductos.getAll();
	res.json(productos);
};

//* GET productos por id

const getProductId = async (req, res) => {
	const { id } = req.params;
	const productosId = await contenedorProductos.getById(parseInt(id));
	if (productosId == null) {
		res.json({ error: true, msg: 'Producto no encontrado' });
	} else {
		res.json(productosId);
	}
};

//*POST Agrega un producto

const postProduct = async (req, res) => {
	const { body } = req;
	const saveProduct = await contenedorProductos.save(body);
	res.json({ succes: true, product: saveProduct });
};

//*PUT actualiza por id

const putProduct = async (req, res) => {
	const { id } = req.params;
	const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
	const updateProducto = await contenedorProductos.updateById(parseInt(id), {
		nombre,
		descripcion,
		codigo,
		foto,
		precio,
		stock,
	});
	const prod = await contenedorProductos.getById(+id);
	if (updateProducto) res.json({ succes: true, producto: prod });
	else res.json({ erro: true, msg: 'producto no encontrado' });
};

//*DELETE borrar por id

const deleteProductId = async (req, res) => {
	const { id } = req.params;
	const productoId = await contenedorProductos.getById(parseInt(id));
	if (productoId !== null) {
		await contenedorProductos.deleteById(parseInt(id));
		res.json({ succes: true, msg: 'Producto eliminado' });
	} else {
		res.json({ error: true, msg: 'Producto no encotrado' });
	}
};

module.exports = {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
};
