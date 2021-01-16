console.log('Hello');

function burgerMenu(selector) {
    let menu = document.querySelector(".burger-menu");
    let button = menu.querySelector(".nav__burger__img")
    let links = menu.querySelector(".burger-menu__link");
    let overlay = menu.querySelector(".burger-menu__overlay");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        toggleMenu();
    });
    [].forEach.call(links, function (el) {
        el.addEventListener("click", () => toggleMenu());
    });
    overlay.addEventListener("click", () => toggleMenu());

    function toggleMenu() {
        menu.classList.toggle("burger-menu__active");
        if (menu.classList.contains("burger-menu__active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }

}

burgerMenu ();
