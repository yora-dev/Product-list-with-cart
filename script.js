const productContainer = document.querySelector('.product-container');

for (let i = 0; i < product.length; i++) {
  productContainer.innerHTML += `
    <div class="product">
      <div class="product__image-container">
        <img class="product__image mobile-img" src="${product[i].imgSourceMobile}" alt="${product[i].shortName}" />
        <img src="${product[i].imgSourceTable}" alt="${product[i].shortName}" class="product__image tablet" />
        <img src="${product[i].imgSourceDesktop}" alt="${product[i].shortName}" class="product__image desktop" />
        
        <button class="add__btn" onclick="addToCart(${product[i].id})">
          <img class="cart-img" src="images/icon-add-to-cart.svg" alt="Add to cart" />
          Add to Cart
        </button>
        
        <button class="quantity__controller" style="display:none;">
          <img onclick="changeNumber('plus', ${product[i].id})" src="images/icon-increment-quantity.svg" alt="Increase" class="increase" />
          <p class="product__quantity">${product[i].numberOfUnits}</p>
          <img onclick="changeNumber('minus', ${product[i].id})" src="images/icon-decrement-quantity.svg" alt="Decrease" class="decrease" />
        </button>
      </div>
      <div class="product__info">
        <p class="short-name">${product[i].shortName}</p>
        <p class="full-name">${product[i].fullName}</p>
        <p class="product__price">${product[i].price}</p>
      </div>
    </div>`;
}

let cart = [];
let totalSum = 0;

function addToCart(id) {
  if (!cart.some(item => item.id === id)) {
    const item = product.find(productItem => productItem.id === id);
    cart.push({ ...item });

    // Update product UI: hide "Add to Cart", show quantity controller
    const productEl = Array.from(document.querySelectorAll('.product'))
      .find(el => el.querySelector('.add__btn')?.getAttribute('onclick') === `addToCart(${id})`);
    if (productEl) {
      productEl.querySelector('.add__btn').style.display = 'none';
      productEl.querySelector('.quantity__controller').style.display = 'flex';
    }
  }

  document.querySelector('.nondynamic').style.display = 'none';
  updateCart();
}

function updateCart() {
  const confirmation = document.querySelector('.confirmation');
  confirmation.innerHTML = '';
  totalSum = 0;

  cart.forEach(cartItem => {
    confirmation.innerHTML += `
      <div class="selected">
        <div class="selected-content">
          <p class="full-name">${cartItem.fullName}</p>
          <div class="price-quantity-container">
            <p class="quantity">${cartItem.numberOfUnits}</p>
            <p class="single-price">${cartItem.price}</p>
            <p class="total-price">${cartItem.price * cartItem.numberOfUnits}</p>
          </div>
        </div>
        <img src="images/icon-remove-item.svg" alt="Remove item" class="delete" onclick="removeItem(${cartItem.id})"/>
      </div>`;

    totalSum += cartItem.price * cartItem.numberOfUnits;
  });

  document.querySelector('span').innerHTML = cart.length;
  document.querySelectorAll('.total')[0].innerHTML = totalSum;

  const thumbnailContainer = document.querySelector('.thumbnail-container');
  thumbnailContainer.innerHTML = '';
  cart.forEach(cartItem => {
    thumbnailContainer.innerHTML += `
      <div class="thumb-child">
        <img src="${cartItem.thumbnail}" alt="${cartItem.fullName}" class="imgThumb" />
        <div class="thumb-name">
          <p class="full-name">${cartItem.fullName}</p>
          <div class="thumb-quantity">
            <p class="quantity">x${cartItem.numberOfUnits}</p>
            <p class="single-price">@ ${cartItem.price}</p>
          </div>
        </div>
        <p class="total-price">${cartItem.price * cartItem.numberOfUnits}</p>
      </div>`;
  });

  document.querySelectorAll('.total')[1].innerHTML = totalSum;
}

function removeItem(id) {
  cart = cart.filter(cartItem => cartItem.id !== id);
  if (cart.length === 0) {
    document.querySelector('.nondynamic').style.display = 'block';
  }

  // Reset product UI
  const productEl = Array.from(document.querySelectorAll('.product'))
    .find(el => el.querySelector('.add__btn')?.getAttribute('onclick') === `addToCart(${id})`);
  if (productEl) {
    productEl.querySelector('.add__btn').style.display = 'block';
    productEl.querySelector('.quantity__controller').style.display = 'none';
  }

  updateCart();
}

function openModal() {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.popup').style.display = 'block';
}

function closeModal() {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.popup').style.display = 'none';
}

function changeNumber(action, id) {
  cart = cart.map(product => {
    let numberOfUnits = product.numberOfUnits;

    if (product.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === 'plus') {
        numberOfUnits++;
      }
    }

    return { ...product, numberOfUnits };
  });

  // Update product quantity in UI
  const productEl = Array.from(document.querySelectorAll('.product'))
    .find(el => el.querySelector('.add__btn')?.getAttribute('onclick') === `addToCart(${id})`);
  if (productEl) {
    const quantityEl = productEl.querySelector('.product__quantity');
    const cartItem = cart.find(item => item.id === id);
    if (quantityEl && cartItem) {
      quantityEl.textContent = cartItem.numberOfUnits;
    }
  }

  updateCart();
}

// ---- Confirm & Start Order Buttons ----
function setupOrderButtons() {
  const confirmBtn = document.querySelector('.confirm');
  const startBtn = document.querySelector('.start');
  const popup = document.querySelector('.popup');
  const popupThumbs = document.querySelector('.thumpnail-container'); // popup container
  const popupTotal = popup.querySelector('.total');

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // Fill popup summary
      popupThumbs.innerHTML = '';
      let finalTotal = 0;

      cart.forEach(item => {
        popupThumbs.innerHTML += `
          <div class="thumb-child">
            <img src="${item.thumbnail}" alt="${item.fullName}" class="imgThumb" />
            <div class="thumb-name">
              <p class="full-name">${item.fullName}</p>
              <div class="thumb-quantity">
                <p class="quantity">x${item.numberOfUnits}</p>
                <p class="single-price">@ ${item.price}</p>
              </div>
            </div>
            <p class="total-price">${item.price * item.numberOfUnits}</p>
          </div>`;
        finalTotal += item.price * item.numberOfUnits;
      });

      popupTotal.textContent = finalTotal;
      popup.classList.add('popupup'); // show popup
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      popup.classList.remove('popupup'); // hide popup
      cart = [];
      document.querySelector('.nondynamic').style.display = 'block';

      // Reset all product UI
      document.querySelectorAll('.product').forEach(productEl => {
        productEl.querySelector('.add__btn').style.display = 'block';
        productEl.querySelector('.quantity__controller').style.display = 'none';
        productEl.querySelector('.product__quantity').textContent = 1;
      });

      updateCart();
    });
  }
}

// Call once after DOM ready
setupOrderButtons();
