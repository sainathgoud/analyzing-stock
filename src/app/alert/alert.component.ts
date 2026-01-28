import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  //standalone: true,
  //imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy {

  alertMessage: string = '';
  alertType: string = 'info';  // Default alert type
  private alertSubscription: Subscription;

  constructor(private alertService: AlertService){}

  ngOnDestroy(): void {
   // Clean up subscription to avoid memory leaks
   if (this.alertSubscription) {
    this.alertSubscription.unsubscribe();
  }
  }
  ngOnInit(): void {
           console.log("===alert component =========");
     // Subscribe to the alert state observable
     this.alertSubscription = this.alertService.alertState$.subscribe((alertData) => {
      if (alertData.message) {
        this.alertMessage = alertData.message;
        this.alertType = alertData.type;
      } else {
        this.alertMessage = '';
        this.alertType = 'info';
      }
    });
  }

  // Method to close the alert manually
  closeAlert() {
    this.alertService.hideAlert();
  }
}
