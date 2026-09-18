import type { RequestHandler } from "express";

export const getCars: RequestHandler = async (req, res, next) => {
	res.json({ message: "all cars!" });
};
