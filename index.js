const mysql = require('mysql');
const express = require('express');
var app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'employeedb' 
    }
);
mysqlConnection.connect((err) => {
    if(!err) {
        console.log('DB connected successfully...');
    } else {
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});

app.listen(3000, ()=> {
    console.log('Express server running at 3000');
});

//Get all employees from DB
app.get('/employees', (req, res)=> {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if(!err) {
            // console.log(rows[0].EmpId);
            // res.end("Rows fetched");
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Get one employee from DB
app.get('/employees/:id', (req, res)=> {
    mysqlConnection.query('SELECT * FROM employee where EmpId = ?', [req.params.id], (err, rows, fields) => {
        if(!err) {
            // console.log(rows[0].EmpId);
            // res.end("Rows fetched");
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Delete one employee from DB
app.delete('/employees/:id', (req, res)=> {
mysqlConnection.query('DELETE FROM employee WHERE EmpId = ?', [req.params.id], (err, rows, fields) => {
        if(!err) {
            // console.log(rows[0].EmpId);
            // res.end("Rows fetched");
            res.send('Employee Deleted');
        } else {
            console.log(err);
        }
    })
});

//Insert an employee to DB
app.post('/employees', (req, res)=> {
    let emp = req.body;
    var q = 'INSERT INTO employee values(?, ?, ?, ?)';
    mysqlConnection.query(q, [emp.EmpId, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if(!err) {
            // console.log(rows[0].EmpId);
            // res.end("Rows fetched");
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Update an employee to DB
app.put('/employees', (req, res)=> {
    let emp = req.body;
    var q = 'UPDATE employee set Name = ?, EmpCode = ?, Salary = ? WHERE EmpId = ?';
    mysqlConnection.query(q, [emp.Name, emp.EmpCode, emp.Salary, emp.EmpId], (err, rows, fields) => {
        if(!err) {
            // console.log(rows[0].EmpId);
            // res.end("Rows fetched");
            res.send("Updated Successfully");
        } else {
            console.log(err);
        }
    })
});