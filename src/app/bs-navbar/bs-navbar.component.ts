import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from "../models/app-user";
import 'core-js/es7/reflect';
import {ShoppingCartService} from "../shopping-cart.service";
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;


  constructor(private auth: AuthService, private shoppingCardService: ShoppingCartService) {

  }


  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCardService.getCart();

  }


  logout() {
    this.auth.logout();
  }
}
