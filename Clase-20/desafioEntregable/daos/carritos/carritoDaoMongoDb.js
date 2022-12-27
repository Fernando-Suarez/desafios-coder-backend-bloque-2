import Contenedor from '../../contenedores/contenedorMongoDb.js';
import modeloCarrito from '../../utils/models/modeloCarrito.js';
import mongoDB from '../../utils/config/configMongo.js';

class carritoDaoMongoDb extends Contenedor {
    constructor() {
        super(mongoDB,modeloCarrito);
    }
}

export default carritoDaoMongoDb; 