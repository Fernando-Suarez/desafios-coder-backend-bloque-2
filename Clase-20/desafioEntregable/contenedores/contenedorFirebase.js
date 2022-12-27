class Contenedor {
	constructor(collection,) {
		this.collection = collection;
		
	}

	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(objeto) {
		try {
			const guardar = await this.collection.add(objeto);
			if (guardar) {
				return guardar.id
			}
		} catch (error) {
			console.log(error);
			throw 'no se pudo guardar el producto'
		}
	}

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productoId = await this.collection.doc(id).get();
			if (productoId) {
				return {id:productoId.id, ...productoId.data() }
			} else {
				return 'no se encuentra el producto';
			}
		} catch (error) {
			console.log(error);
			throw 'producto no encontrado'
		}
	}

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {
		try {
			const productos = await this.collection.get()
			if (productos) {
				const todosLosProductos = productos.docs.map(doc => {
					return {id: doc.id ,...doc.data()}
				})
				return todosLosProductos;
			}
		} catch (error) {
			console.log(error);
			throw 'no se puede obtener los productos'
		}
	}

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const productoID = await this.collection.doc(id)
			if (productoID) {
				productoID.delete();
				return 'producto eliminado con exito'
			} else {
				return 'producto no encontrado'
			}
		} catch (error) {
			console.log(error);
			throw 'no se pudo eliminar el producto'
		}
	}
// faltan 2 metodos
	
	
	// async updateById(id, body) {
	// 	try {
	// 		const producto = await this.collection.doc(id);
	// 		if (producto) {
	// 			producto.update({ ...body });
	// 			const productoActualizado = await this.collection.doc(id).get()
	// 			return {id:productoActualizado.id,...productoActualizado.data()};
	// 		} else {
	// 			return 'producto no encontrado'
	// 		}
			
			
	// 	} catch (error) {
	// 		console.log(error);
	// 		throw 'no se puedo actualizar el producto'
	// 	}
	// }

	// async deleteProductById(idC, idP) {
	// 	try {
	// 		const carrito = this.collectionCarrito.doc(id).get();
	// 		const producto = this.collection.doc(id).get();
	// 		const todosLosProductos = carrito.data().productos

	// 		let borrarProducto = {};

	// 		todosLosProductos.forEach(product => {
	// 			if (product.id == producto.id) {
	// 				borrarProducto = product;
	// 			}
	// 		});
	
	// 		await docCart.update({
	// 			productos: this.FieldValue.arrayRemove(borrarProducto)
	// 		});

	// 	} catch (error) {
	// 		console.log(error);
	// 		throw 'no se pudo borrar el archivo'
	// 	}
	// }
}

export default Contenedor;
