const { optionsSQlite3 } = require('../options/sqlite3Config');
const knex = require('knex')(optionsSQlite3);

knex.schema
	.createTable('mensajes', (table) => {
		table.string('email'),
			table.string('mensaje'),
			table.string('fecha'),
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
