import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previsualizacion-antes',
  templateUrl: './previsualizacion-antes.component.html',
  styleUrls: ['./previsualizacion-antes.component.css'],
})
export class PrevisualizacionAntesComponent {
  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/carga']);
  }
}
