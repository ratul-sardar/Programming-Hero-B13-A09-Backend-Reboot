import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../db/mongodb.db.ts";
import { validateToken } from "../middleware/jwt.middleware.ts";

// Get user added cars from the collection
export const getUserAddedCars: RequestHandler = async (req, res, next) => {
	try {
		const userId = req.params.userId as string;

		const cars = await carsCollection.find({ owner: userId }).toArray();

		res.send(cars);
	} catch (err) {
		next(err);
	}
};

// Get all the cars from the collection
export const getCars: RequestHandler = async (req, res, next) => {
	try {
		const search = req.query.search;
		const type = req.query.type;

		const filter: Record<string, any> = {};
		if (search) {
			filter.name = { $regex: search, $options: "i" };
		}
		if (type) filter.type = type;

		const cars = await carsCollection.find(filter).toArray();

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
		const carId = id as string;

		const JWTToken = req.headers.authorization?.split(" ")[1];
		const payload = await validateToken(JWTToken as string);
		const { id: UserId } = payload;

		// Checking if the car belongs to the requested user
		const carsUser = await carsCollection.findOne({ _id: new ObjectId(carId) });
		if (carsUser?.owner !== UserId) {
			throw new Error("You are not authorized to update this car info");
		}

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
		const carId = id as string;

		const JWTToken = req.headers.authorization?.split(" ")[1];
		const payload = await validateToken(JWTToken as string);
		const { id: UserId } = payload;

		// Checking if the car belongs to the requested user
		const carsUser = await carsCollection.findOne({ _id: new ObjectId(carId) });
		if (carsUser?.owner !== UserId) {
			throw new Error("You are not authorized to delete this car");
		}

		const cars = await carsCollection.deleteOne({ _id: new ObjectId(carId) });
		res.send(cars);
	} catch (err) {
		next(err);
	}
};
