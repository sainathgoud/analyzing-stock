import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {



  constructor() { }

  
  checkingNumber(value: number) : number{
    console.log("Enter into CommonUtilService of checkingNumber= "+value);
    if(value == null && value == undefined){
      value =0;
    } 
    return value;
  }

   
}
