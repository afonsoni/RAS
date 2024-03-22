var Notification = require('../models/notification');

// Returna todas noti de um Aluno
module.exports.getNotiIdAluno = (idAluno) => {
    return Notification
    .find({numeroUtilizador: idAluno})
    .sort({ 'noti.data': -1 }) 
    .lean()
    .then(lista => {
        return lista;
    })
    .catch(erro => {
        return erro;
    });
};

module.exports.saveOne = (not) => {
    const newNotification = new Notification(not);
    return newNotification.save()
    .then(lista => {
        
        return lista;
    })
    .catch(erro => {

        return erro;
    });
};

module.exports.saveMultiplas = (not) => {
    
    const savePromises = [];

    for (const notificationData of not) {
        const newNotification = new Notification(notificationData);
        savePromises.push(newNotification.save());
    }

    return Promise.all(savePromises)
    .then(savedNotifications => {
        return savedNotifications;
    })
    .catch(error => {
        return error;
    });
};


// Delete das notificações de 1 User
module.exports.deleteCasa = (idUtilizador) => {
    return Notification
    .deleteOne(({numeroUtilizador: idUtilizador}))
    .then(resposta => {
        return resposta;
    })
    .catch(erro => {
        return erro;
    });
};