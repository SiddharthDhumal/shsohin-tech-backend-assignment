import dotenv from "dotenv";
import { CONNECT_DB } from "./db/db.config.js";
import app from "./app.js";

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });

CONNECT_DB();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", () => {
	console.log(" SIGTERM RECEIVED. Shutting down gracefully");
	server.close(() => {
		console.log(" Process terminated!");
	});
});
