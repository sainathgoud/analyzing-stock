import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndValuesComponent } from './dash-board/ind-values/ind-values.component';
import { DashboardModule } from './dash-board/dashboard.module';
import { LoginModuleModule } from './login/login-module.module';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpHeaderInterceptorService } from './authentication/interceptors/http-header-interceptor.service';
import { HomeDashBoardComponent } from './home-dash-board/home-dash-board.component';
import { ShareModuleModule } from './share-module/share-module/share-module.module';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { HomeDashBoardModule } from './home-dash-board/home-dash-board.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DashboardModule,
    LoginModuleModule,
    
    RouterModule,
    RouterLink,
    RouterOutlet,
    HomeDashBoardModule
    
    //ShareModuleModule
    
    
  ],
  exports:[
    RouterModule,
    
    
  ],
  providers:[
    {provide : HTTP_INTERCEPTORS, useClass : HttpHeaderInterceptorService, multi: true},

  ],
  
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
