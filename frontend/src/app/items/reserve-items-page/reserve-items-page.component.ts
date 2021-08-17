import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item, ItemFormData, OrderContentDTO, OrderDTO } from 'src/app/models';
import { ItemsService, OrderService } from 'src/app/services';
import { ReviewOrderDialog } from '../review-order-dialog/review-order.dialog';

@Component({
  selector: 'app-reserve-items-page',
  templateUrl: './reserve-items-page.component.html',
  styleUrls: ['./reserve-items-page.component.css']
})
export class ReserveItemsPageComponent implements OnInit {

  breadcrumbTrail = [
    { name: "Home", location: "/" },
    { name: "Reserve Materials", location: null}
  ]
  
  isLoading: boolean = true;

  items: Item[];
  
  constructor(
    private itemService: ItemsService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('order') == null) //TODO: display error
      this.router.navigateByUrl('/');

    this.itemService.getAll().subscribe(result => {
      this.items = result;
      this.isLoading = false;
    }, error => {
      console.error(error)
      this.isLoading = false;
    })
  }

  addItem(itemData: ItemFormData) {
    this.orderService.addItem(itemData);
    this.snackBar.open('Item added', '', {
      duration: 2000
    });
  }

  reviewOrder(){
    const dialogRef = this.dialog.open(ReviewOrderDialog, {
      width: '100%'
    });
  }
}