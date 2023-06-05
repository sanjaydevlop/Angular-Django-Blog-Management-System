// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: string[] = [];
  sortAscending: boolean = true;
  @HostListener('document:keydown', ['$event'])
  
  handleKeyboardEvent(event: KeyboardEvent) {
    
    if (event.ctrlKey && event.key === 'z') {
      this.addProduct();
    }
  }

  addProduct() {
    const newProduct = prompt('Enter a new product:');
    if (newProduct) {
      this.products.push(newProduct);
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index,1);
  }
  updateProduct(index: number) {
    const newProduct = prompt('Rename the product:');
    if (newProduct) {
      this.products[index]=newProduct;
    }
  }
  toggleSort() {
    this.sortAscending = !this.sortAscending;
    if (this.sortAscending) {
      this.products.sort();
    } else {
      this.products.sort().reverse();
    }
  }
  // changeBackgroundColor(color: string) {
  //   this.backgroundColor = color;
  // }
}
