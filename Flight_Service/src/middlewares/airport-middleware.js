const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name || !req.body.code || !req.body.cityId) {
    responseErrors = [];

    if (!req.body.name) {
      responseErrors.push("Airport name not found in the request body");
    }
    if (!req.body.code) {
      responseErrors.push("Airport code not found in the request body");
    }
    if (!req.body.cityId) {
      responseErrors.push("Airport cityId not found in the request body");
    }

    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(responseErrors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body.address) {
    ErrorResponse.message = "Something went wrong while updating airport";
    ErrorResponse.error = new AppError(
      "Couldn't find valid field to update in request body !",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateCreateRequest, validateUpdateRequest };
