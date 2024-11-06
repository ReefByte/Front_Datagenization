import {Component, OnInit} from '@angular/core';

import { ColumnSelectionService } from '../../service/column-selection.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-column-selection',
  templateUrl: './column-selection.component.html',
  styleUrls: ['./column-selection.component.css'],
})
export class ColumnSelectionComponent implements OnInit{
  session_id: string | null = '';
  isModalOpen = false;
  isLoadingPreview = false;
  isLoadingColumns = false;
  currentFileName :string = ""
  isPreviewOpen = false;
  columns: { [key: string]: string[] } = {};
  csvData: string[][] = [];
  csvHeaders: string[] = [];

  constructor(
    private columnSelectionService: ColumnSelectionService,
    private router: Router
  ) {}


  ngOnInit():void{
    this.isLoadingColumns = false;
    this.session_id = sessionStorage.getItem('session_id')
    console.log(this.session_id)
    if(this.session_id){
      this.getColumns()
      this.isLoadingColumns = false;
    }
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

  preview(filename : string) {
    this.isLoadingPreview = true;
    this.currentFileName = filename;
    if(this.session_id){
      this.columnSelectionService.getPreview(this.session_id, filename).subscribe(
        (response: any) => {
          const base64String = response.file;
          console.log(base64String)
          const csvContent = atob(base64String);
          this.parseCsv(csvContent);
          console.log('Datos guardados exitosamente ', this.columns);
          this.openPreview();
        },
        (error: any) => {
          console.error('Error al obtener datos: ', error);
        }
      );
    }
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

  openPreview() {
    this.isPreviewOpen = true;
    this.isLoadingPreview = false;
  }

  closePreview() {
    this.isPreviewOpen = false;
    this.csvData = [];
    this.csvHeaders = [];
    this.currentFileName = '';
  }

  parseCsv(csvContent: string) {
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length > 0) {
      this.csvHeaders = lines[0].split(',');
      this.csvData = lines.slice(1).map(line => line.split(','));
    }
  }
}
