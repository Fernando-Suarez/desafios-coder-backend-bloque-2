import { Router } from 'express';
import {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
} from '../api/controladorProductos.js';

const routerProductos = Router();

//* administrador
const isAdmin = true;
//const isAdmin = false;

const validacion = (req, res, next) => {
	if (!isAdmin) return res.status(401).json({ msg: 'Usuario no Autorizado' });
	next();
};

routerProductos.get('/', getProducts);
routerProductos.get('/:id', getProductId);
routerProductos.post('/', validacion, postProduct);
routerProductos.put('/:id', validacion, putProduct);
routerProductos.delete('/:id', validacion, deleteProductId);

export default routerProductos;
