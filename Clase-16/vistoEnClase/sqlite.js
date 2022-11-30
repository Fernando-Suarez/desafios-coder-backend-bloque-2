const { options } = require('./options/sqlite_config');
const knex = require('knex')(options);

// knex.schema
// 	.createTable('cars', (table) => {
// 		table.increments('id'),
// 			table.string('brand'),
// 			table.string('model'),
// 			table.integer('price');
// 	})
// 	.then(() => console.log('tabla creada con exito'))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

// knex('cars')
// 	.insert([
// 		{ brand: 'bmw', model: 'm4', price: 20000 },
// 		{ brand: 'bmw', model: 'm5', price: 25000 },
// 		{ brand: 'bmw', model: 'm6', price: 30000 },
// 	])
// 	.then(() => console.log('productos agregados'))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

knex
	.from('cars')
	.where('price', '>=', 30000)
	.del()
	.then(() => console.log('productos eliminados'))
	.catch((err) => console.log(err))
	.finally(() => knex.destroy());
