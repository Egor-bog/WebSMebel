

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
                        <ul class="shop-ul">
                            <li class="shopping-element__img-tab">
                                <div class="shopping-element__img-div" >
                                    <img  src="${img}">
                                </div>
                                <div class="shopping-element__name"> ${name}</div>
                            </li>
                            
                            <li class="shopping-element__button">
                                <div class="shopping-element__button-div">
                                    <button class="minus" data-id="${id}">-</button>
                                    <p> ${cartBasket[id]} </p>
                                    <button class="plus" data-id="${id}">+</button>
                                </div>  
                             <div class="shopping-element__price">${price.toLocaleString()} USD</div>
                            <div class="shopping-element__price">${(price*cartBasket[id]).toLocaleString()} USD</div>     
                            </li>
                        </ul>    
                        
                    `;
                   sumCatalog += price;
                }
            });
    
            const html = `
                <div class="shopping-container">
                    ${htmlCatalog}
                    <table>
                        
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

    



    const ROOT_popup = document.getElementById('popupS');

    class POPUP {

        render (idProduct) {
            let htmlPopup = '';

             CATALOG.forEach(({ id, name, price, img, about, category }) => {
                 
                 if (idProduct.indexOf(id) !== -1) {
                    htmlPopup += `
                         <div class="popup-name">${name}
                         </div>
                         <div class="first-content">
                            <div class="popup-img">
                                <img class="popup-img__img" src="${img}">
                            </div>
                            <div class="first-content-txt">
                                <p class="first-content-txt-content">
                                    <b>Коллекция:</b>
                                    <span>${about.коллекция}</span>
                                </p>    
                                <p class="first-content-txt-content">
                                    <b>Механизм:</b>
                                    <span>${about.механизм}</span>
                                </p> 
                                <p class="first-content-txt-content">
                                    <b>Размер:</b>
                                    <span>
                                    <i class="icon-arrows-d"></i>
                                    ${about.размер.дл}
                                    <i class="icon-arrows-h"></i>
                                    ${about.размер.выс}
                                    <i class="icon-expand"></i>
                                    ${about.размер.глуб} 
                                    </span>
                                </p>
                                <p class="first-content-txt-content">
                                    <b>Размер спального места:</b>
                                    <span>${about.Размерспм}</span>
                                </p> 
                            </div>
                         </div>
                         <div class="popup-price">${price.toLocaleString()} USD 
                         </div>
                         <div class="Second-content">
                            <p class="Second-content-txt">
                                <b><br></b>
                                <span>${about.информация}</span>
                            </p> <br>
                                <p class="Second-content-txt">
                                <b>${about.характеристики.заголовок}</b>
                                <span>${about.характеристики.контент}</span>
                            </p><br>
                            <p class="Second-content-txt">
                                <b>${about.омеханизме.заголовок}</b>
                                <span>${about.омеханизме.контент}</span>
                            </p><br>
                            <p class="Second-content-txt">
                                <b>${about.материалы.заголовок}</b>
                                <span>${about.материалы.контент}</span>
                            </p>
                         </div> 
                         
                         
                         
                    `;
                };
            });   

             ROOT_popup.innerHTML = htmlPopup; 
        }


    }
    const popupPage = new POPUP();


     
    
         let idProduct = '';
        
        const body = document.querySelector('body');
        var popup = document.querySelector(".popup-catalog");
        var popupBtn1 = document.querySelectorAll(".products-element__img");
        var popupBtn2 = document.querySelectorAll(".products-element__name");
        var overlay = document.querySelector(".popup-catalog__body");
        var close = document.querySelector(".popup__close");  
        
    
        let unlock = true;
        const timeout = 800;

        for (let i = 0; i < popupBtn1.length; i++) {
            popupBtn1[i].onclick = (e) => {
                popup.classList.add('open');
                body.style.overflow = "hidden";
                idProduct = e.target.id;
                popupPage.render(idProduct);
            }    
        }
        
        for (let i = 0; i < popupBtn2.length; i++) {
            popupBtn2[i].onclick = (e) => {
                popup.classList.add('open');
                body.style.overflow = "hidden";
                idProduct = e.target.id;
                popupPage.render(idProduct);
            }    
        }
        close.onclick = function () {
            popupClose();
        }   
        
        
        overlay.onclick = function (elem) {
            if(elem.target.classList.contains('popup-catalog__body')) {
            popupClose();
            }
        }
        
        function popupClose() {
            popup.classList.remove('open');
            body.style.overflow = "";
        };
      
} 
