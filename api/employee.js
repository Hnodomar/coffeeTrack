const express = require('express');
const employeeRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

employeeRouter.get('/', (req, res, next) => {
    const sqlQuery = "SELECT * FROM Employee WHERE Employee.is_current_employee = 1";
    db.all(sqlQuery, (error, rows) => {
        if (error) {
            next(error);
        }
        else {
            return res.status(200).json({employees: rows});
        }
    });
});

module.exports = employeeRouter;