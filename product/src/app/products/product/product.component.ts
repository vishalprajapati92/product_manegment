import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers : [ProductService]
})
export class ProductComponent implements OnInit {

  pageTitle : string  = "Welcome product page";
  products : any = [];
  filterBy :string;

showAndHide : boolean = true;

  constructor(private _productService : ProductService, private _authService : AuthService) { }

  ngOnInit() {  
        //User is logged in
      this._productService.getProducts().subscribe((data)=>{
                // console.log(data);
        this.products = data;
      });
  }
  isHideAndShow()
  {
    this.showAndHide = !this.showAndHide;
  }

  ratingFnParent(data:string)
  {
    this.pageTitle = data;
    // console.log(data);
  }

}
