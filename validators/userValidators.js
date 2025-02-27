import Joi from "joi";

export const userSchema = Joi.object({
	name: Joi.string().min(3).max(30).trim().messages({
		"string.min": "Name must be at least 3 characters.",
		"string.max": "Name must be at most 30 characters.",
		"string.empty": "Name cannot be empty.",
	}),

	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "org", "io", "edu"] },
		})
		.trim()
		.pattern(/^[a-zA-Z0-9._%+-]+@([a-zA-Z]+[a-zA-Z0-9.-]*)\.[a-zA-Z]{2,}$/)
		.required()
		.messages({
			"string.email": "Please enter a valid email address.",
			"string.pattern.base": "Email domain must contain at least one letter.",
			"any.required": "Email is required.",
		}),

	password: Joi.string()
		.min(8)
		.max(20)
		.pattern(
			new RegExp(
				"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$"
			)
		)
		.required()
		.messages({
			"string.min": "Password must be at least 8 characters.",
			"string.max": "Password must be at most 20 characters.",
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
		}),
});

// Partial validation for updates (all fields optional but validated if provided)
export const updateUserSchema = userSchema.fork(
	["name", "email", "password"],
	(schema) => schema.optional()
);
