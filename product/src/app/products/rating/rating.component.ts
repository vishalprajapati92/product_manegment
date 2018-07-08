import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-rating',
 
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating : number ;
  @Output() ratingToParent : EventEmitter<string> = new EventEmitter();
  rating_arr : any = [];
  constructor() { }

  ngOnInit() {

//Fill method push array inside value of array
    // console.log(Math.round(this.rating));
    this.rating_arr = Array(Math.round(this.rating)).fill(Math.round(this.rating));
    // console.log(this.rating_arr);
  }

  sendRatingToParent()
  {
    this.ratingToParent.emit('Rating value ='+this.rating);
  }

}
