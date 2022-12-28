import Contenedor from '../../contenedores/contenedorFirebase.js';
import { queryCarrito,fieldValue } from '../../utils/config/configFirebase.js';

class carritoDaoFirebase extends Contenedor {
    constructor() {
        super(queryCarrito,fieldValue);
    }
}

export default carritoDaoFirebase;