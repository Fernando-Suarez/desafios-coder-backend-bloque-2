const { connect, set } = require('mongoose');

const connectionMG = async () => {
	try {
		set('strictQuery', false);
		await connect(
			'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce'
		);
	} catch (error) {
		console.log(error);
		throw 'connection failded';
	}
};
const mongoDB = connectionMG();
module.exports = { mongoDB };
