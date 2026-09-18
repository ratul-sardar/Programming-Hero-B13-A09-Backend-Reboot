import type { NextFunction, Request, Response } from "express";

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const error = { ...err };
	error.message = err.message;

	console.log(error.message);

	res.status(500).send(error.message);
};

export default errorHandler;
