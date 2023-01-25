const config = require('./variablesDeEntorno');
const express = require('express');
const app = express();
console.log(`NODE_ENV=${config.NODE_ENV}`);
app.get('/', (req, res) => {
	res.send('Hello word');
});
app.listen(config.PORT, config.HOST, () =>
	console.log(`App listening on http://${config.HOST}:${config.PORT}`)
);
