import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descargar-dataset',
  templateUrl: './descargar-dataset.component.html',
  styleUrls: ['./descargar-dataset.component.css']
})
export class DescargarDatasetComponent {
  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['']);
  }
}
