import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { bookingCollection, carsCollection } from "../db/mongodb.db.ts";

// List of all the booked car by a user
export const getBookedCars: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	const userObjectId = id; // have to replace later with -> new ObjectId(userId as string);

	try {
		const bookedCars = await bookingCollection
			.find({ userId: userObjectId })
			.toArray();
		res.send(bookedCars);
	} catch (error) {
		next(error);
	}
};

// Book a car
export const bookCar: RequestHandler = async (req, res, next) => {
	// This will come from frontend!
	const bookingData = await req.body;

	try {
		const result = await bookingCollection.insertOne(bookingData);
		const increasedBookingCount = await carsCollection.updateOne(
			{ _id: new ObjectId(bookingData.carId) },
			{
				$inc: { bookingCount: 1 },
			},
		);
		console.log(increasedBookingCount);

		res.send(result);
	} catch (error) {
		next(error);
	}
};

// Delete a booked car from the collection
export const deleteBookedCar: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const bookingId = id as string; // without the "as string" force type. typescript is giving warning in the ObjectId()

		const cars = await carsCollection.deleteOne({
			_id: new ObjectId(bookingId),
		});

		res.send(cars);
	} catch (err) {
		next(err);
	}
};
