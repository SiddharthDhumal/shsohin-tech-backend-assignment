import mongoose from "mongoose";
import AppError from "../utils/appError.js";

export const CONNECT_DB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL);
		console.log("DB connection successful!");
	} catch (error) {
		return new AppError("Error while connecting to Database", 400);
	}
};
