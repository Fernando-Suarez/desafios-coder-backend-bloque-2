const { connect, set } = require('mongoose');
const dotenv = require('dotenv').config();
const DB_MONGO = process.env.DB_MONGO_PASS;
const connectionMG = async () => {
	try {
		set('strictQuery', false);
		await connect(
			`mongodb+srv://fernandosuarez:${DB_MONGO}@cluster0.ye0zt3v.mongodb.net/ecommerce`
		);
	} catch (error) {
		console.log(error);
		throw 'connection failded';
	}
};
const mongoDB = connectionMG();
module.exports = { mongoDB };
