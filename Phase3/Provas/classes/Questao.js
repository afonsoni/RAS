class Questao {
    constructor(id, enunciado,cotacao, tipoQuestao, versao, opcoes) {
      this.id = id;
      this.enunciado = enunciado;
      this.cotacao_questao = cotacao;
      this.tipoQuestao = tipoQuestao;
      this.versao = versao;
      this.opcoes = Array.isArray(opcoes) ? opcoes : [];
    }
}

module.exports = Questao;
