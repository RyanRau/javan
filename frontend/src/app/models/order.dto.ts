export class ItemFormData {
  id: string
  category: string
  description: string
  location: string
  name: string
  quantity: number
  notes: string
}

export class OrderDTO {
  orderNumber: number;
  members: { 
    name: string, 
    email:string
  }[];
  className: string;
  masterTeacher: string;
  lessonDateTime: string;
  pickupDateTime: string;
  otherNotes: string; 
  content: OrderContentDTO[];
}

export class OrderContentDTO {
  item_id: string
  item_name: string;
  item_location: string;
  quantity: number;
  notes: string;
  self_filled: boolean = false;
}