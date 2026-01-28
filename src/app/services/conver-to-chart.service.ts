import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Axis, color } from 'highcharts';


@Injectable({
  providedIn: 'root'
})
export class ConverToChartService {

  constructor() { }
  linechartval = new Chart();


  chartDraw(indexvaluelists : any[], datevalue: string, hig : number, color_val: string) : Chart {
    
    console.log("it is charDraw method="+indexvaluelists);
  this.linechartval = new Chart({
    chart: {
      type: 'line',
      height: hig,
      

    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: true
    },
    series: [
      {
        name: 'value : ' + datevalue,       
   data : indexvaluelists,
   color : color_val,
   colorByPoint: true,
   dataLabels: {
    enabled: true
  }
      } as any
    ],
   
  });

  return this.linechartval;
}

}
