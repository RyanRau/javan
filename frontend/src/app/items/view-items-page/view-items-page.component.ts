import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models';
import { ItemsService } from 'src/app/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './view-items-page.component.html',
  styleUrls: ['./view-items-page.component.css']
})
export class ViewItemsPageComponent implements OnInit {

  breadcrumbTrail = [
    { name: "Home", location: "/" },
    { name: "View Materials", location: null}
  ]
  
  isLoading: boolean = true;

  items: Item[];
  
  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.retrieveItems();
  }

  retrieveItems() {
    this.isLoading = true;

    this.itemService.getAll().subscribe(result => {
      this.items = result;
      this.isLoading = false;
    }, error => {
      console.error(error)
      this.isLoading = false;
    })
  }

}