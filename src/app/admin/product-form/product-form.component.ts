import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/take";

@Component({
             selector: 'app-product-form',
             templateUrl: './product-form.component.html',
             styleUrls: ['./product-form.component.css']
           })
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  productId;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {

    this.categories$ = categoryService.getCategories();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService
        .get(this.productId)
        .take(1)
        .subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {

    if (this.productId) {
      this.productService.update(this.productId, this.product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm("Do you want to delete")){
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }

  }


}
