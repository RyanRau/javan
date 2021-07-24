import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    notes: ''
  }

  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.local_data = {
      ...data
    };
    this.action = this.local_data.action;
  }

  doAction(){
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