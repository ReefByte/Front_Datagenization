import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/descargar']);
  }
}
