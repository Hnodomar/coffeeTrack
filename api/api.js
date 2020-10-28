const express = require('express');

const employeeRouter = require('./employee.js');
const apiRouter = express.Router();

apiRouter.use('/employees', employeeRouter);

module.exports = apiRouter;