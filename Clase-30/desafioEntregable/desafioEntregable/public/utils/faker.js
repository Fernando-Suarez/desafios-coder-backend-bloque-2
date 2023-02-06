const { faker } = require('@faker-js/faker');
faker.locale = 'es';

const dataFaker = () => {
	const { commerce, image, finance } = faker;
	const arrayAuxiliar = [];

	const cantidad = 5;
	for (let i = 0; i < cantidad; i++) {
		const objeto = {
			id: i + 1,
			nombre: commerce.product(),
			precio: commerce.price(),
			foto: image.image(),
		};
		arrayAuxiliar.push(objeto);
	}
	return arrayAuxiliar;
};

module.exports = { dataFaker };
