import {ShoppingCartItems} from "./shopping-cart-items";

export class ShoppingCart {
  constructor(public items: ShoppingCartItems[]) {

  }

  get productsIds(){
    return Object.keys(this.items);
  }


  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
