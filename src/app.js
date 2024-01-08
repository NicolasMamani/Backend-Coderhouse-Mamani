const PUERTO = 8080;
const express = require('express');
const ProductManager = require('./controllers/ProductManager');
const productsRouter = require('./routes/products.route.js');
const cartsRouter = require('./routes/carts.route.js');

//creamos productos

const manager = new ProductManager('./src/models/productos.json');

// creamos el servidor
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.use('/api', productsRouter);
app.use('/api', cartsRouter);

app.listen(PUERTO, () => {
  console.log('Escuchando en el http://localhost:8080/api/products');
});
