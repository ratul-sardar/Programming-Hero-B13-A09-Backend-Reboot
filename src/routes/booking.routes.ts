import { Router } from "express";
import {
	bookCar,
	deleteBookedCar,
	getBookedCars,
} from "../controller/booking.controller.ts";

const bookingRouter = Router();

bookingRouter.get("/:id", getBookedCars);
bookingRouter.post("/", bookCar);
bookingRouter.delete("/:id", deleteBookedCar);

export default bookingRouter;
