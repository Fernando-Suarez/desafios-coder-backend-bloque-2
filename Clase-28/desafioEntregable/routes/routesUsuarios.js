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
		res.redirect('/');
	} else {
		res.render('main', { layout: 'signup' });
	}
}

function postLogin(req, res) {
	const { username, password } = req.user;
	const user = { username, password };
	res.redirect('/');
}

function postSignup(req, res) {
	const { username, password } = req.user;
	const user = { username, password };
	res.render('main', { layout: 'login' });
}

function getFaillogin(req, res) {
	res.render('main', { layout: 'login-error' });
}

function getFailsignup(req, res) {
	res.render('main', { layout: 'signup-error' });
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

module.exports = {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getFaillogin,
	getFailsignup,
	getLogout,
};
