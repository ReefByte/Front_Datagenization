import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {
  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/previsualizacion-despues']);
  }
}
