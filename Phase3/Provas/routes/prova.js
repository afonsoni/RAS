var express = require('express');
var router = express.Router();
var Prova = require('../controler/prova')



router.get('/aluno/:id',function (req, res, next) {
  Prova.getProvasAluno(req.params.id, (err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter a questão", error: err });
    } else {
      res.json(provaData);
    }
  });
});
router.put('/:id/corrigir', async (req, res) => {
  try {
    Prova.corrigirProva(req.params.id);

    res.json({ message: 'Prova corrigida com sucesso' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erro ao corrigir a prova' });
  }
});

router.put('/:id/corrigir_todas', async (req, res) => {
  try {
    Prova.corrigirProvaPorIdProva(req.params.id);

    res.json({ message: 'Prova corrigida com sucesso' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erro ao corrigir a prova' });
  }
});


router.post('/:id/responder', async (req, res) => {
  const { id } = req.params;
  const { numAluno, respostas } = req.body;

  try {
    // Chama a função responderProva do controlador
    Prova.responderProva(id, numAluno, respostas);

    res.json({ message: 'Resposta da prova registrada com sucesso' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao processar a resposta da prova' });
  }
})


router.get('/:id/prova_realizada', function (req, res, next) {
  Prova.getProvaRealizada(req.params.id, (err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter a questão", error: err });
    } else {
      res.json(provaData);
    }
  });
});

/* GET home page. */
router.get('/docente/:id', function (req, res, next) {
  Prova.getAllProvas(req.params.id,(err, provas) => {
    if (err) {
      res.status(601).json({ message: "Erro a obter lista de provas", error: err });
    } else {
      res.json(provas);
    }
  });
});

router.get('/:id/versao/:versao/questoes/:idQuestao', function (req, res, next) {
  Prova.getQuestaoById(req.params.id, req.params.versao, req.params.idQuestao, (err, questaoData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter a questão", error: err });
    } else {
      res.json(questaoData);
    }
  });
});


router.get('/:id/versao/:versao/questoes', function (req, res, next) {
  Prova.getQuestoes(req.params.id, req.params.versao, (err, questoesData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter questões", error: err });
    } else {
      res.json(questoesData);
    }
  });
});

router.get('/:id/versao/:versao', function (req, res, next) {
  Prova.getProvaByIdVersao(req.params.id, req.params.versao,(err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter prova", error: err });
    } else {
/*
      const prova = new Prova(
        provaData.id_prova,
        provaData.data,
        provaData.duracao,
        provaData.nVersoes,
        provaData.aleatorio,
        provaData.bloquear,
        provaData.tempoAdmissao
      );
      */
      res.json(provaData)
    }
  });
});

router.get('/:id', function (req, res, next) {
  Prova.getProvaById(req.params.id, (err, provaData) => {
    if (err) {
      res.status(602).json({ message: "Erro a obter prova", error: err });
    } else {

      /*
      const prova = new Prova(
        provaData.id_prova,
        provaData.data,
        provaData.duracao,
        provaData.nVersoes,
        provaData.aleatorio,
        provaData.bloquear,
      );
      */

      res.json(provaData)
    }
  });
});


router.post('/', function (req, res, next) {
  const provas = req.body.provas; // Assuming provas is an array in req.body
  if (!provas || !Array.isArray(provas)) {
    return res.status(400).json({ message: 'Invalid request body format' });
  }
  provas.forEach(prova => {
    Prova.addProva(prova);
  });

  res.json({ message: 'Provas added successfully' });
});

router.post('/:id/versao/', function (req, res, next) {
  try {
    const versoes = req.body; // Directly accessing req.body, assuming the request body contains an array of questions
    if (!versoes || !Array.isArray(versoes)) {
      console.error('Invalid request body format:', req.body);
      return res.status(400).json({ message: 'Invalid request body format' });
    }

    versoes.forEach(versao => { 
      Prova.addVersao_post(versao, req.params.id,req.params.versao); 
    
    });

    res.json({ message: 'Versões added successfully' });
  } catch (error) {
    console.error('An error occurred in the route handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/:id/versao/:versao/questoes', function (req, res, next) {
  try {
    const questoes = req.body; // Directly accessing req.body, assuming the request body contains an array of questions
    if (!questoes || !Array.isArray(questoes)) {
      console.error('Invalid request body format:', req.body);
      return res.status(400).json({ message: 'Invalid request body format' });
    }

    questoes.forEach(questao => {
      Prova.addQuestao_post(questao, req.params.id, req.params.versao);
    });

    res.json({ message: 'Questões added successfully' });
  } catch (error) {
    console.error('An error occurred in the route handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id/versao/:versao/questoes/:questao/opcao', function (req, res, next) {
  try {
    const opcoes = req.body; // Directly accessing req.body, assuming the request body contains an array of questions
    if (!opcoes || !Array.isArray(opcoes)) {
      console.error('Invalid request body format:', req.body);
      return res.status(400).json({ message: 'Invalid request body format' });
    }

    opcoes.forEach(opcoes => {
      Prova.addOpcao_post(opcoes, req.params.questao);
    });

    res.json({ message: 'Opcão added successfully' });
  } catch (error) {
    console.error('An error occurred in the route handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', function (req, res, next) {
  Prova.deleteProva(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Erro ao excluir a questao prova", error: err });
    } else {
      res.json({ message: "Prova excluída com sucesso", result: result });
    }
  });
});

router.delete('/:id/versao/:versao', function (req, res, next) {
  Prova.deleteProvaComVersao(req.params.id, req.params.versao, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Erro ao excluir uma prova de uma determinada versão", error: err });
    } else {
      res.json({ message: "Versão da prova excluída com sucesso", result: result });
    }
  });
});

router.delete('/:id/versao/:versao/opcoes/:idOpcao', function (req, res, next) {
  Prova.deleteOpcao(req.params.idOpcao, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Erro ao excluir a opcao", error: err });
    } else {
      res.json({ message: "Opcao excluída com sucesso", result: result });
    }
  });
});

router.delete('/:id/versao/:versao/questoes/:idQuestao', function (req, res, next) {
Prova.deleteQuestao(req.params.idQuestao, (err, result) => {

    if (err) {
      res.status(500).json({ message: "Erro ao excluir a questao", error: err });
    } else {
      res.json({ message: "Questao excluída com sucesso", result: result });
    }
  });
});
  
module.exports = router;
