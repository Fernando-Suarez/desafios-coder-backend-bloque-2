import Contenedor from '../../contenedores/contenedorMongoDb.js';
import modeloCarrito from '../../utils/models/modeloCarrito.js'

class carritoDaoMongoDb extends Contenedor {
    constructor() {
        super(modeloCarrito);
    }
}

export default carritoDaoMongoDb;