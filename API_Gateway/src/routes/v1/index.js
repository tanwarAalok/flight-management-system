const express = require('express');

const { InfoController } = require('../../controllers');
const userRoutes = require("./user-routes");
const { AuthRequestMiddleware } = require('../../middlewares');

const router = express.Router();

router.get("/info", AuthRequestMiddleware.checkAuth, InfoController.info);

router.use("/user", userRoutes);


module.exports = router;