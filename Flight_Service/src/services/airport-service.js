const { AirportRepository } = require("../repositories");
const airportRepository = new AirportRepository();
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanations = [];
      error.errors.forEach((err) => {
        explanations.push(err.message);
      });
      throw new AppError(explanations, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const Airports = await airportRepository.getAll();
    return Airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all Airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const Airport = await airportRepository.get(id);
    return Airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested Airport was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const Airport = await airportRepository.destroy(id);
    return Airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested Airport to delete was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to destroy Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const Airport = await airportRepository.update(id, data);
    return Airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested Airport to update was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to Update Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
