import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Item } from "src/app/models";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  items: MatTableDataSource<Item>;
  @Input() set Items(value: Item[]){
    this.items = new MatTableDataSource<Item>(value);
    setTimeout(() => this.items.paginator = this.paginator);
    this.items.sort = this.sort;
  }

  @Input() viewOnly: boolean = false;
    
  @Output() ItemAdded = new EventEmitter();

  displayedColumns: string[] = ['name', 'category', 'location', 'action'];

  private orderNumber: number = null;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    // private _orderService: OrderService,
    private _route: ActivatedRoute
  ) { 
    // this._route.params.subscribe(params => {
    //   this.orderNumber = +params['id'];
    // });
  }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.items.filter = filterValue.trim().toLowerCase();

    if (this.items.paginator) {
      this.items.paginator.firstPage();
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      height: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result.event == 'Details-Add'){
      //   this.addToOrder(result.data);
      // }
    });
  }

  // private addToOrder(data){
  //   if (this.orderNumber) {
  //     let orderContent = new OrderContentDTO();

  //     orderContent.order = this.orderNumber;

  //     orderContent.item = data.id;
  
  //     orderContent.name = data.name;
  //     orderContent.quantity = data.quantity;
  //     orderContent.other_notes = data.notes;

  //     this._orderService.postOrderContent(orderContent).subscribe(response => {
  //       this.ItemAdded.emit();    
  //       this.openSnackBar("Item added", null);
  //     }, error => {
  //       console.error(error);
  //       this.openSnackBar("Failed to add item", null);
  //     });
  //   }else {
  //     this.openSnackBar("Failed to add item", null);
  //   }
  // }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}