const PUERTO = 8080;
const express = require('express');
const ProductManager = require('./controllers/ProductManager');
const productsRouter = require('./routes/products.route.js');
const cartsRouter = require('./routes/carts.route.js');
const viewRouter = require('./routes/view.route.js');
const path = require('path');
const socket = require('socket.io');
// import { engine } from 'express-handlebars';
const { engine } = require('express-handlebars');
const { log } = require('console');

//creamos productos

const manager = new ProductManager('./src/models/productos.json');

// creamos el servidor
const app = express();

// Configuramos para funcione la carpeta public
app.use(express.static('./src/public'));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.use('/api', productsRouter);
app.use('/api', cartsRouter);
app.use('/', viewRouter);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

// app.get('/', async (req, res) => {
//   const products = await manager.readFile();
//   res.render('index', { products });
// });

const httpServer = app.listen(PUERTO, () => {
  console.log('El servidor esta corriendo en el puerto ' + PUERTO);
});

const io = socket(httpServer); //esto es una instancia de socket

// app.get('/realtimeproducts', (req, res) => {
//   try {
//     res.render('realTimeProducts');
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

io.on('connection', async (socket) => {
  console.log(`cliente conectado`);
  const products = await manager.readFile();
  socket.emit('products', products);

  socket.on('deleteProduct', async (id) => {
    await manager.deleteProduct(id);
    const products = await manager.readFile();
    io.sockets.emit('products', products);
  });

  socket.on('addProduct', async (product) => {
    try {
      await manager.addProduct(product);
      const products = await manager.readFile();
      io.sockets.emit('products', products);
    } catch (error) {
      console.log('Error al cargar producto');
    }
  });
});
