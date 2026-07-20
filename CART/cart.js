/*=================================================
            LOCAL STORAGE/CART SYSTEM
=================================================*/


const itemList = document.querySelector(".cart__item-list");

let cartData = localStorage.getItem("cartItems");

if (cartData === null || cartData === undefined) {

    let itemMessage = `
        <div class="item-list__message">
            <h1>:(</h1>
            <div class="message__text">
                <h2>Ôi không!</h2>
                <p>Bạn vẫn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng!</p>
            </div>
        </div>
    `;

    itemList.innerHTML = itemMessage;

    const cartRight = document.querySelector(".cart__right");
    if (cartRight) {
        cartRight.style.display = "none";
    }
    const cartContainer = document.querySelector(".cart__container");
    if (cartContainer) {
        cartContainer.style.gridTemplateColumns = "1fr";
    }
    const cartItemList = document.querySelector(".cart__item-list");
    if (cartItemList) {
        cartItemList.style.height = "max-content";
        cartItemList.style.minHeight = "max-content";
    }

} else {
    let cartItemArray = JSON.parse(cartData);
    console.log("Dữ liệu giỏ hàng đã được lấy thành công");

    let itemCards = "";
    let total = 0;


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

    updateTotalPrice();

    const savedScroll = sessionStorage.getItem("cartScrollPos");
    if (savedScroll !== null && itemList) {
        itemList.scrollTop = Number(savedScroll, 10);
        sessionStorage.removeItem("cartScrollPos");
    }
}

function saveCartScroll() {
    if (itemList) {
        sessionStorage.setItem("cartScrollPos", itemList.scrollTop);
    }
}

function updateTotalPrice() {
    let cardData = localStorage.getItem("cartItems");
    if (!cardData) return;

    let cartItemArray = JSON.parse(cartData);

    let total = 0;

    cartItemArray.forEach(item => {
        let priceNum = Number(item.price.replace(/[^0-9]/g, ""));
        total += priceNum * item.quantity;
    })

    const subTotalElement = document.querySelector(".tempPrice");
    if (subTotalElement) {
        subTotalElement.innerHTML = total.toLocaleString("vi-VN") + "vnđ";
    }

    let discount = 0;
    const isCouponApplied = sessionStorage.getItem("couponApplied") === "true";

    if (isCouponApplied) {
        discount = total * 0.1;
    }

    let totalAfterDiscount = total - discount;
    let vat = totalAfterDiscount * 0.1;
    let finalTotal = totalAfterDiscount + vat;

    const totalElement = document.querySelector(".sumPrice");
    if (totalElement) {
        totalElement.innerHTML = finalTotal.toLocaleString("vi-VN") + " vnđ";
    }
}

function increaseQuantity(buttonClicked) {

    let quantityGroup = buttonClicked.parentElement;
    let row = quantityGroup.parentElement;
    let idToUpdate = row.querySelector(".item__id").textContent.trim();
    let quantityNumberElement = quantityGroup.querySelector(".quantity__number");

    let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
    cartItemArray = cartItemArray.map(item => {
        if (String(item.id).trim() === idToUpdate) {
            item.quantity++;

            if (quantityNumberElement) {
                quantityNumberElement.textContent = item.quantity;
            }
        }
        return item;
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItemArray));

    updateTotalPrice();
    location.reload();
}

function decreaseQuantity(buttonClicked) {

    let quantityGroup = buttonClicked.parentElement;
    let row = quantityGroup.parentElement;
    let idToUpdate = row.querySelector(".item__id").textContent;
    let quantityNumberElement = quantityGroup.querySelector(".quantity__number");

    let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
    const targetItem = cartItemArray.find(item => item.id === idToUpdate);

    if (targetItem && targetItem.quantity > 1) {
        targetItem.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItemArray));

        if (quantityNumberElement) {
            quantityNumberElement.textContent = targetItem.quantity;
        }

        updateTotalPrice();
        location.reload();
    }
}

function deleteCartItem(buttonClicked) {

    let row = buttonClicked.parentElement.parentElement;
    let idToDelete = row.querySelector(".item__id").textContent;

    if (confirm("Bạn có chắc chắn không")) {

        let cartItemArray = JSON.parse(localStorage.getItem("cartItems"));
        cartItemArray = cartItemArray.filter(item => item.id.trim() !== idToDelete);
        if (cartItemArray.length === 0) {
            localStorage.removeItem("cartItems");
        } else {
            localStorage.setItem("cartItems", JSON.stringify(cartItemArray));
        }

        saveCartScroll();
        location.reload();
    }
}


/*=================================================
                     CHECKOUT
=================================================*/


//==============OPEN/CLOSE CHECKOUT================

const checkoutOpen = document.getElementById("checkoutSubmitBtn");

checkoutOpen.addEventListener("click", () => {
    const checkoutMenu = document.getElementById("checkout");
    openElement(checkoutMenu);
});

const checkoutClose = document.getElementById("checkoutCloseBtn");

checkoutClose.addEventListener("click", () => {
    const checkoutMenu = document.getElementById("checkout");
    closeElement(checkoutMenu);
});

//=================VALUE CHECK======================

const phoneElement = document.getElementById("phone");
const emailElement = document.getElementById("email");
const inputElement = document.querySelectorAll(".checkoutInput");

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validatePhone(value) {
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    return phoneRegex.test(value);
}

inputElement.forEach(input => {
    if (input !== phoneElement && input !== emailElement) {
        input.addEventListener("blur", () => {
            if (input.value.trim() !== "") {
                correctElement(input);
            } else {
                if (input.classList.contains("invalid")) {
                    input.classList.remove("invalid");
                } else if (input.classList.contains("success")) {
                    input.classList.remove("success");
                }
            }
        })
    }
})

emailElement.addEventListener("blur", () => {
    if (validateEmail(emailElement.value.trim())) {
        correctElement(emailElement);
    } else if (emailElement.value.trim() !== "" && !validateEmail(emailElement.value.trim())) {
        uncorrectElement(emailElement);
    } else if (emailElement.value.trim() === "") {
        if (emailElement.classList.contains("success")) {
            emailElement.classList.remove("success");
            emailElement.placeholder = "Ví dụ: abc@gmail.com";
        } else if (emailElement.classList.contains("invalid")) {
            emailElement.classList.remove("invalid");
            emailElement.placeholder = "Ví dụ: abc@gmail.com";
        }
    }
})

phoneElement.addEventListener("blur", () => {
    if (validatePhone(phoneElement.value.trim())) {
        correctElement(phoneElement);
    } else if (phoneElement.value.trim() !== "" && !validatePhone(phoneElement.value.trim())) {
        uncorrectElement(phoneElement);
    } else if (phoneElement.value.trim() === "") {
        if (phoneElement.classList.contains("success")) {
            phoneElement.classList.remove("success");
            phoneElement.placeholder = "Ví dụ: 0123 456 789";
        } else if (phoneElement.classList.contains("invalid")) {
            phoneElement.classList.remove("invalid");
            phoneElement.placeholder = "Ví dụ: 0123 456 789";
        }
    }
})

//=====================CHECKOUT SUBMIT=====================

const checkoutSubmit = document.getElementById("submitBtn");

checkoutSubmit.addEventListener("click", () => {
    let allValid = true;
    inputElement.forEach(input => {
        if (!input.classList.contains("success")) {
            allValid = false;
            uncorrectElement(input);
            if (input !== phoneElement && input !== emailElement) {
                input.placeholder = "Không được để trống"
            }
        }
    })
    if (allValid) {
        const checkoutMenu = document.getElementById("checkout")
        closeElement(checkoutMenu);
        checkoutOpen.innerHTML = "Đã đặt hàng thành công";
        checkoutOpen.classList.add("activated");
    }
})


/*===========================================================
                            COUPON
===========================================================*/


const couponTextElement = document.querySelector(".coupon__text");
const couponSubmitElement = document.querySelector(".coupon__submit");

if (couponTextElement && sessionStorage.getItem("couponApplied") === "true") {
    if (!couponTextElement.classList.contains("approved")) {
        couponTextElement.classList.add("approved");
    }
}

if (couponSubmitElement && couponTextElement) {
    couponSubmitElement.addEventListener("click", () => {
        if (couponTextElement.value.trim() === "abc") {
            if (!couponTextElement.classList.contains("approved")) {
                couponTextElement.classList.add("approved");
            }
            sessionStorage.setItem("couponApplied", true);
            couponTextElement.value = "";
            couponTextElement.placeholder = "Đã áp dụng mã giảm giá!";

            updateTotalPrice();
        } else {
            if (couponTextElement.classList.contains("approved")) {
                couponTextElement.classList.remove("approved");
            }
            sessionStorage.removeItem("couponApplied");
            couponTextElement.value = "";
            couponTextElement.placeholder = "Mã giảm giá không chính xác!";

            updateTotalPrice();
        }
    })
}

//====================BUG COUPON TEXT FIX=======================

if (couponTextElement) {
    couponTextElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            couponSubmitElement.click();
        }
    });
}


/*===============================================================
                           BACK TO TOP
===============================================================*/


const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            if (!backToTopBtn.classList.contains("open")) {
                backToTopBtn.classList.add("open");
            }
        } else {
            if (backToTopBtn.classList.contains("open")) {
                backToTopBtn.classList.remove("open");
            }
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

