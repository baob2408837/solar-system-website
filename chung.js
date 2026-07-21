//====================SET UP=======================


/*=================================================
                  OPEN/CLOSE ELMT
=================================================*/


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


/*=================================================
             CORRECT/UNCORRECT ELMT
=================================================*/


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


/*=================================================
                    VALUE CHECK
=================================================*/


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



//====================ELEMENTS=======================

/*===================================================
                      SIGN IN
===================================================*/

//SIGN IN ACCOUNT

const user1 = {
    userName: "user1",
    userEmail: "a@gmail.com",
    userPassword: "12345678"
};

//SIGN IN OPEN/CLOSE

const signinOpen = document.querySelector(".js-login");

signinOpen.addEventListener("click", (evt) => {
    const popUpModal = document.querySelector(".signinMenu");

    openElement(popUpModal);
})

const signinClose = document.getElementById("signinClose");

signinClose.addEventListener("click", (evt) => {
    const popUpModal = evt.target.parentElement.parentElement.parentElement;

    closeElement(popUpModal);
})

//SIGN IN VALUE VALIDATE

const signinMenu = document.querySelector(".signinMenu .modal-body");
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

//SIGN IN BUTTON

const signinButton = document.getElementById("signinSubmitButton");

signinButton.addEventListener("click", (evt) => {
    evt.preventDefault();

    const Submit = evt.currentTarget;
    const modal = Submit.parentElement;

    const inputEmail = modal.children[1];
    const inputPassword = modal.children[3].children[0];

    let allValid = true;
    if (inputEmail.value.trim() !== user1.userEmail || inputPassword.value.trim() !== user1.userPassword) {
        allValid = false;
        alert("sai mật khẩu hoặc email");
        incorrectElement(inputEmail);
        incorrectElement(inputPassword);
    }
    if (allValid) {
        const topBarLogin = document.querySelector(".top-bar__login");
        const greetingLogin = document.createElement("p");

        greetingLogin.textContent = `Chào ${user1.userName}`;
        topBarLogin.replaceChildren(greetingLogin);

        localStorage.setItem("user1", JSON.stringify(user1));

        const signinPopUp = evt.target.closest(".modal");
        closeElement(signinPopUp);
    }
});

; (() => {
    const user1Data = localStorage.getItem("user1");
    if (user1Data !== null && user1Data !== undefined) {
        const user1Element = JSON.parse(user1Data);
        const topBarLogin = document.querySelector(".top-bar__login");
        const greetingLogin = document.createElement("p");

        if (topBarLogin) {
            greetingLogin.textContent = `Chào ${user1Element.userName}`;
            topBarLogin.replaceChildren(greetingLogin);
        }
    }
})();

//SIGN UP REDIRECT

const signupInSigninBtn = document.querySelector(".js-register-btn");

signupInSigninBtn.addEventListener("click", () => {
    const signinMenu = document.querySelector(".signinMenu")
    const signupMenu = document.querySelector(".signupMenu");
    closeElement(signinMenu);
    openElement(signupMenu);
})

/*===================================================
                      SIGN UP
===================================================*/

//SIGN UP OPEN/CLOSE

const signupOpen = document.querySelector(".js-signup");


if (signupOpen) {
    signupOpen.addEventListener("click", (evt) => {
        const popUpModal = document.querySelector(".signupMenu");
        openElement(popUpModal);
    })
}

const signupClose = document.getElementById("signupClose");

signupClose.addEventListener("click", (evt) => {
    const popUpModal = evt.target.parentElement.parentElement.parentElement;
    closeElement(popUpModal);
})

//SIGN UP VALUE VALIDATE

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
    })
})

//SIGN UP BUTTON

const signupButton = document.getElementById("signupSubmitButton");

signupButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const signupMenu = evt.target.parentElement;

    let allValid = true;

    signupInput.forEach((input) => {
        const value = input.value.trim();
        if (value === "") {
            incorrectElement(input);
            input.placeholder = "Không được bỏ trống";
            allValid = false;
        } else if (input.classList.contains("invalid")) {
            incorrectElement(input);
            allValid = false;
        } else {
            correctElement(input);
        }
    });

    const checkbox = document.getElementById("checkboxValue");

    if (!checkbox.checked) {
        allValid = false;
    }

    if (allValid) {
        const popUpModal = signupMenu.parentElement.parentElement;
        closeElement(popUpModal);
        const signinModal = document.querySelector(".signinMenu");
        openElement(signinModal);
    }
});

//SIGN IN REDIRECT

const signinInSignupBtn = document.querySelector(".js-login-btn");

signinInSignupBtn.addEventListener("click", () => {
    const signinMenu = document.querySelector(".signinMenu");
    const signupMenu = document.querySelector(".signupMenu")
    closeElement(signupMenu);
    openElement(signinMenu);
})

/*==================================================================
                    TOGGLE PASSWORD VISIBILITY
==================================================================*/

function setupPasswordToggle(toggleId, inputId) {
    if (toggleId && inputId) {
        toggleId.addEventListener("click", () => {
            if (inputId.type === "password") {
                inputId.type = "text";
                toggleId.classList.remove("fa-eye-slash");
                toggleId.classList.add("fa-eye");
            } else {
                inputId.type = "password";
                toggleId.classList.remove("fa-eye");
                toggleId.classList.add("fa-eye-slash");
            }
        });
    }
}

const togglePassword = document.getElementById("togglePassword");
const toggleSignupPass = document.getElementById("toggleSignupPassword");
const toggleConfirmPass = document.getElementById("toggleSignupConfirmPassword");

setupPasswordToggle(togglePassword, signinPassword);
setupPasswordToggle(toggleSignupPass, signupPassword);
setupPasswordToggle(toggleConfirmPass, signupConfirmPassword);

/*==================================================================
                       MOBILE/HAMBURGER MENU
==================================================================*/

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