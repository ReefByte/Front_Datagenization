import { Component } from '@angular/core';

import { ColumnSelectionService } from '../../service/column-selection.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-column-selection',
  templateUrl: './column-selection.component.html',
  styleUrls: ['./column-selection.component.css'],
})
export class ColumnSelectionComponent {
  session_id: string | null = '';
  isModalOpen = false;
  columns: { [key: string]: string[] } = {};


  constructor(
    private columnSelectionService: ColumnSelectionService,
    private router: Router
  ) {}


  ngOnInit():void{
    this.session_id = sessionStorage.getItem('session_id')
    console.log(this.session_id)
    this.getColumns()
  }

  getColumns() {
    if (this.session_id) {
      this.columnSelectionService.getColumns(this.session_id).subscribe(
        (response: any) => {
          this.columns = response;
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

  selectionRows: any[] = [[{}]];

  addRow() {
    this.selectionRows.push([{}]);
  }

  addSelection(row: any[]) {
    row.push({});
  }

  removeSelection(row: any[]) {
    row.pop();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getMaxRows(obj: any): number[] {
    const values = Object.values(obj).filter((columns: any) =>
      Array.isArray(columns)
    ) as string[][];
    if (values.length === 0) {
      return [];
    }
    const maxRows = Math.max(
      ...values.map((columns: string[]) => columns.length)
    );
    if (isNaN(maxRows) || maxRows <= 0) {
      return [];
    }
    return Array(maxRows)
      .fill(0)
      .map((x, i) => i);
  }

  routing() {
    this.router.navigate(['/grouping']);
  }

  openModalPulpi() {
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }
}
