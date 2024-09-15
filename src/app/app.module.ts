import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnSelectionComponent } from './components/column-selection/column-selection.component';
import { UploadComponent } from './components/upload/upload.component';
import { ColumnComponent } from './components/column/column.component';
import { CargaComponent } from './components/carga/carga.component';
import { PrevisualizacionAntesComponent } from './components/previsualizacion-antes/previsualizacion-antes.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnSelectionComponent,
    UploadComponent,
    ColumnComponent,
    CargaComponent,
    PrevisualizacionAntesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
