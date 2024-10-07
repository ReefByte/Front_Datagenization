import { Component } from '@angular/core';
import { UploadService } from '../../service/upload.service';
import { ColumnGroupingService } from '../../service/column-grouping.service';

@Component({
  selector: 'app-column-grouping',
  templateUrl: './column-grouping.component.html',
  styleUrls: ['./column-grouping.component.css'],
})
export class ColumnGroupingComponent {
  selectionRows: Array<{ [key: string]: string[] }> = [];
  session_id: string = '';
  columns: { [key: string]: string[] } = {};

  constructor(
    private uploadService: UploadService,
    private columnGroupingService: ColumnGroupingService
  ) {}

  ngOnInit(): void {
    this.session_id = this.uploadService.getSession_id;
    this.getColumns();
  }

  getColumns() {
    if (this.session_id) {
      this.columnGroupingService.getColumns(this.session_id).subscribe(
        (response: any) => {
          this.columns = response;
          this.initializeSelectionRow();
          console.log('Datos guardados exitosamente ', this.columns);
        },
        (error: any) => {
          console.error('Error al obtener datos: ', error);
        }
      );
    } else {
      console.error('No hay session id valido');
    }
  }

  initializeSelectionRow() {
    const newRow: { [key: string]: string[] } = {};
    for (const fileName of this.getKeys(this.columns)) {
      newRow[fileName] = [''];
    }
    this.selectionRows.push(newRow);
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  addSelection(rowIndex: number, fileName: string): void {
    if (this.selectionRows[rowIndex][fileName]) {
      this.selectionRows[rowIndex][fileName].push(''); // Añadir una nueva selección vacía
    }
  }

  addRow(): void {
    this.initializeSelectionRow(); // Usa la función para agregar una nueva fila inicializada
  }

  processGrouping(): void {
    console.log('Procesando la agrupación:', this.selectionRows);
    //TODO: ENVIAR INFO AL BACK
  }
  removeSelection(
    rowIndex: number,
    fileName: string,
    selectionIndex: number
  ): void {
    if (this.selectionRows[rowIndex][fileName].length > 1) {
      this.selectionRows[rowIndex][fileName].splice(selectionIndex, 1);
    } else {
      console.warn('No puedes eliminar todas las selecciones');
    }
  }
}
