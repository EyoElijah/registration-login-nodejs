import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.URI);
		console.log('db connected successfully');
	} catch (error) {
		console.error(error);
	}
};
