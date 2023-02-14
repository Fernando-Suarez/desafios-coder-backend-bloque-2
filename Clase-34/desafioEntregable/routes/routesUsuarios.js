const { logger } = require('../utils/logger');

function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		const user = { username, password };
		res.render('main', { layout: 'index', username: user.username });
	} else {
		logger.log('info', 'Ruta: /login  -  Metodo: GET');
		res.render('main', { layout: 'login' });
	}
}

function getSignup(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		res.redirect('/');
	} else {
		logger.log('info', 'Ruta: /signup  -  Metodo: GET');
		res.render('main', { layout: 'signup' });
	}
}

function postLogin(req, res) {
	logger.log('info', 'Ruta: /login  -  Metodo: POST');
	res.redirect('/');
}

function postSignup(req, res) {
	const { username, password } = req.user;
	const user = { username, password };
	logger.log('info', 'Ruta: /signup  -  Metodo: POST');
	res.render('main', { layout: 'index' });
}

function getFaillogin(req, res) {
	logger.log('info', 'Ruta: /faillogin  -  Metodo: GET');
	res.render('main', { layout: 'login-error' });
}

function getFailsignup(req, res) {
	logger.log('info', 'Ruta: /failsignup  -  Metodo: GET');
	res.render('main', { layout: 'signup-error' });
}

function getLogout(req, res) {
	// req.logout();
	const user = req.user;
	req.session.destroy((err) => {
		if (!err) {
			logger.log('info', 'Ruta: /logout  -  Metodo: GET');
			res.render('main', { layout: 'logout', username: user.username });
		} else {
			res.send({ status: 'Logout error', body: err });
		}
	});
	// res.render('main',{layout: 'index'});
}

module.exports = {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getFaillogin,
	getFailsignup,
	getLogout,
};
