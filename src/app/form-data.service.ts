import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: any[] = [];

  addFormData(data: any) {
    this.formData.push(data);
  }

  getAllFormData() {
    return this.formData;
  }
}
