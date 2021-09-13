import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderDetailsDialog } from '../items/order-details-dialog/order-details.dialog';
import { ItemsService, OrderService } from '../services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  hasOrder: boolean = false;

  constructor(
    private itemService: ItemsService,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.itemService.getAll().subscribe(result => {
      console.log('ITS ALIVE', result); // Wacks up backend server.... hopefully
    })

    this.hasOrder = this.orderService.getOrder() != null;
  }

  openOrderDetailsDialog(): void {
    if(this.hasOrder){
      this.router.navigateByUrl('/items/reserve');
      return
    }

    const dialogRef = this.dialog.open(OrderDetailsDialog, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null || result.data == null)
        return;
      
      this.orderService.createOrder(result.data)
      this.router.navigateByUrl('/items/reserve');
    });
  }
}
