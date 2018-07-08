import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { CreateComponent } from '../create/create.component';
import { ProductPipe } from '../product.pipe';
import { RatingComponent } from '../rating/rating.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { DetailComponent } from '../detail/detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from '../../auth/authinterceptor.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path :"", component:ProductComponent, canActivate :[AuthGuard]},
      {path :"create", component:CreateComponent, canActivate :[AuthGuard]},
      {path :":productCode", component:DetailComponent, canActivate : [AuthGuard]},     
    ])
  ],
  declarations: [
    ProductComponent,
    ProductPipe,
    RatingComponent,
    CreateComponent,
    DetailComponent
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthinterceptorService,
    multi : true
  }],
})
export class ProductModule { }
