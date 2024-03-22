var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


// Create a connection to the MySQL server
const connection = require('./controller/connection');

const createTableSala = `CREATE TABLE IF NOT EXISTS sala (
  id_sala VARCHAR(255) PRIMARY KEY,
  id_edificio VARCHAR(255),
  piso INT,
  capacidade INT
);`;

const createTablereserva_Sala = `CREATE TABLE IF NOT EXISTS reserva_sala (
  id_reserva INT AUTO_INCREMENT PRIMARY KEY,
  id_sala VARCHAR(255),
  data DATE,
  hora_inicio TIME,
  hora_fim TIME,
  FOREIGN KEY (id_sala) REFERENCES sala(id_sala)
);`;

connection.query(createTableSala, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Table "sala" created successfully');
  }
});

connection.query(createTablereserva_Sala, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Table "reserva_sala" created successfully');
  }
});

var salaRouter = require('./routes/sala');
// const express = require('express');
// const salaRouter = express.Router();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/salas', salaRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
