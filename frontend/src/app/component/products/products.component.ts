import { ConfigService, ITableColumns } from './../../service/config.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // products: Observable<Product[]> = this.productService.getAll();
  @Output() products: Observable<Product[]> = this.productService.getAll();
  @Output() tableColumns : ITableColumns[]=this.config.productColumns;

  constructor(
    private config : ConfigService,
    private productService : ProductService) { }

  ngOnInit(): void {
  }

}
