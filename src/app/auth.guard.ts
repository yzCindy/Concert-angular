import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { inject } from '@angular/core';

//service
import { UserService } from './services/user.service';

//environment
import { levelName } from '../environments/environment';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean => {

  const userService = inject(UserService);
  const msg = inject(NzMessageService);
  const router = inject(Router)

  if (userService.level==levelName.user) {
    return true;
  } else {
    msg.error("未有權限，請重新登入")

    console.log('hello cindy');

    console.log('main hello');

    return router.navigateByUrl('/welcome');
  }

}
