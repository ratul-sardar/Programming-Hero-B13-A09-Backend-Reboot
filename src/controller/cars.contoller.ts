import type { RequestHandler } from "express";
import { carsCollection } from "../db/mongodb.db.ts";

// All cars collection
const carsRes = carsCollection;

export const getCars: RequestHandler = async (req, res, next) => {
	const cars = await carsRes.find().toArray();

	res.send(cars);
};
