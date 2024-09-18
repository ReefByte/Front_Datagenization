import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnSelectionComponent } from './components/column-selection/column-selection.component';
import { UploadComponent } from './components/upload/upload.component';
import { ColumnComponent } from './components/column/column.component';
import { CargaComponent } from './components/carga/carga.component';
import { PrevisualizacionAntesComponent } from './components/previsualizacion-antes/previsualizacion-antes.component';
import { PrevisualizacionDespuesComponent } from './components/previsualizacion-despues/previsualizacion-despues.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { RecomendacionesRealizadasComponent } from './components/recomendaciones-realizadas/recomendaciones-realizadas.component';
import { DescargarDatasetComponent } from './components/descargar-dataset/descargar-dataset.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ColumnSelectionComponent,
    UploadComponent,
    ColumnComponent,
    CargaComponent,
    PrevisualizacionAntesComponent,
    PrevisualizacionDespuesComponent,
    RecomendacionesComponent,
    RecomendacionesRealizadasComponent,
    DescargarDatasetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
