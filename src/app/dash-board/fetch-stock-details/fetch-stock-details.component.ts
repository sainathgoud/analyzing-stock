import { Component } from '@angular/core';
import { CustomDatePipe } from "../../pipeService/custom-date.pipe";
import { IndexChartService } from '../../services/index-chart.service';
import { StockDetailsRespVo } from '../../models/stock-details-resp-vo';
import { Router } from '@angular/router';
import { InternalUrlConstant } from '../../constants/internal-url-constant';

@Component({
  selector: 'app-fetch-stock-details',
  //standalone: true,
  //imports: [CustomDatePipe, ShareModuleModule],
  templateUrl: './fetch-stock-details.component.html',
  styleUrl: './fetch-stock-details.component.scss'
})
export class FetchStockDetailsComponent {

  currentDate = new Date();

  stockDetailsRespVo : StockDetailsRespVo;
  displayTableRecordFlag : boolean = false;
  stockNotFoundFlag : boolean = false;
  stockFoundMessage: string;
  stockNotAvailable : string;
  selectedDate : Date;

  constructor(private customDatePipe : CustomDatePipe, private indexChartService : IndexChartService,private router: Router){

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

  UploadStock(){

   if(this.selectedDate != null){
    this.router.navigateByUrl(InternalUrlConstant.DASHBARD_ROOT+InternalUrlConstant.IND_VALUES_COMPONENT, {state: {checkUploadDate: this.selectedDate}})
  }
}
}
