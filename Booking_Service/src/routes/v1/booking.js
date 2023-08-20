const express = require('express');
const router = express.Router();
const {BookingMiddleware} = require('../../middlewares')

const {BookingController} = require("../../controllers")

router.post("/",BookingMiddleware.validateBookingRequest, BookingController.createBooking);

router.post('/payment',BookingMiddleware.validatePaymentRequest, BookingController.makePayment);

module.exports = router;