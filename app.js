import express from "express";
import "dotenv/config";
import cors from "cors";

import userRouter from "./routers/userRoutes.js";
import cookieParser from "cookie-parser";
import { xss } from "express-xss-sanitizer";
import mongoSanitize from "express-mongo-sanitize";
import { limit } from "./config/ratelimit.js";
import compression from "compression";
import helmet from "helmet";
import { globalErrorHandler } from "./controllers/errorController.js";

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options("*", cors());

// 2) Set security HTTP headers
app.use(helmet());

// Limit requests from same API
app.use("/api/v1", limit);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Implement Compression
app.use(compression());

// 3) ROUTES
app.use("/api/v1", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
