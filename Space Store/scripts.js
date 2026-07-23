//==================== SET UP & HELPER FUNCTIONS =======================

function openElement(popUpElm) {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.add("open");
    if (popUpElm) popUpElm.classList.add("open");
}

function closeElement(popUpElm) {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.remove("open");
    if (popUpElm) popUpElm.classList.remove("open");
}

function correctElement(element) {
    if (element.classList.contains("invalid")) {
        element.classList.remove("invalid");
    }
    element.classList.add("success");
}

function incorrectElement(element) {
    if (element.classList.contains("success")) {
        element.classList.remove("success");
    }
    element.classList.add("invalid");
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validatePhone(value) {
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    return phoneRegex.test(value);
}

function emailCheck(email, emailInput) {
    if (validateEmail(email)) {
        correctElement(emailInput);
    } else {
        incorrectElement(emailInput);
        emailInput.value = "";
        emailInput.placeholder = "Email không hợp lệ!";
    }
}

function phoneCheck(phone, phoneInput) {
    if (validatePhone(phone)) {
        correctElement(phoneInput);
    } else {
        incorrectElement(phoneInput);
        phoneInput.value = "";
        phoneInput.placeholder = "Số điện thoại không hợp lệ!";
    }
}

//==================== OVERLAY LOGIC =======================

const overlay = document.getElementById("overlay");
if (overlay) {
    overlay.addEventListener("click", () => {
        const popUpModal = document.querySelectorAll(".open");
        popUpModal.forEach((elm) => {
            closeElement(elm);
        });
        const mobileMenuBtn = document.querySelector(".navbar__mobile");
        if (mobileMenuBtn) mobileMenuBtn.classList.remove("pushed");
    });
}

//==================== SIGN IN LOGIC =======================

const user1 = {
    userName: "user1",
    userEmail: "a@gmail.com",
    userPassword: "12345678"
};

const signinOpen = document.querySelector(".js-login");
if (signinOpen) {
    signinOpen.addEventListener("click", (evt) => {
        evt.preventDefault();
        const popUpModal = document.querySelector(".signinMenu");
        openElement(popUpModal);
    });
}

const signinClose = document.getElementById("signinClose");
if (signinClose) {
    signinClose.addEventListener("click", (evt) => {
        const popUpModal = evt.target.closest(".signinMenu");
        closeElement(popUpModal);
    });
}

const signinMenu = document.querySelector(".signinMenu .modal-body");
if (signinMenu) {
    const signinEmailInput = signinMenu.children[1];
    const signinPasswordInput = signinMenu.children[3].children[0];

    signinEmailInput.addEventListener("blur", (evt) => {
        const input = evt.target;
        const value = input.value.trim();
        if (value === "") {
            incorrectElement(input);
            input.placeholder = "Không được bỏ trống!";
        } else {
            emailCheck(value, input);
        }
    });

    signinPasswordInput.addEventListener("blur", (evt) => {
        const input = evt.target;
        const value = input.value.trim();
        if (value === "") {
            incorrectElement(input);
            input.placeholder = "Không được bỏ trống!";
        } else {
            correctElement(input);
        }
    });
}

const signinButton = document.getElementById("signinSubmitButton");
if (signinButton) {
    signinButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        const modal = evt.currentTarget.parentElement;
        const inputEmail = modal.children[1];
        const inputPassword = modal.children[3].children[0];

        let allValid = true;
        if (inputEmail.value.trim() !== user1.userEmail || inputPassword.value.trim() !== user1.userPassword) {
            allValid = false;
            alert("Sai mật khẩu hoặc email!");
            incorrectElement(inputEmail);
            incorrectElement(inputPassword);
        }
        if (allValid) {
            const topBarLogin = document.querySelector(".top-bar__login");
            const greetingLogin = document.createElement("p");
            greetingLogin.textContent = `Chào ${user1.userName}`;
            topBarLogin.replaceChildren(greetingLogin);

            localStorage.setItem("user1", JSON.stringify(user1));

            const signinPopUp = evt.target.closest(".signinMenu");
            closeElement(signinPopUp);
        }
    });
}

(() => {
    const user1Data = localStorage.getItem("user1");
    if (user1Data) {
        const user1Element = JSON.parse(user1Data);
        const topBarLogin = document.querySelector(".top-bar__login");
        if (topBarLogin) {
            const greetingLogin = document.createElement("p");
            greetingLogin.textContent = `Chào ${user1Element.userName}`;
            topBarLogin.replaceChildren(greetingLogin);
        }
    }
})();

const signupInSigninBtn = document.querySelector(".js-register-btn");
if (signupInSigninBtn) {
    signupInSigninBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        const signinMenu = document.querySelector(".signinMenu");
        const signupMenu = document.querySelector(".signupMenu");
        closeElement(signinMenu);
        openElement(signupMenu);
    });
}

//==================== SIGN UP LOGIC =======================

const signupOpen = document.querySelector(".js-signup");
if (signupOpen) {
    signupOpen.addEventListener("click", (evt) => {
        evt.preventDefault();
        const popUpModal = document.querySelector(".signupMenu");
        openElement(popUpModal);
    });
}

const signupClose = document.getElementById("signupClose");
if (signupClose) {
    signupClose.addEventListener("click", (evt) => {
        const popUpModal = evt.target.closest(".signupMenu");
        closeElement(popUpModal);
    });
}

const signupInput = document.querySelectorAll(".body-box .signupInput");
signupInput.forEach((input) => {
    input.addEventListener("blur", (evt) => {
        const inputElm = evt.target;
        const value = inputElm.value.trim();

        if (value === "") {
            inputElm.classList.remove("success", "invalid");
        } else {
            if (inputElm.classList.contains("signup-email")) {
                emailCheck(value, inputElm);
            } else if (inputElm.classList.contains("signup-confirm-password")) {
                const passwordElm = document.querySelector(".signup-password").value.trim();
                if (value !== passwordElm) {
                    inputElm.placeholder = "Sai mật khẩu!";
                    inputElm.value = "";
                    incorrectElement(inputElm);
                } else {
                    correctElement(inputElm);
                }
            } else if (inputElm.classList.contains("signup-phone")) {
                phoneCheck(value, inputElm);
            } else {
                correctElement(inputElm);
            }
        }
    });
});

const signupButton = document.getElementById("signupSubmitButton");
if (signupButton) {
    signupButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        let allValid = true;

        signupInput.forEach((input) => {
            const value = input.value.trim();
            if (value === "") {
                incorrectElement(input);
                input.placeholder = "Không được bỏ trống";
                allValid = false;
            } else if (input.classList.contains("invalid")) {
                allValid = false;
            } else {
                correctElement(input);
            }
        });

        const checkbox = document.getElementById("checkboxValue");
        if (checkbox && !checkbox.checked) {
            allValid = false;
        }

        if (allValid) {
            const signupMenu = document.querySelector(".signupMenu");
            closeElement(signupMenu);
            const signinModal = document.querySelector(".signinMenu");
            openElement(signinModal);
        }
    });
}

const signinInSignupBtn = document.querySelector(".js-login-btn");
if (signinInSignupBtn) {
    signinInSignupBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        const signinMenu = document.querySelector(".signinMenu");
        const signupMenu = document.querySelector(".signupMenu");
        closeElement(signupMenu);
        openElement(signinMenu);
    });
}

//==================== TOGGLE PASSWORD VISIBILITY =======================

function setupPasswordToggle(toggleElm, inputElm) {
    if (toggleElm && inputElm) {
        toggleElm.addEventListener("click", () => {
            if (inputElm.type === "password") {
                inputElm.type = "text";
                toggleElm.classList.remove("fa-eye-slash");
                toggleElm.classList.add("fa-eye");
            } else {
                inputElm.type = "password";
                toggleElm.classList.remove("fa-eye");
                toggleElm.classList.add("fa-eye-slash");
            }
        });
    }
}

const togglePassword = document.getElementById("togglePassword");
const signinPassword = document.getElementById("signinPassword");
const toggleSignupPass = document.getElementById("toggleSignupPassword");
const signupPassword = document.getElementById("signupPassword");
const toggleConfirmPass = document.getElementById("toggleSignupConfirmPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");

setupPasswordToggle(togglePassword, signinPassword);
setupPasswordToggle(toggleSignupPass, signupPassword);
setupPasswordToggle(toggleConfirmPass, signupConfirmPassword);

//==================== MOBILE MENU LOGIC =======================

const mobileMenuBtn = document.querySelector(".navbar__mobile");
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.add("pushed");
        const mobileMenu = document.querySelector(".mobile-menu");
        openElement(mobileMenu);
    });
}

const mobileMenuCloseBtn = document.querySelector(".mobile-menu__toggle");
if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener("click", () => {
        const mobileMenu = document.querySelector(".mobile-menu");
        closeElement(mobileMenu);
        if (mobileMenuBtn) mobileMenuBtn.classList.remove("pushed");
    });
}

//==================== PRODUCT MODAL LOGIC =======================

function openModal(element) {
    const productCard = element.closest('.product');
    if (!productCard) return;

    const imgElement = productCard.querySelector('.product__img-box img');
    const imgSrc = imgElement ? imgElement.getAttribute('src') : '';

    const titleElement = productCard.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const priceElement = productCard.querySelector('.product__price');
    const price = priceElement ? priceElement.textContent.trim() : '';

    const descElement = productCard.querySelector('.product__description');
    const desc = descElement ? descElement.textContent.trim() : 'Chưa có mô tả cho sản phẩm này.';

    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');

    if (modalImg) modalImg.setAttribute('src', imgSrc);
    if (modalTitle) modalTitle.textContent = title;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;

    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = 'auto';
    }
}

function closeModalOnOutsideClick(event) {
    if (event.target.id === 'productModal') {
        closeModal();
    }
}

//==================== CART & TOAST NOTIFICATION =======================

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    } else {
        alert(message);
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        let cartItems = [];
        const rawCart = localStorage.getItem("cartItems");
        if (rawCart) {
            cartItems = JSON.parse(rawCart);
        }

        let totalCount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalCount += Number(cartItems[i].quantity || 0);
        }
        cartCountElement.textContent = totalCount;
    }
}

function isExistedinCart(item, itemCartArray) {
    let myIndex = -1;
    for (let i = 0; i < itemCartArray.length; i++) {
        if (itemCartArray[i].id === item.id) {
            myIndex = i;
            break;
        }
    }
    return myIndex;
}

function saveToCart(productElement) {
    let itemID = productElement.querySelector(".product__id").textContent.trim();
    let itemIMG = productElement.querySelector("img").getAttribute("src");
    let itemName = productElement.querySelector("h3").textContent.trim();
    let itemPrice = productElement.querySelector(".product__price").textContent.trim();

    let newItem = {
        id: itemID,
        img: itemIMG,
        name: itemName,
        price: itemPrice,
        quantity: 1
    };

    let updatedCartItems = [];
    const rawCart = localStorage.getItem("cartItems");
    if (rawCart) {
        updatedCartItems = JSON.parse(rawCart);
    }

    let index = isExistedinCart(newItem, updatedCartItems);

    if (index >= 0) {
        updatedCartItems[index].quantity++;
    } else {
        updatedCartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartCount();
}

function buyNow(button) {
    const productInfo = button.closest('.product');
    if (productInfo) {
        saveToCart(productInfo);
        window.location.href = "/CART/cart.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const add2CartButtons = document.querySelectorAll(".product__btn-cart");
    add2CartButtons.forEach((button) => {
        button.addEventListener("click", (evt) => {
            const productInfo = evt.target.closest('.product');
            if (productInfo) {
                let itemName = productInfo.querySelector("h3").textContent.trim();
                saveToCart(productInfo);
                showToast(`Đã thêm "${itemName}" vào giỏ hàng!`);
            }
        });
    });
});
