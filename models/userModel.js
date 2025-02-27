import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			minLength: 3,
			maxLength: 30,
			required: [true, "user name is required"],
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Email is required"],
			unique: [true, "Email must be unique"],
			match: /.+\@.+\..+/,
			validate: [validator.isEmail, "Please provide a valid email"],
		},
		password: {
			type: String,
			minLength: 8,
			select: false,
			required: [true, "Password is required"],
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

export const User = mongoose.model("User", userSchema);
