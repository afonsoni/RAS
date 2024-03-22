class ReservedSala {
    constructor(id_reserva, id_sala, data, hora_inicio, hora_fim) {
      this.id_reserva = id_reserva;
      this.id_sala = id_sala;
      this.data = data;
      this.hora_inicio = hora_inicio;
      this.hora_fim = hora_fim
    }
}

module.exports = ReservedSala;