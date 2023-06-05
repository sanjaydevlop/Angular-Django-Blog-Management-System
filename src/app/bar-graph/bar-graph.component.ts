import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data.service';
@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {
  below18: number = 0;
  above18: number = 0;

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.calculateAgeGroups();
  }

  calculateAgeGroups() {
    const formData = this.formDataService.getAllFormData();
    this.below18 = formData.filter(data => data.age && data.age < 18).length;
    this.above18 = formData.filter(data => data.age && data.age >= 18).length;
  }
}


