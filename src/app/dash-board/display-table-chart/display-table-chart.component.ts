import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChartDataSet } from '../../models/chart-data-set';
import { AppConstant } from '../../constants/app.constant';

@Component({
  selector: 'app-display-table-chart',
  //standalone: true,
  //imports: [],
  templateUrl: './display-table-chart.component.html',
  styleUrl: './display-table-chart.component.scss'
})
export class DisplayTableChartComponent implements OnInit{

   //chartDataSet = new ChartDataSet();
  
@Input() chartDataSetObj: ChartDataSet; 
//chartDataSetObj= new ChartDataSet;
  constructor(private local_storag : LocalStorageService,){
    console.log("DisplayTableChartComponent ==="+this.chartDataSetObj)
  }
  ngOnInit(): void {
//let objval = this.local_storag.getItem('indchartDetails');
    // let objval = this.local_storag.getItem(AppConstant.LOCALLY_SAVE_CHART);
     //this.chartDataSetObj = JSON.parse(objval);
    //console.log("before conveting into object=="+objval);
 
    // @Input() childData: string; this.chartDataSet = JSON.parse(objval);    
  }

  

}
