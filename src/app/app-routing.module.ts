import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColumnSelectionComponent} from "./components/column-selection/column-selection.component";
import {UploadComponent} from "./components/upload/upload.component";

const routes: Routes = [
   {path:'',component:UploadComponent},
   {path:'columns',component:ColumnSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
