const CartModel = require("../models/cart.model");

class CartManager {

    constructor() {
        this.carts = [];
    }
    async createCart(){
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al crear un nuevo carrito', error);
        }
    }
    async getCartById(id){
    try {
        const cart = await CartModel.findById(id);
        if(!cart) throw new Error('no existe el carrito con el id solicitado');
        return cart;
    } catch (error) {
        throw new Error('Error al traer el carrito: ', error);
    }
    }
    async addProductToCart(id, productId, quantity = 1){
        try {
            const cart = await this.getCartById(id);
            const productExists = cart.products.find(item => item.product.toString() === productId);
            if(productExists){
                productExists.quantity += quantity;
            }else {
                cart.products.push({product: productId, quantity});
            }
            cart.markModified('products');
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('error al agregar producto en el cart', error);
        }
    }
}

module.exports = CartManager;