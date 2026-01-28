import { Component, OnInit } from '@angular/core';
import { IndexChartService } from '../../services/index-chart.service';
import { ChartDataSet } from '../../models/chart-data-set';
import { LocalStorageService } from '../../services/local-storage.service';
import { ConverToChartService } from '../../services/conver-to-chart.service';
import { Chart } from 'angular-highcharts';
import { CommonUtilService } from '../../services/common-util.service';
import { AlertService } from '../../services/alert.service';
import { AppConstant } from '../../constants/app.constant';
import { Router } from '@angular/router';
                             
@Component({
  selector: 'app-ind-chart',
 // standalone: true,
  //imports: [],
  templateUrl: './ind-chart.component.html',
  styleUrl: './ind-chart.component.scss'
})
export class IndChartComponent implements OnInit{

 chartDataSet = new ChartDataSet();
 pass_child_chartDataSet = new ChartDataSet();

 linechartvalone? = new Chart();
 linechartvaltwo? = new Chart();
 linechartvalthree? = new Chart();
 linechartvalfour? = new Chart();
 linechartvalfive? = new Chart();
 linechartvalsix? = new Chart();
 linechartvalseveen? = new Chart();
 linechartvaleight? = new Chart();

 allindexValues? : any[]=[];
 displayfullchart? = new Chart();
 showfullchart : boolean = false;
 textshowfullchart = "Show Full Chart";

 finalsignChartPositive : number = 0;
 finalsignChartNegative : number = 0;
 isLoading :boolean = false;
 timeoutDuration: number = 5000; 

 indexNotes : string;

 totalIndexChartCount : number = 8;



  constructor(private indexChartService : IndexChartService, private local_storag : LocalStorageService, 
    private converToChartService : ConverToChartService,private commonutil : CommonUtilService,
    private alertService : AlertService,private router: Router){
      this.generatingChartValues()
      this.fetchingChartDetails();
      this.pass_child_chartDataSet = this.chartDataSet;
      this.isLoading = false;
    console.log("Enter into IndChartComponent of constructor"+JSON.stringify(this.pass_child_chartDataSet));


  }
  ngOnInit(): void {
    console.log("Enter into IndChartComponent of ngOnInit");
   
  }


  fetchingChartDetails(){
   //let objval = this.local_storag.getItem('indchartDetails');
   if(this.chartDataSet != null){
   //console.log(" enter to fetchingChartDetails conveting into object=="+JSON.stringify(this.chartDataSet));

   //this.chartDataSet = JSON.parse(objval);
   //console.log("after conveting into object=="+JSON.stringify(this.chartDataSet));
   this.linechartvalone = this.converToChartService.chartDraw(this.chartDataSet.indexone.indexValueList, '25-dec-2024',305,'#FF5733');
   this.linechartvaltwo = this.converToChartService.chartDraw(this.chartDataSet.indextwo.indexValueList, '25-dec-2024',305,'#33FF57');

   this.linechartvalthree = this.converToChartService.chartDraw(this.chartDataSet.indexthree.indexValueList, '25-dec-2024',305, '#3357FF');

   this.linechartvalfour = this.converToChartService.chartDraw(this.chartDataSet.indexfour.indexValueList, '25-dec-2024',305,'#33FF57');

   this.linechartvalfive = this.converToChartService.chartDraw(this.chartDataSet.indexfive.indexValueList, '25-dec-2024',305,'#3357FF');

   this.linechartvalsix = this.converToChartService.chartDraw(this.chartDataSet.indexsix.indexValueList, '25-dec-2024',305, '#33FF57');
   this.linechartvalseveen = this.converToChartService.chartDraw(this.chartDataSet.indexseveen.indexValueList, '25-dec-2024',305,'#3357FF');
   this.linechartvaleight = this.converToChartService.chartDraw(this.chartDataSet.indexeight.indexValueList, '25-dec-2024',305,'#33ff86');

  }

  }

  displayfullChart(){
   this.showfullchart =! this.showfullchart;

    if(!this.showfullchart ){
      this.textshowfullchart = "Show Full Chart";

    }else{
      this.textshowfullchart = "Hidden Full Chart";

    }
    this.allindexValues= this.indexChartService.creatingFullchart(this.chartDataSet);
    //console.log("for full chart display=="+this.allindexValues);
    this.displayfullchart = this.converToChartService.chartDraw(this.allindexValues, '25-dec-2024',405,'#3357FF');


  }

   saveChartDetails(){
    this.isLoading = true;
    console.log("saveChartDetails isLoader before=="+this.isLoading);
    this.chartDataSet.stockNotes = this.indexNotes;
    console.log("enter into Index chart service of savingChartDetails chart details=="+JSON.stringify(this.chartDataSet));
    this.indexChartService.savingChartDetails(this.chartDataSet).subscribe(resp=>{
      if(resp.code == 200){
        this.isLoading = false;

        console.log(" in response saveChartDetails isLoader before=="+this.isLoading);
       this.local_storag.removeItem(AppConstant.LOCALLY_SAVE_CHART);
       this.alertService.showAlert( 'Sucessfully Saved Stock Details', 'success');
       //this.router.navigate(['/home']);
       this.router.navigateByUrl('/dashboard/home');

       
      }
    },
    (error) => { 

      this.isLoading = false;

      

    
      setTimeout(() => {
        this.isLoading = true;  // Hide loader after 5 seconds
      }, this.timeoutDuration);
  
      this.alertService.showAlert(error,'error');

    
      console.log(" in response saveChartDetails isLoader before=="+this.isLoading);

      console.error('Error occurred', error);
    });
   }

   generatingChartValues(){
    this.finalsignChartPositive = 0;
    this.finalsignChartNegative = 0;
   let objval = this.local_storag.getItem(AppConstant.LOCALLY_SAVE_CHART);
   if(objval != null){
   console.log("in indchart component generatingChartValues before conveting into object=="+objval);

   this.chartDataSet = JSON.parse(objval);
    console.log("checking the value on click event indValue");
    for(let i = 0; i < this.totalIndexChartCount; i++){
    if(0 == i){
      this.chartDataSet= this.indexChartService.addIndValueTochart("1",this.chartDataSet.indexone.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indexone.indSign);
    }else if(1 == i){
      
      this.chartDataSet = this.indexChartService.addIndValueTochart("2",this.chartDataSet.indextwo.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indextwo.indSign);
    }else if(2 == i){
  
     this.chartDataSet =  this.indexChartService.addIndValueTochart("3",this.chartDataSet.indexthree.indchartpoint, this.chartDataSet);
     this.creatFinalChartSign(this.chartDataSet.indexthree.indSign);
    }
    else if(3 == i){
      
      this.chartDataSet = this.indexChartService.addIndValueTochart("4",this.chartDataSet.indexfour.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indexfour.indSign);
    }else if(4 == i){
     
     this.chartDataSet = this.indexChartService.addIndValueTochart("5",this.chartDataSet.indexfive.indchartpoint, this.chartDataSet);
     this.creatFinalChartSign(this.chartDataSet.indexfive.indSign);
    }else if(5 == i){
   
      this.chartDataSet = this.indexChartService.addIndValueTochart("6",this.chartDataSet.indexsix.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indexsix.indSign);
    }else if(6 == i){
     
      this.chartDataSet = this.indexChartService.addIndValueTochart("7",this.chartDataSet.indexseveen.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indexseveen.indSign);
    }
    else if(7 == i){
      
      this.chartDataSet = this.indexChartService.addIndValueTochart("8",this.chartDataSet.indexeight.indchartpoint, this.chartDataSet);
      this.creatFinalChartSign(this.chartDataSet.indexeight.indSign);

    }
  }
   console.log(" in indchart component generatingChartValues final chart result in positve= "+this.finalsignChartPositive +"and  negative=="+ this.finalsignChartNegative);
  if(this.finalsignChartPositive == this.totalIndexChartCount){
    this.chartDataSet.dayindSign = "11";
  }else if(this.finalsignChartNegative == this.totalIndexChartCount){
    this.chartDataSet.dayindSign = "-11";
  }else{
    this.chartDataSet.dayindSign = "10";
  }
}
}
  creatFinalChartSign(val :string){
    if(val == "11"){
      this.finalsignChartPositive++;
    } else if(val == "-11"){
      this.finalsignChartNegative++;
    }
  }
}
