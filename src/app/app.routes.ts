import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { IndValuesComponent } from './dash-board/ind-values/ind-values.component';
import { DashboardModule } from './dash-board/dashboard.module';
import { HomeDashBoardComponent } from './home-dash-board/home-dash-board.component';

export const routes: Routes = [
    { path: '',      component: LoginComponent },
    {path : 'dashboard', component : DashBoardComponent, loadChildren:()=>import('./dash-board/dashboard.module').then(dash=>dash.DashboardModule)},
    { path: 'home-dashbord',      component: HomeDashBoardComponent, loadChildren:()=>import('./home-dash-board/home-dash-board.module').then(dash=>dash.HomeDashBoardModule) },    

];
