# Drive Fleet — Backend API

**Live API:** Not deployed yet — add the production API URL here when available.

This repository contains the REST API for Drive Fleet, a car-rental application. The API stores vehicle listings and booking records in MongoDB and serves data to the Next.js frontend.

## Features

- List cars, with optional name search and vehicle-type filtering.
- Retrieve an individual car listing.
- Create, update, and delete car listings.
- Retrieve vehicles added by a specific user.
- Create bookings and list bookings for a user.
- Delete a booking and update the associated car's booking count.
- JSON request parsing, CORS support, and centralized error handling.

## Tech stack

- Node.js and TypeScript
- Express 5
- MongoDB Node.js driver
- dotenv for environment configuration

## Local development

Prerequisites: Node.js with TypeScript support and a MongoDB deployment.

```bash
npm install
npm run dev
```

The API defaults to [http://localhost:8001](http://localhost:8001). The development command uses Node's watch mode to run `src/index.ts`.

## API routes

All API routes are prefixed with `/api/v1`.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/cars` | List cars; supports `search` and `type` query parameters |
| `GET` | `/api/v1/cars/:id` | Get a car by ID |
| `GET` | `/api/v1/cars/user-added-cars/:userId` | List cars added by a user |
| `POST` | `/api/v1/cars` | Add a car |
| `PATCH` | `/api/v1/cars/:id` | Update a car |
| `DELETE` | `/api/v1/cars/:id` | Delete a car |
| `GET` | `/api/v1/bookings/:id` | List bookings for a user |
| `POST` | `/api/v1/bookings` | Create a booking |
| `DELETE` | `/api/v1/bookings/:id` | Delete a booking |

## Environment variables

Create a `.env` file in this backend directory. Do not commit database credentials or other secrets.

```env
MONGODB_URI=mongodb://localhost:27017/drive-fleet
SERVER_URI=8001
```

Despite its name, `SERVER_URI` is used as the listening port in the current server implementation; use a port number such as `8001`.

## Related project

The web application is maintained in [`../programming-hero-b13-a09-frontend-reboot`](../programming-hero-b13-a09-frontend-reboot/README.md).
