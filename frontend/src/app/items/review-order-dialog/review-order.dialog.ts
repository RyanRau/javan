import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { OrderContentDTO, OrderDTO } from "src/app/models";
import { OrderService } from "src/app/services";
import { DialogBoxComponent } from "src/app/shared-components/dialog-box/dialog-box.component";
@Component({
  selector: 'dialog-review-order',
  templateUrl: './review-order.dialog.html',
  styleUrls: ['./review-order.dialog.css']
})
export class ReviewOrderDialog {

  order: OrderDTO;
  items: MatTableDataSource<OrderContentDTO>;

  memberNames = '';
  memberEmails = '';

  displayedColumns: string[] = ['quantity', 'name', 'action'];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<ReviewOrderDialog>
  ) { }

  ngOnInit() {
    this.getOrderInfo();
  }

  getOrderInfo() {
    this.memberNames = '';
    this.memberEmails = '';

    this.order = this.orderService.getOrder();
    this.items = new MatTableDataSource<OrderContentDTO>(this.order.content);

    for(let i = 0; i < this.order.members.length; i++){
      this.memberNames = this.memberNames + this.order.members[i].name;
      this.memberEmails = this.memberEmails + this.order.members[i].email;

      if (i != this.order.members.length - 1) {
        this.memberNames = this.memberNames + ', '
        this.memberEmails = this.memberEmails + ', '
      }
    }
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
    let clone: any = Object.assign({}, item)
    clone.action = 'Details-Update';
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      data: clone
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Details-Update'){
        this.orderService.updateItem(result.data);
        this.getOrderInfo();
      }
    });
  }

  placeOrder(){
    if (this.order.content.length == 0){
      this.snackBar.open('Empty Orders cannot be Submitted' , '', {
        duration: 2000
      });
      return;
    }

    this.dialogRef.close({
      action: 'Place-Order'
    })
  }
}