const http = require('http');

http
	.createServer((req, res) => {
		res.writeHead(200);
		res.end('hello world\n');
		console.log(`Worker ${process.pid} !`);
	})
	.listen(8000);
console.log(`Worker ${process.pid} started`);

//* pm2

//para poder usarlo primero lo instalamos con: npm i pm2 -g

//luego podemos iniciar la aplicacion con: pm2 start app.js

//Se puede iniciar la ejecución en modo fork o en modo cluster. Los comandos que utilizamos son:

// cluster: pm2 start app.js --name="serverX" --watch -i max -- --port=puerto

// fork: pm2 start app.js --name="serverY" --watch -- --port=puerto

//Podemos listar todas las aplicaciones que se están ejecutando con : pm2 list

//Para detener, reiniciar o eliminar una de las aplicaciones de la lista, podemos ejecutar alguno de los siguientes comandos

//pm2 stop , pm2 restart , pm2 delete <all || nombre || id  >

//Para obtener detalle de una aplicación: pm2 describe <id | appname>

//Para monitorear sus logs, métricas e información: pm2 monit
