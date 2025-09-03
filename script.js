
function btnUpdate() {
  let addBtn = document.querySelectorAll('.add__btn');
  addBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      btn.parentElement.children[1].classList.add('border');
      btn.parentElement.children[4].style.display = 'flex';
      console.log(btn.parentElement.children[4]);
    })
  })
}

for (i = 0; i < product.length; i++) {

  document.querySelector('.product-container').innerHTML += `<div class="product">
            <div class="product__image-container">
              <img
                class="product__image mobile-img"
                src= ${product[i].imgSourceMobile}
                alt=""
              />
              <img
                src=${product[i].imgSourceTable}
                alt=""
                class="product__image tablet"
              />
              <img
                src=${product[i].imgSourceDesktop}
                alt=""
                class="product__image desktop"
              />
              <button class="add__btn" onclick='addToCart(${product[i].id})'>
                <img
                  class="cart-img"
                  src="images/icon-add-to-cart.svg"
                  alt=""
                />
                Add to Cart
              </button>
              <button class="quantity__controller">
                <img onclick="changeNumber('plus', ${product[i].id})"
                  src="images/icon-increment-quantity.svg"
                  alt=""
                  class="increase"
                />
                <p class="product__quantity">${product[i].numberOfUnits}</p>
                <img onclick="changeNumber('minus', ${product[i].id})"
                  src="images/icon-decrement-quantity.svg"
                  alt=""
                  class="decrease"
                />
              </button>
            </div>
            <div class="product__info">
              <p class="short-name">${product[i].shortName}</p>
              <p class="full-name">${product[i].fullName}</</p>
              <p class="product__price">${product[i].price}</</p>
            </div>
          </div>`;
}

let cart = [];
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumber(plus, id);
  } else {
    let item = product.find((productItem) => productItem.id === id);
    cart.push({ ...item, numberOfUnits: 1 });
  }

  document.querySelector('.nondynamic').style.display = 'none';
  updateCart();
}

let totalSum = 0;
function updateCart() {
  document.querySelector('.confirmation').innerHTML = '';
  cart.forEach((cartItem) => {
    document.querySelector('.confirmation').innerHTML += `<div class="selected">
    <div class="selected-content">
      <p class="full-name">${cartItem.fullName}</p>
      <div class="price-quantity-container">
      <p class="quantity">${cartItem.numberOfUnits}</p>
      <p class="single-price">${cartItem.price}</p>
      <p class="total-price">${cartItem.price * cartItem.numberOfUnits}</p>
      </div>
    </div>
    <img src="images/icon-remove-item.svg" alt="" class="delete" onclick="removeItem(${cartItem.id})"/>
    </div> `

    document.querySelector('span').innerHTML = cart.length;
    totalSum += cartItem.price * cartItem.numberOfUnits;
    document.querySelectorAll('.total')[0].innerHTML = totalSum;
    let counter = document.querySelectorAll('.product__quantity');
    let increase = document.querySelectorAll('.increase');
    let decrease = document.querySelectorAll('.decrease');
    increase.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        counter[index].innerHTML = cart[index].numberOfUnits;
      })
    })

    decrease.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        counter[index].innerHTML = cart[index].numberOfUnits;
      })
    })

  })
  document.querySelector('.thumpnail-container').innerHTML = '';
  cart.forEach((cartItemItem) => {
    document.querySelector('.thumpnail-container').innerHTML += `
          <div class="thumb-child">
            <img
              src=${cartItemItem.thumbnail}
              alt=""
              class="imgTumb"
            />
            <div class="thump-name">
              <p class="full-name">${cartItemItem.fullName}</p>
              <div class="thupm-quantity">
                <p class="quantity">${cartItemItem.numberOfUnits}</p>
                <p class="single-price">${cartItemItem.price}</p>
              </div>
            </div>
            <p class="total-price">${cartItemItem.price * cartItemItem.numberOfUnits}</p>
          </div>
        `
    document.querySelectorAll('.total')[1].innerHTML = totalSum;
  })


}

function changeNumber(action, id) {
  cart = cart.map((products) => {
    let numberOfUnits = products.numberOfUnits;
    products
    if (products.id === id) {
      if (action === 'minus') {
        numberOfUnits--;
      } else if (action === 'plus') {
        numberOfUnits++;
      }
    }

    return {
      ...products,
      numberOfUnits,
    };
  });
  updateCart();
}
btnUpdate();

document.querySelector('.confirm').addEventListener('click', function () {
  document.querySelector('.popup').classList.add('popupup');
});

document.querySelector('.start').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('popupup');
});

removeItem = (id) => {
  cart = cart.filter((cartItem) => cartItem.id !== id);
  if (cart.length === 0) {
    document.querySelector('.nondynamic').style.display = 'block';
  }
  updateCart();
}