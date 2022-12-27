import Contenedor from '../../contenedores/contenedorFirebase.js';
import { queryProductos } from '../../utils/config/configFirebase.js';

class productosDaoFirebase extends Contenedor{
    constructor() {
        super(queryProductos);
    }
}

export default productosDaoFirebase;