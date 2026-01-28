import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipeService/custom-date.pipe';
import { IndexChartService } from '../../services/index-chart.service';
import { UploadFileDetails } from '../../models/upload-file-details';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppConstant } from '../../constants/app.constant';
import { UploadFileDetailsRespVo } from '../../models/upload-file-details-resp-vo';
import { StockDetailsRespVo } from '../../models/stock-details-resp-vo';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-chart-file-upload',
 // standalone: true,
  //imports: [],
  templateUrl: './chart-file-upload.component.html',
  styleUrl: './chart-file-upload.component.scss'
})
export class ChartFileUploadComponent {


  //dateFromChild : Date;
  marketDayValueDiv : boolean = false;
  marketEndValue : number;
  marketSignStatus : string;
  marketNotes : string;
  uploadChartDiv : boolean = false;
  receiveDateFromChild : Date;
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  chartNotes : string;
   
  isShowError : boolean = false;
  errorMessage : string;
  
  selectedChartType: string = '';
  displayingChart : boolean = false;
  displayingChartType : string;
  displayingChartUrl : string;

  stockFoundMessage: string;


  options = ['Dashboard Chart', 'Line Chart', 'Bar Chart'];
  chartUploadStatusDisplay = [{'chartType' : 'Dashboard Chart', 'status': 'Not Uploaded', 'imageUrl' : ''},
    {'chartType' : 'Line Chart', 'status': 'Not Uploaded', 'imageUrl' : ''},
    {'chartType' : 'Bar Chart', 'status': 'Not Uploaded', 'imageUrl' : ''}
  ];

  uploadFileDetailsRespVo : UploadFileDetailsRespVo[];

  stockDetailsRespVo = new StockDetailsRespVo;



  constructor(private customDatePipe : CustomDatePipe, private indexChartService : IndexChartService, 
    private local_storag : LocalStorageService, private alertService : AlertService){}

  handleDataFromChild(date: Date) {
    this.receiveDateFromChild = date; // Store the data received from the child
    if(this.receiveDateFromChild != null){
      this.checkMarketDayEndValue();
    //this.checkUploadDetails();
    }
  }
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];

  }

  checkMarketDayEndValue(){
    this.marketDayValueDiv = false;
    let stockId=this.customDatePipe.transform(this.receiveDateFromChild, 'numId');

    this.indexChartService.fetchStockDetailsById(stockId).subscribe(resp=>{
      if(resp.code == 200){
        this.stockDetailsRespVo = resp.data;
        
        console.log("checking market value="+JSON.stringify(this.stockDetailsRespVo));
        if(this.stockDetailsRespVo.marketDayEndValue == null || this.stockDetailsRespVo.marketgapResult == null){
          //console.log("checking market value="+JSON.stringify(this.stockDetailsRespVo));
          this.stockFoundMessage = "Below Stock Detials of :  "+ this.receiveDateFromChild;

          this.isShowError = true;
           this.errorMessage = "Market Value not updated";
           this.marketDayValueDiv = true;
        }else{
          this.checkUploadDetails();
        }
  
      }
  },(error)=>{
    this.isShowError = true;
    this.errorMessage = error;
    console.error("error in chartfileuploadconponent ====="+error)
  }
);
}
  

   checkUploadDetails(){
    this.isShowError = false;
    this.errorMessage = '';
    this.marketDayValueDiv = false;
    let charId=this.customDatePipe.transform(this.receiveDateFromChild, 'numId');
   // this.options = [];
    this.indexChartService.checkChartDetailsService(charId).subscribe(resp=>{
      if(resp.code == 200){
        console.log("enter into chartfileuploadconponent  of checkUploadDetails response==="+JSON.stringify(resp.data));

        this.uploadFileDetailsRespVo = resp.data;
        this.removingChartNameEnableViewButton(this.uploadFileDetailsRespVo);
      /*  for(const uploadFilelist of this.uploadFileDetailsRespVo){
          console.log("enter into chartfileuploadconponent  of checkUploadDetails in loop==="+uploadFilelist.chartName);
        
           const index = this.options.findIndex(opt => opt === uploadFilelist.chartName);                 
          
            // If found, remove that user
           if (index !== -1) {
            this.options.splice(index, 1);
             }

             const indexdisp = this.chartUploadStatusDisplay.findIndex(val => val.chartType === uploadFilelist.chartName);     


            this.chartUploadStatusDisplay[indexdisp].status = 'Uploaded';
            this.chartUploadStatusDisplay[indexdisp].imageUrl = uploadFilelist.chartUrl;

        }*/
        this.isShowError = true;
        console.log("enter into chartfileuploadconponent  of checkUploadDetails response aft==="+JSON.stringify(this.uploadFileDetailsRespVo));

      }else if(resp.code == 300){
        this.isShowError = true;
        this.errorMessage = resp.errorMessage;
      }
    },
  (error)=>{
    this.isShowError = true;
    this.errorMessage = error;
    this.uploadChartDiv = true;
    console.error("error in chartfileuploadconponent ====="+error)
  })
  }


  removingChartNameEnableViewButton(uploadFileDetailsVo : UploadFileDetailsRespVo[]){

   // this.uploadFileDetailsRespVo = uploadFileDetailsVo;
    for(const uploadFilelist of uploadFileDetailsVo){
      console.log("enter into chartfileuploadconponent  of checkUploadDetails in loop==="+uploadFilelist.chartName);
    
       const index = this.options.findIndex(opt => opt === uploadFilelist.chartName);                 
      
        // If found, remove that user
       if (index !== -1) {
        this.options.splice(index, 1);
         }

         const indexdisp = this.chartUploadStatusDisplay.findIndex(val => val.chartType === uploadFilelist.chartName);     


        this.chartUploadStatusDisplay[indexdisp].status = 'Uploaded';
        this.chartUploadStatusDisplay[indexdisp].imageUrl = uploadFilelist.chartUrl;

    }
    console.log("enter into chartfileuploadconponent  of displaying chart name in dropdown ==="+this.options.length);
    
    if(this.options.length > 0){
      this.isShowError = true;
       
    this.uploadChartDiv = true;
    }
  }

  upload() {
    console.error("uloaded clicked ====="+this.selectedFile)

    if (this.selectedFile) {
      let charId=this.customDatePipe.transform(this.receiveDateFromChild, 'numId');
      const formData = new FormData();

      formData.append('file', this.selectedFile);
      formData.append('chartNotes', this.chartNotes);
      formData.append('chartType', this.selectedChartType);
      formData.append('stockId', charId);
      let uploadFileDetails = new UploadFileDetails();

      //uploadFileDetails.file = formData;
      uploadFileDetails.chartNotes = this.chartNotes;
      uploadFileDetails.chartType = this.selectedChartType;
    
      this.indexChartService.uploadingFile(formData).subscribe(resp=>{
        if(resp.code == 200){
          console.log("enter into chartfileuploadconponent ==="+resp.data);

          this.local_storag.removeItem(AppConstant.FILE_UPLOAD);
          this.uploadFileDetailsRespVo = resp.data;
          this.removingChartNameEnableViewButton(this.uploadFileDetailsRespVo);
          this.chartNotes = "";
          this.selectedChartType = "";
          this.selectedFile = null;
        }
      },
    (error)=>{
      this.isShowError = true;
      this.errorMessage = error;
      this.local_storag.removeItem(AppConstant.FILE_UPLOAD);

      console.error("error in chartfileuploadconponent ====="+error)
    })
    }
  
  }
  viewChart(chartType : string, imageurl : string){
    console.log("view button click==="+chartType + "  url=="+imageurl);
    let baseurl= "myfile";
    this.displayingChart = true;
    this.displayingChartType = chartType;
   // let imgurl = imageurl.replace("E:\stock-market-project\nifty_chart_path","myfile")
    let imgArry= imageurl.split("nifty_chart_path");

    //console.log("view  imgArry[1]==="+imgArry[0] + "  url=="+imgArry[1]);
    console.log("view  imgurl==="+baseurl+imgArry[1]);

    this.displayingChartUrl = baseurl+imgArry[1];

    

  }

  deriveMarketGap(){
    console.log("market end value==="+this.marketDayValueDiv);
    let val =  this.marketEndValue - this.stockDetailsRespVo.aftIndxValue;
    console.log("market end value gap==="+val);
    this.stockDetailsRespVo.marketDayEndValue = this.marketEndValue;
    this.stockDetailsRespVo.marketgapResult  = val;
  }

  deriveMarketSign(){
    console.log("market end value==="+this.marketSignStatus);
  
    this.stockDetailsRespVo.marketSingStatus  = this.marketSignStatus;
  }

  deriveMarketNotes(){
    console.log("market end value==="+this.marketNotes);
  
    this.stockDetailsRespVo.stockNotes  = this.marketNotes;
  }

  submitDeriveDetails(){
    if(this.stockDetailsRespVo.marketDayEndValue != null && this.stockDetailsRespVo.marketSingStatus != null && this.stockDetailsRespVo.stockNotes != null){
      this.indexChartService.uploadStockDerivedProperties(this.stockDetailsRespVo).subscribe(resp=>{
      if(resp.code == 200){
        console.log("Saved Sucessfully");
        this.alertService.showAlert('Sucessfully Updated Stock Details', 'success');
        this.checkUploadDetails();

      }

      },
      (error)=>{
        this.alertService.showAlert('error', 'Stock Details Not Updated');

      }
    );
    }else{
      console.log("Please Enter all Missing Details");
     // this.alertService.showAlert(error,'error');

      this.alertService.showAlert('Please Enter all Missing Details','info');


    }
  }
}
