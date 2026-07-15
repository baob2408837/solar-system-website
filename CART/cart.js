/*=================================================
            LOCAL STORAGE/CART SYSTEM
=================================================*/


const itemList = document.querySelector(".cart__item-list");

let cartData = localStorage.getItem("cartItems");

if (cartData !== null && cartData !== undefined) {

    let cartItemArray = JSON.parse(cartData);
    console.log("Dữ liệu giỏ hàng đã được lấy thành công");

    let itemCards = "";

    cartItemArray.forEach((item, index) => {
        itemCards += `
            <div class="cart__item">
                <img class="item__img" src="${item.img}" alt="item's image">
                <div class="item__info">
                    <p class="item__id" style="display: none;">${item.id}</p>
                    <h2 class="item__name">${item.name}</h2>
                    <h2 class="item__price">${item.price}</h2>
                    <div class="item__quantity">
                        <p class="quantity__lable">Số lượng: </p>
                        <button class="quantity__button" onclick="decreaseQuantity(this)" type="button">-</button>
                        <p class="quantity__number">${item.quantity}</p>
                        <button class="quantity__button" onclick="increaseQuantity(this)" type="button">+</button>
                    </div>
                    <button class="item__delete" onclick="deleteCartItem(this)" type="button">X</button>
                </div>
            </div>
        `;
    });

    itemList.innerHTML = itemCards;
}

function increaseQuantity(buttonClicked) {
    alert("you increased the item's quantity");

    let row = buttonClicked.parentElement.parentElement;
    let idToUpdate = row.querySelector(".item__id").textContent;

    let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
    cartItemArray = cartItemArray.map(item => {
        if (item.id === idToUpdate) {
            item.quantity++;
        }
        return item;
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItemArray));
    location.reload();
}

function decreaseQuantity(buttonClicked) {
    let row = buttonClicked.parentElement.parentElement;
    let idToUpdate = row.querySelector(".item__id").textContent;

    let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
    const targetItem = cartItemArray.find(item => item.id === idToUpdate);

    if (targetItem.quantity > 1) {
        alert("you decreased the item's quantity");
        targetItem.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItemArray));
        location.reload();
    }
}

function deleteCartItem(buttonClicked) {
    alert("you deleted the item");

    let row = buttonClicked.parentElement.parentElement;
    let idToDelete = row.querySelector(".item__id").textContent;

    if (confirm("Bạn có chắc chắn không")) {
        let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
        cartItemArray = cartItemArray.filter(item => item.id !== idToDelete);
        if (cartItemArray.length === 0) {
            localStorage.removeItem("cartItems");
        } else {
            localStorage.setItem("cartItems", JSON.stringify(cartItemArray));
        }
        location.reload();
    }
}

/*=================================================
                OPEN/CLOSE WINDOWS
=================================================*/

//=====================OPEN========================

function openElement(elmt) {
    const overlay = document.getElementById("overlay");
}