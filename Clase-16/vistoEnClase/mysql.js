//* config

const { options } = require('./options/mysql_config.js');
const knex = require('knex')(options);

//* create tabla

// knex.schema
// 	.createTable('cars', (table) => {
// 		table.increments('id'),
// 			table.string('brand'),
// 			table.string('model'),
// 			table.integer('price');
// 	})
// 	.then(() => {
// 		console.log('todo bien');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		throw new Error(err);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

//* create fila o filas

// knex('cars')
// 	.insert({ brand: 'vmw', model: 'm4', price: 20000 })
// 	.then(() => {
// 		console.log('producto creado ');
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 		throw new Error(error);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

// knex('cars')
// 	.insert([
// 		{ brand: 'vmw', model: 'm5', price: 23000 },
// 		{ brand: 'vmw', model: 'm6', price: 25000 },
// 		{ brand: 'vmw', model: 'm7', price: 30000 },
// 		{ brand: 'vmw', model: 'm8', price: 35000 },
// 	])
// 	.then(() => {
// 		console.log('productos agregados');
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

//* leer datos

// knex
// 	.from('cars')
// 	.select('*')
// 	.then((rows) => {
// 		for (const row of rows) {
// 			console.log(`${row['id']} ${row['brand']} ${row['model']} ${row.price}`);
// 		}
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

//* leer datos especificos por orden

// knex
// 	.from('cars')
// 	.select('brand', 'price')
// 	.orderBy('price', 'desc')
// 	.then((rows) => {
// 		for (const row of rows) {
// 			console.log(`${row.brand} ${row.price}`);
// 		}
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

//* actualizar datos

// knex
// 	.from('cars')
// 	.where('id', '=', '5')
// 	.update({ price: 40000 })
// 	.then(() => console.log('producto actualizado'))
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.finally(() => {
// 		knex.destroy();
// 	});

//* borrar fila o filas del producto segun condicion del where('propiedad', 'condicion', valor)

// knex
// 	.from('cars')
// 	.where('id', '=', 5)
// 	.del()
// 	.then(() => console.log('producto eliminado'))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());

//* borrar todas las filas de las tablas

// knex
// 	.from('cars')
// 	.del()
// 	.then(() => console.log('todos los productos fueron eliminados'))
// 	.catch((err) => console.log(err))
// 	.finally(() => knex.destroy());
