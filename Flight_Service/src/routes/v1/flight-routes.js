const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");
const { validateUpdateSeatRequest } = require("../../middlewares/flight-middleware");
const router = express.Router();

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

router.get(
  "/",
  FlightController.getAllFlights
);

router.get('/:id', FlightController.getFlight);

router.patch('/:id/seats', validateUpdateSeatRequest, FlightController.updateSeats);


module.exports = router;
