import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnSelectionComponent } from './components/column-selection/column-selection.component';
import { UploadComponent } from './components/upload/upload.component';
import { PrevisualizacionAntesComponent } from './components/previsualizacion-antes/previsualizacion-antes.component';
import { CargaComponent } from './components/carga/carga.component';
import { ColumnComponent } from './components/column/column.component';

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'columns', component: ColumnSelectionComponent },
  { path: 'previsualizacion', component: PrevisualizacionAntesComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'column', component: ColumnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
