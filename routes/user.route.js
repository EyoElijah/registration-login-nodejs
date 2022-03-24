import express from 'express';

import {
	AuthenticateUser,
	HomeController,
	LoginController,
	LogoutController,
	PostRegistrationController,
	RegisterController,
} from '../controllers/user.controller.js';

import { checkAuthenticated, checkNotAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', checkAuthenticated, HomeController);

router.get('/login', checkNotAuthenticated, LoginController);

router.get('/register', checkNotAuthenticated, RegisterController);

router.post('/login', checkNotAuthenticated, AuthenticateUser);

router.post('/register', checkNotAuthenticated, PostRegistrationController);

router.delete('/logout', LogoutController);
export default router;
