// En la constante numCPUs lo que hacemos es crear tantos workers como CPUs tengamos en el sistema.
// const numsCPU = require('os').cpus().length;
// console.log(numsCPU);

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	// fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		cluster.fork();
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	http
		.createServer((req, res) => {
			res.writeHead(200);
			res.end('hello world\n');
			console.log(`Worker ${process.pid} !`);
		})
		.listen(8000);
	console.log(`Worker ${process.pid} started`);
}
