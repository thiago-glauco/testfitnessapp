import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productName: string ;
  isDisabled: boolean = true;
  products: string[] = [];
  private productsSubscription: Subscription;
  

  constructor(
    private productsService: ProductsService,
  ) {

   }

   ngOnInit( ) {
    this.isDisabled = false;
    this.products = this.productsService.getproducts( );
    this.productsSubscription = this.productsService.productsUpdated.subscribe(
      ( ) => {
        this.products = this.productsService.getproducts( );
      }
     );
   
   }

   ngOnDestroy( ) {
     this.productsSubscription.unsubscribe( );
   }

  addProduct( form ) {
    console.log(form);
    this.productsService.addProduct( form.value.productName );
  }

  remove( product ) {
    this.productsService.deleteProduct( product );

  }

}