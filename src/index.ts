import cors from "cors";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
dotenv.config();
app.use(cors());

const port = process.env.SERVER_URI || 8001;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
