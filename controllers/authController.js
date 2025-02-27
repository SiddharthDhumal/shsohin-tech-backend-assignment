import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { userSchema } from "../validators/userValidators.js";

export class AuthController {
	// Register Method
	static register = catchAsync(async (req, res, next) => {
		const { error } = userSchema.validate(req.body);
		if (error)
			return res.status(400).json({ message: error.details[0].message });

		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return next(new AppError("Please provide all arguments !!", 400));
		}

		const newUser = new User({
			name,
			email,
			password,
		});

		await newUser.save();
		newUser.password = undefined;

		return res.status(201).json({
			status: "success",
			data: {
				newUser,
			},
		});
	});

	// Login Method
	static login = catchAsync(async (req, res, next) => {
		const { error } = userSchema.validate(req.body);
		if (error)
			return res.status(400).json({ message: error.details[0].message });

		const { email, password } = req.body;

		if (!email || !password) {
			return next(new AppError("Please provide both email and password", 400));
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return next(new AppError("User Not Found !!", 401));
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return next(new AppError("Invalid credentials", 400));
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "2d" }
		);

		// setting JWT token on cookies
		res.cookie("jwt", token, {
			expires: new Date(
				Date.now() +
					parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			secure: req.secure || req.headers["x-forwarded-proto"] === "https",
		});

		user.password = undefined;

		res.status(200).json({
			status: "success",
			token,
			data: {
				user,
			},
		});
	});
}
