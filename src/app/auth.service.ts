import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  loginEvent:EventEmitter<void>=new EventEmitter<void>();
  private users: any[];

  constructor(private http: HttpClient, private router: Router) {
    this.users = [];
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:3000/signup')
      .pipe(
        catchError(error => {
          console.error('Failed to fetch user data:', error);
          return throwError('Failed to fetch user data');
        })
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    this.router.navigate(['login']);
    this.logoutEvent.emit();
    
  }
  login(input:any){
    const data={
      "username":input.fname,
      "password":input.password,
    }
    
    this.loginEvent.emit();

    return this.http.post("http://127.0.0.1:8000/loginuser",data);
    
  }

  // login({ fname, password }: any): Observable<any> {
  //   const user = this.users.find(u => u.fname === fname && u.password === password);
  //   if (user) {
  //     this.setToken('abcdef');
  //     this.loginEvent.emit();
  //     return of(user);
  //   } else {
  //     return throwError(new Error('Failed to Login'));
  //   }
  // }
}
