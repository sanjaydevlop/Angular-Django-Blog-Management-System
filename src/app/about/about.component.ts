import { Component } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
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
    const fname = localStorage.getItem('fname');
    console.log(fname);
    this.http.get<any[]>('http://127.0.0.1:8000/getAll').subscribe(data => {
      this.jsonData = data.filter(item => item.aname === fname); // Filter jsonData based on fname
    });
    console.log(this.jsonData);
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
    onDeleteButtonClick(itemId: number) {
    const url = 'http://127.0.0.1:8000/delete/'+itemId;
  
    this.http.delete(`${url}`).subscribe(
      () => {
        console.log(`Deleted item with id: ${itemId}`);
        this.jsonData = this.jsonData.filter(item => item.id !== itemId);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
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




// import { Component } from '@angular/core';
// import { FormDataService } from '../form-data.service';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


// @Component({
//   selector: 'app-about',
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.css']
// })
// export class AboutComponent {
//   name: string = ''; 
//   email: string = '';
//   message: string='';
//   age: number | null = null;
//   jsonData: any[]=[];
//   searchTerm: string = '';

  
//   constructor(private formDataService: FormDataService,private auth:AuthService,private http:HttpClient,private router:Router) {}
//   ngOnInit() {
//     this.fetchData();
//   }
//   fetchData() {
//     const fname = localStorage.getItem('fname');
//     console.log(fname);
//     this.http.get<any[]>('http://localhost:4000/formData').subscribe(data => {
//       this.jsonData = data.filter(item => item.aname === fname); // Filter jsonData based on fname
//     });
//     console.log(this.jsonData);
//   }
//   truncateString(str: string, maxLength: number): string {
//     if (str.length <= maxLength) {
//       return str;
//     } else {
//       return str.substr(0, maxLength) + '...';
//     }
//   }
//   onCardHover(item: any) {
//     item.hovered = !item.hovered;
//   }
//   onCardClick(name: string) {
//     this.searchTerm=name;
//     this.router.navigate(['/search-results/'+name], { queryParams: { searchTerm: this.searchTerm } }); 
//   }
//   onDeleteButtonClick(itemId: number) {
//     const url = 'http://localhost:4000/formData';
  
//     this.http.delete(`${url}/${itemId}`).subscribe(
//       () => {
//         console.log(`Deleted item with id: ${itemId}`);
//         this.jsonData = this.jsonData.filter(item => item.id !== itemId);
//       },
//       (error) => {
//         console.error('Error deleting item:', error);
//       }
//     );
//   }
//   onCardDropped(event: CdkDragDrop<any[]>) {
//     const previousIndex = event.previousIndex;
//     const currentIndex = event.currentIndex;
  
//     if (previousIndex !== currentIndex) {
//       const temp = this.jsonData[previousIndex];
//       this.jsonData[previousIndex] = this.jsonData[currentIndex];
//       this.jsonData[currentIndex] = temp;
//     }
//   }
  
  
// }
