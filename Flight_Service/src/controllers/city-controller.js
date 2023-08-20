const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST: /city
 * req.body: {name: 'Delhi'}
 */

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
          name: req.body.name,
        });

        SuccessResponse.message = "Successfully created an city";
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /city
 * req.body: {}
 */
async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.message = "Successfully fetched all cities";
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET: /city/:id
 * req.body: {}
 */

async function getCity(req, res) {
    try {
      const city = await CityService.getCity(req.params.id);
      SuccessResponse.message = "Successfully fetched city";
      SuccessResponse.data = city;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE: /city/:id
 * req.body: {}
 */

async function destroyCity(req, res) {
    try {
      const city = await CityService.destroyCity(req.params.id);
      SuccessResponse.message = "Successfully destroyed city";
      SuccessResponse.data = city;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
}
/**
 * PATCH: /city/:id
 * req.body: {}
 */

async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.message = "Successfully updated city";
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity
};