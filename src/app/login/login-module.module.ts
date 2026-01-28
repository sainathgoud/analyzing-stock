import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
   // BrowserModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginModuleModule { }
