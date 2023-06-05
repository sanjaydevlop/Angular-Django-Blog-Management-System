import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title='product-list';
  displayname:null|string="";
  
  var1=localStorage.getItem('fname');
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let data=localStorage.getItem('fname');
    this.displayname=data;
    
    this.authService.logoutEvent.subscribe(() => {
      
      location.reload(); 
      
    });
    this.authService.loginEvent.subscribe(() => {
      
      location.reload();
      
    });
    
  }
  logout(){
    
    this.authService.logout();
}
}
