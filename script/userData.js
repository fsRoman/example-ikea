import { getLocalStorage, setLocalStorage } from './storage.js';


const userData = {
    wishListData: getLocalStorage('wishListData'),
    get wishList() {
        return this.wishListData;
    },
    set wishList(id) {
        if (this.wishListData.includes(id)) {
            const index = this.wishListData.indexOf(id);
            this.wishListData.splice(index, 1);
        } else {
            
            this.wishListData.push(id);
        };
        setLocalStorage('wishListData', this.wishListData);
    },

    cartListData: getLocalStorage('cartListData'),
    get cartList() {
        return this.cartListData;
    },
    set setCartListItem(id) {
        let obj = this.cartListData.find(item => item.id === id);
        // console.log(`setCartListItem(${id})`);
        if (obj) {
            // console.log(`${id} is TRUE`);
            const index = this.cartListData.indexOf(obj);
            // console.log(`cartListData before update \n${this.cartListData}`);
            this.cartListData.splice(index, 1);
        } else {
            // console.log(`${id} is FALSE`);
            obj = {
                id,
                count: 1
            };
            // console.log(`cartListData before update \n${this.cartListData}`);
            this.cartListData.push(obj);
        };
        // console.log(`cartListData after update \n${this.cartListData}`);
        setLocalStorage('cartListData',this.cartListData);
    },
    set changeCartListItem(itemCart) {
        let obj = this.cartListData.find(item => item.id === itemCart.id);
        if (obj) {
            obj.count = itemCart.count;
        } else {
            obj = {
                id: itemCart.id,
                count: itemCart.count
            };
            this.cartListData.push(obj);
        };
        setLocalStorage('cartListData',this.cartListData);
    }
};

export default userData;