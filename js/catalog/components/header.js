class Header {
    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    render(count) {
        const html = `
           <div class="header-container">
                <div class="header-counter" onclick="headerPage.handlerOpenShoppingPage();">
                    🔥 ${count}
                </div>
           </div>
        `;
        var articleDiv = document.querySelector(".nav__basket");
        articleDiv.onclick= function() {headerPage.handlerOpenShoppingPage();};
        articleDiv.style.position = "relative";
        articleDiv.style.display = "inline-block";

        if(document.querySelector(".nav__basket__span")) {
            var old =  document.querySelector(".nav__basket__span")
            articleDiv.removeChild(old);
        }
        // создаем элемент
        var elem = document.createElement("span");
        elem.className = "nav__basket__span";
        // создаем для него текст
        var elemText = document.createTextNode(`${count}`);
        // добавляем текст в элемент в качестве дочернего элемента
        elem.appendChild(elemText);
        // добавляем элемент в блок div
        articleDiv.appendChild(elem);

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);