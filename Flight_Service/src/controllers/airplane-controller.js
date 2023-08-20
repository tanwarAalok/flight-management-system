const { AirplaneService } = require("../services");
const {StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/**
 * POST: /airplane
 * req.body: {modelNumber, capacity}
 */

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        SuccessResponse.message = "Successfully created an Airplane";
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /airplane
 * req.body: {}
 */

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.message = "Successfully fetched all airplanes";
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /airplane/:id
 * req.body: {}
 */

async function getAirplane(req, res) {
    try {
      const airplane = await AirplaneService.getAirplane(req.params.id);
      SuccessResponse.message = "Successfully fetched airplane";
      SuccessResponse.data = airplane;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE: /airplane/:id
 * req.body: {}
 */

async function destroyAirplane(req, res) {
    try {
      const airplane = await AirplaneService.destroyAirplane(req.params.id);
      SuccessResponse.message = "Successfully destroyed airplane";
      SuccessResponse.data = airplane;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
}
/**
 * PATCH: /airplane/:id
 * req.body: {}
 */

async function updateAirplane(req, res) {
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id, req.body);
    SuccessResponse.message = "Successfully updated airplane";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createAirplane, getAirplanes, getAirplane, destroyAirplane, updateAirplane };