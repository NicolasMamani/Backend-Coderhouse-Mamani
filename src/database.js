const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nico:coderhouse@cluster0.bgaiwth.mongodb.net/ecommerce?retryWrites=true&w=majority')
    .then(()=>console.log('conexión exitosa'))
    .catch(()=>console.log('Error al conectarse a la base de datos.'));

