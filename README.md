# Flight Management System

This project is a microservices-based flight management system. It is composed of the following services:

* **API Gateway:** The single entry point for all client requests. It handles authentication and rate-limiting and routes requests to the appropriate service.
* **Flight Service:** Manages all flight-related data, including airplanes, airports, cities, and flights.
* **Booking Service:** Handles the flight booking process, including creating bookings and processing payments.
* **Notification Service:** Sends notifications to users, such as booking confirmations.

## Getting Started

To get started with this project, you will need to have Docker installed. Once you have Docker installed, you can run the following command to start all of the services:
```docker-compose up```

This will start all of the services in the background. You can then access the API Gateway at `http://localhost:5000`.

## API Documentation

The API documentation for each service can be found in the following files:

* **API Gateway:** `API_Gateway/src/routes/v1/index.js`
* **Flight Service:** `Flight_Service/src/routes/v1/index.js`
* **Booking Service:** `Booking_Service/src/routes/v1/index.js`
* **Notification Service:** `Notification_Service/src/routes/v1/index.js`

## Database Migrations

The database migrations for each service can be found in the following files:

* **API Gateway:** `API_Gateway/src/migrations`
* **Flight Service:** `Flight_Service/src/migrations`
* **Booking Service:** `Booking_Service/src/migrations`
* **Notification Service:** `Notification_Service/src/migrations`

## Environment Variables

The following environment variables need to be set for each service:

* **API Gateway:**
    * `PORT`
    * `SALT_ROUNDS`
    * `JWT_SECRET`
    * `JWT_EXPIRE`
    * `BOOKING_SERVICE_URL`
    * `FLIGHT_SERVICE_URL`
* **Flight Service:**
    * `PORT`
* **Booking Service:**
    * `PORT`
    * `FLIGHT_SERVICE`
* **Notification Service:**
    * `PORT`
    * `SMPT_MAIL`
    * `SMPT_PASSWORD`

You can set these environment variables in a `.env` file in the root directory of each service.
