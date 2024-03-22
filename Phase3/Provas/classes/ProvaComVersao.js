class ProvaComVersao {
    constructor(versao, hora, idSala,questoes) {
      this.versao = versao;
      this.hora = hora;
      this.idSala = idSala;
      this.questoes = questoes || [];
    }
}

module.exports = ProvaComVersao;
