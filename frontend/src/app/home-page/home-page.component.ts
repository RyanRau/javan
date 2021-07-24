import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderDetailsDialog } from '../items/order-details-dialog/order-details.dialog';
import { ItemsService } from '../services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.itemService.getAll().subscribe(result => {
      console.log(result);
    })
  }

  openOrderDetailsDialog(): void {
    const dialogRef = this.dialog.open(OrderDetailsDialog, {
      width: '100%',
      data: {name: 'name', animal: 'animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null || result.data == null)
        return;
      
      localStorage.setItem('order', JSON.stringify(result.data));
      this.router.navigateByUrl('/items/reserve');
    });
  }

}
