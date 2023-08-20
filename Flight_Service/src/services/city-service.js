const { CityRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
      const city = await cityRepository.create(data);
      return city;
    } catch (error) {
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        let explanations = [];
        error.errors.forEach((err) => {
          explanations.push(err.message);
        });
        throw new AppError(explanations, StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Cannot create a new city object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanations = [];
      error.errors.forEach((err) => {
        explanations.push(err.message);
      });
      throw new AppError(explanations, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot fetch all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested city was not found !",
        error.statusCode
      );
    }
    console.log("ERROR: ", error);
    throw new AppError(
      "Cannot fetch data of city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested city to delete was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to destroy city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested city to update was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to Update city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  destroyCity
}