import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from "../models/app-user";
import 'core-js/es7/reflect';
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCardItemCount: number;


  constructor(private auth: AuthService, private shoppingCardService:ShoppingCartService) {

  }


  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCardService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCardItemCount=0;
      for (let productId in cart.items) {
        this.shoppingCardItemCount += cart.items[productId].quantity;
      }
    });
  }


  logout() {
    this.auth.logout();
  }
}
