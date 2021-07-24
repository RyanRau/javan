import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ReserveItemsPageComponent } from './items/reserve-items-page/reserve-items-page.component';
import { ViewItemsPageComponent } from './items/view-items-page/view-items-page.component';

const routes: Routes = [
  // { path: "login", component: LoginPageComponent },
  // { path: "error", component: ErrorPageComponent },

  { path: "", component: HomePageComponent, pathMatch: "full"},

  { path: "items/view", component: ViewItemsPageComponent, pathMatch: "full"},
  { path: "items/reserve", component: ReserveItemsPageComponent, pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
