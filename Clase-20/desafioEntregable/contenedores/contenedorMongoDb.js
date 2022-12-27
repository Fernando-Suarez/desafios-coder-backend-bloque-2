
class Contenedor {
	constructor( mongoDB,modelo) {
		this.mongoDB = mongoDB;
		this.modelo = modelo;
	}

	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(producto) {
		try {
			const guardarProducto = await new this.modelo(producto).save();
			return (`producto guardado con exito ${guardarProducto}`);
		} catch (err) {
			console.log(err);
			throw 'No se pudo guardar el producto';
		}
	}

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productoId = await this.modelo.findOne({ _id: id })
			if (productoId) {
				return productoId
			} else {
				return `producto no encontrado`
			}
		} catch (error) {
			console.log(error);
			throw 'no se puedo encontrar el producto'
		}
	}

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {
		try {
			const productos = await this.modelo.find();
			if (productos) {
				return productos;
			} else {
				return []
			}
		} catch (err) {
			console.log(err);
			throw 'No se puedo obtener los productos';
		}
	}

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const borrarId = await this.modelo.deleteOne({ _id: id })
			if (borrarId) {
				return `El producto ${borrarId} se elimino con exito`
			} else {
				return `El producto no se pudo eliminar o no existe`
			}
		} catch (error) {
			console.log(error);
			throw 'no se puedo eliminar';
		}
	}
	// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	// async deleteAll() {
	// 	try {
	// 		const borrarTodos = await this.modelo.deleteMany({});
	// 		return 'todos los productos fueron borrados';
	// 	} catch (error) {
	// 		console.log(error);
	// 		throw 'no se pudo eliminar los productos';
	// 	}
	// }

	async updateById(id, body) {
		
		try {
			const actualizarId = await this.modelo.updateOne({ _id: id }, { $set: { ...body  }  });
			if (actualizarId) {
				return `producto ${actualizarId} actualizado con exito`
			} else {
				return 'no se pudo actualizar el producto'
			}
		} catch (error) {
			console.log(error);
			
		}
	}

	// async deleteProductById(idC, idP) {
	// 	try {
			
	// 		const carritoId = await this.modelo.findOne({ _id: idC });
		
			
	// 	} catch (error) {
	// 		console.log(error);
	// 		throw 'no se pudo eliminar el producto'
	// 	}
	// }
	
}

export default Contenedor;
