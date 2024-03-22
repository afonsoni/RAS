var express = require('express');
var router = express.Router();
var Sala = require('../controller/sala')

/* GET home page. */
router.get('/', function (req, res, next) {
    Sala.getAllSalas((err, result) => {
      if (err) {
        res.status(601).json({ message: "Erro a obter lista de salas.", error: err });
      } else {
        res.json(result);
      }
    });
  });

// Get all Reservas  
router.get('/reservas', function (req, res, next) {
    Sala.getAllReservas((err, result) => {
      if (err) {
        res.status(601).json({ message: "Erro a obter lista de reservas.", error: err });
      } else {
        res.json(result);
      }
    });
  });


// Deletar Sala
router.delete('/deleteSala/:idSala', function (req, res, next) {
  Sala.deleteSala(req.params.idSala, (err, result) => {
  
      if (err) {
        res.status(500).json({ message: "Erro ao excluir a sala.", error: err });
      } else {
        res.json({ message: "Sala excluída com sucesso", result: result });
      }
    });
  });


// Deletar reserva
router.delete('/deleteReserva/:idReserva', function (req, res, next) {
  Sala.deleteReservedSala(req.params.idReserva, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Erro ao excluir a reserva.", error: err });
    } else {
      res.json({ message: "Reserva excluída com sucesso", result: result });
    }
  });
});
  
// Adicionar Sala
router.post('/inserirSalas/:idEdificio/:piso/:capacidade', async (req, res) => {
  try {
    const {idEdificio, piso, capacidade } = req.params;

    Sala.addSala(idEdificio, piso, capacidade);

    res.json({ message: 'Sala adicionada com sucesso' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erro ao adicionar a sala' });
  }
});

// Adicionar reservas
router.post('/inserirReservas/:idSala/:data/:hora_inicio/:hora_fim', async (req, res) => {
  try {
    const { idSala, data, hora_inicio, hora_fim } = req.params;

    // Call the static method to add ReservedSala to the database
    Sala.addReservedSala(idSala, data, hora_inicio, hora_fim, (err, result) => {
      if (err) {
        if (err.message === 'Sala already reserved for the specified date') {
          res.status(400).json({ message: 'Sala already reserved for the specified date' });
        } else {
          console.error('Error:', err);
          res.status(500).json({ message: 'Erro ao adicionar a reserva' });
        }
      } else {
        res.json({ message: 'Reserva adicionada com sucesso' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erro ao adicionar a reserva' });
  }
});


// Dá a combinação de salas disponiveis para um determinado número de alunos numa determinada data num determinado horário
router.get('/disponiveisPAlunos/:alunosTotais/:data/:horaInicio/:duracao', (req, res) => {
  const { alunosTotais, data, horaInicio, duracao } = req.params;

  Sala.findAvailableSalasParaAlunos(alunosTotais, data, horaInicio, duracao, (err, salasDisponiveis) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter salas disponíveis para alunos.', error: err });
    }

    res.json({ salasDisponiveis });
  });
});

// Fornece todas as salas disponiveis para uma determinada data e um determinado horário e as respetivas capacidades
router.get('/disponiveis/:data/:horaInicio/:duracao', (req, res) => {
  const { data, horaInicio, duracao } = req.params;

  Sala.verificarSalasDisponiveis(data, horaInicio, duracao, (err, salasDisponiveis) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter salas disponíveis.', error: err });
    }

    res.json({ salasDisponiveis });
  });
});

module.exports = router;





