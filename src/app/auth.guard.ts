import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';




@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}




  canActivate(): boolean {

    if (!this.auth.isLoggedIn()) {

      this.router.navigate(['login']);

      return false;

    }

    return this.auth.isLoggedIn();

  }

}