import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../db/mongodb.db.ts";

// Get all the cars from the collection
export const getCars: RequestHandler = async (req, res, next) => {
	try {
		const cars = await carsCollection.find().toArray();

		res.send(cars);
	} catch (err) {
		next(err);
	}
};

// Get one car from the collection
export const getCar: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const carId = id as string; // without the "as string" force type. typescript is giving warning in the ObjectId()

		const cars = await carsCollection.findOne({ _id: new ObjectId(carId) });

		res.send(cars);
	} catch (err) {
		next(err);
	}
};

// Add a car in the collection
export const addCar: RequestHandler = async (req, res, next) => {
	try {
		const carData = req.body;

		const cars = await carsCollection.insertOne(carData);

		res.send(cars);
	} catch (err) {
		next(err);
	}
};

// Update a car in the collection
export const updateCar: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const carData = req.body;
		const carId = id as string; // without the "as string" force type. typescript is giving warning in the ObjectId()

		const cars = await carsCollection.updateOne(
			{ _id: new ObjectId(carId) },
			{
				$set: {
					...carData,
				},
			},
		);

		res.send(cars);
	} catch (err) {
		next(err);
	}
};

// Delete a car in the collection
export const deleteCar: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const carId = id as string; // without the "as string" force type. typescript is giving warning in the ObjectId()

		const cars = await carsCollection.deleteOne({ _id: new ObjectId(carId) });

		res.send(cars);
	} catch (err) {
		next(err);
	}
};
