import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

   // Observable subject to manage the alert message and visibility
   private alertSubject = new Subject<{ message: string, type: string }>();
   alertState$ = this.alertSubject.asObservable();  // Expose the alert state as an observable
 
   // Show alert with custom message and type (success, error, info, etc.)
   showAlert(message: string, type: string = 'info') {
    console.log("====alert message =====")
     this.alertSubject.next({ message, type });
   }
 
   // Hide alert
   hideAlert() {
     this.alertSubject.next({ message: '', type: '' });
   }
}
