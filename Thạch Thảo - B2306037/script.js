document.addEventListener("DOMContentLoaded", function () {

    var localLinks = document.querySelectorAll('a[href^="#"]');
    var topBtn = document.getElementById("topBtn");
    var planetSections = document.querySelectorAll(".planet-section");

    for (var i = 0; i < localLinks.length; i++) {
        localLinks[i].addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#" || targetId === "") return;

            var targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault(); 
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    window.addEventListener("scroll", function () {
        // Xử lý nút Back to top
        if (topBtn) {
            if (window.pageYOffset > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        }

        for (var j = 0; j < planetSections.length; j++) {
            var section = planetSections[j];
            var position = section.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;

            // Nếu phần tử xuất hiện trong tầm nhìn màn hình 80%
            if (position < screenHeight * 0.8) {
                section.classList.add("show");
            }
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
