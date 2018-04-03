import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CommonService } from './services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private common: CommonService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.common.getInitialized()) {
      return true;
      } else {
        this.router.navigate(['/home']);
        return false;
     }
  }
}
