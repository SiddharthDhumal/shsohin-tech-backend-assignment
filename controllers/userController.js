import { User } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { updateUserSchema } from "../validators/userValidators.js";

export class UserController {
	//Mehtod for Get All Users
	static getAllUsers = catchAsync(async (req, res, next) => {
		const allUsers = await User.find();
		if (!allUsers) {
			return next(new AppError("Users not found", 404));
		}

		return res.status(200).json({ allUsers });
	});

	//Mehtod for Get User By Id
	static getUserById = catchAsync(async (req, res, next) => {
		const user = await User.findById(req.params.id);

		if (!user) {
			return next(new AppError("User not found", 401));
		}

		return res.status(200).json({ user });
	});

	//Mehtod for Update User
	static updateUser = catchAsync(async (req, res, next) => {
		const user = await User.findById(req.params.id).select("+password");

		if (!user) {
			return next(new AppError("User not found", 404));
		}

		if (req.user.id !== req.params.id) {
			return next(new AppError("You are not authorized to update user", 403));
		}

		const { error } = updateUserSchema.validate(req.body);
		if (error) return next(new AppError("Error while validating user", 400));

		const { name, email, password } = req.body;

		user.name = name || user.name;
		user.email = email || user.email;
		user.password = password || user.password;

		await user.save();

		return res.status(200).json({
			message: "User updated successfully !!",
			user: { id: user.id, name: user.name, email: user.email },
		});
	});

	// Method for Delete User
	static deleteUser = catchAsync(async (req, res, next) => {
		const user = await User.findById(req.params.id);

		if (req.user.id !== req.params.id) {
			return next(new AppError("You are not authorized to delete user", 401));
		}

		const doc = await User.deleteOne({ email: user.email });

		if (!doc) {
			return next(new AppError("User is not exsists", 401));
		}

		res.status(204).json({
			status: "success",
			data: null,
		});
	});
}
