import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService} from '../product.service';
import {AuthService} from 'src/app/auth/auth.service'
// import { HttpClient} from '../product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailValue : any = {} ;
  arrStarRating : any = [] ;
  constructor(private _authService :AuthService, private _activatedRouter : ActivatedRoute, private _route : Router, private _productService : ProductService ) { }
  
  ngOnInit() {
    this._activatedRouter.params.subscribe((data)=>{
      // console.log('triggered')
        this._productService.productDetail(data).subscribe((res)=>{
          this.arrStarRating = Array(Math.round(res["starRating"])).fill(Math.round(res["starRating"]));
          // console.log(this.starRating);
          this.detailValue = res;   
        });
      });
  }
  
  backToList()
  {
      this._route.navigate(['/product']);
  }



}
