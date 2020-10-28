import { getData } from './getData.js'
import userData from './userData.js'



const generateItemPage = () => {

    const renderCard = ({category, subcategory, id, name: itemName, description, count, price, img}) => {
        document.title = `${itemName} - IKEA`;
        const breadcrumbLink = document.querySelectorAll('.breadcrumb__link');
        breadcrumbLink[0].textContent = category;
        breadcrumbLink[0].href = `goods.html?cat=${category}`;
        breadcrumbLink[1].textContent = subcategory;
        breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
        breadcrumbLink[2].textContent = itemName;

        const goodImages = document.querySelector('.good-images');
        const goodItem = document.querySelector('.good-item');
        const goodItemNew = document.querySelector('.good-item__new');
        const goodItemHeader = document.querySelector('.good-item__header');
        const goodItemDescription = document.querySelector('.good-item__description');
        const goodItemPriceValue = document.querySelector('.good-item__price-value');
        const btnGood = document.querySelector('.btn-good');
        const btnAddWishlist = document.querySelector('.btn-add-wishlist');

        goodItemHeader.textContent = itemName;
        goodItemDescription.textContent = description;
        goodItemPriceValue.textContent = price;
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;
        
        if (count === 0) {
            goodItem.classList.add('not-in-stock')
        } else if (count > 5) {
            goodItemNew.style.display = 'block';
        };
        
        img.forEach(item => {
            goodImages.insertAdjacentHTML('afterbegin',`
            <div class="good-image__item">
                <img src="${item}" alt="${itemName} - ${description}">
            </div>
            `);
        }); 
        
        const checkWishList = () => {
            if (userData.wishList.includes(id)) {
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            }
        };
        

        btnGood.addEventListener('click', () => {
            userData.setCartListItem = id;
        });
        btnAddWishlist.addEventListener('click', () => {
            userData.wishList = id;
            checkWishList();
        });
        checkWishList();
    };
    
    if (location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.substring(1), renderCard);
    };

};

export default generateItemPage;