function openCheckout() {
    const overlay = document.getElementById("overlay");
    const checkout = document.getElementById("checkout");
    overlay.classList.add("open");
    checkout.classList.add("open");
}

function closeCheckout() {
    const overlay = document.getElementById("overlay");
    const checkout = document.getElementById("checkout");
    overlay.classList.remove("open");
    checkout.classList.remove("open");
}

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

//==============OPEN/CLOSE CHECKOUT================

const checkoutOpen = document.getElementById("checkoutSubmitBtn");

checkoutOpen.addEventListener("click", openCheckout);

const checkoutClose = document.getElementById("checkoutCloseBtn");

checkoutClose.addEventListener("click", closeCheckout);

//=================VALUE CHECK======================

const phoneElement = document.getElementById("phone");
const emailElement = document.getElementById("email");
const inputElement = document.querySelectorAll(".input");

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
        closeCheckout();
        checkoutOpen.innerHTML = "Đã đặt hàng thành công";
        checkoutOpen.classList.add("activated");
    }
})