const arrow = document.querySelector('.js-arrow')

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        arrow.classList.add('open')
    } else {
        arrow.classList.remove('open')
    }

});
