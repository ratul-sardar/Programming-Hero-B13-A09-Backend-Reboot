import { Router } from "express";
import { getCars } from "../controller/cars.contoller.ts";

const carRouter = Router();

carRouter.get("/", getCars);

export default carRouter;
