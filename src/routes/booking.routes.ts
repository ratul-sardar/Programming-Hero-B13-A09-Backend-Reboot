import { Router } from "express";
import {
	bookCar,
	deleteBookedCar,
	getBookedCars,
} from "../controller/booking.controller.ts";
import { verifyJWT } from "../middleware/jwt.middleware.ts";

const bookingRouter = Router();

bookingRouter.get("/:id", verifyJWT, getBookedCars);
bookingRouter.post("/", verifyJWT, bookCar);
bookingRouter.delete("/:id", verifyJWT, deleteBookedCar);

export default bookingRouter;
