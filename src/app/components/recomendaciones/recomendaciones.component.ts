import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecomendacionesService} from '../../service/recomendaciones.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
})
export class RecomendacionesComponent implements OnInit {
  isModalOpen = false;
  session_id: string | null = '';
  recomendacion: any = [];
  outliers: any;

  constructor(private router: Router,
              private RecomendacionesService: RecomendacionesService,
              private _sanitizer: DomSanitizer
  ) {
  }

  navigateToCarga() {
    this.router.navigate(['/descargar']);
  }

  openModalPulpi() {
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.session_id = sessionStorage.getItem('session_id')
    console.log(this.session_id);
    if (this.session_id) {
      this.getRecommendation();
    }
  }

  getRecommendation() {
    if (this.session_id) {
      this.RecomendacionesService.getRecommendation(this.session_id).subscribe(
        (response: any) => {
          this.recomendacion = response.recommendations;
          console.log('Datos guardados exitosamente ', this.recomendacion);
        },
        (error: any) => {
          console.error('Error al obtener datos: ', error);
        }
      );
    } else {
      console.error('No hay session id valido');
    }
  }

  getNullsInfoEntries(): [string, any, any][] {
    return Object.entries(this.recomendacion).map(([columna, valores]: [string, any]) => [
      columna,
      valores.nulls || 0,
      valores.outliers
    ]);
  }


  isBase64Image(data: any): boolean {
    return typeof data === 'string' && data.trim() !== '';
  }

  getImageSrc(base64Data: string): SafeUrl {
    const base64Image = `data:image/png;base64,${base64Data}`;
    return this._sanitizer.bypassSecurityTrustUrl(base64Image);
  }
}
