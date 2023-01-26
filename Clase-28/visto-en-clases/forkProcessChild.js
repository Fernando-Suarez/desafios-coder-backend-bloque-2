const http = require('http');
const { fork } = require('child_process');

let visitas = 0;
const server = http.createServer();
server.on('request', (req, res) => {
	let { url } = req;
	if (url == '/calcular') {
		// const sum = calculo();
		let computo = fork('./computo.js');

		computo.send('start');

		computo.on('message', (msg) => {
			const { data, type } = msg;
			switch (type) {
				case 'sum':
					res.end(`La suma es ${data}`);
					break;
				case 'otra cosa':
					res.end(`La data es ${data}`);
					break;
			}
		});
	} else if (url == '/') {
		res.end('Ok ' + ++visitas);
	}
});
const PORT = 8080;
server.listen(PORT, (err) => {
	if (err) throw new Error(`Error en servidor: ${err}`);
	console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
