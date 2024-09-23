// Select the cart element
const cart = document.querySelector('.cart');

// Select the cart icon element
const cartIcon = document.querySelector('#cart-icon');

// Select the close cart icon element
const closeCartIcon = document.querySelector('#close-cart');

// Select the cart content element
const cartContent = document.querySelector('.cart-content');

// Select the total price element
const totalPriceElement = document.querySelector('.total-price');

// Initialize the cart items array
let cartItems = [];

// Add event listener to cart icon to open cart
cartIcon.addEventListener('click', () => {
  cart.classList.add('active');
});

// Add event listener to close cart icon to close cart
closeCartIcon.addEventListener('click', () => {
  cart.classList.remove('active');
});

// Add event listener to add to cart buttons
document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productBox = event.target.closest('.product-box');
    const productTitle = productBox.querySelector('.product-title').textContent;
    const productPrice = productBox.querySelector('.product-price').textContent;
    const productImage = productBox.querySelector('.product-img').src;

    // Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.title === productTitle);
    if (existingItem) {
      // If the item is already in the cart, increment its quantity
      existingItem.quantity++;
      alert(`You have added another ${productTitle} to your cart. Total quantity: ${existingItem.quantity}`);
    } else {
      // Create a new cart item object
      const cartItem = {
        title: productTitle,
        price: parseFloat(productPrice.replace('R', '')),
        image: productImage,
        quantity: 1,
      };

      // Add the cart item to the cart items array
      cartItems.push(cartItem);
      alert(`You have added ${productTitle} to your cart.`);
    }

    // Update the cart content
    updateCartContent();

    // Update the total price
    updateTotalPrice();
  });
});

// Add event listener to remove from cart buttons
cartContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart-remove')) {
    const cartBox = event.target.closest('.cart-box');
    const index = cartItems.findIndex((item) => item.title === cartBox.querySelector('.cart-product-title').textContent);
    if (index !== -1) {
      const removedItem = cartItems.splice(index, 1)[0];
      alert(`You have removed ${removedItem.title} from your cart.`);
    }

    // Update the cart content
    updateCartContent();

    // Update the total price
    updateTotalPrice();
  }
});

// Add event listener to update quantity inputs
cartContent.addEventListener('input', (event) => {
  if (event.target.classList.contains('cart-quantity')) {
    const cartBox = event.target.closest('.cart-box');
    const index = cartItems.findIndex((item) => item.title === cartBox.querySelector('.cart-product-title').textContent);
    if (index !== -1) {
      const cartItem = cartItems[index];
      cartItem.quantity = parseInt(event.target.value);
      alert(`You have updated the quantity of ${cartItem.title} to ${cartItem.quantity}.`);
    }

    // Update the total price
    updateTotalPrice();
  }
});

// Function to update the cart content
function updateCartContent() {
  cartContent.innerHTML = '';
  cartItems.forEach((item) => {
    const cartBox = document.createElement('div');
    cartBox.className = 'cart-box';
    cartBox.innerHTML = `
      <img src="${item.image}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${item.title}</div>
        <div class="cart-price">R${item.price.toFixed(2)}</div>
        <input type="number" value="${item.quantity}" class="cart-quantity">
      </div>
      <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartContent.appendChild(cartBox);
  });
}

// Function to update the total price
function updateTotalPrice() {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPriceElement.textContent = `R${totalPrice.toFixed(2)}`;
}