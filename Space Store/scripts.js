const Add2Cart = document.querySelectorAll(".product__btn-cart");

function isExistedinCart(item, itemCartArray) {
    let myIndex = -1;
    for (let i = 0; i < itemCartArray.length; i++) {
        if (itemCartArray[i].id === item.id) {
            myIndex = i;
        }
    }
    return myIndex;
}

Add2Cart.forEach((button) => {
    button.addEventListener("click", (evt) => {

        const linkClicked = evt.target;
        const productInfo = linkClicked.parentElement.parentElement;

        let itemID = productInfo.querySelector(".product__id").textContent;
        let itemIMG = productInfo.querySelector("img").getAttribute("src");
        let itemName = productInfo.querySelector("h3").textContent;
        let itemPrice = productInfo.querySelector(".product__price").textContent;

        let newItem = {
            id: itemID,
            img: itemIMG,
            name: itemName,
            price: itemPrice,
            quantity: 1
        }

        let updatedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let index = isExistedinCart(newItem, updatedCartItems);

        if (index >= 0) {
            updatedCartItems[index].quantity++;
        } else {
            updatedCartItems.push(newItem);
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    })
})

function addToCart() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
    }
}