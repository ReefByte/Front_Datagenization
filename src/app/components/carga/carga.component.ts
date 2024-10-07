import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ColumnGroupingService} from "../../service/column-grouping.service";

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {

  jsonData:any;

  constructor(
    private router: Router,
    private columnGroupingService: ColumnGroupingService
  ){
    const navigation = this.router.getCurrentNavigation();
    this.jsonData = navigation?.extras.state?.['data'] || {};
    this.enviarAgrupacion();
  }

  ngOnInit(){
    this.enviarAgrupacion();
  }
  navigateToCarga() {
    this.router.navigate(['/previsualizacion-despues']);
  }
  enviarAgrupacion() {
    this.columnGroupingService.sendGrouping(this.jsonData).subscribe({
      next: (response) => {
        this.router.navigate(['/previsualizacion-despues'], { state: { response } });
      },
      error: (error) => {
        if (error.status === 422) {
          this.router.navigate(['/grouping'], {
            state: {
              error: 'La estructura de los datos es incorrecta. Por favor, revisa la selección de columnas.',
            },
          });
        } else {
          this.router.navigate(['grouping'], {
            state: { error: 'Ocurrió un error, intenta de nuevo.' },
          });
        }
      },
    });
  }
}
