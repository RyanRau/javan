import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemFormData } from 'src/app/models';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;

  form_data = {
    quantity: '',
    notes: '',
    name: ''
  }

  unlisted_data = {
    name: '',
    location: 'UNLISTED',
    category: 'UNLISTED'
  }

  local_data: any;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {

    if (data.action == 'Details-Update')  {
      this.form_data.quantity = data.quantity;
      this.form_data.notes = data.notes;

      delete data.quantity;
      delete data.notes;
    }

    if (data.action == 'Unlisted-Add') {
      this.form_data.name = '';
    }

    this.local_data = {
      ...data
    };
    this.action = this.local_data.action;

    console.log(this.action)
  }

  doAction(){
    if (this.action == 'Details-Add' || this.action == 'Unlisted-Add'){
      let qty = parseInt(this.form_data.quantity);
      if (qty == null || isNaN(qty) || qty <= 0){
        this.snackBar.open("Quantity can't be Empty or 0", '', {
          duration: 2000
        });
        return;
      }

      if (this.action == 'Unlisted-Add') {
        this.local_data = { ...this.unlisted_data };
      }
    }

    this.dialogRef.close({
      event: this.action, 
      data: {
        ...this.local_data,
        quantity: parseInt(this.form_data.quantity),
        notes: this.form_data.notes
      }
    });
  }

  closeDialog(){
    this.dialogRef.close({
      event: 'Cancel'
    });
  }

}