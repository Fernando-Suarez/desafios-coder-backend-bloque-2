const { optionsMysql } = require('../options/mysqlConfig');
const { optionsSQlite3 } = require('../options/sqlite3Config');

class Contenedor {
	constructor(config, table) {
		this.config = require('knex')(config);
		this.table = table;
	}
	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(objeto) {
		try {
			await this.config(this.table).insert(objeto);
		} catch (error) {
			throw new Error(`No se puedo guardar el archivo`, error);
		}
	} // fin metodo save(Object)

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productoId = this.config
				.from(this.table)
				.where('id', '=', id)
				.select('*');
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
			const info = await this.config.from(this.table).select('*');
			return info;
		} catch (error) {
			throw new Error(`No se puede leer el archivo `, error);
		}
	} // Fin metodo getAll()

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const productoId = await this.config
				.from(this.table)
				.where('id', '=', id)
				.del();
			console.log(`${productoId} fue eliminado`);
		} catch (error) {
			throw new Error('No se pudo eliminar el elemento', error);
		} // Fin metodo deleteById(number)
	}
	// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	async deleteAll() {
		try {
			await this.config(this.table).del();
			console.log('Contenido eliminado');
		} catch (error) {
			throw new Error('No se pude eliminar el contenido del archivo', error);
		}
	} // Fin metodo deleteAll()

	async updateById(id, body) {
		try {
			const productoEncontrado = this.config
				.from(this.table)
				.where('id', '=', id)
				.update(body);
			if (productoEncontrado) {
				return productoEncontrado;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error('No se puede actualizar el contenido');
		}
	}
}

const contenedorMysql = new Contenedor(optionsMysql, 'productos');
const contenedorSQLite3 = new Contenedor(optionsSQlite3, 'mensajes');

module.exports = { contenedorMysql, contenedorSQLite3 };
