class Prova {
    constructor(id,data, duracao, nVersoes, aleatorio, bloquear, versoes, hora) {
      this.id = id;
      this.data = data;
      this.duracao = duracao;
      this.nVersoes = nVersoes;
      this.aleatorio = aleatorio;
      this.bloquear = bloquear;
      this.hora = hora;
      this.versoes = Array.isArray(versoes) ? versoes : [];
    }
}

module.exports = Prova;
