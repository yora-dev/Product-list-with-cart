
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
    // console.log(cart);
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
    <img src="images/icon-remove-item.svg" alt="" class="delete">
    </div> `

    document.querySelector('span').innerHTML = cart.length;
    totalSum += cartItem.price * cartItem.numberOfUnits;
    document.querySelector('.total').innerHTML = totalSum;

    


  })
}

function changeNumber(action, id) {
  cart = cart.map((product) => {
    let numberOfUnits = product.numberOfUnits;

    if (product.id === id) {
      if (action === 'minus') {
        numberOfUnits--;
      } else if (action === 'plus') {
        numberOfUnits++;
      }
    }

    return {
      ...product,
      numberOfUnits,
    };
  });



  updateCart();

}
btnUpdate();