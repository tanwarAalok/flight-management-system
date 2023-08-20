const { EmailService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const {StatusCodes} = require("http-status-codes");

async function create(req, res) {
    try {
        const data = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.data = data;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    create
}