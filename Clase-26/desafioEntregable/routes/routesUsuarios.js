function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		const user = { username, password };
		res.render('main', { layout: 'index', username: user.username });
	} else {
		res.render('main', { layout: 'login' });
	}
}

function getSignup(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		const user = { username, password };
		res.send('usuario registrado' + user.username);
	} else {
		res.render('main', { layout: 'signup' });
	}
}

function postLogin(req, res) {
	const { username, password } = req.user;
	const user = { username, password };
	if (!user.username && !user.password) {
		res.json({ msg: 'usuario no registrado' });
	}
	res.redirect('/');
}

function postSignup(req, res) {
	const { username, password } = req.user;
	const user = { username, password };
	res.render('profileUser', { user });
}

function getFaillogin(req, res) {
	res.render('login-error', {});
}

function getFailsignup(req, res) {
	res.render('signup-error', {});
}

function getLogout(req, res) {
	// req.logout();
	const user = req.user;
	req.session.destroy((err) => {
		if (!err) {
			res.render('main', { layout: 'logout', username: user.username });
		} else {
			res.send({ status: 'Logout error', body: err });
		}
	});
	// res.render('main',{layout: 'index'});
}

function failRoute(req, res) {
	res.status(404).render('routing-error', {});
}

module.exports = {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getFaillogin,
	getFailsignup,
	getLogout,
	failRoute,
};
