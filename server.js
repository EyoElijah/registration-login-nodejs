import express from 'express';
import passport from 'passport';
import expressFlash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import initializePassport from './validations/passport-config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ConnectDB } from './db.js';
import routes from './routes/user.route.js';
import UserModel from './models/User.model.js';
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
initializePassport(
	passport,
	async (email) => {
		const user = await UserModel.findOne({ email });
		return user;
	},
	async (id) => {
		const user = await UserModel.findOne({ _id: id });
		return user;
	}
);

app.use(expressFlash());
app.use('/css', express.static(__dirname + '/public'));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(routes);

const PORT = process.env.PORT;
async function start() {
	await ConnectDB();
	app.listen(PORT, () => console.log(`server is running on port https://localhost:${PORT}`));
}

start();
