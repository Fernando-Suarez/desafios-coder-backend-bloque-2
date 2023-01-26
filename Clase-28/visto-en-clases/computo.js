process.on('message', (msg) => {
	if (msg == 'start') {
		let sum = 0;
		for (let i = 0; i < 6e9; i++) {
			sum += i;
		}
		process.send({ type: 'sum', data: sum });
	}
});
