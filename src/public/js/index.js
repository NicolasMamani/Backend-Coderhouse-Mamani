const socket = io();

const productContainer = document.getElementById('product__container');
socket.on('products', (data) => {
  let products = '';
  data.forEach((product) => {
    products =
      products +
      `
    <div class='product-card'>
    <h3 class='product__title'>Titulo : ${product.title}</h3>
    <p class='product__id'>Id : ${product.id}</p>
    <p class='product__description'>Descripción : ${product.description}</p>
    <p class='product__price'>${product.price}</p>
    <button class='delete-button'>Eliminar</button>
    </div>
    `;
  });

  //Agregamos un evento eliminar a cada button
  productContainer.innerHTML = products;
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      deleteProduct(data[index].id); // Llama a la función eliminarProducto con el ID correspondiente al producto
    });
  });
  //Agregamos un evento al button de enviar el formulario
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addProduct();
  });
});

const deleteProduct = (id) => {
  socket.emit('deleteProduct', id);
};

const addProduct = () => {
  // Obtener valores del formulario
  const title = document.getElementById('form-title').value;
  const state = document.getElementById('form-select').value === 'true'; // Convertir a booleano
  const category = document.getElementById('form-category').value;
  const description = document.getElementById('form-description').value;
  const price = parseFloat(document.getElementById('form-price').value);
  const code = document.getElementById('form-code').value;
  const stock = parseInt(document.getElementById('form-stock').value);

  // Verificar si todos los campos están presentes
  if (
    title &&
    state !== undefined &&
    category &&
    description &&
    price &&
    code &&
    stock !== undefined
  ) {
    // Crear objeto con los datos del formulario
    const product = {
      title,
      state,
      category,
      description,
      price,
      code,
      stock,
    };

    console.log(typeof stock);
    console.log(typeof price);
    // Enviar el producto a través del socket
    socket.emit('addProduct', product);
  } else {
    console.error('Algunos campos del formulario no están definidos.');
  }
};
