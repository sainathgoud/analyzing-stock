import { Router, RouterModule, Routes } from "@angular/router";
import { DashBoardComponent } from "./dash-board.component";
import { NgModule } from "@angular/core";
import { IndValuesComponent } from "./ind-values/ind-values.component";
import { IndChartComponent } from "./ind-chart/ind-chart.component";
import { ChartFileUploadComponent } from "./chart-file-upload/chart-file-upload.component";
import { FetchStockDetailsComponent } from "./fetch-stock-details/fetch-stock-details.component";
import { SpeechRecognitionComponent } from "../speech-recognition/speech-recognition.component";
import { CompareStockComponent } from "./compare-stock/compare-stock.component";
import { DisplayStockDetailsComponent } from "./display-stock-details/display-stock-details.component";

const routet : Routes =[
    {
        path: "dashboard", component : DashBoardComponent,
        
    },
    {path: 'indValuesComp', component : IndValuesComponent},
    {path: 'home', component : FetchStockDetailsComponent},

    {path: 'indexChartComp', component : IndChartComponent},
    {path: 'chartfiles-upload', component : ChartFileUploadComponent},
    {path : 'speech-recognition', component : SpeechRecognitionComponent},
    {path : 'compare-stock', component : CompareStockComponent},
    {path : 'display-stock-details', component : DisplayStockDetailsComponent}

];

@NgModule({
    imports:[ 
        
        RouterModule.forChild(routet)],
    exports:[RouterModule]
})

export class DashBordRoutingModule {
}
