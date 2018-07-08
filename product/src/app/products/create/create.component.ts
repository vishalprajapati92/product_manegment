import { Component, OnInit } from '@angular/core';
import { ProductService }  from '../product.service';
import { FormGroup, FormBuilder, Validators }  from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  product : any = {};
  showMessage : String ;
  isSuccessOrFail : Boolean;

  productForm : FormGroup;
  constructor(private _productService : ProductService , private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
        productId : ["",[Validators.required,Validators.pattern("^(0|[1-9][0-9]*)$")]],
        productName : ["",[Validators.required]], 
        productCode : ["",[Validators.required]],
        releaseDate : ["",[Validators.required,Validators.pattern("(?:(?:0[1-9]|1[0-2])[\/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-. ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2}")]],
        description : ["",[Validators.required]],
        price : ["",[Validators.required,Validators.pattern("^(([1-9]*)|(([1-9]*)\.([0-9]*)))$")]],
        imageUrl : ["",[Validators.required,Validators.pattern("https?://.+")]]
    });
  }
  
  
  submitProductForm()
  {
    // console.log(this.productForm.value);


      this._productService.createProducts(this.productForm.value).subscribe((data)=>{
          if(data)
          {
              this.showMessage = "Product add successfully";
              this.isSuccessOrFail = !this.isSuccessOrFail ;
              this.productForm.reset();
          } 
          else
          {
             this.showMessage = "Product id  already available";
             this.isSuccessOrFail = !this.isSuccessOrFail ;
          }
      });
  }

}
