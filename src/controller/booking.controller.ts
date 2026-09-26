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
  const bookingData = {
    userId: "ratul", // this have to be ObjectId too, i guess. I have to test this one!
    carId: new ObjectId("6aad7cb17296f6f115d6fbc3"),
    driverNeeded: false,
    specialNote: "",
    carDetails: {
      _id: "6aad7cb17296f6f115d6fbc3",
      name: "Nissan Rogue",
      type: "Midsize SUV 2WD",
      dailyPrice: "105",
      imageURL:
        "https://i.ibb.co.com/Z6bpyPNs/imgi-36-CCAR-rendition-vlarge.webp",
      seatCapacity: "5",
      pickupLocation: "Mirpur-1, Dhaka",
      description: "",
      availability: true,
      bookingCount: 4,
      owner: "ratul",
      createdAt: "Fri Sep 18 2026 03:56:16 GMT+0600",
      updatedAt: "Fri Sep 18 2026 03:56:16 GMT+0600",
    },
    bookingDate: new Date().toString(),
  };

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
