import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Product} from "./models/product";
import 'rxjs/add/operator/take';
import {ShoppingCart} from "./models/shopping-cart";

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
    let cardId = await this.getOrCreateCardId();
    return this.db.object('/shopping-carts/' + cardId);
  }


  private async getOrCreateCardId(): Promise<string> {
    let cardId = localStorage.getItem('cartId');
    if (!cardId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);

      return result.key;
    }
    return cardId;

  }


  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCardId();
    let items$ = this.getItem(cartId, product.$key);
    items$.take(1).subscribe(item => {
      items$.update({product: product, quantity: (item.quantity || 0) + change});
    });
  }


  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }


  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
  }
}
