import carritoDaoArchivo from './carritos/carritoDaoArchivo.js';
import productosDaoArchivos from './productos/productosDaoArchivo.js';
import carritoDaoMongoDb from './carritos/carritoDaoMongoDb.js';
import productosDaoMongoDb from './productos/productosDaoMongoDb.js';
import { config } from 'dotenv';

config();

const getStore = () => {
	// const storage = process.env.INSTANCIA;
	const storage = 'mongoDB';  // prueba: forzar variable para trabajar con la db deseada

	switch (storage) {
		case 'archivo':
			return {
				productos: new productosDaoArchivos(),
				carrito: new carritoDaoArchivo()
			}
			break;
		case 'mongoDB':
			return {
				productos: new productosDaoMongoDb(),
				carrito: new carritoDaoMongoDb()
			}
			break;
	}
}

export default getStore;