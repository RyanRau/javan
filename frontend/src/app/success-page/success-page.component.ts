import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent {

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  returnHome() {
    // Ensures Order is deleted
    this.orderService.deleteOrder();

    this.router.navigateByUrl('/');
  }
}
