import {Component, Input} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;


  constructor(private shoppingCartService: ShoppingCartService) {
  }


  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }


  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }


  getQuantity() {
    if (this.shoppingCart) {
      let item = this.shoppingCart.items[this.product.$key];
      return item ? item.quantity : 0;
    }
    return 0;
  }
}
