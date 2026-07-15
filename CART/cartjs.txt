
/*==============================================
                OPEN/CLOSE WINDOW
==============================================*/

//====================OPEN======================

function openElement(elmt) {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.add("open");
    if (elmt && elmt.classList) elmt.classList.add("open");
}

//====================CLOSE======================

function closeElement(elmt) {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.remove("open");
    if (elmt && elmt.classList) elmt.classList.remove("open");
}

/*=================================================
             CORRECT/UNCORRECT ELMT
=================================================*/

function correctElement(element) {
    if (element.classList.contains("invalid")) {
        element.classList.remove("invalid");
    }
    element.classList.add("success");
}

function uncorrectElement(element) {
    if (element.classList.contains("success")) {
        element.classList.remove("success");
    }
    element.classList.add("invalid");
    element.value = "";
    if (element === emailElement) {
        element.placeholder = "Email không hợp lệ!";
    } else if (element === phoneElement) {
        element.placeholder = "Số điện thoại không hợp lệ!";
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
            emailElement.placeholder = "Ví dụ: 0123 456 789";
        } else if (emailElement.classList.contains("invalid")) {
            emailElement.classList.remove("invalid");
            emailElement.placeholder = "Ví dụ: 0123 456 789";
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
            phoneElement.placeholder = "Ví dụ: abc@gmail.com";
        } else if (phoneElement.classList.contains("invalid")) {
            phoneElement.classList.remove("invalid");
            phoneElement.placeholder = "Ví dụ: abc@gmail.com";
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
                           SIGNIN
===========================================================*/

const signinOpen = document.querySelector(".js-login");

signinOpen.addEventListener("click", () => {
    const signinMenu = document.querySelector(".signinMenu");
    openElement(signinMenu);
})

const signinClose = document.getElementById("signinClose");

signinClose.addEventListener("click", () => {
    const signinMenu = document.querySelector(".signinMenu");
    closeElement(signinMenu);
})

const signinEmail = document.getElementById("signinEmail")
const signinPassword = document.getElementById("signinPassword");

signinEmail.addEventListener("blur", () => {
    if (signinEmail.value.trim() !== "" && validateEmail(signinEmail.value.trim())) {
        correctElement(signinEmail);
    } else if (signinEmail.value.trim() === "") {
        uncorrectElement(signinEmail);
        signinEmail.placeholder = "Không được bỏ trống!";
    } else if (signinEmail.value.trim() !== "" && !validateEmail(signinEmail.value.trim())) {
        uncorrectElement(signinEmail);
        signinEmail.value = "";
        signinEmail.placeholder = "Email không hợp lệ!";
    }
})

signinPassword.addEventListener("blur", () => {
    if (signinPassword.value.trim() === "") {
        uncorrectElement(signinPassword);
        signinEmail.placeholder = "Không được bỏ trống!";
    } else {
        correctElement(signinPassword);
    }
})

const signinSubmitBtn = document.getElementById("signinSubmitButton");

signinSubmitBtn.addEventListener("click", () => {
    let allValid = true;
    console.log("you clicked");
    const signinInput = document.querySelectorAll(".sign-in-input");
    signinInput.forEach(elmt => {
        if (!elmt.classList.contains("success")) {
            allValid = false;
        }
    })
    if (allValid) {
        const signinMenu = document.querySelector(".signinMenu");
        closeElement(signinMenu);
    } else {
        signinInput.forEach(elmt => {
            if (elmt.value.trim() === "") {
                uncorrectElement(elmt);
                elmt.placeholder = "Không được bỏ trống!";
            }
        })
    }
})

const signupInSigninBtn = document.querySelector(".js-register-btn");

signupInSigninBtn.addEventListener("click", () => {
    console.log("you clicked");
    const signinMenu = document.querySelector(".signinMenu")
    const signupMenu = document.querySelector(".signupMenu");
    closeElement(signinMenu);
    openElement(signupMenu);
})


/*===========================================================
                           SIGNUP
===========================================================*/

const signupOpen = document.querySelector(".js-signup");

signupOpen.addEventListener("click", () => {
    const signupMenu = document.querySelector(".signupMenu");
    openElement(signupMenu);
})

const signupClose = document.getElementById("signupClose");

signupClose.addEventListener("click", () => {
    const signupMenu = document.querySelector(".signupMenu");
    closeElement(signupMenu);
})

const signupInput = document.querySelectorAll(".signupInput");
const signupEmail = document.querySelector(".signup-email");
const signupPhone = document.querySelector(".signup-phone");
const signupPassword = document.querySelector(".signup-password");
const signupConfirmPassword = document.querySelector(".signup-confirm-password");

signupInput.forEach(elmt => {
    elmt.addEventListener("blur", () => {
        if (elmt.value.trim() === "") {
            uncorrectElement(elmt);
            elmt.placeholder = "Không được bỏ trống!";
        } else if (elmt === signupPhone) {
            if (!validatePhone(elmt.value.trim())) {
                uncorrectElement(elmt);
                elmt.placeholder = "Số điện thoại không hợp lệ";
            } else {
                correctElement(elmt);
            }
        } else if (elmt === signupEmail) {
            if (!validateEmail(elmt.value.trim())) {
                uncorrectElement(elmt);
                elmt.placeholder = "Email không hợp lệ!";
            } else {
                correctElement(elmt);
            }
        } else if (elmt === signupConfirmPassword) {
            if (signupConfirmPassword.value !== signupPassword.value) {
                uncorrectElement(elmt);
                elmt.placeholder = "Mật khẩu không đúng!";
            } else {
                correctElement(elmt);
            }
        } else if (elmt !== signupPhone && elmt !== signupEmail && elmt !== signupConfirmPassword && elmt.value.trim() !== "") {
            correctElement(elmt);
            if (elmt === signupPassword && signupConfirmPassword && signupConfirmPassword.value.trim() !== "") {
                if (signupConfirmPassword.value !== signupPassword.value) {
                    uncorrectElement(signupConfirmPassword);
                    signupConfirmPassword.placeholder = "Mật khẩu không trùng khớp!";
                } else {
                    correctElement(signupConfirmPassword);
                }
            }
        }
    })
})

const signupSubmitBtn = document.getElementById("signupSubmitButton");

signupSubmitBtn.addEventListener("click", () => {
    let allValid = true;
    signupInput.forEach(elmt => {
        if (!elmt.classList.contains("success")) {
            allValid = false;
        }
    })
    const checkbox = document.getElementById("checkboxValue");
    if (!checkbox.checked) {
        allValid = false;
    }
    if (allValid) {
        console.log("you clicked");
        const signinMenu = document.querySelector(".signinMenu");
        const signupMenu = document.querySelector(".signupMenu");
        closeElement(signupMenu);
        openElement(signinMenu);
    } else {
        signupInput.forEach(elmt => {
            if (elmt.value.trim() === "") {
                uncorrectElement(elmt);
                elmt.placeholder = "Không được bỏ trống!";
            }
        })
    }
})

const signinInSignupBtn = document.querySelector(".js-login-btn");

signinInSignupBtn.addEventListener("click", () => {
    const signinMenu = document.querySelector(".signinMenu");
    const signupMenu = document.querySelector(".signupMenu")
    closeElement(signupMenu);
    openElement(signinMenu);
})

/*===========================================================
                        MOBILE MENU
===========================================================*/

const mobileMenuBtn = document.querySelector(".navbar__mobile");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.add("pushed");
    const mobileMenu = document.querySelector(".mobile-menu");
    openElement(mobileMenu);
})

const mobileMenuCloseBtn = document.querySelector(".mobile-menu__toggle");

mobileMenuCloseBtn.addEventListener("click", () => {
    const mobileMenu = document.querySelector(".mobile-menu");
    closeElement(mobileMenu);
    mobileMenuBtn.classList.remove("pushed");
})

/*===========================================================
                        ITEM'S QUANTITY
===========================================================*/

const btnUp = document.querySelectorAll(".quantity-button__up");
const btnDown = document.querySelectorAll(".quantity-button__down");

btnUp.forEach(elmt => {
    elmt.addEventListener("click", () => {
        const quantityNumber = elmt.previousElementSibling;
        let currentValue = Number(quantityNumber.innerText);
        quantityNumber.innerText = currentValue + 1;
        // updateTotalPrice();
    });
});

btnDown.forEach(elmt => {
    elmt.addEventListener("click", () => {
        const quantityNumber = elmt.nextElementSibling;
        let currentValue = Number(quantityNumber.innerText);
        if (currentValue > 1) {
            quantityNumber.innerText = currentValue - 1;
        }
        // updateTotalPrice();
    });
});

/*===========================================================
                         COUPON
===========================================================*/

const couponText = document.querySelector(".coupon__text");
const couponSubmit = document.querySelector(".coupon__submit");

let isCouponApplied = false;

couponSubmit.addEventListener("click", () => {
    if (couponText.value.trim() === "abc") {
        if (!couponText.classList.contains("approved")) {
            couponText.classList.add("approved");
        }
        isCouponApplied = true;
        couponText.value = "";
        couponText.placeholder = "Áp dụng thành công!";
    } else if (couponText.value.trim() !== "abc") {
        if (couponText.classList.contains("approved")) {
            couponText.classList.remove("approved");
        }
        isCouponApplied = false;
        couponText.value = "";
        couponText.placeholder = "Mã không chính xác!";
    }
    // updateTotalPrice();
});

//==================BUG COUPON TEXT FIX======================

couponText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        couponSubmit.click();
    }
});


/*===========================================================
                       SUMMARY PRICE
===========================================================*/

const item1Price = document.querySelector(".item-price1");
const item2Price = document.querySelector(".item-price2");
const tempPrice = document.querySelector(".tempPrice");
const sumPrice = document.querySelector(".sumPrice");
let quantity1 = document.querySelector(".quantity-item1");
let quantity2 = document.querySelector(".quantity-item2");

// function updateTotalPrice() {
//     let tempPriceElement = Number(item1Price.innerText) * Number(quantity1.innerText) + Number(item2Price.innerText) * Number(quantity2.innerText);
//     tempPrice.innerText = tempPriceElement;
//     let sumPriceElement = 0;
//     if (couponCheck(couponText)) {
//         sumPriceElement = tempPriceElement * 0.8;
//     } else {
//         sumPriceElement = tempPriceElement;
//     }
//     sumPrice.innerText = sumPriceElement;
// }

// updateTotalPrice();

/*===========================================================
                      BACK TO TOP
===========================================================*/

const backToTopBtn = document.getElementById("backToTop");

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