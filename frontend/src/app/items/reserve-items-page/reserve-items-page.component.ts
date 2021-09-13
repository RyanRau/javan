import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Item, ItemFormData, OrderContentDTO, OrderDTO } from 'src/app/models';
import { ItemsService, OrderService } from 'src/app/services';
import { DialogBoxComponent } from 'src/app/shared-components/dialog-box/dialog-box.component';
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
    let order = this.orderService.getOrder()

    if(order == null) //TODO: display error
      this.router.navigateByUrl('/');

    this.breadcrumbTrail.push(
      { name: "Order #" + order.orderNumber, location: null},
    )

    this.retrieveItems();
  }

  retrieveItems() {
    this.isLoading = true;

    this.itemService.getAll().subscribe(result => {
      this.items = result;
      this.isLoading = false;
    }, error => {
      console.error(error)
      this.isLoading = false;
    })
  }

  addUnlisted(){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      data: {
        action: 'Unlisted-Add'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == null)
        return;

      this.snackBar.open('Item added', '', {
        duration: 2000
      });
      this.orderService.addItem(result.data);
    });
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