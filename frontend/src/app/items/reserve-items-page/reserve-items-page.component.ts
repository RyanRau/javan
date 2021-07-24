import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item, ItemFormData, OrderContentDTO, OrderDTO } from 'src/app/models';
import { ItemsService, OrderService } from 'src/app/services';

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
    let order: OrderDTO = JSON.parse(localStorage.getItem('order'))
    
    if (!order)
      return;

    order.content = order.content.filter(i => i.item_id != itemData.id);

    let itemEntry: OrderContentDTO = {
      item_id: itemData.id,
      item_name: itemData.name,
      quantity: itemData.quantity,
      notes: itemData.notes,
      self_filled: false
    };

    order.content.push(itemEntry);
  
    localStorage.setItem(
      'order',
      JSON.stringify(order)
    )
  }
}