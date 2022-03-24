import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';

function initializePassport(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		const user = await getUserByEmail(email);
		if (!user) {
			return done(null, false, { message: 'no user with that email' });
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'inncorrect password' });
			}
		} catch (error) {
			return done(error);
		}
	};
	passport.use(
		new Strategy(
			{
				usernameField: 'email',
			},
			authenticateUser
		)
	);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser(async (id, done) => {
		return done(null, await getUserById(id));
	});
}

export default initializePassport;
