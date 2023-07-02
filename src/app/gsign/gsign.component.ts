import {SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  
  selector: 'app-gsign',
  templateUrl: './gsign.component.html',
  styleUrls: ['./gsign.component.css']
})
export class GsignComponent {
  
  user:any;
  loggedIn:any;
  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }
}
