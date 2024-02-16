const PUERTO = 8080;
const express = require('express');
const ProductManager = require('./dao/db/product-manager-db.js');
const productManager = new ProductManager('');
const productsRouter = require('./routes/products.route.js');
const cartsRouter = require('./routes/carts.route.js');
const viewRouter = require('./routes/view.route.js');
const path = require('path');
const socket = require('socket.io');
const { engine, create} = require('express-handlebars');
const MessageModel = require('./dao/models/message.model.js');

require('./database.js');

const hbs = create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});


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

hbs.handlebars.registerHelper('multiply', (a, b) => a * b);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

const httpServer = app.listen(PUERTO, () => {
  console.log('El servidor esta corriendo en el puerto ' + PUERTO);
});

// socket.io

const io = new socket.Server(httpServer); //note creamos una isntancia de socket


// establecemos la conexión

// io.on('connection', (socket) => {
//   socket.on('message', async(data) => {
//     await MessageModel.create(data);
//     const messages = await MessageModel.find();
//     io.sockets.emit('messagesLogs', messages);
//   });
// });


io.on('connection', async (socket) => {
  console.log(`cliente conectado`);
  const products = await productManager.getProducts();
  console.log(products.payload);
  socket.emit('products', {products: products.payload});

  // socket.on('deleteProduct', async (id) => {
  //   await productManager.deleteProduct(id);
  //   const products = await productManager.getProducts();
  //   io.sockets.emit('products', products);
  // });

  socket.on('addProduct', async (product) => {
    try {
      await productManager.addProduct(product);
      const products = await productManager.getProducts();
      io.sockets.emit('products', products);
    } catch (error) {
      console.log('Error al cargar producto');
    }
  });
});