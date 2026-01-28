import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

 login = new LoginModel();
 loginerror : boolean = false;
 errorMessage : string = 'Entered UserName or Password Incorrect';
 
 constructor( private router: Router){}

 logincheck(){
  this.loginerror = false;
  console.log('we got values= '+this.login.userName +'   pass=='+this.login.password);
  if(this.login.userName == this.login.password){
   this.router.navigate(['/dashboard']);
  }else{
      this.loginerror = true;

  }
 }
  

}
