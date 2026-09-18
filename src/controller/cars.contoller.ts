import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../db/mongodb.db.ts";

// Get all the cars from the collection
export const getCars: RequestHandler = async (req, res, next) => {
	const cars = await carsCollection.find().toArray();

	res.send(cars);
};

// Get one car from the collection
export const getCar: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const carId = id as string; // without the "as string" force type. typescript is giving warning in the ObjectId()

	const cars = await carsCollection.findOne({ _id: new ObjectId(carId) });

	res.send(cars);
};
