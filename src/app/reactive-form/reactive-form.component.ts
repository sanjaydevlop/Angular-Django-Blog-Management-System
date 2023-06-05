import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm!: FormGroup;
  displayname:null|string="";
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    let data=localStorage.getItem('fname');
    this.displayname=data;
    this.reactiveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      blog: new FormControl('', [Validators.required]),
      aname: new FormControl({ value: this.displayname, disabled: false}),
      newDict: new FormControl([])
      
    });
  }


  onSubmit() {
    if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;
      console.log(formData);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers: headers };
      this.http.get<any[]>(`http://localhost:4000/formData?name=${formData.name}`)
        .subscribe(
          response => {
            if (response.length > 0) {
              alert('Name of the Blog must be unique');
            } else {
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
