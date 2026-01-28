import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipeService/custom-date.pipe';
import { FetchIndDetailsReq } from '../../models/fetch-ind-details-req';
import { DisplayingStockDetails } from '../../models/displaying-stock-details';
import { DisplayStockDetailService } from '../../services/display-stock-detail.service';
import { ChartDetailsResponseVo } from '../../models/chart-details-response-vo';
import e from 'express';
import { escape } from 'querystring';
import { NiBniIndxDetailsRespVo } from '../../models/ni-bni-indx-details-resp-vo';

@Component({
  selector: 'app-display-stock-details',
  templateUrl: './display-stock-details.component.html',
  styleUrl: './display-stock-details.component.scss'
})
export class DisplayStockDetailsComponent {

  currentDate = new Date();

  stockDetailFetchType : string;
  stockIdArray : string;
  pageNumber: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  displayingStockDetails : DisplayingStockDetails[] = [];

  stockDetailsFetchTypeArry = ['get_By_Id', 'get_All_StockDetails', 'get_StockDetails_Between_Dates','get_StockDetails_on_Dates', 'get_By_stockNotes','get_By_chartNotes','get_By_category'];
  get_By_Id_dev = false;
  get_All_StockDetails_dev: boolean = false;
  get_StockDetails_Between_Dates_dev: boolean = false;
  get_StockDetails_on_Dates_dev: boolean = false;
  get_By_chartNotes_dev: boolean = false;
  get_By_stockNotes_dev: boolean = false;
  get_By_category_dev: boolean = false;
  fromDate: Date;
  toDate: Date;
  error = false;
  stockIdTofetch : string;
  selectedDate : Date;
  chartDetailInPopUp : ChartDetailsResponseVo;
  isPopupOpen = false;
 stochNoteSearch : string;
 chartNoteSearch : string;
 show_image_url :string
 fetchTypeNameValAppend : string;
 stockNumber : string;
 nibNiIndexArry : NiBniIndxDetailsRespVo[] =[];
 categoryBindingSearch : string;
 displayingIndexValues_dev : boolean = false;
  constructor(private customDatePipe : CustomDatePipe, private displayService : DisplayStockDetailService) {
    
  }
  

   validate() {
      console.log("validate method ===== fromDate="+this.fromDate+"   toDate="+this.toDate);
  if (this.fromDate && this.toDate) {
    this.error = new Date(this.toDate) < new Date(this.fromDate);
      }
   }

  
  findStockFetchType(){
    console.log("Enter into findStockFetchType method====="+this.stockDetailFetchType);
  this.get_By_Id_dev = false;
  this.get_All_StockDetails_dev = false;
  this.get_StockDetails_Between_Dates_dev = false;
  this.get_StockDetails_on_Dates_dev = false;
  this.get_By_chartNotes_dev = false;
  this.get_By_stockNotes_dev = false;
  this.get_By_category_dev = false;

    if(this.stockDetailFetchType == 'get_By_Id'){
      this.get_By_Id_dev = true;
    } else if(this.stockDetailFetchType == 'get_All_StockDetails'){
      this.get_All_StockDetails_dev = true;
    } else if(this.stockDetailFetchType == 'get_StockDetails_Between_Dates'){
      this.get_StockDetails_Between_Dates_dev = true;
    } else if(this.stockDetailFetchType == 'get_StockDetails_on_Dates'){
      this.get_StockDetails_on_Dates_dev = true;
    }else if(this.stockDetailFetchType == 'get_By_chartNotes'){
      this.get_By_chartNotes_dev = true;
    } else if(this.stockDetailFetchType == 'get_By_stockNotes'){
      this.get_By_stockNotes_dev = true;
    } else if(this.stockDetailFetchType == 'get_By_category'){
      this.get_By_category_dev = true;
    }

    console.log("stockDetailFetchType====="+this.stockDetailFetchType);
  }


  fetchStockDetails(fetchTypeNameVal: string){
    console.log("Enter into fetchStockDetails method====="+this.stockDetailFetchType);
    this.pageNumber = 0;
    this.pageSize = 5;
    this.fetchTypeNameValAppend = fetchTypeNameVal;
    this.getAllStockDetails();
  }

   getAllStockDetails(){
      let fetchIndDetails = new FetchIndDetailsReq();
      fetchIndDetails.pageNumber = this.pageNumber;
      fetchIndDetails.pageSize = this.pageSize;
      if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_By_Id'){
          fetchIndDetails.fetchTypeName = 'get_By_Id';
        fetchIndDetails.listStockIds = this.stockIdArray;
      } else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_StockDetails_Between_Dates'){
         fetchIndDetails.fetchTypeName = 'get_StockDetails_Between_Dates';

        fetchIndDetails.fromDate = this.customDatePipe.transform(this.fromDate, 'yyyyMMdd');
        fetchIndDetails.toDate = this.customDatePipe.transform(this.toDate, 'yyyyMMdd');

      }else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_StockDetails_on_Dates'){
         fetchIndDetails.fetchTypeName = 'get_StockDetails_on_Dates';
        fetchIndDetails.toDate = this.selectedDate;
        
  
    let stockId=this.customDatePipe.transform(this.selectedDate, 'numId');
    let StockDate=this.customDatePipe.transform(this.selectedDate, 'def');
    console.log("selected date="+this.selectedDate +"   converted into id="+stockId);
    fetchIndDetails.stockId = stockId;
      }else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_All_StockDetails'){
         fetchIndDetails.fetchTypeName = 'get_All_StockDetails';
      }else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_By_chartNotes'){
         fetchIndDetails.fetchTypeName = 'get_By_chartNotes';
         fetchIndDetails.chartNotes = this.chartNoteSearch
      }else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_By_stockNotes'){
         fetchIndDetails.fetchTypeName = 'get_By_stockNotes';
         fetchIndDetails.stockNotes = this.stochNoteSearch;
      } else if(this.fetchTypeNameValAppend && this.fetchTypeNameValAppend == 'get_By_category'){
         fetchIndDetails.fetchTypeName = 'get_By_categoryDirection';
         fetchIndDetails.categoryDirectionSearch = this.categoryBindingSearch;
      } 
    this.displayService.fetchStocktoDisplay(fetchIndDetails).subscribe(resp=>{
      if(resp.code == 200){
        this.displayingStockDetails = resp.data;
       console.log("In controller output====="+this.displayingStockDetails.length);
        console.log("In controller output====="+JSON.stringify(this.displayingStockDetails));
        this.totalRecords = resp.totalRecords;
         console.log("In controller totalRecords====="+this.totalRecords);
      }else if(resp.code == 300){}},
       (error)=>{
          console.error("error in chartfileuploadconponent ====="+error)
       }
    )



  }
    
   openPopup(chartDetailsResponseVo : ChartDetailsResponseVo) {
        let baseurl= "myfile";
        
      this.chartDetailInPopUp = chartDetailsResponseVo;
            console.log("chartDetailInPopUp chartUrl====="+JSON.stringify(this.chartDetailInPopUp));

      console.log("chartDetailInPopUp chartUrl====="+this.chartDetailInPopUp.chartUrl);
          let imgArry= this.chartDetailInPopUp.chartUrl.split("nifty_chart_path");
  
          //this.chartDetailInPopUp.chartUrl = baseurl+imgArry[1];
          this.show_image_url=baseurl+imgArry[1];
      this.isPopupOpen = true;
    }
  
    closePopup() {
      this.isPopupOpen = false;
      this.displayingIndexValues_dev = false
    }


     next() {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      //this.getAllStockDetails();
      this.getAllStockDetails();
    }
  }

  previous() {
    if (this.pageNumber >= 0) {
      this.pageNumber--;
      //this.getAllStockDetails();
      this.getAllStockDetails();
    }
  }

  get disableNext() {
  
  if(this.pageNumber * this.pageSize >= this.totalRecords){
    return true;
  } else {
    return false;
  }
}

get disablePrev() {
  return this.pageNumber === 0;
}


displayingIndexValues(displayStockVo : DisplayingStockDetails){  
this.nibNiIndexArry = displayStockVo.niBniIndxDetailsResponseVo;
this.stockNumber = displayStockVo.stockId;
this.displayingIndexValues_dev = true;
console.log("nibNiIndexArry length====="+this.nibNiIndexArry.length);
}
}