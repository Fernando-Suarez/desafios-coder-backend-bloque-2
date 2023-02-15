const socket = io();

//* dom
const productForm = document.getElementById('product-form');
const productsContainer = document.getElementById('products-container');
const chatForm = document.getElementById('chat-form');
const chatContainer = document.getElementById('chat-container');
const productosRandom = document.getElementById('productos-random');

//* funciones socket productos

const cargarProducto = (e) => {
	const formData = new FormData(productForm);
	const formValues = Object.fromEntries(formData);
	productForm.reset();
	socket.emit('nuevo producto', formValues);
	return false;
};

const renderizado = async (products) => {
	const respond = await fetch('../views/layouts/productlist.hbs');
	const template = await respond.text();
	// compile the template
	const compiledTemplate = Handlebars.compile(template);
	// execute the compiled template and print the output to the console
	const html = compiledTemplate({ products });
	productsContainer.innerHTML = html;
};

const renderizadoRandom = async (products) => {
	const respond = await fetch('../views/layouts/productlist.hbs');
	const template = await respond.text();
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ products });
	productosRandom.innerHTML = html;
};

//* socket producto

socket.on('lista productos', (products) => {
	renderizado(products);
});
socket.on('lista random', (products) => {
	console.log(products);
	renderizadoRandom(products);
});

//* funciones socket chat

const guardarMensaje = (e) => {
	const formData = new FormData(chatForm);
	const formValues = Object.fromEntries(formData);
	socket.emit('nuevo mensaje', formValues);
	return false;
};

const renderizadoMensajes = async (mensajes) => {
	const respond = await fetch('../views/layouts/chatMensajes.hbs');
	const template = await respond.text();
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ mensajes });
	chatContainer.innerHTML = html;
};

//socket mensajes
socket.on('lista mensajes', (mensajes) => {
	renderizadoMensajes(mensajes);
});
