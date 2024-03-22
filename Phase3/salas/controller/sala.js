const db = require('./connection');
const Sala = require('../classes/Sala');
const ReservedSala = require('../classes/ReservedSala');
const uuid = require('uuid'); 

module.exports.getAllSalas = (callback) => {
  const query = 'SELECT * FROM sala';
  db.query(query, (err, results) => {
    console.log(results)
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};



module.exports.getAllReservas = (callback) => {
  const query = 'SELECT * FROM reserva_sala';
  db.query(query, (err, results) => {
    console.log(results)
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


function deleteSala(idSala, callback) {
    console.log("ola22")
    const salaDeleteQuery = `DELETE FROM sala WHERE id_Sala = '${idSala}';`;

        db.query(salaDeleteQuery, (errSala, resultSala) => {
          if (errSala) {
            console.error('Error deleting sala:', errSala);
            callback(errSala, null);
          } else {
            callback(null, resultSala);
          }
        });
  }

module.exports.deleteSala = deleteSala;

function deleteReservedSala(id_reserva, callback) {
    const deleteReservedSalaQuery = `DELETE FROM reserva_sala WHERE id_reserva = ${id_reserva};`;
  
    db.query(deleteReservedSalaQuery, (err, result) => {
      if (err) {
        console.error('Error deleting reserved sala:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

module.exports.deleteReservedSala = deleteReservedSala;



// Versão para considerar horas e estas têm de estar compreendidas entre as 8 e as 20
function addReservedSala(id_sala, data, hora_inicio, hora_fim, callback) {
  // Check if the reservation time is between 8 AM and 8 PM
  const reservationStartTime = new Date(`2023-01-01 ${hora_inicio}`);
  const reservationEndTime = new Date(`2023-01-01 ${hora_fim}`);
  const startHour = reservationStartTime.getHours();
  const endHour = reservationEndTime.getHours();

  if (startHour < 8 || endHour > 20) {
    const errorMessage = 'Reservations can only be made between 8 AM and 8 PM';
    console.error(errorMessage);
    callback({ message: errorMessage }, null);
    return;
  }

  // Check if a reservation already exists for the specified sala, date, and overlapping time
  const checkReservationQuery = `
    SELECT * FROM reserva_sala
    WHERE id_sala = '${id_sala}'
      AND data = '${data}'
      AND (
        ('${hora_inicio}' BETWEEN hora_inicio AND hora_fim)
        OR ('${hora_fim}' BETWEEN hora_inicio AND hora_fim)
      );
  `;

  db.query(checkReservationQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking existing reservation:', checkErr);
      callback(checkErr, null);
    } else if (checkResult.length > 0) {
      // If there's an existing reservation, return an error
      const errorMessage = 'Sala already reserved for the specified date and time';
      console.error(errorMessage);
      callback({ message: errorMessage }, null);
    } else {
      // If no existing reservation and within valid time, proceed with adding the new reservation
      const addReservedSalaQuery = `
        INSERT INTO reserva_sala (id_sala, data, hora_inicio, hora_fim)
        VALUES ('${id_sala}', '${data}', '${hora_inicio}', '${hora_fim}');
      `;

      db.query(addReservedSalaQuery, (err, result) => {
        if (err) {
          console.error('Error adding reserved sala:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

module.exports.addReservedSala = addReservedSala;


function addSala(idEdificio, piso, capacidade) {
  const idSala = uuid.v4();
  const salaInsertQuery = 'INSERT INTO sala VALUES (?, ?, ?, ?);';
  const salaValues = [idSala, idEdificio, piso, capacidade];

  db.query(salaInsertQuery, salaValues, (err, result) => {
    if (err) {
      console.error('Error inserting sala:', err);
      // Handle the error appropriately (e.g., return an error response)
      return;
    }

    // Handle the successful insertion (if needed)
    console.log('Sala inserted successfully');
  });
}

module.exports.addSala = addSala;



// Retorna as salas disponiveis e as suas respetivas capacidades para determinado horario e data
function verificarSalasDisponiveis(data, horaInicio, duracao, callback) {
  const horaFim = calcularHoraFim(horaInicio, duracao);

  const salasDisponiveisQuery = `
    SELECT sala.id_sala, sala.capacidade
    FROM sala
    LEFT JOIN reserva_sala ON sala.id_sala = reserva_sala.id_sala
    WHERE sala.id_sala NOT IN (
      SELECT id_sala
      FROM reserva_sala
      WHERE data = '${data}'
        AND (
          ('${horaInicio}' BETWEEN hora_inicio AND hora_fim)
          OR ('${horaFim}' BETWEEN hora_inicio AND hora_fim)
        )
    )
    GROUP BY sala.id_sala;
  `;

  db.query(salasDisponiveisQuery, (err, result) => {
    if (err) {
      console.error('Error checking available rooms:', err);
      callback(err, null);
    } else {
      const salasDisponiveis = result.map(row => ({ id_sala: row.id_sala, capacidade: row.capacidade }));
      console.log('Available rooms:', salasDisponiveis);
      callback(null, salasDisponiveis);
    }
  });
}

function calcularHoraFim(horaInicio, duracao) {
  const inicio = new Date(`2023-01-01 ${horaInicio}`);
  const fim = new Date(inicio.getTime() + duracao * 60000);
  const horaFim = fim.toTimeString().slice(0, 5); // Extrai HH:mm
  return horaFim;
}

module.exports.verificarSalasDisponiveis = verificarSalasDisponiveis;



// Retorna um array com o id_sala a reservar e a respetiva capacidade para o numero de alunos solicitado
function findAvailableSalasParaAlunos(alunosTotais, data, horaInicio, duracao, callback) {
  const horaFim = calcularHoraFim(horaInicio, duracao);

  const salasDisponiveisQuery = `
    SELECT id_sala, capacidade
    FROM sala
    WHERE id_sala NOT IN (
      SELECT id_sala
      FROM reserva_sala
      WHERE data = '${data}'
        AND (
          ('${horaInicio}' BETWEEN hora_inicio AND hora_fim)
          OR ('${horaFim}' BETWEEN hora_inicio AND hora_fim)
        )
    )
    ORDER BY capacidade DESC;
  `;

  db.query(salasDisponiveisQuery, (err, result) => {
    if (err) {
      console.error('Error checking available rooms:', err);
      callback(err, null);
    } else {
      const salasDisponiveis = result;
      const selectedSalas = [];
      let alunosRestantes = alunosTotais;

      // Iterativamente seleciona salas até que todos os alunos sejam acomodados
      for (const sala of salasDisponiveis) {
        const capacidadeSala = sala.capacidade;

        if (capacidadeSala >= alunosRestantes) {
          // A sala tem capacidade suficiente para todos os alunos restantes
          selectedSalas.push(sala.id_sala);
          alunosRestantes = 0;
        } else {
          // A sala tem capacidade menor do que os alunos restantes
          selectedSalas.push(sala.id_sala);
          alunosRestantes -= capacidadeSala;
        }

        // Se todos os alunos foram acomodados, encerra o loop
        if (alunosRestantes <= 0) {
          break;
        }
      }

      // Se ainda restarem alunos, não há salas suficientes disponíveis
      if (alunosRestantes > 0) {
        const errorMessage = 'Não há salas disponíveis com capacidade suficiente.';
        console.error(errorMessage);
        callback({ message: errorMessage }, null);
      } else {
        console.log('Selected rooms:', selectedSalas);
        callback(null, selectedSalas);
      }
    }
  });
}

function calcularHoraFim(horaInicio, duracao) {
  const inicio = new Date(`2023-01-01 ${horaInicio}`);
  const fim = new Date(inicio.getTime() + duracao * 60000);
  const horaFim = fim.toTimeString().slice(0, 5); // Extrai HH:mm
  return horaFim;
}


module.exports.findAvailableSalasParaAlunos = findAvailableSalasParaAlunos;
