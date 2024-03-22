const db = require("./connection");
const Questao = require("../classes/Questao");
const Opcao = require("../classes/Opcao");
const uuid = require("uuid");

function responderProva(idProva, numAluno, respostas) {
  const idProvaRealizada = uuid.v4();

  const insertProvaRealizadaQuery = `
    INSERT INTO prova_realizada (id_prova_realizada, classificacao_final, num_aluno, id_prova)
    VALUES ('${idProvaRealizada}', NULL, '${numAluno}', '${idProva}');
  `;

  db.query(
    insertProvaRealizadaQuery,
    (errProvaRealizada, resultProvaRealizada) => {
      if (errProvaRealizada) {
        console.error(
          "Erro ao inserir na tabela prova_realizada:",
          errProvaRealizada
        );
      } else {
        respostas.forEach((resposta) => {
          const { id_questao, opcoes } = resposta;

          const insertQuestaoRespondidaQuery = `
          INSERT INTO questao_respondida (id_prova_realizada, id_questao, classificacao)
          VALUES ('${idProvaRealizada}', '${id_questao}', NULL);
        `;

          db.query(
            insertQuestaoRespondidaQuery,
            (errQuestaoRespondida, resultQuestaoRespondida) => {
              if (errQuestaoRespondida) {
                console.error(
                  "Erro ao inserir na tabela questao_respondida:",
                  errQuestaoRespondida
                );
              } else {
                opcoes.forEach((opcao) => {
                  const { id_opcao, resposta_utilizador } = opcao;

                  const insertRespostaQuery = `
                INSERT INTO resposta (id_prova_realizada, id_questao, id_opcao, resposta)
                VALUES ('${idProvaRealizada}', '${id_questao}', '${id_opcao}', '${resposta_utilizador}');
              `;

                  db.query(
                    insertRespostaQuery,
                    (errResposta, resultResposta) => {
                      if (errResposta) {
                        console.error(
                          "Erro ao inserir na tabela resposta:",
                          errResposta
                        );
                      }
                    }
                  );
                });
              }
            }
          );
        });
      }
    }
  );
}

module.exports.responderProva = responderProva;

function corrigirProva(id_prova_realizada) {
  // Query to get all questions for the given exam
  const questoesProvaQuery = `
    SELECT id_questao
    FROM questao_respondida
    WHERE id_prova_realizada = '${id_prova_realizada}';
  `;

  db.query(questoesProvaQuery, (errQuestoesProva, resultQuestoesProva) => {
    if (errQuestoesProva) {
      console.error("Error fetching questions for the exam:", errQuestoesProva);
    } else {
      resultQuestoesProva.forEach((questao) => {
        const id_questao = questao.id_questao;

        // Query to calculate the score for the current question
        const classificacaoQuestaoQuery = `
          SELECT SUM(opcao.cotacao_opcao) AS classificacao
          FROM resposta
          JOIN opcao ON resposta.id_opcao = opcao.idopcao
          WHERE resposta.id_questao = '${id_questao}' AND resposta.resposta = opcao.criterio;
        `;

        db.query(
          classificacaoQuestaoQuery,
          (errClassificacaoQuestao, resultClassificacaoQuestao) => {
            if (errClassificacaoQuestao) {
              console.error(
                "Error calculating question scores:",
                errClassificacaoQuestao
              );
            } else {
              const classificacao =
                resultClassificacaoQuestao[0].classificacao || 0;

              // Update the classification for the current question
              const updateQuestaoRespondidaQuery = `
              UPDATE questao_respondida
              SET classificacao = ${classificacao}
              WHERE id_prova_realizada = '${id_prova_realizada}' AND id_questao = '${id_questao}';
            `;
              db.query(
                updateQuestaoRespondidaQuery,
                (errUpdateQuestaoRespondida, resultUpdateQuestaoRespondida) => {
                  if (errUpdateQuestaoRespondida) {
                    console.error(
                      "Error updating questao_respondida:",
                      errUpdateQuestaoRespondida
                    );
                  } else {
                    console.log(
                      `Questao respondida ${id_questao} corrigida. Classificacao: ${classificacao}`
                    );
                  }
                }
              );
            }
          }
        );
      });

      // Now, calculate the total classification for the exam
      const classificacaoTotalQuery = `
      SELECT SUM(opcao.cotacao_opcao) AS classificacao_total
      FROM resposta
      JOIN opcao ON resposta.id_opcao = opcao.idopcao
      WHERE resposta.id_prova_realizada = '${id_prova_realizada}' AND resposta.resposta = opcao.criterio;
    `;

      db.query(
        classificacaoTotalQuery,
        (errClassificacaoTotal, resultClassificacaoTotal) => {
          if (errClassificacaoTotal) {
            console.error(
              "Error calculating total classification:",
              errClassificacaoTotal
            );
          } else {
            const classificacaoTotal =
              resultClassificacaoTotal[0].classificacao_total || 0;

            // Update the total classification for the exam
            const updateProvaRealizadaQuery = `
            UPDATE prova_realizada
            SET classificacao_final = ${classificacaoTotal}
            WHERE id_prova_realizada = '${id_prova_realizada}';
          `;
            db.query(
              updateProvaRealizadaQuery,
              (errUpdateProvaRealizada, resultUpdateProvaRealizada) => {
                if (errUpdateProvaRealizada) {
                  console.error(
                    "Error updating prova_realizada:",
                    errUpdateProvaRealizada
                  );
                } else {
                  console.log(
                    `Prova realizada ${id_prova_realizada} corrigida. Classificacao final: ${classificacaoTotal}`
                  );
                }
              }
            );
          }
        }
      );
    }
  });
}

module.exports.corrigirProva = corrigirProva;

async function corrigirProvaPorIdProva(id_docente) {
  // Query to get all exams taken for the given exam
  const provasRealizadasQuery = `
    SELECT id_prova_realizada
    FROM prova_realizada pr
    JOIN prova p ON pr.id_prova = p.id_prova
    WHERE p.id_docente = '${id_docente}';
  `;

  db.query(
    provasRealizadasQuery,
    (errProvasRealizadas, resultProvasRealizadas) => {
      if (errProvasRealizadas) {
        console.error(
          "Error fetching exams taken for the exam:",
          errProvasRealizadas
        );
      } else {
        resultProvasRealizadas.forEach((provaRealizada) => {
          const id_prova_realizada = provaRealizada.id_prova_realizada;

          // Call the original function to correct each exam taken
          corrigirProva(id_prova_realizada);
        });
      }
    }
  );
}

module.exports.corrigirProvaPorIdProva = corrigirProvaPorIdProva;

function deleteQuestao(idQuestao, callback) {
  const opcaoDeleteQuery = `DELETE FROM opcao WHERE id_questao = '${idQuestao}';`;

  db.query(opcaoDeleteQuery, (errOpcao, resultOpcao) => {
    if (errOpcao) {
      console.error("Error deleting opcoes:", errOpcao);
      callback(errOpcao, null);
    } else {
      const questaoDeleteQuery = `DELETE FROM questao WHERE id_questao = '${idQuestao}';`;

      db.query(questaoDeleteQuery, (errQuestao, resultQuestao) => {
        if (errQuestao) {
          console.error("Error deleting questao:", errQuestao);
          callback(errQuestao, null);
        } else {
          callback(null, resultQuestao);
        }
      });
    }
  });
}

function deleteProvaComVersao(idProva, versao, callback) {
  const questoesSelectQuery = `
    SELECT id_questao FROM questao 
    WHERE id_prova = '${idProva}' AND nVersao = ${versao};
  `;

  db.query(questoesSelectQuery, (errQuestoes, resultQuestoes) => {
    if (errQuestoes) {
      console.error("Error retrieving questao IDs:", errQuestoes);
      callback(errQuestoes, null);
    } else {
      const questoesIds = resultQuestoes.map((questao) => questao.id_questao);

      questoesIds.forEach((idQuestao) => {
        deleteQuestao(idQuestao, () => {});
      });

      const decrementVersoesQuery = `
        UPDATE prova SET nVersoes = nVersoes - 1 WHERE id_prova = '${idProva}';
      `;

      db.query(decrementVersoesQuery, (errDecrement, resultDecrement) => {
        if (errDecrement) {
          console.error(
            "Error decrementing the number of versions:",
            errDecrement
          );
          callback(errDecrement, null);
        } else {
          const provaComVersaoDeleteQuery = `
            DELETE FROM provaComVersao WHERE id_prova = '${idProva}' AND nVersao = ${versao};
          `;

          db.query(provaComVersaoDeleteQuery, (errDelete, resultDelete) => {
            if (errDelete) {
              console.error("Error deleting provaComVersao:", errDelete);
              callback(errDelete, null);
            } else {
              callback(null, resultDelete);
            }
          });
        }
      });
    }
  });
}

module.exports.deleteOpcao = (idOpcao, callback) => {
  const opcaoSelectQuery = `SELECT * FROM opcao WHERE idopcao = '${idOpcao}';`;

  db.query(opcaoSelectQuery, (errSelect, resultSelect) => {
    if (errSelect) {
      console.error("Error checking opcao existence:", errSelect);
      callback(errSelect, null);
    } else {
      if (resultSelect.length === 0) {
        callback(null, { status: "Opcao not found" });
      } else {
        const opcaoDeleteQuery = `DELETE FROM opcao WHERE idopcao = '${idOpcao}';`;

        db.query(opcaoDeleteQuery, [idOpcao], (errDelete, resultDelete) => {
          if (errDelete) {
            console.error("Error deleting opcao:", errDelete);
            callback(errDelete, null);
          } else {
            callback(null, { status: "Opcao deleted successfully" });
          }
        });
      }
    }
  });
};

module.exports.deleteQuestao = deleteQuestao;

module.exports.deleteProvaComVersao = deleteProvaComVersao;

module.exports.deleteProva = (idProva, callback) => {
  const versoesSelectQuery = `
    SELECT nVersao FROM provaComVersao 
    WHERE id_prova = '${idProva}';
  `;

  db.query(versoesSelectQuery, (errVersoes, resultVersoes) => {
    if (errVersoes) {
      console.error("Error retrieving prova versions:", errVersoes);
      callback(errVersoes, null);
    } else {
      const versoes = resultVersoes.map((versao) => versao.nVersao);

      const deleteNextVersion = (index) => {
        if (index < versoes.length) {
          deleteProvaComVersao(idProva, versoes[index], (err, result) => {
            if (err) {
              console.error("Error deleting version:", err);
              callback(err, null);
            } else {
              deleteNextVersion(index + 1);
            }
          });
        } else {
          const provaDeleteQuery = `DELETE FROM prova WHERE id_prova = '${idProva}';`;

          db.query(provaDeleteQuery, (errDeleteProva, resultDeleteProva) => {
            if (errDeleteProva) {
              console.error("Error deleting prova:", errDeleteProva);
              callback(errDeleteProva, null);
            } else {
              callback(null, resultDeleteProva);
            }
          });
        }
      };

      deleteNextVersion(0);
    }
  });
};

module.exports.getAllProvas = (id, callback) => {
  const query = `SELECT * FROM prova WHERE id_docente='${id}';`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      const provas = results.map((result) => ({
        id_prova: result.id_prova,
        nome: result.nome,
        id_docente: result.id_docente,
        data: result.data,
        duracao: result.duracao,
        nVersoes: result.nVersoes,
        aleatorio: result.aleatorio,
        bloquear: result.bloquear,
      }));
      callback(null, provas);
    }
  });
};

module.exports.getProvaById = (id, callback) => {
  const query = `
    SELECT p.*, v.*
    FROM prova p
    LEFT JOIN provaComVersao v ON p.id_prova = v.id_prova
    WHERE p.id_prova = '${id}';
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      const provaInfo = {
        id_prova: results[0].id_prova,
        data: results[0].data,
        duracao: results[0].duracao,
        nVersoes: results[0].nVersoes,
        aleatorio: results[0].aleatorio,
        bloquear: results[0].bloquear,
        versoes: results.map((result) => ({
          nVersao: result.nVersao,
          idSala: result.idSala,
          hora: result.hora,
        })),
      };

      callback(null, provaInfo);
    }
  });
};

module.exports.getVersoesProvaById = (id, callback) => {
  const query = `SELECT * FROM provaComVersao WHERE id_prova = '${id}';`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getProvaRealizada = (id_prova_realizada, callback) => {
  const query = `
    SELECT
      pr.classificacao_final,
      qr.id_questao,
      q.enunciado AS enunciado_questao,
      q.cotacao_questao,
      qr.classificacao AS classificacao_questao,
      o.opcao AS opcao_respondida,
      r.resposta
    FROM prova_realizada pr
    LEFT JOIN questao_respondida qr ON pr.id_prova_realizada = qr.id_prova_realizada
    LEFT JOIN questao q ON qr.id_questao = q.id_questao
    LEFT JOIN resposta r ON qr.id_prova_realizada = r.id_prova_realizada AND qr.id_questao = r.id_questao
    LEFT JOIN opcao o ON r.id_opcao = o.idopcao
    WHERE pr.id_prova_realizada = '${id_prova_realizada}';
  `;

  db.query(query, [id_prova_realizada], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      // Transforming SQL results into the desired JSON format
      const jsonResult = {
        classificacao_final: results[0].classificacao_final,
        questoes: [],
      };

      // Grouping results by questao id
      results.reduce((acc, row) => {
        //console.log(acc)
        //console.log(row)
        if (!acc[row.id_questao]) {
          acc[row.id_questao] = {
            enunciado: row.enunciado_questao,
            cotacao: row.cotacao_questao,
            classificacao: row.classificacao_questao,
            opcoes: [],
          };
          jsonResult.questoes.push(acc[row.id_questao]);
        }

        if (row.opcao_respondida !== null) {
          acc[row.id_questao].opcoes.push({
            opcao: row.opcao_respondida,
            resposta: row.resposta,
          });
        }
        return acc;
      }, {});

      callback(null, jsonResult);
    }
  });
};

module.exports.getProvaByIdVersao = (id, versao, callback) => {
  const query = `SELECT * FROM provaComVersao WHERE id_prova = '${id}' AND nVersao = '${versao}';`;
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getQuestoes = (id, versao, callback) => {
  const query = `
      SELECT q.*, o.*
      FROM questao q
      LEFT JOIN opcao o ON q.id_questao = o.id_questao
      WHERE q.id_prova = '${id}' AND q.nVersao = '${versao}';`;

  db.query(query, [id, versao], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const questoesMap = new Map();

      results.forEach((questaoData) => {
        const questaoId = questaoData.id_questao;

        if (!questoesMap.has(questaoId)) {
          const questao = new Questao(
            questaoData.id_questao,
            questaoData.enunciado,
            questaoData.cotacao_questao,
            questaoData.tipoQuestao,
            questaoData.nVersao,
            questaoData.id_prova,
            []
          );

          questoesMap.set(questaoId, questao);
        }
        const opcao = new Opcao(
          questaoData.idopcao,
          questaoData.opcao,
          questaoData.criterio,
          questaoData.cotacao_opcao,
          questaoData.id_questao
        );

        questoesMap.get(questaoId).opcoes.push(opcao);
      });

      const questoes = Array.from(questoesMap.values());
      callback(null, questoes);
    }
  });
};

module.exports.getQuestaoById = (idProva, versao, idQuestao, callback) => {
  const query = `
    SELECT q.*, o.*
    FROM questao q
    LEFT JOIN opcao o ON q.id_questao = o.id_questao
    WHERE q.id_prova = '${idProva}' AND q.nVersao = '${versao}' AND q.id_questao = '${idQuestao}';
  `;

  db.query(query, [idProva, versao, idQuestao], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const questaoMap = new Map();

      results.forEach((questaoData) => {
        const questaoId = questaoData.id_questao;

        if (!questaoMap.has(questaoId)) {
          const questao = new Questao(
            questaoData.id_questao,
            questaoData.enunciado,
            questaoData.cotacao,
            questaoData.tipoQuestao,
            questaoData.versao,
            questaoData.id_prova
          );

          questaoMap.set(questaoId, questao);
        }

        const opcao = new Opcao(
          questaoData.idopcao,
          questaoData.opcao,
          questaoData.criterio,
          questaoData.cotacao,
          questaoData.id_questao
        );

        questaoMap.get(questaoId).opcoes.push(opcao);
      });

      const questao = Array.from(questaoMap.values())[0]; // Obtenha a primeira (e única) questão
      callback(null, questao);
    }
  });
};

function addOpcao(opcaoData, id_questao) {
  try {
    const { id_opcao, opcao, criterio, cotacao } = opcaoData;

    // Insert opcao into the database
    const opcaoInsertQuery = "INSERT INTO opcao VALUES (?, ?, ?, ?, ?);";
    const opcaoValues = [id_opcao, opcao, criterio, cotacao, id_questao];

    db.query(opcaoInsertQuery, opcaoValues, (err, result) => {
      if (err) {
        console.error("Error inserting opcao:", err);
      }
    });
  } catch (error) {
    console.error("An error occurred in addOpcao:", error);
  }
}
module.exports.addOpcao_post = addOpcao;

function addQuestao(questaoData, id_prova, nVersao) {
  try {
    const { id_questao, enunciado, cotacao, tipoQuestao, opcoes } = questaoData;

    if (!nVersao) {
      nVersao = questaoData.nVersao;
    }

    // Insert questao into the database
    const questaoInsertQuery = "INSERT INTO questao VALUES (?, ?, ?, ?, ?,?);";
    const questaoValues = [
      id_questao,
      enunciado,
      cotacao,
      tipoQuestao,
      nVersao,
      id_prova,
    ];

    db.query(questaoInsertQuery, questaoValues, (err, result) => {
      if (err) {
        console.error("Error inserting questao:", err);
        return;
      }

      // Insert associated opcoes
      opcoes.forEach((opcaoData) => {
        addOpcao(opcaoData, id_questao);
      });
    });
  } catch (error) {
    console.error("An error occurred in addQuestao:", error);
  }
}
module.exports.addQuestao_post = addQuestao;

function addVersao(id_prova, idSala, nVersao, hora) {
  if (!nVersao) {
    nVersao = versaoData.nVersao;
  }

  const versaoInsertQuery = "INSERT INTO provaComVersao VALUES (?, ?, ?,?);";
  const versaoValues = [id_prova, nVersao, idSala, hora];

  db.query(versaoInsertQuery, versaoValues, (err, result) => {
    if (err) {
      console.error("Error inserting provaComVersao:", err);
      return;
    }
  });
}
module.exports.addVersao_post = addVersao;

function addAlunoProva(prova, aluno) {
  try {
    const checkAlunoQuery = "SELECT * FROM aluno WHERE id_aluno = ?;";
    const checkAlunoValues = [aluno];
    db.query(checkAlunoQuery, checkAlunoValues, (err, results) => {
      if (err) {
        console.error("Error checking aluno:", err);
        return;
      }
      // If aluno doesn't exist, add them to the database
      if (results.length === 0) {
        const addAlunoQuery = "INSERT INTO aluno VALUES (?);";
        const addAlunoValues = [aluno];

        db.query(addAlunoQuery, addAlunoValues, (err, result) => {
          if (err) {
            console.error("Error adding aluno:", err);
            return;
          }
        });
      }
      const APInsertQuery = "INSERT INTO alunoProva VALUES (?, ?);";
      const APValues = [aluno, prova];

      db.query(APInsertQuery, APValues, (err, result) => {
        if (err) {
          console.error("Error inserting alunoProva:", err);
        }
      });
    });
    // Insert opcao into the database
  } catch (error) {
    console.error("An error occurred in AddalunoProva:", error);
  }
}

module.exports.addProva = (provaData) => {
  const {
    id_prova,
    nome,
    id_docente,
    data,
    duracao,
    hora,
    aleatorio,
    bloquear,
    alunos,
    salas,
  } = provaData;

  // Insert prova into the database

  nVersoes = salas.length;

  const provaInsertQuery = "INSERT INTO prova VALUES (?,?, ?,?, ?, ?, ?, ?);";
  const provaValues = [
    id_prova,
    nome,
    id_docente,
    data,
    duracao,
    nVersoes,
    aleatorio,
    bloquear,
  ];

  db.query(provaInsertQuery, provaValues, (err, result) => {
    if (err) {
      console.error("Error inserting prova:", err);
      return;
    }
    alunos.forEach((aluno) => {
      addAlunoProva(id_prova, aluno);
    });

    // Insert associated provasComVersao, questoes, and opcoes
    var i = 1;
    salas.forEach((sala) => {
      addVersao(id_prova, sala, i++, hora);
    });
  });
};

module.exports.getProvasAluno = (id_aluno, callback) => {
  const query = `
      SELECT
        p.id_prova AS id_prova,
        pr.id_prova_realizada AS id_prova_realizada,
        p.nome AS nome,
        p.data,
        CASE
            WHEN pr.classificacao_final IS NOT NULL THEN 'CORRIGIDA'
            WHEN pr.id_prova_realizada IS NOT NULL AND pr.classificacao_final IS NULL THEN 'REALIZADA'
            WHEN STR_TO_DATE(p.data, '%Y-%m-%d') > CURDATE() THEN 'POR REALIZAR'
            WHEN STR_TO_DATE(p.data, '%Y-%m-%d') = CURDATE() THEN 'REALIZAR'
            ELSE 'NULL'
        END AS estado
      FROM
        prova p
      JOIN
        alunoProva ap ON p.id_prova = ap.id_prova
      LEFT JOIN
        prova_realizada pr ON p.id_prova = pr.id_prova AND ap.id_aluno = pr.num_aluno
      WHERE
        ap.id_aluno = '${id_aluno}';
  `;
  db.query(query, [id_aluno], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
