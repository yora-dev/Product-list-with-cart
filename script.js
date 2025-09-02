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
              <button class="add__btn">
                <img
                  class="cart-img"
                  src="images/icon-add-to-cart.svg"
                  alt=""
                />
                Add to Cart
              </button>
              <button class="quantity__controller">
                <img
                  src="images/icon-increment-quantity.svg"
                  alt=""
                  class="increase"
                />
                <p class="product__quantity">1</p>
                <img
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

let addBtn = document.querySelectorAll('.add__btn');
addBtn.forEach(function (item) {

  let cart = [];
  item.addEventListener("click", function () {
    item.style.display = 'none';
    let quantityController = document.querySelectorAll('.quantity__controller');
    quantityController.forEach(item1 => {
      if (item.parentElement === item1.parentElement) {
        item1.style.display = 'flex';
      }
    })
    cart.push(item.parentElement.parentElement);
    console.log(cart);
    for (j = 0; j < cart.length; j++) {
      let fullName = cart[j].querySelector('.full-name').textContent;
      let price = cart[j].querySelector('.product__price').textContent;

      let confirmGenerator = document.querySelector('.confirmation-container-item');
      let selected = `<div class="selected">
          <div class="selected-content">
            <p class="full-name">${fullName}</p>
            <div class="price-quantity-container">
              <p class="quantity">1</p>
              <p class="single-price">${price}</p>
              <p class="total-price">${price}</p>
            </div>
          </div>
          <img src="images/icon-remove-item.svg" alt="" class="delete">
        </div>
        `
      let selectedContainer = [];
      selectedContainer.push(selected);

      for (k = 0; k < selectedContainer.length; k++) {
        confirmGenerator.innerHTML += selectedContainer[k];
      }


    }




  })
})


