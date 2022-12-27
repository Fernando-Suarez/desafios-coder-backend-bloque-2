import fs from 'fs';

class Contenedor {
	constructor(archivo) {
		this.archivo = archivo;
	}
	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(objeto) {
		try {
			const productos = await this.getAll();
			const id =
				productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
			objeto.id = id;
			const date = new Date();
			const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
			objeto.timestamp = fechaYHora;
			productos.push(objeto);
			await fs.promises.writeFile(
				this.archivo,
				JSON.stringify(productos, null, 2)
			);
			const numberId = objeto.id;
			return numberId;
		} catch (error) {
			throw new Error(`No se puedo guardar el archivo`, error);
		}
	} // fin metodo save(Object)

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productos = await this.getAll();
			const productoId = productos.find((producto) => producto.id === parseInt(id));
			if (productoId) {
				return productoId;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error('No se puedo obtener el elemento', error);
		}
	} // Fin metodo getById(Number)

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {
		try {
			const info = await fs.promises.readFile(this.archivo, 'utf-8');
			if (info) {
				const productos = JSON.parse(info);

				return productos;
			} else {
				return [];
			}
		} catch (error) {
			throw new Error(`No se puede leer el archivo `, error);
		}
	} // Fin metodo getAll()

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const productos = await this.getAll();
			const productoId = productos.find((producto) => producto.id === parseInt(id));
			const filterId = productos.filter((producto) => producto != productoId);
			await fs.promises.writeFile(
				this.archivo,
				JSON.stringify(filterId, null, 2)
			);
		} catch (error) {
			throw new Error('No se pudo eliminar el elemento', error);
		} // Fin metodo deleteById(number)
	}
	// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	async deleteAll() {
		try {
			await fs.promises.writeFile(this.archivo, '');
			console.log('Contenido eliminado');
		} catch (error) {
			throw new Error('No se pude eliminar el contenido del archivo', error);
		}
	} // Fin metodo deleteAll()

	async updateById(id, body) {
		try {
			const productos = await this.getAll();
			const indiceProducto = productos.findIndex(
				(producto) => producto.id === parseInt(id)
			);
			if (indiceProducto !== -1) {
				const productoEncontrado = productos[indiceProducto];
				productos[indiceProducto] = { ...productoEncontrado, ...body };
				await fs.promises.writeFile(
					this.archivo,
					JSON.stringify(productos, null, 3)
				);
				return productoEncontrado;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error('No se puede actualizar el contenido', error);
		}
	}

	async deleteProductById(idC, idP) {
		try {
			let data = await fs.promises.readFile(this.archivo, `utf-8`);
			let datos = JSON.parse(data);

			let cart = datos.find((cart) => cart.id == parseInt(idC));
			if (!cart) {
				throw Error(`el carrito no existe`);
			}
			let product = cart.productos.find((product) => product.id == parseInt(idP));
			if (!product) {
				throw Error(`el producto no existe`);
			}

			if (cart && product) {
				let indexProduct = cart.productos.indexOf(product);
				cart.productos.splice(indexProduct, 1);
				await fs.promises.writeFile(
					this.archivo,
					JSON.stringify(datos, null, 2)
				);
			}
		} catch (error) {
			throw Error(`error ${error}`);
		}
	}
}

export default Contenedor;
