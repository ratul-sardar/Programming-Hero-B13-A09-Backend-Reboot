import type { RequestHandler } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const verifyJWT: RequestHandler = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const payload = await validateToken(token);
		if (payload) {
			next();
		} else {
			return res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error: any) {
		console.log(
			`Error form jwt verification middleware, error message: ${error.message}`,
		);

		next(error);
	}
};

export async function validateToken(token: string) {
	try {
		const JWKS = createRemoteJWKSet(
			new URL(`${process.env.CLIENT_URI}/api/auth/jwks`),
		);
		const { payload } = await jwtVerify(token, JWKS, {
			issuer: `${process.env.CLIENT_URI}`, // Should match your JWT issuer, which is the BASE_URL
			audience: `${process.env.CLIENT_URI}`, // Should match your JWT audience, which is the BASE_URL by default
		});
		return payload;
	} catch (error) {
		console.error("Token validation failed:", error);
		throw error;
	}
}
