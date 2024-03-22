const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notificationSchema = new Schema({
    numeroUtilizador: String,
    noti: [
        {
            data: Date,
            titulo: String,
            conteudo: String,
        }
    ]  
});




module.exports = mongoose.model('notification', notificationSchema);

