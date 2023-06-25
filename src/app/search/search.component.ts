// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormControl } from '@angular/forms';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent {
//   searchTerm: string='';

//   constructor(private router: Router) { }

//   search() {
//     if (this.searchTerm) {
//       this.router.navigate(['/search-results', this.searchTerm]);
//     }
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  searchControl: FormControl = new FormControl();
  searchResults: any[] = [];
  newA:any[]=[];
  blogid:any;

  constructor(private router: Router, private http: HttpClient) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1),
        distinctUntilChanged(),
        switchMap((term: string) => this.search(term))
      )
      .subscribe(results => {
        this.searchResults = this.newA;
        this.newA=[];
      });
  }

  search(term:string){
    
    this.http.get<any[]>("http://127.0.0.1:8000/getAll").subscribe((Response)=>{
      for(const obj of Response){
        if(obj.nameb.includes(term) && !this.newA.includes(obj.nameb)){
          this.newA.push(obj.nameb);
        }
      }
      console.log(this.newA);
      
    })

    return this.newA;
  }



  onSearch() {
    this.route_to(this.searchControl.value);
  }

  route_to(s:string){
    this.http.get<any[]>("http://127.0.0.1:8000/getBlogs/"+s).subscribe((Response)=>{
      for(const obj of Response){
        this.blogid=obj.id
      }
      console.log(this.blogid);
      console.log(this.searchTerm);
    this.searchTerm=s;
    this.router.navigate(['/search-results/'+s], { queryParams: { searchTerm: this.searchTerm,blogid:this.blogid } });
    })
    
    
    // this.router.navigate(['/search-results/'+s]); 
    

  }
}


