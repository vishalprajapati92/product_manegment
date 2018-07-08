import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authObservable : Subject<any> = new Subject;

  constructor(private _http : HttpClient, private _router : Router, private _cookie : CookieService) { }

  login(data : any)
  {
    return this._http.post('http://localhost:3000/login',data); 
      // this._http.post('http://localhost:3000/login',data).subscribe((data : any)=>{
      //     if(data.isloggedIn)
      //     {
      //       this.$authObservable.next(data.token);
      //       this._cookie.set('token', data.token);
      //       this._router.navigate(['/home']);
      //     }
      //     else
      //     {
      //       // console.log("fail");
      //     }
      // });
      // console.log(data);
  }
  checkUserStatus()
  {
      return this._cookie.get('token');
  }
  logout()
  {
    this._cookie.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }

  registration(value : any)
  {
    // console.log(value);
      return this._http.post('http://localhost:3000/registration',value);
  }
}
