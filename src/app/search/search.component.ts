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

  constructor(private router: Router, private http: HttpClient) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.search(term))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }

  search(term: string) {
    return this.http.get<any[]>(`http://localhost:4000/formData?name_like=${term}`);
  }

  onSearch() {
    this.route_to(this.searchControl.value);
  }

  route_to(s:string){
    console.log(this.searchTerm);
    this.searchTerm=s;
    this.router.navigate(['/search-results/'+s], { queryParams: { searchTerm: this.searchTerm } }); 
    
    // this.router.navigate(['/search-results/'+s]); 
    

  }
}


// setStudentId(): void { 
// this.router.navigate(['/courses'], { queryParams: { studentId: this.studentId } }); }