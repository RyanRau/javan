import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { OrderContentDTO, OrderDTO } from "src/app/models";
import { OrderService } from "src/app/services";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-review-order',
  templateUrl: './review-order.dialog.html',
  styleUrls: ['./review-order.dialog.css']
})
export class ReviewOrderDialog {

  order: OrderDTO;
  items: MatTableDataSource<OrderContentDTO>;

  displayedColumns: string[] = ['name', 'quantity', 'action'];

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<ReviewOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    
  }

  ngOnInit() {
    this.getOrderInfo();
  }

  getOrderInfo() {
    this.order = this.orderService.getOrder();
    this.items = new MatTableDataSource<OrderContentDTO>(this.order.content);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  removeItem(item: OrderContentDTO): void {
    let success = this.orderService.removeItemById(item.item_id);

    this.snackBar.open((success) ? 'Item Removed' : 'Failed to Remove Item' , '', {
      duration: 2000
    });

    this.getOrderInfo();
  }

  editItem(item: OrderContentDTO): void {
    
  }

  placeOrder(){

  }

}