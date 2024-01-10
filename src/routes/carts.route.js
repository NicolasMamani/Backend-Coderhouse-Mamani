const express = require('express');
const router = express.Router();
const CartManager = require('../controllers/CartManager');
const manager = new CartManager('src/models/carrito.json');
const ProductManager = require('../controllers/ProductManager');
const productManager = new ProductManager('src/models/productos.json');

router.get('/carts', async (req, res) => {
  try {
    const carts = await manager.readFile();
    res.json(carts);
  } catch (error) {
    console.error('Fallo al obtener al carrillo');
    res.json({ error: 'Error del servidor' });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await manager.getCartById(cartId);
    res.status(200).json({ message: 'Carrito encontrado', cart: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts', async (req, res) => {
  try {
    const cartSaved = manager.createCart();
    res.status(201).json({ message: 'Carrito creado correctamente', cart: cartSaved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity;

  // verificamos que el id pasado sea correcto
  const foundProduct = await productManager.getProductById(productId);
  if (foundProduct === 'Producto no encontrado') {
    res.status(500).json({ message: 'El producto con el id ingresado no existe' });
    return;
  }

  try {
    const cart = await manager.addProductToCart(cartId, productId, quantity);
    res.status(201).json({ message: 'Producto agregado al carrito', cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
