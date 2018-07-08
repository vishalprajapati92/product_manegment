import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { element } from 'protractor';
import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/src/browser';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _authService : AuthService) { }

  ngOnInit() {
  }
}
