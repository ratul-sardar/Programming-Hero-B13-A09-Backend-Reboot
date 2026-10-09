import "dotenv/config";

import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import connectDB from "./db/mongodb.db.ts";
import errorHandler from "./middleware/error.middleware.ts";
import bookingRouter from "./routes/booking.routes.ts";
import carRouter from "./routes/cars.routes.ts";

const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8800;

// All the routes
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/bookings", bookingRouter);

// Error Handler
app.use(errorHandler);

// Base route
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, async () => {
	console.log(`Example app listening on http://localhost:${port}`);

	// connecting mongodb
	await connectDB().catch(console.dir);
});
