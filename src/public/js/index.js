const socket = io();

const productContainer = document.getElementById('product__container');
socket.on('products', (data) => {
  console.log(data);
  let products = '';
  data.forEach((product) => {
    products =
      products +
      `
    <div class='product-card'>
    <h3 class='product__title'> ${product.title}</h3>
    <p class='product__description'>${product.description}</p>
    <p class='product__price'>${product.price}</p>
    </div>
    `;
  });
  productContainer.innerHTML = products;
});
