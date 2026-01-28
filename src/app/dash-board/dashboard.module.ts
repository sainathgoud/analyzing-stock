import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
//import { IndValuesComponent } from '../ind-values/ind-values.component';
//import { IndValuesModule } from '../ind-values/ind-values.module';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashBordRoutingModule } from './dash-bord-routing-module';


import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShareModuleModule } from '../share-module/share-module/share-module.module';
import { IndValuesComponent } from './ind-values/ind-values.component';
import { CustomDatePipe } from '../pipeService/custom-date.pipe';
import { IndChartComponent } from './ind-chart/ind-chart.component';
import { DisplayTableChartComponent } from './display-table-chart/display-table-chart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../authentication/services/api.service';
import { ChartFileUploadComponent } from './chart-file-upload/chart-file-upload.component';
import { FetchStockDetailsComponent } from './fetch-stock-details/fetch-stock-details.component';
import { SpeechRecognitionComponent } from '../speech-recognition/speech-recognition.component';
import { CompareStockComponent } from './compare-stock/compare-stock.component';
import { DisplayStockDetailsComponent } from './display-stock-details/display-stock-details.component';

@NgModule({
  declarations: [
    DashBoardComponent,

    IndValuesComponent,
    IndChartComponent,
    DisplayTableChartComponent,
    ChartFileUploadComponent,
    FetchStockDetailsComponent,
    SpeechRecognitionComponent,
    CompareStockComponent,
    DisplayStockDetailsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashBordRoutingModule,
   // IndValuesModule,
   ShareModuleModule,
   
  ],
 schemas:[],
// providers:[ApiService, HttpClient],
 exports:[]
})
export class DashboardModule { }
