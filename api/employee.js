const express = require('express');
const employeeRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


employeeRouter.param('employeeId', (req, res, next, employeeId) => {
    const sqlQuery = `SELECT * FROM Employee WHERE Employee.id = ${employeeId}`;
    db.get(sqlQuery, (error, row) => {
        if (error) {
            next(error);
        }
        else if (row) {
            req.employee = row;
            next();
        }
        else {
            res.status(404).send();
        }
    })
});

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

employeeRouter.post('/', (req, res, next) => {
    const reqbody = req.body.employee;
    const isCurrentEmployee = reqbody.isCurrentEmployee === 0 ? 0 : 1;
    if (!reqbody.name || !reqbody.position || !reqbody.wage) {
        return res.status(400).send();
    }
    const sqlQuery = "INSERT INTO Employee (name, position, wage, is_current_employee) VALUES ($name, $position, $wage, $is_current_employee)";
    const params = {
        $name: reqbody.name,
        $position: reqbody.position,
        $wage: reqbody.wage,
        $is_current_employee: isCurrentEmployee,
    };
    db.run(sqlQuery, params, function(error) {
        if (error) {
            next(error);
        }
        else {
            const sqlQuery = `SELECT * FROM Employee WHERE Employee.id = ${this.lastID}`
            db.get(sqlQuery, (error, row) => {
                if (error) {
                    next(error);
                }
                else {
                    res.status(201).json({employee: row});
                }
            });
        }
    });
});

employeeRouter.get('/:employeeId', (req, res, next) => {
    res.status(200).json({employee: req.employee});
});

employeeRouter.put('/:employeeId', (req, res, next) => {
    const reqbody = req.body.employee;
    const isCurrentEmployee = reqbody.isCurrentEmployee === 0 ? 0 : 1;
    if (!reqbody.name || !reqbody.position || !reqbody.wage) {
        return res.status(400).send();
    }
    const sqlQuery = "UPDATE Employee SET name = $name, position = $position, wage = $wage, is_current_employee = $is_current_employee WHERE id = $id";
    const params = {
        $id: req.params.employeeId,
        $name: reqbody.name,
        $position: reqbody.position,
        $wage: reqbody.wage,
        $is_current_employee: isCurrentEmployee,
    };
    db.run(sqlQuery, params, function(error) {
        if (error) {
            next(error);
        }
        else {
            const sqlQuery = `SELECT * FROM Employee WHERE Employee.id = ${req.params.employeeId}`;
            db.get(sqlQuery, (error, row) => {
                if (error) {
                    next(error);
                }
                res.status(200).json({employee: row});
            });
        }
    });
});

employeeRouter.delete('/:employeeId', (req, res, next) => {
    const sqlQuery = `UPDATE Employee SET is_current_employee = 0 WHERE Employee.id = ${req.params.employeeId}`;
    db.run(sqlQuery, (error) => {
        if (error) {
            next(error);
        }
        else {
            db.get(`SELECT * FROM Employee WHERE Employee.id = ${req.params.employeeId}`,
                (error, employee) => {
                    res.status(200).json({employee: employee});
            });
        }
    });
});

module.exports = employeeRouter;