import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomDatePipe } from '../../pipeService/custom-date.pipe';
import { ChartModule } from 'angular-highcharts';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from '../../authentication/services/api.service';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpHeaderInterceptorService } from '../../authentication/interceptors/http-header-interceptor.service';
import { LoaderComponent } from '../../loader/loader.component';
import { AlertComponent } from '../../alert/alert.component';
import { AppCalendarComponent } from '../../app-calendar/app-calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';




@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    AppCalendarComponent
  ],
  imports: [
   // BrowserModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    CustomDatePipe,
    ChartModule,
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  exports:[    
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    CustomDatePipe,
    ChartModule,
    MatTableModule,
    LoaderComponent,
    AlertComponent,
    AppCalendarComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,

    

   ],
   providers:[DatePipe, CustomDatePipe,
   // provideHttpClient(withInterceptorsFromDi()),

  ]
})
export class ShareModuleModule { }
