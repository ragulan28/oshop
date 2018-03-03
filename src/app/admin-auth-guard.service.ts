import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userServices: UserService) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userServices.get(user.uid))
      .map(appUser => appUser.isAdmin);
  }
}
