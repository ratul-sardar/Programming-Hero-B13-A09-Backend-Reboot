import { Router } from "express";
import {
	addCar,
	deleteCar,
	getCar,
	getCars,
	updateCar,
} from "../controller/cars.contoller.ts";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCar);
carRouter.post("/", addCar);
carRouter.patch("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
