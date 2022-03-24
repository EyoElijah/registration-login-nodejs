import bcrypt from 'bcryptjs';
import passport from 'passport';
import UserModel from '../models/User.model.js';

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

const PostRegistrationController = async (req, res) => {
	const user = await UserModel.findOne({ email: req.body.email });

	if (user) {
		req.flash('error', 'email already exist');
		res.redirect('/register');
	} else {
		try {
			const hashPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new UserModel({
				name: req.body.name,
				email: req.body.email,
				password: hashPassword,
			});
			await newUser.save();
			res.redirect('/login');
		} catch (error) {
			console.log(error);
			res.redirect('/register');
		}
	}
};

const AuthenticateUser = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true,
});

const LogoutController = (req, res) => {
	req.logOut();
	res.redirect('/login');
};
export {
	HomeController,
	LoginController,
	RegisterController,
	PostRegistrationController,
	LogoutController,
	AuthenticateUser,
};
