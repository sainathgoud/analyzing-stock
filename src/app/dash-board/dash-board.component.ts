import { Component } from '@angular/core';
import { IndValuesComponent } from './ind-values/ind-values.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  //standalone: true,
  //imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {


  home : string='home';
  product : string = 'prod';
  contact : string = 'cont';
  title : string= 'dash bore';
}
