import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{

  const jwt = localStorage.getItem('jwt');
  if (true) {
      return true;
    }
   else {
    return true;
  }
  return true;
}
