import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnSelectionComponent } from './components/column-selection/column-selection.component';
import { UploadComponent } from './components/upload/upload.component';
import { PrevisualizacionAntesComponent } from './components/previsualizacion-antes/previsualizacion-antes.component';
import { CargaComponent } from './components/carga/carga.component';
import { ColumnComponent } from './components/column/column.component';
import {PrevisualizacionDespuesComponent} from './components/previsualizacion-despues/previsualizacion-despues.component';
import {RecomendacionesComponent} from './components/recomendaciones/recomendaciones.component';
import {RecomendacionesRealizadasComponent} from './components/recomendaciones-realizadas/recomendaciones-realizadas.component';
import {DescargarDatasetComponent} from './components/descargar-dataset/descargar-dataset.component';
import {ColumnGroupingComponent} from "./components/column-grouping/column-grouping.component";

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'columns', component: ColumnSelectionComponent },
  { path: 'previsualizacion', component: PrevisualizacionAntesComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'column', component: ColumnComponent },
  { path: 'grouping', component:ColumnGroupingComponent},
  { path: 'hresult', component:PrevisualizacionDespuesComponent},
  { path: 'recomendaciones', component:RecomendacionesComponent},
  { path: 'recomendaciones-realizadas', component:RecomendacionesRealizadasComponent},
  { path: 'descargar', component:DescargarDatasetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
