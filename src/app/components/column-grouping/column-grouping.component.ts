  import { Component } from '@angular/core';
  import { ColumnGroupingService } from '../../service/column-grouping.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-column-grouping',
    templateUrl: './column-grouping.component.html',
    styleUrls: ['./column-grouping.component.css'],
  })
  export class ColumnGroupingComponent {
    selectionRows: Array<{ [key: string]: any; columnName: string }> = [];
    session_id: string|null = '';
    columns: { [key: string]: string[] } = {};
    errorMessage: string | null = null;
    isModalOpen = false;
    recommendationsData: any = null;
    acceptedRecommendations: { [key: string]: boolean } = {};

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
      if(this.session_id){
        this.getColumns();
        this.loadRecommendations();
      }
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
      const newRow: { [key: string]: any; columnName: string } = {
        columnName: '',
      };
      for (const fileName of this.getKeys(this.columns)) {
        newRow[fileName] = [''];
      }
      this.selectionRows.push(newRow);
    }

    getKeys(obj: any): string[] {
      return Object.keys(obj);
    }

    isArray(value: any): boolean {
      return Array.isArray(value);
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
      const requestData = this.buildRequestData();

      this.router.navigate(['/carga'], { state: { data: requestData } });

      if (!requestData || Object.keys(requestData).length === 0) {
        this.errorMessage = 'Datos incompletos para procesar agrupación.';
        return;
      }

      this.columnGroupingService.sendGrouping(requestData, this.session_id || '').subscribe(
        (response) => {
          if (response.status === 200) {
            console.log('Agrupación enviada exitosamente. Redirigiendo a previsualización...');
            this.router.navigate(['/hresult']);
          } else {
            this.errorMessage = 'Error en el servidor. Intenta de nuevo.';
            this.router.navigate(['/grouping'], { state: { error: this.errorMessage } });
          }
        },
        (error) => {
          this.errorMessage = error.status === 422 ? 'La estructura de los datos es incorrecta. ' +
            'Por favor, revisa la selección de columnas.' : 'Ocurrió un error en el servidor, intenta de nuevo.';
          this.router.navigate(['/grouping'], { state: { error: this.errorMessage } });
        }
      );
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
          if (Array.isArray(row[fileName])) {
            row[fileName].forEach((selection: string) => {
              if (selection && selection.trim() !== '') {
                count++;
              }
            });
          } else {
            console.warn(`row[${fileName}] no es un array. Valor actual:`, row[fileName]);
          }
        }
      });

      return count;
    }

    buildRequestData(): any {
      const requestData: any = {};

      console.log("selectionRows al iniciar buildRequestData:", this.selectionRows);

      this.selectionRows.forEach((row) => {
        const columnKey = row.columnName || 'default';
        requestData[columnKey] = {};

        for (const fileName in row) {
          if (fileName !== 'columnName' && Array.isArray(row[fileName])) {
            const selectedColumns = row[fileName].filter(
              (column: string) => column.trim() !== ''
            );
            if (selectedColumns.length > 0) {
              requestData[columnKey][fileName] = selectedColumns;
            }
          }
        }
      });
      console.log('JSON construido en buildRequestData:', JSON.stringify(requestData, null, 2));
      return requestData;
    }

    loadRecommendations() {
      if (this.session_id) {
        this.columnGroupingService.getRecommendations(this.session_id).subscribe(
          (response) => {
            this.recommendationsData = response.similarity;
            console.log('Recomendaciones obtenidas:', this.recommendationsData);
          },
          (error) => {
            console.error('Error al obtener recomendaciones:', error);
          }
        );
      }
    }

    openModalPulpi() {
      this.isModalOpen = true;
    }

    closeModalPulpi() {
      this.isModalOpen = false;
    }

    acceptRecommendation(recommendationKey: string): void {
      const recommendation = this.recommendationsData[recommendationKey];

      this.acceptedRecommendations[recommendationKey] = true;

      const newRow: { [key: string]: any; columnName: string } = {
        columnName: recommendationKey
      };

      for (const fileKey in recommendation) {
        const baseFileKey = fileKey.endsWith('_') ? fileKey.slice(0, -1) : fileKey;

        if (!newRow[baseFileKey]) {
          newRow[baseFileKey] = [];
        }

        const columns = Array.isArray(recommendation[fileKey]) ? recommendation[fileKey] : [recommendation[fileKey]];
        newRow[baseFileKey] = [...newRow[baseFileKey], ...columns];
      }

      this.selectionRows.push(newRow);
      console.log(`Recomendación ${recommendationKey} aceptada y agregada a la tabla de selección:`, newRow);

    }

    rejectRecommendation(recommendationKey: string): void {
      console.log(`Recomendación ${recommendationKey} rechazada.`);
      this.closeModalPulpi();
    }

    protected readonly Array = Array;
  }
