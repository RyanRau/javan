import { Component, Input } from "@angular/core";

export class breadcrumb {
  name: string;
  location: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() Trail: breadcrumb[];

  constructor() {}
}