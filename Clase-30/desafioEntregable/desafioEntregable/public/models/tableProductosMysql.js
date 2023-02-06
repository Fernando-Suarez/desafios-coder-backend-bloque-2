const { optionsMysql } = require('../options/mysqlConfig');
const knex = require('knex')(optionsMysql);

//*primero conectar xammp y workbench y luego ejecutar el archivo js para crear la tabla de productos.

knex.schema
	.createTable('productos', (table) => {
		table.string('nombre'),
			table.string('categoria'),
			table.decimal('precio'),
			table.string('thumbnail'),
			table.increments('id');
	})
	.then(() => {
		console.log('tabla creada');
	})
	.catch((err) => {
		console.log(err);
		throw new Error(err);
	})
	.finally(() => {
		knex.destroy();
	});
