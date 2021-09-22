import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OrderDTO } from "src/app/models";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-order-details',
  templateUrl: './order-details.dialog.html',
  styleUrls: ['./order-details.dialog.css']
})
export class OrderDetailsDialog {

  detailsForm: FormGroup;

  times = [
    '8:00 AM',
    '8:15 AM',
    '8:30 AM',
    '8:45 AM',
    '9:00 AM',
    '9:15 AM',
    '9:30 AM',
    '9:45 AM',
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '1:00 PM',
    '1:15 PM',
    '1:30 PM',
    '1:45 PM',
    '2:00 PM',
    '2:15 PM',
    '2:30 PM',
    '2:45 PM',
    '3:00 PM',
    '3:15 PM',
    '3:30 PM',
    '3:45 PM',
    '4:00 PM',
    '4:15 PM',
    '4:30 PM',
    '4:45 PM',
    '5:00 PM'
  ]

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    
  }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      orderNumber: new FormControl('', Validators.required),

      memberOneName: new FormControl('', Validators.required),
      memberOneEmail: new FormControl('', [Validators.email, Validators.required]),

      memberTwoName: new FormControl(''),
      memberTwoEmail: new FormControl('', Validators.email),

      memberThreeName: new FormControl(''),
      memberThreeEmail: new FormControl('', Validators.email),

      class: new FormControl('', Validators.required),
      instructor: new FormControl('', Validators.required),

      lessonDate: new FormControl(new Date(), Validators.required),
      lessonTime: new FormControl('', Validators.required),
      pickupDate: new FormControl(new Date(), Validators.required),
      pickupTime: new FormControl('', Validators.required),

      otherNotes: new FormControl('')
    });
  }
  
  gatherMemberInformation(): {name: string, email:string}[] {
    let members = []

    let controls = ['memberOne', 'memberTwo', 'memberThree'];
    controls.forEach(control => {
      if(this.detailsForm.controls[control + 'Name'].value == '')
        return

      members.push({
        name: this.detailsForm.controls[control + 'Name'].value,
        email: this.detailsForm.controls[control + 'Email'].value
      })
    });

    return members;
  }

  formatDateTime(date, time): string {
    let outerSplit = time.split(' ');
    let innerSplit = outerSplit[0].split(':');

    let hour = parseInt(innerSplit[0]);
    let min = parseInt(innerSplit[1]);

    if (outerSplit[1] == "PM")
      hour += 12;

    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  continue(): void {
    this.detailsForm.markAllAsTouched();
    if(!this.detailsForm.valid)
      return;

    let members = this.gatherMemberInformation();

    let order: OrderDTO = {
      orderNumber: parseInt(this.detailsForm.controls['orderNumber'].value),
      members: members,
      lessonDateTime: this.formatDateTime(
        this.detailsForm.controls['lessonDate'].value, 
        this.detailsForm.controls['lessonTime'].value
        ),
      pickupDateTime: this.formatDateTime(
        this.detailsForm.controls['pickupDate'].value,
        this.detailsForm.controls['pickupTime'].value
        ),
      className: this.detailsForm.controls['class'].value,
      instructor: this.detailsForm.controls['instructor'].value,
      otherNotes: this.detailsForm.controls['otherNotes'].value,
      content: []
    }

    this.dialogRef.close({
      data: order
    });
  }

}