import { Router } from "express";
import { getCar, getCars } from "../controller/cars.contoller.ts";

const carRouter = Router();

carRouter.get("/", getCars);
carRouter.get("/:id", getCar);
carRouter.post("/", async (req, res, next) => res.send("post a car!"));
carRouter.patch("/", async (req, res, next) => res.send("patch a car!"));
carRouter.delete("/", async (req, res, next) => res.send("delete a car!"));

export default carRouter;
