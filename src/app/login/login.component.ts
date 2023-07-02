import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider,SocialUser } from '@abacritt/angularx-social-login';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  displayfname:any="";
  guser:any;
  gloggedIn:any;
 
  constructor(private _http:HttpClient, private _route:Router
              , private dataService : DataService,private auth:AuthService,private socialAuthService:SocialAuthService) {}

  loginForm=new FormGroup({
                fname:new FormControl(''),
                password:new FormControl('')
              });

  ngOnInit(): void {
    // this.authService.authState.subscribe((user)=>{
    //   this.guser=user;
    //   this.gloggedIn=(user!=null);
    // })
  
    if(this.auth.isLoggedIn()){
     
      this._route.navigate(['home'])
    }
  }

  sbtn1(){
    $('.form-box').css('display','none');
    $('.form-box1').css('display','block');

  }

  updateData() {
    const newData: any = this.user;
    this.dataService.updateData(newData);
  }
    onSubmit(){
    console.log("Onsubmit");
    console.log(this.loginForm.value)
    
    if(this.loginForm.valid){
      console.log("Valid"+this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(
    
    (result) => {
    console.log("Hello")
    console.log(result);
    const strr:any = JSON.parse(JSON.stringify(result));
    console.log(`${strr["message"]}`)
    if(strr['message']=="Login Success"){
      this.auth.setToken('abcdef');
      console.log(this.auth.isLoggedIn())
      this._route.navigate(['home'])
  
    }
    else{
      console.log("No password")
      this._route.navigate(['login'])
    }
    this.displayname();
    
    
    },(err:Error)=>{
    
     alert(err.message);
    
     }
    
     )
    
    }
    
     }
     displayname(){
      localStorage.setItem('fname',JSON.stringify(this.loginForm.value.fname));
      this.displayfname=this.loginForm.value.fname;
      console.log("hey",this.loginForm.value.fname);
    }


  

}
