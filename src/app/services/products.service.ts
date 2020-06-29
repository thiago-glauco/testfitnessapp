import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {

  private products: string[] = ['A Book'];
  productsUpdated = new Subject( );

  constructor() { }

  addProduct( product: string ) {
    if( !this.products.some( ( el ) => { return el === product } ) ) {
      this.products.push( product );
        console.log("Product added");
        console.log( this.products );
        this.productsUpdated.next( );
    } else {
      alert("Product Already in database");
    }

  }

  deleteProduct( product ) {
    this.products = this.products.filter( el => el !== product);
    console.log("Product removed");
    console.log( this.products );
    this.productsUpdated.next( );
  }

  getproducts( ) {
    return [...this.products];
  }
}