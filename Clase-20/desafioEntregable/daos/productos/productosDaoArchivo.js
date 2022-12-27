import contenedor from '../../contenedores/contenedorArchivo.js';

class productosDaoArchivos extends contenedor {
	constructor() {
		super('db/productos.json');
	}
}

export default productosDaoArchivos;
