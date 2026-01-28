import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { HomeDashBoardComponent } from './home-dash-board.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [HomeDashBoardComponent],
  imports: [
    CommonModule,
        FormsModule,
    MatTabsModule,
    MatTab
  ],
  exports:[
    
  ],
  
})
export class HomeDashBoardModule { }
