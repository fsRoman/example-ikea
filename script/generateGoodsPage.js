import { getData } from './getData.js';
import userData from './userData.js';



const generateGoodsPage = () => {
    const mainHeader = document.querySelector('.main-header');
    const goodsList = document.querySelector('.goods-list');

    const generateCards = (data) => {
        goodsList.textContent = '';
        
        if (!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ?
                'Ваш список желаний пуст' :
                'По вашему запросу ничего не найдено';
        };
        data.forEach(item => {
            const {
                name: itemName,
                id,
                price,
                description,
                img,
                count
            } = item;

            const itemHTML = `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img 
                                    src="${img[0]}" 
                                    ${img[1] ? `data-second-image="${img[1]}"` : ''} 
                                    alt="${description}">
                            </div>
                            <p class="goods-item__new">${
                                count > 5 ? 'Новинка' : 
                                count === 0 ? 'Нет в наличии' : ''
                            }</p>
                            <h3 class="goods-item__header">${itemName}</h3>
                            <p class="goods-item__description">${description}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>
                        </article>
                    </a>
                </li>
            `;

            goodsList.insertAdjacentHTML('beforeend', itemHTML);
        });

        goodsList.addEventListener('click', e => {
            const btnAddCart = e.target.closest('.btn-add-card');
            if (btnAddCart) {
                e.preventDefault();
                userData.setCartListItem = btnAddCart.dataset.idd;
            };
            // 
        });
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
            document.title = `Поиск - IKEA`;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = 'Список желаний';
            document.title = `Список желаний - IKEA`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            document.title = `${value} - IKEA`;
            if (prop === 'subcat') {
                getData.getCategory(value, (data) => {
                    mainHeader.textContent = `${data}  /  ${value}`;
                });
            } else {
                mainHeader.textContent = value;
            };
        };
    };
};

export default generateGoodsPage;