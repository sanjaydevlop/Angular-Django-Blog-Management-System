import { Component } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = ''; 
  email: string = '';
  message: string='';
  age: number | null = null;
  jsonData: any[]=[];
  searchTerm: string = '';
  LoggedIn:boolean=false;
  blogid:any;

  constructor(private formDataService: FormDataService,private auth:AuthService,private http:HttpClient,private router:Router) {}
  ngOnInit() {
    if(localStorage.getItem('fname')!=null){
      this.LoggedIn=true;
    }
    this.fetchData();
  }


  fetchData() {
    this.http.get<any[]>('http://127.0.0.1:8000/getAll').subscribe(data => {
      this.jsonData = data;
      for(const ele of this.jsonData)
      {
        console.log(ele);
      }
    });
  }
  logout(){
      this.auth.logout();
  }
  truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substr(0, maxLength) + '...';
    }
  }
  onCardHover(item: any) {
    item.hovered = !item.hovered;
  }
  onCardClick(s: string) {
    
      this.http.get<any[]>("http://127.0.0.1:8000/getBlogs/"+s).subscribe((Response)=>{
        for(const obj of Response){
          this.blogid=obj.id
        }
        console.log(this.blogid);
        console.log(this.searchTerm);
      this.searchTerm=s;
      this.router.navigate(['/search-results/'+s], { queryParams: { searchTerm: this.searchTerm,blogid:this.blogid } });
      }) 
}
  getRandomColor(index: number): string {
    const colors = [
      'rgb(172, 221, 222)',
      'rgb(202, 241, 222)',
      'rgb(225, 248, 220)',
      'rgb(254, 248, 221)',
      'rgb(255, 231, 199)',
      'rgb(247, 216, 186)'
      
    ];
    return colors[index % colors.length];
  }
  removeQuotes(str: string): string {
    return str.replace(/"/g, "");
  }
}
