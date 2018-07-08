import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpRequest : HttpClient, private _authService : AuthService) { }
  getProducts()
  {
    return this._httpRequest.get('http://localhost:3000/getProduct');
  }
  createProducts(product:any)
  {
    return this._httpRequest.post('http://localhost:3000/createProduct',product);
  }
  productDetail(productCode:any)
  {
    return this._httpRequest.post('http://localhost:3000/productDetail',productCode);
  }

}
