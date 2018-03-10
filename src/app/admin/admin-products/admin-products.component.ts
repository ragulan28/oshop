import {Component, OnDestroy} from '@angular/core';
import {ProductService} from "../../product.service";
import {Subscription} from "rxjs/Subscription";
import {Product} from "../../models/product";

@Component({
             selector: 'app-admin-products',
             templateUrl: './admin-products.component.html',
             styleUrls: ['./admin-products.component.css'],
           })
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  // tableResource: DataTableResource<Product>;
  // items: Product[]=[];
  // itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
                            .getAll()
                            .subscribe(products => this.filteredProducts = this.products = products);

    // this.subscription = this.productService
    //                         .getAll()
    //                         .subscribe(products => {
    //                           this.filteredProducts = this.products = products;
    //                           this.initializeTable(products)
    //                         });
  }

  // private initializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({offset: 0})
  //       .then(items => this.items = items);
  //   this.tableResource.count()
  //       .then(count => this.itemCount = count);
  // }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  // reloadItems(prams) {
  //   if (!this.tableResource) return;
  //   this.tableResource.query({offset: prams})
  //       .then(items => this.items = items);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
