const { AirplaneRepository} = require("../repositories");
const airplaneRepository = new AirplaneRepository();
const AppError = require('../utils/error/app-error');
const { StatusCodes } = require('http-status-codes');

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanations = [];
            error.errors.forEach((err) => {
                explanations.push(err.message);
            })
            throw new AppError(explanations, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError(
          "Cannot fetch data of all airplanes",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirplane(id) {
    try {
      const airplane = await airplaneRepository.get(id);
      return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("Requested airplane was not found !", error.statusCode);
        }
      throw new AppError(
        "Cannot fetch data of airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function destroyAirplane(id) {
    try {
      const airplane = await airplaneRepository.destroy(id);
      return airplane;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          "Requested airplane to delete was not found !",
          error.statusCode
        );
      }
      throw new AppError(
        "Failed to destroy airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function updateAirplane(id, data) {
  try {
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Requested airplane to update was not found !",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to Update airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
    destroyAirplane,
  updateAirplane
};