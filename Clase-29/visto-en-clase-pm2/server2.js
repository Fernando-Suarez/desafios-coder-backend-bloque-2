const http = require('http');
const port = 8083;
http
	.createServer((req, res) => {
		res.writeHead(200);
		res.end('hello world\n');
		console.log(`Worker ${process.pid} !`);
	})
	.listen(port);
console.log(`Worker ${process.pid} started`);
