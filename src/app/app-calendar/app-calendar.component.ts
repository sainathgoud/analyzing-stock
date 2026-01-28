import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-app-calendar',
  //standalone: true,
  //imports: [],
  templateUrl: './app-calendar.component.html',
  styleUrl: './app-calendar.component.scss'
})
export class AppCalendarComponent   {

  @Output() dateFromChild = new EventEmitter<Date>();
  currentDate: Date = new Date();
  selectedDate: Date;
 
  constructor(){
   
  }
  

  
  onDateChange() {
    console.log("onDateChange==="+this.selectedDate)
    if (this.selectedDate) {
      this.dateFromChild.emit(this.selectedDate);  // Emit the selected date to parent
    }
  }

   }
