import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ListComponent } from './list/list.component';
import { NavComponent } from './nav/nav.component';

const sharedModules = [
  NavComponent,
  ListComponent,
  BreadcrumbComponent,
  DialogBoxComponent
]

@NgModule({
  declarations: [
    ...sharedModules
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    ...sharedModules
  ],
})
export class SharedComponentsModule { }
