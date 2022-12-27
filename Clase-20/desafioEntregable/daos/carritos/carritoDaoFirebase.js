import Contenedor from '../../contenedores/contenedorFirebase.js';
import { queryCarrito,queryProductos } from '../../utils/config/configFirebase.js';

class carritoDaoFirebase extends Contenedor {
    constructor() {
        super(queryCarrito);
    }
}

export default carritoDaoFirebase;