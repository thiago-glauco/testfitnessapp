import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productName: string;
  @Output( ) productSelected = new EventEmitter( );

  constructor() {

   }
  
  ngOnInit() {

  }

  selected( ) {
    this.productSelected.emit( );
  }

}