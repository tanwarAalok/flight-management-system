const CrudRepository = require("./crud-repository");
const { Booking } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async create(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }

  async get(data, transaction) {
    const response = await Booking.findByPk(data, {
      transaction: transaction,
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async update(id, data, transaction) {
    const responseId = await Booking.findByPk(id, {
      transaction: transaction,
    });
    if (!responseId) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    const response = await Booking.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );
    return response;
  }

  async cancelOldBookings(timeStamp) {
    try {
      const response = await Booking.update(
        { status: CANCELLED },
        {
          where: {
            [Op.and]: [
              {
                createdAt: {
                  [Op.lt]: timeStamp
                }
              },
              {
                status: {
                  [Op.ne]: BOOKED
                }
              },
              {
                status: {
                  [Op.ne]: CANCELLED
                }
              }
            ]
          }
        }
      );

      return response;
    }
    catch (error) {
      console.log("REPO ERROR: ", error);
    }
  }
}

module.exports = BookingRepository;
