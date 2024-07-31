import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColumnSelectionComponent} from "./column-selection/column-selection.component";

const routes: Routes = [
  {
    path:'',component:ColumnSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
