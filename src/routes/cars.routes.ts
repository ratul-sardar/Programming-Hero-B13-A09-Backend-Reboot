import { Router } from "express";
import {
	addCar,
	deleteCar,
	getCar,
	getCars,
	getUserAddedCars,
	updateCar,
} from "../controller/cars.controller.ts";
import { verifyJWT } from "../middleware/jwt.middleware.ts";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCar);
carRouter.get("/user-added-cars/:userId", verifyJWT, getUserAddedCars);
carRouter.post("/", verifyJWT, addCar);
carRouter.patch("/:id", updateCar);
carRouter.delete("/:id", verifyJWT, deleteCar);

export default carRouter;
