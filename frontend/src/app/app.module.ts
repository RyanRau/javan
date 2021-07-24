import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';

import { AngularMaterialModule } from './angular-material.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewItemsPageComponent } from './items/view-items-page/view-items-page.component';
import { CommonModule } from '@angular/common';
import { ReserveItemsPageComponent } from './items/reserve-items-page/reserve-items-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsDialog } from './items/order-details-dialog/order-details.dialog';
import { MatNativeDateModule } from '@angular/material/core';

const itemDeclarations = [
  ViewItemsPageComponent,
  ReserveItemsPageComponent
]

const dialogs = [
  OrderDetailsDialog
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ...dialogs,
    ...itemDeclarations
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedComponentsModule,
    MatNativeDateModule
  ],
  entryComponents: [
    ...dialogs
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
