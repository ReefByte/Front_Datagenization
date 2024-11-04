import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendaciones-realizadas',
  templateUrl: './recomendaciones-realizadas.component.html',
  styleUrls: ['./recomendaciones-realizadas.component.css']
})
export class RecomendacionesRealizadasComponent {
  constructor(
    private router: Router
  ) {}
  routing() {
    this.router.navigate(['/descargar']);
  }


}
