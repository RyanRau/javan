import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.itemService.getAll().subscribe(result => {
      console.log(result);
    })
  }

}
