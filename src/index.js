

function burgerMenu(selector) {
    let menu = document.querySelector(".burger-menu");
    let button = menu.querySelector(".nav__burger__img")
    let links = menu.querySelector(".burger-menu__link");
    let overlay = menu.querySelector(".burger-menu__overlay");
    let mapConteiner = document.querySelector(".map-conteiner");
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
            if (document.querySelector('body#contacts')) {
              mapConteiner.classList.add("map-conteiner__active");  
            }
            
        } else {
            document.body.style.overflow = "visible";
            if (document.querySelector('body#contacts')) {
            mapConteiner.classList.remove("map-conteiner__active");
            }
        }
    }

}

burgerMenu ();


//Кол товаров в корзине
class KOLPRODUCTS {
    
    render (count) {
        var navBasket = document.querySelector(".nav__basket");
    //navBasket.onclick= function() {href = "./basket.html";};
    navBasket.style.position = "relative";
    navBasket.style.display = "inline-block";
    
    if(document.querySelector(".nav__basket__span")) {
        var old =  document.querySelector(".nav__basket__span")
        navBasket.removeChild(old);
    }
    // создаем элемент
    var elem = document.createElement("span");
    elem.className = "nav__basket__span";
    // создаем для него текст
    var elemText = document.createTextNode(`${count}`);
    // добавляем текст в элемент в качестве дочернего элемента
    elem.appendChild(elemText);
    // добавляем элемент в блок div
    navBasket.appendChild(elem);
    }
}
const kolProducts = new KOLPRODUCTS;
kolProducts.render(localStorageUtil.getProducts().length);

  
//-----

// Страница Корзина

if (document.querySelector('body#basket')) {
    let cart = localStorageUtil.getProducts();
    

    function basketObj(cart) {
        
        var basketO = {};
        CATALOG.forEach(({ id}) => {
            if (cart.indexOf(id) !== -1) {
                basketO[`${id}`] = 1;  
            }
        });
        return basketO;
    };  
    
    let cartBasket = (basketObj(cart));

    const ROOT_SHOPPING = document.getElementById('shopping');
    let kol = 1;


    class Shopping {
        handleClear() {
            ROOT_SHOPPING.innerHTML = '';
        }
    
        render() {
            const productsStore = localStorageUtil.getProducts();
            let htmlCatalog = '';
            let sumCatalog = 0;
            let stringProducts = "";


    
            CATALOG.forEach(({ id, name, price, img }) => {
                if (productsStore.indexOf(id) !== -1) {
                    stringProducts += "Товар:" + name + "  кол-во:" +cartBasket[id] + ".\n" 
                    htmlCatalog += `
                        <tr>
                            <td class="shopping-element__img-tab">
                                <div class="shopping-element__img-div" >
                                    <img src="${img}">
                                </div>
                            </td>
                            <td class="shopping-element__name"> ${name}</td>
                            <td class="shopping-element__button">
                                <div class="shopping-element__button-div">
                                    <button class="minus" data-id="${id}">-</button>
                                    <p> ${cartBasket[id]} </p>
                                    <button class="plus" data-id="${id}">+</button>
                                </div>    
                            </td>
                            <td class="shopping-element__price">${price.toLocaleString()} USD</td>
                            <td class="shopping-element__price">${(price*cartBasket[id]).toLocaleString()} USD</td>
                        </tr>
                    `;
                   sumCatalog += price;
                }
            });
    
            const html = `
                <div class="shopping-container">
                    <table>
                        ${htmlCatalog}
                        <tr>
                            <td class="shopping-element__name">Сумма:</td>
                            <td class="shopping-element__price">${sumCatalog.toLocaleString()} USD</td>
                        </tr>
                    </table>
                </div>
            `;
            ROOT_SHOPPING.innerHTML = html;
             var strBasket = document.querySelector("#contactform");
             
                 var eleminp = document.createElement("input");
                 eleminp.setAttribute('type','hidden');
                 eleminp.setAttribute('name','comment');
                 eleminp.setAttribute('value',`${stringProducts}`);
                 strBasket.appendChild(eleminp);
                 
        }
    }
    
    const shoppingPage = new Shopping();
    shoppingPage.render();

    document.onclick = event => {
        if(event.target.classList.contains('plus')) {
            plusFunction(event.target.dataset.id);
        }
        if(event.target.classList.contains('minus')) {
            minusFunction(event.target.dataset.id);
        }
    }

    const plusFunction = id => {
        cartBasket[id]++;
        shoppingPage.render();
    }
    const minusFunction = id => {
        if(cartBasket[id] - 1 == 0) {
            deleteFunction(id);
        }
        cartBasket[id]--;
        shoppingPage.render();
    }
    const deleteFunction = id => {
        delete cartBasket[id];
        localStorageUtil.putProducts(id);
        shoppingPage.render();
    }

 }  


// Модалка в каталоге
if (document.querySelector('body#catalog')) {

    let idProduct;

    var popup = document.getElementById("popup__basket");
    var overlay = document.getElementById("overlay-basket");
    var span = document.getElementsByClassName("popup__close");    

    document.onclick = event => {
        if(event.target.classList.contains('products-element__img') || event.target.classList.contains('products-element__name')) {
            popup.style.display = "block";
            idProduct = event.target.dataset.id;
        }  
    }    
        
    span.onclick = function () {
        popup.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == overlay) {
            popup.style.display = "none";
        }
    }  
}