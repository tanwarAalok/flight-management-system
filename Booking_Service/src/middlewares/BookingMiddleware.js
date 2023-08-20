const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateBookingRequest(req, res, next) {
  if (!req.body.flightId) {
    ErrorResponse.error = new AppError(
      "flightId not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.noOfSeats) {
    ErrorResponse.error = new AppError(
      "noOfSeats not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.userId) {
    ErrorResponse.error = new AppError(
      "userId not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validatePaymentRequest(req, res, next) {
  if (!req.body.bookingId) {
    ErrorResponse.error = new AppError(
      "bookingId not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalCost) {
    ErrorResponse.error = new AppError(
      "totalCost not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.userId) {
    ErrorResponse.error = new AppError(
      "userId not found in the request body",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
    validatePaymentRequest,
    validateBookingRequest
}