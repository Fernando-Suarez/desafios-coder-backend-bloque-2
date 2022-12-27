import Contenedor from '../../contenedores/contenedorArchivo.js';

class carritoDaoArchivo extends Contenedor {
	constructor() {
		super('db/carrito.json');
	}
}

export default carritoDaoArchivo;
