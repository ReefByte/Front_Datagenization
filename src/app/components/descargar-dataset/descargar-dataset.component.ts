import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DescargarDatasetService } from '../../service/descargar-dataset.service';

@Component({
  selector: 'app-descargar-dataset',
  templateUrl: './descargar-dataset.component.html',
  styleUrls: ['./descargar-dataset.component.css'],
})
export class DescargarDatasetComponent implements OnInit{
  sessionId: string | null = '';
  constructor(
    private router: Router,
    private descargarDatasetService: DescargarDatasetService
  ) {}

  ngOnInit() {
    this.sessionId = sessionStorage.getItem('session_id');
  }

  downloadCsv() {
    if (this.sessionId) {
      this.descargarDatasetService
        .downloadCsv(this.sessionId)
        .subscribe((response) => {
          const blob = new Blob([response], { type: 'text/csv' });
          const downloadURL = window.URL.createObjectURL(blob);
          const datasetNameInput =
            (
              document.querySelector('.dataset-name') as HTMLInputElement
            ).value.trim() || 'dataset';
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${datasetNameInput}.csv`;
          link.click();
        });
    } else {
      console.error('No se encontró el session_id en el sessionStorage');
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
