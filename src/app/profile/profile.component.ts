import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  displayname:null|string="";
  ngOnInit() {
    let data=localStorage.getItem('fname');
    this.displayname=data;

}

removeQuotes(str: string): string {
  return str.replace(/"/g, "");
}

}
