import { getData } from './getData.js';
import userData from './userData.js';


const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error(`Ошибка запроса ${url}; Статус ошибки ${response}`);
    };

    return await response.json();
}

const sendCart = () => {
    const cartForm = document.querySelector('.cart-form');


    cartForm.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(cartForm);
        

        for (const [key, value] of formData) {
            formData[key] = value;
        };

        formData.order = userData.cartList;
        console.log(formData)
        
        sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(formData))
            .then(() => {
                cartForm.reset();
            })
            .catch((err) => {
                console.log(err);
            });
    })
}

const generateCartPage = () => { 
    if (location.pathname.includes('cart')) {
        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');

        const renderCartList = (data) => {
            cartList.textContent = '';
            if (!data.length) {
                cartList.textContent = 'Ваша корзина пуста';
            };
            
            let totalSum = 0;

            data.forEach(item => {
                const {
                    id,
                    name: itemName,
                    subcategory,
                    description,
                    price,
                    count: balanceCount,
                    img
                } = item;
                const cartCount = userData.cartList
                    .find(item => item.id === id).count;

                const itemSum = +price * cartCount;
                totalSum += itemSum;

                let optionHTML = '';
                for (let i = 1; i <= balanceCount; i++) {
                    optionHTML += i === cartCount ? `
                    <option value="${i}" selected>${i}</option>` : `
                    <option value="${i}">${i}</option>`;
                }; // for
                
                const cartItemHTML = `
                    <li class="cart-item">
                        <div class="product">
                            <div class="product__image-container">
                                <img src="${img[0]}" alt="IKEA ${itemName} ${description}" aria-describedby="aria_product_description_40366083" itemprop="image">
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html#${id}">${itemName}</a></h3>
                                <p class="product_description-text">${description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">${itemSum}.-</div>
                                        ${cartCount > 1 ? `
                                        <div class="product__price-regular">${price}.-</div>` : 
                                        ''}
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">
                                <div class="product-controls__remove">
                                    <button type="button" class="btn btn-remove" data-idd=${id}>
                                        <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                    </button>
                                </div>
                                <div class="product-controls__quantity">
                                    <select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                                        ${optionHTML}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>
                `;

                cartList.insertAdjacentHTML('beforeend', cartItemHTML);
            }); // data.forEach
            
            cartTotalPrice.textContent = totalSum + ".-";

        }; // renderCartList

        cartList.addEventListener('change', e => {
            console.log('change');
            userData.changeCartListItem = {
                id: e.target.dataset.idd,
                count: parseInt(e.target.value)
            };
            getData.cart(userData.cartList, renderCartList);
        });
        cartList.addEventListener('click', e => {
        console.log('click');
        const btnRemove = e.target.closest('.btn-remove');
        if (btnRemove) {
            console.log('btnRemove', btnRemove.dataset.idd);
            userData.setCartListItem = btnRemove.dataset.idd;
            getData.cart(userData.cartList, renderCartList);
            console.log(userData.cartList);
        };
    });

    
        getData.cart(userData.cartList, renderCartList);

        sendCart();
    }; // if

}; // generateCartPage

export default generateCartPage;