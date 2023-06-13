import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit{
  reactiveForm!: FormGroup;
  displayname:null|string="";
  @ViewChild('editor') editorElementRef!: ElementRef;

  public Editor = ClassicEditor;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    let data=localStorage.getItem('fname');
    this.displayname=data;
    this.reactiveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      blog: new FormControl('', [Validators.required]),
      aname: new FormControl({ value: this.displayname, disabled: false}),
      newDict: new FormControl([]),
      
      
    });

   
  }
  stripHtmlTags(html: string): string {
    const tempDivElement = document.createElement('div');
    tempDivElement.innerHTML = html;
    return tempDivElement.innerHTML;
  }
 onSubmit() {
    if (this.reactiveForm.valid) {

      const formData = this.reactiveForm.value;
      const cleanedBlogContent = this.stripHtmlTags(formData.blog);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers: headers };
      this.http.get<any[]>(`http://localhost:4000/formData?name=${formData.name}`)
        .subscribe(
          response => {
            if (response.length > 0) {
              alert('Name of the Blog must be unique');
            } else {
              formData.blog = cleanedBlogContent;
              this.http.post('http://localhost:4000/formData', formData, options)
                .subscribe(
                  () => {
                    console.log('Form data uploaded successfully');
                    alert('Blog Added');
                    
                    this.reactiveForm.reset();
                  },
                  error => {
                    console.log('Error uploading form data:', error);
                  }
                );
            }
          },
          error => {
            console.log('Error checking name:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
