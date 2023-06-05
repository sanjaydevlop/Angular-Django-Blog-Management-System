import { TestBed } from '@angular/core/testing';

import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';



import { AuthGuard } from './auth.guard';




describe('AuthGuard', () => {

  let guard: AuthGuard;

  let authService: AuthService;

  let router: Router;




  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        AuthGuard,

        { provide: AuthService, useValue: authService },

        { provide: Router, useValue: router }

      ]

    });




    guard = TestBed.inject(AuthGuard);

    authService = TestBed.inject(AuthService);

    router = TestBed.inject(Router);

  });




  it('should be created', () => {

    expect(guard).toBeTruthy();

  });

});