
const cartEvent = new Event('cartUpdated');

export default class StorageService {
    #setItem( name, value ){
        if(name !== undefined)
            typeof value === Object ? 
                localStorage.setItem(name,JSON.stringify(value)) : localStorage.setItem(name,JSON.stringify(value))
    }

    #getItem( name ) {
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch {
            return localStorage.getItem(name);
        }
    }

    #removeItem( name ){
        localStorage.removeItem(name);
    }

    #checkIfItemExistsIncart(item,cart){
        let items = cart.filter(({product:{id},size})=> item.product.id === id && item.size === size);
        return items;
    }

    addItemInBasket(value){

        let cart = this.#getItem("cart");

        let existingItmes = this.#checkIfItemExistsIncart(value,cart);

        if(existingItmes.length) {
            return this.updateBasket(existingItmes[0], existingItmes[0].amount +1)
        }

        if(cart !== null){
            this.#setItem("cart", [...cart, value]);
        }else{
            this.#setItem("cart", [value]);
        }
        cartEvent.value = value;
        document.dispatchEvent(cartEvent);
    }

    getBasket() {
        return this.#getItem('cart');
    }
    
    emptyBasket() {
        this.#removeItem('cart');
    }

    updateBasket(item, amount ){
        let basket = this.getBasket();
        
        basket.forEach(({product,size},index) => {
            if(product.id === item.product.id && item.size === size ){
                basket[index].amount = amount;
            }
        });

        this.#setItem('cart', basket);
        document.dispatchEvent(cartEvent);
    }

    removeItemFromBasket(item) {
        let basket = this.getBasket();
        let newBasket = basket.filter(({product:{id}, size}) => {
           if(item.product.id === id && item.size === size) return false;
           return true;
        });
        this.#setItem('cart', newBasket);
        document.dispatchEvent(cartEvent);
    }
}