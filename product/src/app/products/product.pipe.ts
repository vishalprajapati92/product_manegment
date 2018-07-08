import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return args ? 
       value.filter((item,index) =>{
        if((item).productName.toLowerCase().indexOf(args.toLowerCase())!=-1)  
        {
            return true;
        }     
     })
  : value;
  }

}
