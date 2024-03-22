var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');



// Create a connection to the MySQL server
const connection = require('./controler/connection');


const createTableAluno = `
CREATE TABLE IF NOT EXISTS aluno (
  id_aluno VARCHAR(255) PRIMARY KEY
);`

connection.query(createTableAluno, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)

const createTableProva = `
CREATE TABLE IF NOT EXISTS prova (
  id_prova VARCHAR(255) PRIMARY KEY,
  nome VARCHAR(255),
  id_docente VARCHAR(255),
  data VARCHAR(255),
  duracao INT(10),
  nVersoes INT(10),
  aleatorio BOOL,
  bloquear BOOL
);`

connection.query(createTableProva, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)


const createTableAlunoProvas = `
CREATE TABLE IF NOT EXISTS alunoProva (
  id_aluno VARCHAR(255),
  id_prova VARCHAR(255),
  PRIMARY KEY (id_aluno, id_prova),
  FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
  FOREIGN KEY (id_prova) REFERENCES prova(id_prova)
);`

connection.query(createTableAlunoProvas, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)

const createTableProvaComVersao = `
CREATE TABLE IF NOT EXISTS provaComVersao (
  id_prova VARCHAR(255),
  nVersao INT(10),
  idSala VARCHAR(255),
  hora TIME(6),
  PRIMARY KEY (id_prova, nVersao),
  FOREIGN KEY (id_prova) REFERENCES prova(id_prova)
);`

connection.query(createTableProvaComVersao, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)

const createTableQuestao = `
CREATE TABLE IF NOT EXISTS questao (
  id_questao VARCHAR(255) PRIMARY KEY,
  enunciado VARCHAR(255),
  cotacao_questao FLOAT(25),
  tipoQuestao ENUM('EM', 'V/F', 'ESPACOS','DESENVOLVIMENTO'),
  nVersao INT(10),
  id_prova VARCHAR(255),
  FOREIGN KEY (id_prova, nVersao) REFERENCES provaComVersao(id_prova, nVersao)

);`
connection.query(createTableQuestao, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)
const createTableOpcao = `
CREATE TABLE IF NOT EXISTS opcao(
  idopcao VARCHAR(255) PRIMARY KEY,
  opcao VARCHAR(255),
  criterio VARCHAR(255),
  cotacao_opcao FLOAT(25),
  id_questao VARCHAR(255),
  FOREIGN KEY (id_questao) REFERENCES questao(id_questao)
);`
connection.query(createTableOpcao, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)

const createTableProvaRealizada = `
CREATE TABLE IF NOT EXISTS prova_realizada(
  id_prova_realizada VARCHAR(255) PRIMARY KEY,
  classificacao_final FLOAT(25),
  num_aluno VARCHAR(255),
  id_prova VARCHAR(255),
  FOREIGN KEY (id_prova) REFERENCES prova(id_prova),
  FOREIGN KEY (num_aluno) REFERENCES aluno(id_aluno)
);`
connection.query(createTableProvaRealizada, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)
const createTablequestaoRespondida = `
CREATE TABLE IF NOT EXISTS questao_respondida(
  id_prova_realizada VARCHAR(255) ,
  id_questao VARCHAR(255) ,
  classificacao FLOAT(25),
  PRIMARY KEY (id_prova_realizada, id_questao),
  FOREIGN KEY (id_prova_realizada) REFERENCES prova_realizada(id_prova_realizada),
  FOREIGN KEY (id_questao) REFERENCES questao(id_questao)
);`
connection.query(createTablequestaoRespondida, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)
const createTableResposta = `
CREATE TABLE IF NOT EXISTS resposta(
  id_prova_realizada VARCHAR(255) ,
  id_questao VARCHAR(255) ,
  id_opcao VARCHAR(255) ,
  resposta VARCHAR(255),
  PRIMARY KEY (id_prova_realizada, id_questao,id_opcao),
  FOREIGN KEY (id_prova_realizada) REFERENCES prova_realizada(id_prova_realizada),
  FOREIGN KEY (id_questao) REFERENCES questao(id_questao),
  FOREIGN KEY (id_opcao) REFERENCES opcao(idopcao)
);`
connection.query(createTableResposta, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully');
  }}
)




var provasRouter = require('./routes/prova');

var app = express();


app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/provas', provasRouter);


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
  res.json({erro:err});
});

module.exports = app;
