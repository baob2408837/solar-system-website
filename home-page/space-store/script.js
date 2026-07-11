// Password modal
const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");

    } else {

        password.type = "password";

        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");

    }

});

// Show/close modal login
const loginBTN = document.querySelector('.js-login')
const modal = document.querySelector('.js-modal')
const modalClose = document.querySelector('.js-xmark')
const modalCTN = document.querySelector('.js-modal-container')
const loginFromReg = document.querySelector('.js-login-btn')

function showModal(){
    modal.classList.add('open')
}

function closeModal(){
    modal.classList.remove('open')
}

loginBTN.addEventListener('click', showModal)
modalClose.addEventListener('click', closeModal)
modal.addEventListener('click', closeModal)
modalCTN.addEventListener('click', function(event){
            event.stopPropagation()
        })
loginFromReg.addEventListener('click', showModal)


// Show/close modal register
const registerBTN = document.querySelector('.js-register-btn')
const modalRag = document.querySelector('.js-modal-register')
const closeReg = document.querySelector('.js-xmarkReg')

function showModalRag(){
    modalRag.classList.add('open')
}

function closeModalRag(){
    modalRag.classList.remove('open')
}

registerBTN.addEventListener('click', showModalRag)
registerBTN.addEventListener('click', closeModal)
loginFromReg.addEventListener('click', closeModalRag)
closeReg.addEventListener('click', closeModalRag)

