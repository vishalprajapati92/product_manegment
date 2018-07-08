import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // {path :"product", component:ProductComponent, canActivate :[AuthGuard],
      // children :[ { path:"create", component:CreateComponent}, 
      // ]},

      {path : "product", loadChildren : "../app/products/product/product.module#ProductModule"},
      {path :"home", component:HomeComponent, canActivate : [AuthGuard]},
      {path :"login", component:LoginComponent},
      {path :"register", component:RegisterComponent},
      {path :"", redirectTo:"home", pathMatch:"full"}, 
      {path :"**", redirectTo : "home"} 

    ])
  ],
  providers: [AuthService,CookieService,AuthGuard, {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthinterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
