const HomeController = (req, res) => {
	res.render('index', {
		name: req.user.name,
	});
};

const LoginController = (req, res) => {
	res.render('login');
};

const RegisterController = (req, res) => {
	res.render('register');
};
export { HomeController, LoginController, RegisterController };
