import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemFormData, OrderContentDTO, OrderDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor() { }

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