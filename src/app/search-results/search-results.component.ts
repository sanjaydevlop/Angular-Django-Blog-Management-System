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
  newDict:any[]=[];
  blogid:any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.searchTerm = null;
    
  }

  ngOnInit() {
    
    let data=localStorage.getItem('fname');
    this.displayname=data;
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.blogid=params['blogid'];
      console.log(this.searchTerm);
      this.search();
    });
    this.getcommentsOfBlog();
  }

  getcommentsOfBlog(){
    this.http.get<any[]>("http://127.0.0.1:8000/getComment/"+this.blogid)
        .subscribe(data => {
          this.newDict=data;
        });
  }


  search() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.http.get<any[]>(`http://127.0.0.1:8000/getBlogs/`+this.searchTerm)
        .subscribe(data => {
          this.searchResults = data.sort((a, b) => a.nameb.localeCompare(b.nameb));
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
      // fname: this.displayname,  
      // value: this.comment
      "cname":localStorage.getItem('fname'),
      "blog":result.id,
      "comment":this.comment
      
      
    };
    console.log(formData);
  
    this.http.post('http://127.0.0.1:8000/comment', formData)
      .subscribe(() => {
        console.log('Data submitted successfully');
      }, (error) => {
        console.error('Error submitting data:', error);
      });
      window.location.reload();
  }
  


}
