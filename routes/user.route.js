import bcrypt from 'bcryptjs';
import express from 'express';
import passport from 'passport';
import {
	HomeController,
	LoginController,
	RegisterController,
} from '../controllers/user.controller.js';

import { checkAuthenticated, checkNotAuthenticated } from '../middleware/auth.js';
import UserModel from '../models/User.model.js';

const router = express.Router();

router.get('/', HomeController);

router.get('/login', checkNotAuthenticated, LoginController);

router.get('/register', checkNotAuthenticated, RegisterController);

router.post(
	'/login',
	checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

router.post('/register', checkNotAuthenticated, async (req, res) => {
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
});

router.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});
export default router;
