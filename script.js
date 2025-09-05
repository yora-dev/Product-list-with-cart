function btnUpdate() {
  const addBtns = document.querySelectorAll('.add__btn');
  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      btn.parentElement.children[1].classList.add('border');
      btn.parentElement.children[4].style.display = 'flex';
    });
  });
}

const productContainer = document.querySelector('.product-container');
for (let i = 0; i < product.length; i++) {
  productContainer.innerHTML += `
    <div class="product">
      <div class="product__image-container">
        <img class="product__image mobile-img" src="${product[i].imgSourceMobile}" alt="" />
        <img src="${product[i].imgSourceTable}" alt="" class="product__image tablet" />
        <img src="${product[i].imgSourceDesktop}" alt="" class="product__image desktop" />
        <button class="add__btn" onclick="addToCart(${product[i].id})">
          <img class="cart-img" src="images/icon-add-to-cart.svg" alt="" />
          Add to Cart
        </button>
        <button class="quantity__controller">
          <img onclick="changeNumber('plus', ${product[i].id})" src="images/icon-increment-quantity.svg" alt="" class="increase" />
          <p class="product__quantity">${product[i].numberOfUnits}</p>
          <img onclick="changeNumber('minus', ${product[i].id})" src="images/icon-decrement-quantity.svg" alt="" class="decrease" />
        </button>
      </div>
      <div class="product__info">
        <p class="short-name">${product[i].shortName}</p>
        <p class="full-name">${product[i].fullName}</p>
        <p class="product__price">${product[i].price}</p>
      </div>
    </div>`;
}
btnUpdate();

let cart = [];

function addToCart(id) {
  if (!cart.some(item => item.id === id)) {
    const item = product.find(productItem => productItem.id === id);
    cart.push({ ...item });
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
        <img src="images/icon-remove-item.svg" alt="" class="delete" onclick="removeItem(${cartItem.id})"/>
      </div>`;

    totalSum += cartItem.price * cartItem.numberOfUnits;
  });

  document.querySelector('span').innerHTML = cart.length;
  document.querySelectorAll('.total')[0].innerHTML = totalSum;

  const thumbnailContainer = document.querySelector('.thumpnail-container');
  thumbnailContainer.innerHTML = '';
  cart.forEach(cartItem => {
    thumbnailContainer.innerHTML += `
      <div class="thumb-child">
        <img src="${cartItem.thumbnail}" alt="" class="imgTumb" />
        <div class="thump-name">
          <p class="full-name">${cartItem.fullName}</p>
          <div class="thupm-quantity">
            <p class="quantity">${cartItem.numberOfUnits}</p>
            <p class="single-price">${cartItem.price}</p>
          </div>
        </div>
        <p class="total-price">${cartItem.price * cartItem.numberOfUnits}</p>
      </div>`;
  });

  document.querySelectorAll('.total')[1].innerHTML = totalSum;

  document.querySelector('.confirm').addEventListener('click', () => {
    document.querySelector('.popup').classList.add('popupup');
  });

  document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.popup').classList.remove('popupup');
    cart = [];
    document.querySelector('.nondynamic').style.display = 'block';
    updateCart();
  });
}



function removeItem(id) {
  cart = cart.filter(cartItem => cartItem.id !== id);
  if (cart.length === 0) {
    document.querySelector('.nondynamic').style.display = 'block';
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

let totalSum = 0;
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

  // Update product quantity in product list
  const productElements = document.querySelectorAll('.product');
  productElements.forEach(productEl => {
    const btn = productEl.querySelector('.add__btn');
    if (btn && btn.getAttribute('onclick') === `addToCart(${id})`) {
      const quantityEl = productEl.querySelector('.product__quantity');
      const cartItem = cart.find(item => item.id === id);
      if (quantityEl && cartItem) {
        quantityEl.textContent = cartItem.numberOfUnits;
      } else if (cartItem && cartItem.numberOfUnits === 0) {
        btn.style.display = 'block';
        productEl.querySelector('.quantity__controller').style.display = 'none';
      }
    }
  });

  updateCart();
}
