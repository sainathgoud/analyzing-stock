import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  dat: any;
  constructor( private datePipe: DatePipe){}
   
  transform(value: Date, format:string): any {

    console.log("customdate==="+value +" format=="+format);
    if("def" == format){
    this.dat = this.datePipe.transform(value,'dd-MMM-yyyy')
    }else if("numId"== format){
      this.dat = this.datePipe.transform(value,'ddMMyyyy') 
    } else if("yyyyMMdd"== format){
      this.dat = this.datePipe.transform(value,'yyyy-MM-dd') 
    }

    //let dat = value.toString;
    console.log("customdate after==="+this.dat);

    return this.dat;
  }


}
