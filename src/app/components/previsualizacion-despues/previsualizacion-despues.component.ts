import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previsualizacion-despues',
  templateUrl: './previsualizacion-despues.component.html',
  styleUrls: ['./previsualizacion-despues.component.css']
})
export class PrevisualizacionDespuesComponent {

  constructor(private router: Router) {}

  navigateToCarga() {
    this.router.navigate(['/recomendaciones']);
  }
}
