import { connect } from 'mongoose';
import { Productos } from './models/productos.js';

const connectionMG = async () => {
	try {
		await connect(
			'mongodb+srv://fernandosuarez:aN41YLnwAIFGT3mb@cluster0.amee35o.mongodb.net/?retryWrites=true&w=majority'
		);
	} catch (error) {
		console.log(error);
		throw 'connection failded';
	}
};

console.log('conectando...');
connectionMG();
console.log('servidor conectado');

const getAll = async () => {
	try {
		const productos = await Productos.find();
		return console.log(productos);
	} catch (err) {
		console.log(err);
		throw 'No se puedo obtener los productos';
	}
};

const save = async (producto) => {
	try {
		const guardarProducto = await Productos.insertMany(producto);
		return console.log(`producto guardado con exito ${guardarProducto}`);
	} catch (err) {
		console.log(err);
		throw 'No se pudo guardar el producto';
	}
};

//save({ nombre: 'spiderman', precio: 1200, categoria: 'Ps4' });
//getAll();
