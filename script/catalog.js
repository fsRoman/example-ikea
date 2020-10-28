import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {
    const updateSubCatalog = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const btnReturn = document.querySelector('.btn-return');
    const catalog = document.querySelector('.catalog');
    const subCatalog = document.querySelector('.subcatalog');
    const subCatalogHeader = document.querySelector('.subcatalog-header');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay);

    // __________________________________________________________________________

    const removeActiveClass = () => {
        const catalogList = document.querySelectorAll('.catalog-list__item.active');
        if (catalogList) {
            catalogList.forEach(item => {
                item.classList.remove('active');
            });
        };
    };

    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        closeSubMenu();
        catalog.classList.remove('open');
        overlay.classList.remove('active');
    };

    const handlerCatalog = (event) => {
        event.preventDefault();
        removeActiveClass();
        // const target = event.target;
        const itemList = event.target.closest('.catalog-list__item>a');
        if (itemList) {
            itemList.classList.add('active');
            
            getData.subCatalog(itemList.textContent, data => {
                updateSubCatalog(itemList.textContent, data);
                subCatalog.classList.add('subopen');
            });
        };

        if (event.target.closest('.btn-close')) {
            closeMenu();
        };
    };

    const closeSubMenu = () => {
        // subCatalogHeader.innerHTML = '';
        subCatalog.classList.remove('subopen');
        removeActiveClass();
    }

    // ___________________________________________________________________________


    btnBurger.addEventListener('click', openMenu);
    
    // btnCloseMenu.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    catalog.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', event => {
        const btnReturn = event.target.closest('.btn-return');
        if (btnReturn) closeSubMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeMenu();
        };
    });
};