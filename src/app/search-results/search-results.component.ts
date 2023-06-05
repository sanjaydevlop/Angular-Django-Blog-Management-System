import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string | null = null;
  searchResults: any[]=[];
  isUpvote: boolean = true;
  comment: string="";
  displayname:null|string="";
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.searchTerm = null;
    
  }

  ngOnInit() {
    let data=localStorage.getItem('fname');
    this.displayname=data;
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.search();
    });
  }

  search() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.http.get<any[]>(`http://localhost:4000/formData?name=${this.searchTerm}`)
        .subscribe(data => {
          this.searchResults = data.sort((a, b) => a.name.localeCompare(b.name));
        });
    } else {
      this.searchResults = [];
    }
  }

  toggleButton() {
    this.isUpvote = !this.isUpvote;
  }

  submitData(result: any) {
    const formData = {
      fname: this.displayname,  
      value: this.comment
    };
  
    if(this.comment!=""){
      result.newDict.push(formData);
    }
  
    this.http.put('http://localhost:4000/formData/' + result.id, result)
      .subscribe(() => {
        console.log('Data submitted successfully');
      }, (error) => {
        console.error('Error submitting data:', error);
      });
  }
  


}
