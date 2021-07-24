export class ItemFormData {
  id: 1
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
  masterTeacher: string;
  lessonDateTime: string;
  pickupDateTime: string;
  otherNotes: string; 
  content: OrderContentDTO[];
}

export class OrderContentDTO {
  item_id: number
  item_name: string;
  quantity: number;
  notes: string;
  self_filled: boolean = false;
}