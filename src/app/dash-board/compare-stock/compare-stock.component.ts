import { Component } from '@angular/core';
import { StockDetailsRespVo } from '../../models/stock-details-resp-vo';
import { CustomDatePipe } from '../../pipeService/custom-date.pipe';
import { IndexChartService } from '../../services/index-chart.service';
import { ShareModuleModule } from "../../share-module/share-module/share-module.module";
import { MatPseudoCheckbox } from "@angular/material/core";
import { FetchIndDetailsReq } from '../../models/fetch-ind-details-req';
import { DisplayingStockDetails } from '../../models/displaying-stock-details';
import { ChartDetailsResponseVo } from '../../models/chart-details-response-vo';
import e from 'express';

@Component({
  selector: 'app-compare-stock',
  templateUrl: './compare-stock.component.html',
  styleUrl: './compare-stock.component.scss'
})
export class CompareStockComponent {

    currentDate = new Date();
   
    isPopupOpen = false;
     stockDetailsRespVo : StockDetailsRespVo;
     chartDetailInPopUp : ChartDetailsResponseVo;
     displayTableRecordFlag : boolean = false;
     stockNotFoundFlag : boolean = false;
     stockFoundMessage: string;
     stockNotAvailable : string;
     selectedDate : Date;
      isCheckedMastIndSign : false;
      isCheckedFirstIndSign : false;
      dropdownSing = ['noon','equal_val','Less_than', 'Greater_than', 'Greater_and_Less_val'];
  firstIndAdjustmentSing = 'noon';
  displayingStockDetails : DisplayingStockDetails[] = [];
   isFirstIndDiffvalFlag = false;
    firstIndDiffval : string;
    isValidationValues : boolean = false;
    firstIndSecondDiffval : number;
    firstIndfirstDiffval : number;

stockDetailFetchType : string;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  show_image_url :string
  selectedIndexGapType : string = 'noon';
 selectedIndexGapValue : string;
 indexGapValue : string
isValidationIndexGapValues : boolean = false;
isSubmitValidationFlag : boolean = false;
submitValidationMessage : string = "Please correct the errors to submit";
submitValidationDev : boolean = false;

stockDetailsFetchTypeArry = ['noon', 'get_By_Criteria', 'get_StockDetails_on_Dates'];
selectTypeFetch : string = '';
get_StockDetails_on_Dates_dev : boolean = false;
get_By_Criteria_dev : boolean = false;
fetch_table_container_dev : boolean = false;
     constructor(private customDatePipe : CustomDatePipe,private indexChartService : IndexChartService){}


    findTypeFetch(){
      console.log("selected fetch type==="+this.selectTypeFetch);
      if(this.selectTypeFetch == 'get_StockDetails_on_Dates'){
        this.get_StockDetails_on_Dates_dev = true;
        this.get_By_Criteria_dev = false;
      } else if(this.selectTypeFetch == 'get_By_Criteria'){
        this.get_StockDetails_on_Dates_dev = false;
        this.get_By_Criteria_dev = true;
      } else{
        this.get_StockDetails_on_Dates_dev = false;
        this.get_By_Criteria_dev = false;
      }
      this.displayTableRecordFlag = false;
      this.stockNotFoundFlag = false;
    
    }

  fetchStockDetails(date: Date) {

   // let selectDate = date;
   this.displayTableRecordFlag = false;
   this.stockDetailsRespVo ;
    this.selectedDate = date;
    let stockId=this.customDatePipe.transform(date, 'numId');
    let StockDate=this.customDatePipe.transform(date, 'def');
    console.log("selected date="+this.selectedDate +"   converted into id="+stockId);
   this.indexChartService.fetchStockDetailsById(stockId).subscribe(resp=>{
  
    if(resp.code == 200){
      this.stockNotFoundFlag = false;
     this.stockFoundMessage = "Below Stock Detials of :  "+ StockDate;
      this.displayTableRecordFlag = true;
      this.stockDetailsRespVo = resp.data;
      console.log("response form fetch stock into id="+resp)

    }else if(resp.code == 300){
      this.displayTableRecordFlag = false;
    this.stockNotFoundFlag = true;
    this.stockNotAvailable = "Stock Details Not Found : "+ StockDate;
    }
   },
   (error)=>{
    this.displayTableRecordFlag = false;
    this.stockNotFoundFlag = true;
    this.stockNotAvailable = "Stock Details Not Found : "+ StockDate;
    console.error("error in chartfileuploadconponent ====="+error)
   }
  )


  }

  
  ValidatingAllFlags() {
    console.log("Enter into ValidatingAllFlags method=====");
    this.submitValidationMessage =""
     this.submitValidationDev = false;
    if( this.isIndexGapEnabledFlag){
     if(this.isValidationIndexGapValues){
      this.isSubmitValidationFlag = false;
    }else{
      this.submitValidationDev = true;
      this.submitValidationMessage = "Please Vilidate Index Gap Values";
      this.isSubmitValidationFlag = true;
    }
    }
    if(this.isFirstIndDiffvalFlag){
     if(this.isValidationValues){
      this.isSubmitValidationFlag = false;   
    }else{
      this.submitValidationDev = true;
      this.submitValidationMessage = "Please validate First Index Difference Values";
      this.isSubmitValidationFlag = true; 
    }
  }
console.log("Enter into ValidatingAllFlags method before hitting ===="+this.isSubmitValidationFlag);
    if(!this.isSubmitValidationFlag){
      console.log("Enter into ValidatingAllFlags method=   hit back end ===="+this.isSubmitValidationFlag);
      this.fetchMatchingDetails();
    }
  }

  fetchMatchingDetails(){
    this.isValidationValues = true;
     let fetchIndDetails = new FetchIndDetailsReq();
      fetchIndDetails.pageNumber = this.pageNumber;
      fetchIndDetails.pageSize = this.pageSize;
     
    if(this.isCheckedMastIndSign){
     console.log('isCheckedFullIndSign=='+this.isCheckedMastIndSign,  this.stockDetailsRespVo.indxSignStatus)
     fetchIndDetails.mastindxSignStatus =  this.stockDetailsRespVo.indxSignStatus;
    }
    if(this.isCheckedFirstIndSign){
     console.log('isCheckedFirstIndSign=='+this.isCheckedFirstIndSign, this.stockDetailsRespVo.firstIndSing)
     fetchIndDetails.firstIndSign = this.stockDetailsRespVo.firstIndSing;
    }
    if(this.firstIndAdjustmentSing != 'noon'){
     console.log('firstIndAdjustmentSing=='+this.firstIndAdjustmentSing, this.stockDetailsRespVo.indxFirstValue)
     fetchIndDetails.firstIndAdjustmentSing = this.firstIndAdjustmentSing;
     
      if(this.firstIndAdjustmentSing == 'Greater_and_Less_val'){
        fetchIndDetails.firstIndfirstDiffval = this.firstIndfirstDiffval;
        fetchIndDetails.firstIndSecondDiffval = this.firstIndSecondDiffval;
      }else if(this.firstIndAdjustmentSing == 'equal_val'){
        fetchIndDetails.firstIndValue = this.stockDetailsRespVo.indxFirstValue;
      }else{
        fetchIndDetails.firstIndfirstDiffval = parseInt(this.firstIndDiffval);
      }
    }
    if(this.isIndexGapEnabledFlag){
      fetchIndDetails.indexGapValue = this.indexGapValue;
      fetchIndDetails.selectedIndexGapType = this.selectedIndexGapType; 
      this.isValidationIndexGapValues = true;
    }
    
    
 
   fetchIndDetails.defaultIndName = 'INDEX-1'; /**if we not given any value for second to seven index or sign, it will take dafult index as
   index-1 , to fetch the unique details */


    this.indexChartService.fetchStockDetailsCompare(fetchIndDetails).subscribe(resp=>{
        this.isSubmitValidationFlag = false;
        this.fetch_table_container_dev = true;
      if(resp.code == 200){

        this.displayingStockDetails = resp.data;
        this.totalRecords = resp.totalRecords;
       console.log("In controller output====="+this.displayingStockDetails.length);
 console.log("In controller output====="+JSON.stringify(this.displayingStockDetails));

      }else if(resp.code == 300){}},
       (error)=>{
          console.error("error in chartfileuploadconponent ====="+error)
       }
    )

  }

  

  openPopup(chartDetailsResponseVo : ChartDetailsResponseVo) {
      let baseurl= "myfile";
    this.chartDetailInPopUp = chartDetailsResponseVo;
        let imgArry= this.chartDetailInPopUp.chartUrl.split("nifty_chart_path");

        //this.chartDetailInPopUp.chartUrl = baseurl+imgArry[1];
        this.show_image_url = baseurl+imgArry[1];
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  checkFirstIndVal(){
    console.log("Enter into checkFirstIndVal of=======");
    this.isFirstIndDiffvalFlag = false;
    this.isSubmitValidationFlag = false;
    if(this.firstIndAdjustmentSing != 'noon'){
      this.isFirstIndDiffvalFlag = true;
       console.log("Enter into checkFirstIndVal of======='!!!!equal_val'");
    } 
  }

  checkInputDiffVal(){
    this.isValidationValues = false;
    this.isSubmitValidationFlag = false;
    this.firstIndfirstDiffval = 0;
    this.firstIndSecondDiffval = 0;
   if(this.isFirstIndDiffvalFlag && this.firstIndAdjustmentSing != 'noon'){
      if(this.firstIndAdjustmentSing == 'Greater_and_Less_val'){

          if(this.firstIndDiffval.includes(",")){
            let vals=this.firstIndDiffval.split(",");
           this.firstIndfirstDiffval = parseInt(vals[0]);
            this.firstIndSecondDiffval = parseInt(vals[1]);
            this.isValidationValues = true;
          }else{
            this.isValidationValues = false;
          }

   } else if(this.firstIndAdjustmentSing != 'Greater_and_Less_val'){
      if(!this.firstIndDiffval.includes(",")){
             this.firstIndDiffval= this.firstIndDiffval;
             this.isValidationValues = true;
      } else{
              this.isValidationValues = false;
      }  
    } 

    }
  }



 
  getStockById(){}

 

  getStockDetailsBetweenDates(){}

  next() {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      //this.getAllStockDetails();
      this.fetchMatchingDetails();
    }
  }

  previous() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      //this.getAllStockDetails();
      this.fetchMatchingDetails();
    }
  }



  
  checkIndexGapValue(){
    this.isValidationIndexGapValues = true;
    this.isSubmitValidationFlag = false;
   if(this.isIndexGapEnabledFlag && this.selectedIndexGapType != 'noon'){
      if(this.selectedIndexGapType == 'Greater_and_Less_val'){

          if(this.indexGapValue.includes(",")){
            this.isValidationIndexGapValues = true;
          }else{
            this.isValidationIndexGapValues = false;
          }

   } 

    }
  }

  isIndexGapEnabledFlag : boolean = false;
  enableIndexGapDev(){
    this.isIndexGapEnabledFlag = false;   

       if(this.selectedIndexGapType != 'noon'){
      this.isIndexGapEnabledFlag = true;
       console.log("Enter into checkFirstIndVal of======='!!!!equal_val'");
    
    } 
  }
}