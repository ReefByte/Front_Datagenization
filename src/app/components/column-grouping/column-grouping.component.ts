import { Component } from '@angular/core';
import { ColumnGroupingService } from '../../service/column-grouping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-column-grouping',
  templateUrl: './column-grouping.component.html',
  styleUrls: ['./column-grouping.component.css'],
})
export class ColumnGroupingComponent {
  selectionRows: Array<{ [key: string]: string[] }> = [];
  session_id: string|null = '';
  columns: { [key: string]: string[] } = {};
  errorMessage: string | null = null;
  isModalOpen = false;

  constructor(
    private columnGroupingService: ColumnGroupingService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.errorMessage = navigation?.extras.state?.['error'] || null;
  }

  ngOnInit(): void {
    this.session_id = sessionStorage.getItem('session_id')
    console.log(this.session_id);
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

  getRecomendations() {}

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
      this.selectionRows[rowIndex][fileName].push('');
    }
  }

  addRow(): void {
    this.initializeSelectionRow();
  }

  removeRow(rowIndex: number): void {
    if (this.selectionRows.length > 1) {
      this.selectionRows.splice(rowIndex, 1);
    } else {
      this.errorMessage =
        'Debe haber al menos una fila en la tabla de homogenización!';
    }
  }

  processGrouping(): void {
    const selectedColumnsCount = this.countSelectedColumns();
    if (selectedColumnsCount < 2) {
      this.errorMessage =
        'Debes seleccionar al menos 2 columnas para continuar.';
      return;
    }
    const requestData = this.buildRequestData();
    this.router.navigate(['/carga'], { state: { data: requestData } });
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

  closeErrorModal() {
    this.errorMessage = null;
  }

  countSelectedColumns(): number {
    let count = 0;

    this.selectionRows.forEach((row) => {
      for (const fileName in row) {
        row[fileName].forEach((selection) => {
          if (selection && selection.trim() !== '') {
            count++;
          }
        });
      }
    });

    return count;
  }

  buildRequestData(): any {
    const requestData: any = {};

    this.selectionRows.forEach((row, index) => {
      const columnKey = `additionalProp${index + 1}`;
      requestData[columnKey] = {};

      for (const fileName in row) {
        const selectedColumns = row[fileName].filter(
          (column) => column.trim() !== ''
        );
        if (selectedColumns.length > 0) {
          requestData[columnKey][fileName] = selectedColumns;
        }
      }
    });

    return requestData;
  }

  openModalPulpi() {
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }
}
