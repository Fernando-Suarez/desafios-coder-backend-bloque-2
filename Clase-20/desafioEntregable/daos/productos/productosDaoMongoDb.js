import Contenedor from '../../contenedores/contenedorMongoDb.js';
import modeloProductos from '../../utils/models/modeloProductos.js'
import mongoDB from '../../utils/config/configMongo.js'

class productosDaoMongoDb extends Contenedor {
    constructor() {
        super(mongoDB,modeloProductos);
    }
}

export default productosDaoMongoDb;