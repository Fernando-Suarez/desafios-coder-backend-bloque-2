class Contenedor {
	constructor(archivo) {
		this.archivo = archivo;
	}

	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(objeto) {}

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {}

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {}

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {}
	// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	async deleteAll() {} // Fin metodo deleteAll()

	async updateById(id, body) {}

	async deleteProductById(idC, idP) {}
}

export default Contenedor;
