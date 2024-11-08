import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RecomendacionesService} from '../../service/recomendaciones.service';
@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
})
export class RecomendacionesComponent implements OnInit{
  isModalOpen = false;
  session_id: string|null = '';
  recomendacion: any;

  constructor(private router: Router,
    private RecomendacionesService: RecomendacionesService,
  ) {}

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
    if(this.session_id){
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

getNullsInfoEntries(): [string, number][] {
    return Object.entries(this.recomendacion).map(([columna, valores]: [string, any]) => [
        columna,
        valores.nulls || 0,
    ]);
}
}
