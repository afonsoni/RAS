var express = require('express');
var router = express.Router();
var Notification = require('../controllers/notification');
const { format } = require('date-fns');
const uuid = require('uuid');

function getCurrentDateTime() {
  const now = new Date();
  const formattedDateTime = format(now, 'yyyy-MM-dd HH:mm');
  return formattedDateTime;
}

createAux = (body,number) => {
  listaNot= []
  let not= null
  i=0
  const numeroUtilizadoresL = body.numeroUtilizador;
  for (const numeroUtilizador of numeroUtilizadoresL) {
    if(number==4){
      not = createNotification(numeroUtilizador, number, body,body.classificacao[i]);
      i++
    }else{
      not = createNotification(numeroUtilizador, number, body);
    }
    listaNot.push(not)
  }
  return listaNot
}

createNotification = (numeroUtilizador, flagQuery, objeto,classificacao=null) => {
  let t = ""
  let c = ""

  if(flagQuery == 0){ 
    t = "Bem-vindo à plataforma Probum!"
    c = "Caro Aluno, o seu registo foi concluído com sucesso."
  }else if(flagQuery == 1) {
    t = "Bem-vindo à plataforma Probum!"
    c = "Caro Docente, o seu registo foi concluído com sucesso."
  }else if (flagQuery == 2){
    t = "Nova Prova Disponível!"
    c = `Caro Aluno, uma nova prova foi calendarizada. Detalhes da prova: <br><br> Data: ${objeto.data} <br><br> Hora: ${objeto.hora} <br><br> Sala(s): ${objeto.salas.join(", ")} <br><br> Duração: ${objeto.duracao} horas`
  }else if (flagQuery == 3){  
    t = "Prova Partilhada!"
    c = "Caro Docente, <br><br> Uma nova prova foi partilhada consigo no Probum. Verifique a sua conta para mais detalhes."
  }else if(flagQuery == 4){
    t = "Prova Corrigida!" 
    c = `Caro Aluno, a sua prova de ${objeto.cadeira} foi corrigida e a sua classificação total é: ${classificacao}.`
  }else if(flagQuery == 5){
    t = "Classificação da Prova Disponível!"
    c = `Caro Aluno, a classificação do seu exame de ${objeto.cadeira} já está disponível no Probum. Por favor, aceda à sua conta para verificar a sua correção.`
  }else{
    t = "Sala indisponível!"
    c = `Caro docente, a(s) sala(s) ${objeto.salasRemovidas.join(", ")} deixou/deixaram de estar disponível.`
  }

  let notiF = {
    numeroUtilizador: numeroUtilizador,
    noti: [
        {   
            data: getCurrentDateTime(),
            titulo: t,
            conteudo: c,
        }
    ]  
  }
  return notiF
}


// Cria notificação sobre o registo do aluno
router.post('/notification/registoAluno', function(req, res) {
  not = createNotification(req.body.numeroUtilizador,0,req.body)
  Notification.saveOne(not)
  .then(n => {
    res.jsonp(not)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre o registo do docente
router.post('/notification/registoDocente', function(req, res) {
  not = createNotification(req.body.numeroUtilizador,1,req.body)
  Notification.saveOne(not)
  .then(n => {
    res.jsonp(not)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre a calendarização da prova
router.post('/notification/criaProva', function(req, res) {
  
  listaNot = createAux(req.body,2)

  Notification.saveMultiplas(listaNot)
  .then(n => {
    res.jsonp(listaNot)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre a partilha da prova pos docentes
router.post('/notification/salaPartilha', function(req, res) {
  listaNot = createAux(req.body,3)

  Notification.saveMultiplas(listaNot)
  .then(n => {
    res.jsonp(listaNot)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre a prova estar classificada
router.post('/notification/provaClassificada', function(req, res) {
  
  listaNot = createAux(req.body,4)

  Notification.saveMultiplas(listaNot)
  .then(n => {
    res.jsonp(listaNot)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre a prova esta disponivel para consulta
router.post('/notification/provaDisponivel', function(req, res) {
  
  listaNot = createAux(req.body,5)  

  Notification.saveMultiplas(listaNot)
  .then(n => {
    res.jsonp(listaNot)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Cria notificação sobre as salas serem removidas
router.post('/notification/salasRemovidas', function(req, res) {
  listaNot = createAux(req.body,6)
  Notification.saveMultiplas(listaNot)
  .then(n => {
    res.jsonp(listaNot)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Busca as notificações de todos os alunos
router.get('/notification/:idUtilizador', function(req, res) {
  Notification.getNotiIdAluno(req.params.idUtilizador)
  .then(n => {
    res.jsonp(n)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});

// Delete das notificação de 1 user
router.delete('/notification/:idUtilizador', function(req, res) {
  Notification.deleteNotiIdAluno(req.params.idUtilizador)
  .then(n => {
    res.jsonp(n)
  })
  .catch(erro => {
    res.jsonp(erro)
  })
});


module.exports = router;
