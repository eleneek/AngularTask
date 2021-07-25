import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class PreventBackButtonGuard implements CanActivate {
  constructor(private usersServ: UsersService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.usersServ.addAndEditModalOpened) {
      return false;
    } else {
      alert('გთხოვთ დახუროთ მოდალი ან შეინახოთ არსებული ინფორმაცია');
      return false;
    }
  }
}
