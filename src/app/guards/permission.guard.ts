import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const hasUser = await this.hasUser();
    if (hasUser) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  private async hasUser(): Promise<boolean> {
    try {
      const user = await this.authService.currentUser();
      return user != null;
    } catch (error) {
      return false;
    }
  }
}
