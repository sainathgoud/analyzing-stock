import { Component } from '@angular/core';
import { SpeechRecognitionService } from '../services/speech-recognition.service';

@Component({
  selector: 'app-speech-recognition',
 // standalone: true,
  //imports: [],
  templateUrl: './speech-recognition.component.html',
  styleUrl: './speech-recognition.component.scss'
})
export class SpeechRecognitionComponent {

  startEnable : boolean = false;
  stopEnable : boolean = true;
  formatTextVal : string;
  isFormatTextCheck : boolean = false;
  textformatType = ['Format', 'TotalNagitive', 'TotalPostive', 'vedioOnlyStream'];
  convertFormatType : string;
  isTextFormatTypeCheck : boolean = false;
  isVedioOnlyStreamCheck : boolean = false;

  constructor(
    public service : SpeechRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    this.stopEnable  = false;
    this.startEnable  = true;
    this.isFormatTextCheck = false;
    this.formatTextVal = "";

    this.service.start()
  }

  stopService(){
    this.service.stop()
    this.stopEnable  = true;
    this.startEnable  = false;
  }

  clearText(){
    this.service.clearText();
  }


 formatText() {
 let  values = this.service.text;
 console.log("Enter into removeSpecialSymbols==========="+values);
 let newVal : string[] = [];
 let removeAlp= values.replaceAll(/[A-Za-z]/g, "");
 let removeComma= removeAlp.replaceAll(",," ,"");
 let removespcialChar =  removeComma.trim();
 let splitByComma= removespcialChar.replace(/[_@;']/g, "");

 let commaSeperated = splitByComma.split(",");
 console.log("Enter into commaSeperated==========="+commaSeperated);

 commaSeperated.filter(values=> values !== null && values !== undefined && values.trim() !== "")
 .map(val=> {
   if(val.includes(" ")){
     let sepeatedWhite = val.split(" ");
     sepeatedWhite.forEach(subElement=>{
      if(subElement !=null && subElement !== undefined && subElement.length !== 0){
        if(subElement.trim() !== '-' && subElement.trim() !== '+'){
        newVal.push(subElement.trim());
        }
       }
     })
      }else{
        if(val.trim() !== '-' && val.trim() !== '+'){
       newVal.push(val.trim());
        }
    }
  });
/*
 commaSeperated.forEach(element=>{
 if(element !== null && element !== undefined && element.trim() !== ""){
    
    let strTrim = element.trim();
    console.log("Enter into loop==========="+strTrim);
    if(strTrim.includes(" ")){
     let sepeatedWhite = strTrim.split(" ");
     sepeatedWhite.forEach(subElement=>{
      if(subElement !=null && subElement !== undefined && subElement.length !== 0){
        if(subElement.trim() !== '-'){
        newVal.push(subElement.trim());
        }
       }
     })
      }else{
        if(strTrim.trim() !== '-'){
       newVal.push(strTrim.trim());
        }
    }

 }else{
//console.log("in the lopppp else part==========="+element);
 }
})*/
 
 
  console.log("finally we got before ==========="+newVal);

 let newValString =newVal.join(",");
 console.log("finally we got length ==========="+newValString);
 if(this.convertFormatType === "TotalPostive"){
 // this.formatTextVal = newValString.replaceAll("-","");
  let removeNagative = newValString.replaceAll("-","");
   this.formatTextVal = removeNagative.replaceAll("+","");
 }else if(this.convertFormatType === "TotalNagitive"){
    let removeNegavite= newValString.replaceAll("-","");
    let addingAtfristIndex = removeNegavite.replaceAll(",",",-");
    this.formatTextVal="-".concat(addingAtfristIndex);

 } else
  {
  this.formatTextVal = newValString;
 }
console.log("finally we got this==========="+this.formatTextVal);
this.isFormatTextCheck = true;
//this.formatTextVal = newValString;
   
  }

  

vedioOnlyStreamCheck(event : any){
  console.log("selected value is ========="+event.value); 
  this.isTextFormatTypeCheck = false;
  this.isVedioOnlyStreamCheck = false;
  if(event.value === "vedioOnlyStream"){
    this.isVedioOnlyStreamCheck = true;
  } else{
    this.isTextFormatTypeCheck = true;
}
}

vedioStramFormat(){
   let  values = this.service.text;
   let commaSeperated = values.split(",");
   let newVal : string[] = [];
 commaSeperated.filter(values=> values !== null && values !== undefined && values.trim() !== "")
  .map(val=> {
    let cleaned = val.replace(/\s*\([^)]*\)/g, "");
     let clearCommans= cleaned.replace(/[_@;'=]/g, "");

    if(clearCommans.trim() !== '-' && clearCommans.trim() !== '+'){
      if(clearCommans.length !==0){
        newVal.push(clearCommans.trim());
      }
    }
  });
  let newValString =newVal.join(",");
 this.formatTextVal = newValString;
  this.isFormatTextCheck = true;

  console.log("selected value is ========="+newVal);
}
}
