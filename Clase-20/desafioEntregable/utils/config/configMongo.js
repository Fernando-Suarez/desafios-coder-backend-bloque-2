import { connect,set } from 'mongoose';

const connectionMG = async () => {
	try {
		

		set("strictQuery", false);
		await connect(
			'mongodb+srv://fernandosuarez:aN41YLnwAIFGT3mb@cluster0.amee35o.mongodb.net/?retryWrites=true&w=majority'
		);
	} catch (error) {
		console.log(error);
		throw 'connection failded';
	}
};
const mongoDB = connectionMG()
export default mongoDB;
