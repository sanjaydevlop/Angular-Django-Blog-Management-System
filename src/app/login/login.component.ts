import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  displayfname:any="";
  
 
  constructor(private _http:HttpClient, private _route:Router
              , private dataService : DataService,private auth:AuthService) {}

  loginForm=new FormGroup({
                fname:new FormControl(''),
                password:new FormControl('')
              });

  ngOnInit(): void {
    
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
    this.displayname();
    this._route.navigate(['home'])
    
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
