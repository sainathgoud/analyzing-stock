import { EventEmitter, Injectable } from '@angular/core';
import { IndChartValue } from '../models/ind-chart-value';
import { ChartDataSet } from '../models/chart-data-set';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { SubChartValueModel } from '../models/sub-chart-value-model';
import { ApiService } from '../authentication/services/api.service';
import { map, Observable } from 'rxjs';
import { ServerResponse } from '../authentication/services/server-response';
import { CommonUtilService } from './common-util.service';
import { AppConstant } from '../constants/app.constant';
import { AppUrlConstant } from '../constants/app-url.constant';
import { UploadFileDetails } from '../models/upload-file-details';
import { StockDetailsRespVo } from '../models/stock-details-resp-vo';
import { FetchIndDetailsReq } from '../models/fetch-ind-details-req';

@Injectable({
  providedIn: 'root'
})
export class IndexChartService {

  indexchartValue = new EventEmitter<ChartDataSet>();

 // chartDataSet = new ChartDataSet();
  errorMessage: string = ''; // Variable to store error message
   negsign : number=0;
   positivesign : number=0;
   chartDataSetRestore = new ChartDataSet();


  constructor(private router: Router, private local_storag : LocalStorageService, private apiService :ApiService,
    private commonutil : CommonUtilService
  ) { }

  
  
  dataval : string[];

  creatingChartData(indNum:string, indval : string, xaxisValue :number, color_val :string){
    let indchartVal = new IndChartValue();
    this.dataval=[];
    indchartVal.indNumber = indNum;
    indchartVal.indchartpoint = indval;
     this.dataval = indval.split(",").filter(val=>val != null && val.length >0);
     indchartVal.indxCount = this.dataval.length;
      
      const numbers = this.dataval.map(Number);
      const max = Math.max(...numbers);
      const min = Math.min(...numbers);
     indchartVal.indxHighValue = max;
     indchartVal.indxLowValue = min;
     indchartVal.indxLastValue = this.dataval[this.dataval.length-1];

     indchartVal.indStartValue = this.dataval[0];
      if(indchartVal.indStartValue.startsWith("-")){
         indchartVal.indStartSign = '-11';
      }else{
        indchartVal.indStartSign = '11';
      }
     this.negsign=0;
     this.positivesign=0;
     
    console.log(" create dataval=="+this.dataval+" before   nagavit==="+this.negsign+ "===positive===="+this.positivesign );
   for(let i=0; i < this.dataval.length; i++){      
     let keyObj= xaxisValue+i;
     indchartVal.indexValueList.push({x:keyObj,y:parseInt(this.dataval[i]), color:color_val});
     this.findingSignofIndex(this.dataval[i]);
  }
  console.log(" enter in to creatingChartData check positive and neg=="+indNum +"  ===negativ=="+this.negsign +"===positive=="+this.positivesign);
    if(this.negsign > 0 && this.positivesign >0){
      indchartVal.indSign ="10";
    }else if(this.negsign == 0 && this.positivesign >0){
      indchartVal.indSign ="11";
    }else if(this.negsign > 0 && this.positivesign == 0){
      indchartVal.indSign ="-11";
    }
   return indchartVal;
  }



   findingSignofIndex(indval : string){

    if(Number.parseInt(indval) < 0){
      this.negsign++;
   }else{
    this.positivesign++;
   }
   console.log(" enter in to findingSignofIndex check and neg=="+indval +"  ===negativ=="+this.negsign +"===positive=="+this.positivesign);

   }

  addIndValueTochart(indx:string, indval : string, chartDataSet : ChartDataSet){
    let dataset = new IndChartValue();
    if(indx == '1'){
      dataset=  this.creatingChartData('1',indval,100,'red');
        chartDataSet.indexone = dataset;
      } else if(indx == '2'){
        dataset=  this.creatingChartData('2',indval,200,'orange');
        chartDataSet.indextwo = dataset;
      }else if(indx == '3'){
        dataset=  this.creatingChartData('3',indval,300,'yellow');
        chartDataSet.indexthree = dataset;
      }else if(indx == '4'){
        dataset=  this.creatingChartData('4',indval,400, '#33FF57');
        chartDataSet.indexfour = dataset;
      }else if(indx == '5'){
        dataset=  this.creatingChartData('5',indval,500,'red');
        chartDataSet.indexfive = dataset;
      }else if(indx == '6'){
        dataset=  this.creatingChartData('6',indval,600, 'blue');
        chartDataSet.indexsix = dataset;
      }else if(indx == '7'){
        dataset=  this.creatingChartData('7',indval,700,'black');
        chartDataSet.indexseveen = dataset;
      }else if(indx == '8'){
        dataset=  this.creatingChartData('8',indval,800,'#33ff86');
        chartDataSet.indexeight = dataset;
      }
      
  //  this.chartDataSet.allindexValues.push(dataset);

    //this.indexchartValue.emit(this.chartDataSet);
    //console.log("final object in service=="+JSON.stringify(chartDataSet));
    return chartDataSet;

  }

  routingIndChart(subChartValueModel: SubChartValueModel, chartDataSet : ChartDataSet){
    console.log("routingIndChart=="+JSON.stringify(chartDataSet));
    // this.local_storag.setItem("indchartDetails",this.chartDataSet);
    chartDataSet.marketValue = subChartValueModel.marketVlaue;
    chartDataSet.aftIndex = subChartValueModel.aftIndex;
    chartDataSet.indexGapResult = subChartValueModel.indexGapResult;
    chartDataSet.todate = subChartValueModel.todate;
    chartDataSet.todaydateformatId = subChartValueModel.todaydateformatId;
     this.local_storag.setItem(AppConstant.LOCALLY_SAVE_CHART , JSON.stringify(chartDataSet));

   this.router.navigateByUrl('/dashboard/indexChartComp');
  }

  creatingFullchart( chartDataSet : ChartDataSet) : any[]{
    let allindexValues : any[]=[];
   let indcountvalue :number =0;
   let infiterationVal = 8;
   for(let i=0; i < infiterationVal; i++){
    if(0 ==  i){
      indcountvalue = this.iteratingAllIndexForFullChart(chartDataSet.indexone.indexValueList, allindexValues, chartDataSet.indexone,indcountvalue, '#0000FF');
      indcountvalue = indcountvalue+1;
    }
    if(1 ==  i){
      indcountvalue= this.iteratingAllIndexForFullChart(chartDataSet.indextwo.indexValueList,allindexValues, chartDataSet.indextwo, indcountvalue,'#5F9EA0');
      indcountvalue =indcountvalue+1;
    }
   if(2 ==  i){
    indcountvalue= this.iteratingAllIndexForFullChart(chartDataSet.indexthree.indexValueList,allindexValues, chartDataSet.indexthree, indcountvalue,'#00FFFF');
    indcountvalue = indcountvalue+1; 
  }
   if(3 ==  i){
    indcountvalue= this.iteratingAllIndexForFullChart(chartDataSet.indexfour.indexValueList,allindexValues, chartDataSet.indexfour, indcountvalue, '#B8860B');
    indcountvalue = indcountvalue+1;
  }
   if(4 ==  i){
    indcountvalue= this.iteratingAllIndexForFullChart(chartDataSet.indexfive.indexValueList,allindexValues, chartDataSet.indexfive, indcountvalue,'#8B008B');
    indcountvalue = indcountvalue+1;
  }
   if(5 ==  i){
    indcountvalue=this.iteratingAllIndexForFullChart(chartDataSet.indexsix.indexValueList,allindexValues, chartDataSet.indexsix,indcountvalue,'#FF8C00');
    indcountvalue = indcountvalue+1;
  }
   if(6 ==  i){
    indcountvalue = this.iteratingAllIndexForFullChart(chartDataSet.indexseveen.indexValueList,allindexValues, chartDataSet.indexseveen,indcountvalue,'#00CED1');
    indcountvalue =  indcountvalue+1;
  }
  if(7 ==  i){
    indcountvalue = this.iteratingAllIndexForFullChart(chartDataSet.indexeight.indexValueList,allindexValues, chartDataSet.indexeight,indcountvalue,'#33ff86');
    indcountvalue =  indcountvalue+1;
  }
  }
  return allindexValues;

  }




  public iteratingAllIndexForFullChart(indexValueList : any[], collectionInd : any[], indChartObj : IndChartValue, indcount: number, color_val:string ){

   
    
      let values = indChartObj.indchartpoint.split(",");
     
    let keyObj = indcount;
    //console.log(" enter in full chat count====keyObj=="+keyObj+  "==color code==="+color_val);

   for(let i=0; i < values.length; i++){
    if(values[i] != null && values[i].length > 0){
     let indv = keyObj+i;
     collectionInd.push({x:indv,y:parseInt(values[i]), color:color_val});
     indcount = indv;
     console.log(" enter in full chat count in loop=="+indcount);

    }

  }
   
  console.log(" enter in full chat aft loopbj========================="+indcount);
  return indcount;
   }

   savingChartDetails(chartDataSet : any):  Observable<ServerResponse>{
   console.log("enter into Index chart service of savingChartDetails chart details=="+JSON.stringify(chartDataSet));

   return this.apiService.post(AppUrlConstant.DASHBORD_SAVE_CHART_INFO,chartDataSet).pipe(map(resp=>{
   // this.local_storag.removeItem(AppConstant.LOCALLY_SAVE_CHART);
    return resp;
   }), err=>{
    return err;
   }
  );
   }

   savingSampleTest(chartDataSet : ChartDataSet,){
    console.log("Saving chart details");
    
    
    this.apiService.getwithUrl("/testing/name").subscribe({
     next: (val)=>{
       console.log("got response from back end=="+val);
 
     },
     error: (err)=>{
       return this.errorMessage = `Error: ${err.message}`;
 
     },
     //complete: () => { }
    });
    }


    
    

    uploadingFile(formData : FormData) : Observable<ServerResponse>{
      
      this.local_storag.setItem(AppConstant.FILE_UPLOAD , AppConstant.FILE_UPLOAD);
      return this.apiService.post(AppUrlConstant.DASHBORD_UPLOAD_FILE_URL,formData).pipe(map(resp=>{
        this.local_storag.removeItem(AppConstant.FILE_UPLOAD);

        return resp;
       }), err=>{
        return err;
       }
      );

    }
    checkChartDetailsService(chartId : string) : Observable<ServerResponse>{
      console.log("Enter into IndexChartService of fetchUploadChartInfoService");
      let url = AppUrlConstant.DASHBORD_CHECK_CHART_FILES_UPLOADED+'?numId='+chartId
      return this.apiService.getwithUrl(url).pipe(map(resp=>{
        return resp;
      }), err=>{
       return err;
      }
     );
    }

   restoringData() : string{
    let obj = this.local_storag.getItem(AppConstant.LOCALLY_SAVE_CHART);
   // this.chartDataSetRestore = JSON.parse(obj);
    return  obj;
  }

  fetchStockDetailsById(stockId :string) : Observable<ServerResponse>{
    let url = AppUrlConstant.DASHBORD_GET_STOCK_FOR_ID+'?stockId='+stockId
    return this.apiService.getwithUrl(url).pipe(map(resp=>{
      return resp;
    }), err=>{
     return err;
    }
   );
  }


  uploadStockDerivedProperties(stockDetailsRespVo : StockDetailsRespVo) : Observable<ServerResponse>{
      
    return this.apiService.post(AppUrlConstant.DASHBORD_UPDATE_STOCK_DETAILS,stockDetailsRespVo).pipe(map(resp=>{

      return resp;
     }), err=>{
      return err;
     }
    );

  }


  fetchStockDetailsCompare(fetchIndDetailsReq : FetchIndDetailsReq) : Observable<ServerResponse>{
      
    console.log("Request obj==="+JSON.stringify(fetchIndDetailsReq));
    return this.apiService.post(AppUrlConstant.FILTER_STOCK_DETAILS_BY_CRITERIA,fetchIndDetailsReq).pipe(map(resp=>{
      console.log("got response="+resp)
      return resp;
     }), err=>{
      return err;
     }
    );

  }

}
 