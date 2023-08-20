const axios = require("axios");
const db = require("../models");
const { Queue, ServerConfig } = require("../config");
const { FLIGHT_SERVICE } = ServerConfig;
const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;
const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flight/${data.flightId}`
    );
    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;
    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const booking = await bookingRepository.create(bookingPayload, transaction);

    await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flight/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );

    if (bookingDetails.status == CANCELLED) {
      throw new AppError("The Booking has expired !", StatusCodes.BAD_REQUEST);
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data.bookingId);
      throw new AppError("The Booking has expired !", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new AppError(
        "The amount of the payment does not match!",
        StatusCodes.BAD_REQUEST
      );
    }
    if (bookingDetails.userId != data.userId) {
      throw new AppError(
        "The user corresponding to the payment does not match!",
        StatusCodes.BAD_REQUEST
      );
    }

    //We asssume payment is successful for now
    await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      transaction
    );
    Queue.sendData({
      recepientEmail: "aaloktanwar88@gmail.com",
      subject: "Flight Booked",
      text: `Booking was successful for booking id ${data.bookingId}`,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(bookingId, transaction);
    if (bookingDetails == CANCELLED) {
      await transaction.commit();
      return true;
    }

    await axios.patch(`${FLIGHT_SERVICE}/api/v1/flight/${bookingDetails.flightId}/seats`, {
        seats: bookingDetails.noOfSeats,
        dec: 0,
    });

    await bookingRepository.update(bookingId, { status: CANCELLED }, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelOldBookings() {
  try {
    const fiveMinuteBeforeTime = new Date(Date.now() - 1000 * 300); // time 5 min ago
    const response = await bookingRepository.cancelOldBookings(fiveMinuteBeforeTime);
    return response;
  } catch (error) {
    console.log("SERVICE ERROR - ",error);
  }
}

module.exports = {
  createBooking,
  makePayment,
  cancelOldBookings
};
