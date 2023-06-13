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

  
  constructor(private formDataService: FormDataService,private auth:AuthService,private http:HttpClient,private router:Router) {}
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    const fname = localStorage.getItem('fname');
    console.log(fname);
    this.http.get<any[]>('http://localhost:4000/formData').subscribe(data => {
      this.jsonData = data.filter(item => item.aname === fname); // Filter jsonData based on fname
    });
    console.log(this.jsonData);
  }
  // fetchData() {
  //   this.http.get<any[]>('http://localhost:4000/formData').subscribe(data => {
  //     this.jsonData = data;
  //   });
  // }
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
  onCardClick(name: string) {
    this.searchTerm=name;
    this.router.navigate(['/search-results/'+name], { queryParams: { searchTerm: this.searchTerm } }); 
  }
  onDeleteButtonClick(itemId: number) {
    const url = 'http://localhost:4000/formData';
  
    this.http.delete(`${url}/${itemId}`).subscribe(
      () => {
        console.log(`Deleted item with id: ${itemId}`);
        this.jsonData = this.jsonData.filter(item => item.id !== itemId);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
  onCardDropped(event: CdkDragDrop<any[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
  
    if (previousIndex !== currentIndex) {
      const temp = this.jsonData[previousIndex];
      this.jsonData[previousIndex] = this.jsonData[currentIndex];
      this.jsonData[currentIndex] = temp;
    }
  }
  
  
}
