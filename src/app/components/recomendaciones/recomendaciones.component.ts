import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
})
export class RecomendacionesComponent {
  isModalOpen = false;

  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/descargar']);
  }

  openModalPulpi() {
    this.isModalOpen = true;
  }

  closeModalPulpi() {
    this.isModalOpen = false;
  }
}
