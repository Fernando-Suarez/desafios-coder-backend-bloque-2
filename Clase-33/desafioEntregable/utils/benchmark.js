const autocannon = require('autocannon');
const { PassThrough } = require('stream');
function run(url) {
	const buf = [];
	const outputStream = new PassThrough();
	const inst = autocannon({
		url,
		connections: 100,
		duration: 20,
	});
	autocannon.track(inst, { outputStream });
	outputStream.on('data', (data) => buf.push(data));
	inst.on('done', function () {
		process.stdout.write(Buffer.concat(buf));
	});
}
//comentar una sola para probar o cambiar los puertos para probar en simultaneo

// console.log('Running benchmarks in bloq ...');
// run('http://localhost:8080/auth-bloq?username=dani&password=qwerty123');

// console.log('Running benchmarks in nobloq ...');
// run('http://localhost:8080/auth-nobloq?username=dani&password=qwerty123');
