import { Component, Input, OnInit } from '@angular/core';
import { IndexChartService } from '../../services/index-chart.service';
import { CommonUtilService } from '../../services/common-util.service';
import { SubChartValueModel } from '../../models/sub-chart-value-model';
import { CustomDatePipe } from '../../pipeService/custom-date.pipe';
import { FullIndChart } from '../../models/full-ind-chart';
import { ChartDataSet } from '../../models/chart-data-set';
import { listenerCount } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'ind-values',
  //standalone: true,
  //imports: [],
  templateUrl: './ind-values.component.html',
  styleUrl: './ind-values.component.scss'
})
export class IndValuesComponent  implements OnInit{

  @Input() indsectionselected : number;

  marketValue : number=0;
  aftIndex : number=0;
  indexGapResult : number;
  indValueone : string;
  indValuetwo : string;
  indValuethree : string;
  indValuefour : string;
  indValuefive : string;
  indValuesix : string;
  indValueseveen : string;
  indValueeight : string;
  submitresultCheck : boolean = false;
  todayDate = new Date();
  subChartValueModel = new SubChartValueModel();
  fullchartInd : any[]=[];
  //chartDataSet : ChartDataSet;
  chartDataSet = new ChartDataSet();
  chartDataSetRestore = new ChartDataSet();
  selectedUploadDate : Date;
  indxCount : string; 



  constructor( private indexChartService : IndexChartService, 
    private commonutilservice : CommonUtilService, private customDatePipe : CustomDatePipe, private router: Router){}
  ngOnInit(): void {
   let stateObj = this.router.lastSuccessfulNavigation?.extras.state;
   this.selectedUploadDate = stateObj?.['checkUploadDate'];
   console.log("selecte date from fetchComponent=="+this.selectedUploadDate);
   if(this.selectedUploadDate != null && this.selectedUploadDate != undefined){
    this.todayDate = this.selectedUploadDate;
   }
  }




  removeSpecialSymbols(indx:string, values: string): string{
    console.log("Enter into removeSpecialSymbols==========="+values);
    let newVal : string[] = [];
    let removeAlp= values.replaceAll(/[A-Za-z]/g, "");
 let removeComma= removeAlp.replaceAll(",," ,"");
 let removespcialChar =  removeComma.trim();
 let splitByComma= removespcialChar.replace(/[_@;]/g, "");
 let commaSeperated = splitByComma.split(",");
 commaSeperated.forEach(element=>{
 if(element !=null && element !== undefined && element.trim() !== ""){
    
    let strTrim = element.trim();
    if(strTrim.includes(" ")){
     let sepeatedWhite = strTrim.split(" ");
     sepeatedWhite.forEach(subElement=>{
      if(subElement !=null && subElement !== undefined && subElement.length !== 0){
        newVal.push(subElement.trim());
       }
     })
      }else{
       newVal.push(strTrim.trim());
    }

 }else{
//console.log("in the lopppp else part==========="+element);
 }
 }
 
 )
 let newValString =newVal.join(",");
console.log("finally we got this==========="+newValString);
   // this.indxCount = "6";
       

    return newValString;
  }


  checkingIndexValue(indNum : string){
    let aftconvert = ""
     this.indxCount = "0";
    console.log("checking the value on click event indValue=="+ indNum);
    if(indNum == '1'){
      aftconvert =this.removeSpecialSymbols(indNum, this.indValueone);
      this.indValueone = "";
      
      this.indValueone = aftconvert;
     this.chartDataSet.indexone.indchartpoint = this.indValueone;
     // this.indexChartService.addIndValueTochart(indNum,this.indValueone);
    }else if(indNum == '2'){
      console.log("checking the value "+ indNum +"  values===="+this.indValuetwo);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValuetwo);
      this.indValuetwo = "";
      this.indValuetwo = aftconvert;
      this.chartDataSet.indextwo.indchartpoint = this.indValuetwo;
      //this.indexChartService.addIndValueTochart(indNum,this.indValuetwo);

    }else if(indNum == '3'){
      console.log("checking the value "+ indNum +"  values===="+this.indValuethree);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValuethree );

      this.indValuethree = "";
      this.indValuethree = aftconvert;
      this.chartDataSet.indexthree.indchartpoint = this.indValuethree;
      //this.indexChartService.addIndValueTochart(indNum,this.indValuethree);

    }
    else if(indNum == '4'){
      console.log("checking the value "+ indNum +"  values===="+this.indValuefour);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValuefour);

      this.indValuefour = "";
      this.indValuefour = aftconvert;
      this.chartDataSet.indexfour.indchartpoint = this.indValuefour;
      //this.indexChartService.addIndValueTochart(indNum,this.indValuefour);

    }else if(indNum == '5'){
      console.log("checking the value "+ indNum +"  values===="+this.indValuefive);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValuefive);

      this.indValuefive = "";
      this.indValuefive = aftconvert;
      this.chartDataSet.indexfive.indchartpoint = this.indValuefive;
      //this.indexChartService.c(indNum,this.indValuefive);

    }else if(indNum == '6'){
      console.log("checking the value "+ indNum +"  values===="+this.indValuesix);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValuesix);

      this.indValuesix = "";
      this.indValuesix = aftconvert;
      this.chartDataSet.indexsix.indchartpoint = this.indValuesix;
      //this.indexChartService.addIndValueTochart(indNum,this.indValuesix);

    }else if(indNum == '7'){
      console.log("checking the value "+ indNum +"  values===="+this.indValueseveen);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValueseveen);

      this.indValueseveen = "";
      this.indValueseveen = aftconvert;
      this.chartDataSet.indexseveen.indchartpoint = this.indValueseveen;
     // this.indexChartService.addIndValueTochart(indNum,this.indValueseveen);

    }else if(indNum == '8'){
      console.log("checking the value "+ indNum +"  values===="+this.indValueeight);
      aftconvert =this.removeSpecialSymbols(indNum, this.indValueeight);

      this.indValueeight = "";
      this.indValueeight = aftconvert;
      this.chartDataSet.indexeight.indchartpoint = this.indValueeight;
     // this.indexChartService.addIndValueTochart(indNum,this.indValueseveen);

    }
    

    if(this.checkingEmptyNull(this.indValueone) && this.checkingEmptyNull(this.indValuetwo) && 
    this.checkingEmptyNull(this.indValuethree) && this.checkingEmptyNull(this.indValuefour) && 
    this.checkingEmptyNull(this.indValuefive) && this.checkingEmptyNull(this.indValuesix) && 
    this.checkingEmptyNull(this.indValueseveen) && this.checkingEmptyNull(this.indValueeight)){
     this.submitresultCheck = true;
    }else{
      this.submitresultCheck = false;
    }
  }

  checkingEmptyNull(value: string) :boolean {
     let result  = false;
    if(value != null && value.length > 0) {
      result = true;
    }
    console.log("checkingEmptyNull  "+ result);

    return result;
  }

  checkingdayIndex(){
    console.log("Enter into checkingdayIndx= ");

    this.marketValue= this.commonutilservice.checkingNumber(this.marketValue);
    
    this.aftIndex =this.commonutilservice.checkingNumber(this.aftIndex);

   this.indexGapResult=  this.aftIndex - this.marketValue;

   this.subChartValueModel.marketVlaue = this.marketValue;
   this.subChartValueModel.aftIndex = this.aftIndex;
   this.subChartValueModel.todate = this.todayDate;
   this.subChartValueModel.indexGapResult = this.indexGapResult;
   console.log("Enter into checkingdayIndx= "+this.marketValue +" ending==="+this.aftIndex);
  }


  submit(){
    console.log("submit called  ");
    

    this.subChartValueModel.todaydateformatId= this.customDatePipe.transform(this.todayDate, 'numId');
    console.log("submit called ==== "+JSON.stringify(this.chartDataSet));
    this.indexChartService.routingIndChart(this.subChartValueModel, this.chartDataSet);
  }

  restoreData(){
    let obj = this.indexChartService.restoringData();
   this.chartDataSetRestore = JSON.parse(obj);

   this.marketValue = this.chartDataSetRestore.marketValue;
   this.aftIndex = this.chartDataSetRestore.aftIndex;
   this.todayDate = this.chartDataSetRestore.todate;
   this.indexGapResult = this.chartDataSetRestore.indexGapResult;
   this.indValueone = this.chartDataSetRestore.indexone.indchartpoint;
   this.indValuetwo = this.chartDataSetRestore.indextwo.indchartpoint;
   this.indValuethree = this.chartDataSetRestore.indexthree.indchartpoint;
   this.indValuefour = this.chartDataSetRestore.indexfour.indchartpoint;
   this.indValuefive = this.chartDataSetRestore.indexfive.indchartpoint;
   this.indValuesix = this.chartDataSetRestore.indexsix.indchartpoint;
   this.indValueseveen = this.chartDataSetRestore.indexseveen.indchartpoint;
   this.indValueeight = this.chartDataSetRestore.indexeight.indchartpoint;

   this.subChartValueModel.marketVlaue = this.marketValue;
   this.subChartValueModel.aftIndex = this.aftIndex;
   this.subChartValueModel.todate = this.todayDate;
   this.subChartValueModel.indexGapResult = this.indexGapResult;
   this.submitresultCheck  = true;

   this.chartDataSet = this.chartDataSetRestore;
  }


}
