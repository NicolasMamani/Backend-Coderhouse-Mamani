const express = require('express');
const router = express.Router();
const CartManager = require('../dao/db/cart-manager-db');
const manager = new CartManager();
const ProductManager = require('../dao/db/product-manager-db');
const productManager = new ProductManager();

router.get('/carts', async (req, res) => {
  try {
    const carts = await manager;
    res.json(carts);
  } catch (error) {
    console.error('Fallo al obtener al carrillo');
    res.json({ error: 'Error del servidor' });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
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
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  try {
  // verificamos que el id pasado sea correcto
  const foundProduct = await productManager.getProductById(productId);
  // if (foundProduct === 'Producto no encontrado') {
  //   res.status(500).json({ message: 'El producto con el id ingresado no existe' });
  //   return;
  // }

    const cart = await manager.addProductToCart(cartId, productId, quantity);
    res.status(201).json({ message: 'Producto agregado al carrito', cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
