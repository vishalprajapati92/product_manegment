import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  // loginForm : any = {};

  isloggedIn : boolean = false;
  $authObservable : Subject<any> = new Subject;

  constructor(private _authService : AuthService, private _cookie : CookieService, private _router : Router) { }

  ngOnInit() {
  }

  login(loginDetail:any)
  {
      this._authService.login(loginDetail).subscribe((data : any)=>{
        // console.log(data);
        if(data.isloggedIn)
        {
          this.$authObservable.next(data.token);
          this._cookie.set('token', data.token);
          this._router.navigate(['/home']);
        }
        else
        {
          this.isloggedIn = true;
        } 
    });
  }

}
