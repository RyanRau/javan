import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { ItemFormData, OrderContentDTO, OrderDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private api: ApiService
  ) { }

  getOrder(): OrderDTO {
    return JSON.parse(localStorage.getItem('order'))
  }

  createOrder(order: OrderDTO) {
    localStorage.setItem(
      'order',
      JSON.stringify(order)
    )
  }

  addItem(itemData: ItemFormData) {
    let order = this.getOrder();

    if (!order)
      return;

    order.content = order.content.filter(i => i.item_id != itemData.id);

    let itemEntry: OrderContentDTO = {
      item_id: itemData.id,
      item_name: itemData.name,
      item_location: itemData.location,
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
  
  removeItemById(id: string): boolean {
    let order = this.getOrder();

    if (!order)
      return;

    let itemToRemove = order.content.find(i => i.item_id == id);
    
    if(itemToRemove == null)
      return false;
    
    order.content = order.content.filter(i => i.item_id != id);

    localStorage.setItem(
      'order',
      JSON.stringify(order)
    )

    return true;
  }
  
  deleteOrder(){
    localStorage.removeItem('order');
  }

  placeOrder(): boolean {
    let order = this.getOrder();

    if (!order)
      return false;

    this.api.post('api/items/order', order).subscribe(result => {
      console.log(result)
      this.deleteOrder();
      return true
    }, error => {
      console.error(error);
      return false
    })
  }
}