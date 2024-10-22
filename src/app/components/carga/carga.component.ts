import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnGroupingService } from "../../service/column-grouping.service";

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {

  session_id: string|null = '';
  jsonData: any;

  constructor(
    private router: Router,
    private columnGroupingService: ColumnGroupingService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.jsonData = navigation?.extras.state?.['data'] || {};
  }

  ngOnInit() {
    this.session_id = sessionStorage.getItem('session_id');

    if (!this.session_id) {
      console.error('No se pudo obtener el session_id.');
      return;
    }
    console.log('Session ID obtenido:', this.session_id);
    this.enviarAgrupacion();
  }

  navigateToCarga() {
    this.router.navigate(['/previsualizacion-despues']);
  }

  enviarAgrupacion() {
    if (!this.session_id) {
      console.error('Session ID no está disponible, no se puede enviar la solicitud.');
      return;
    }

    console.log('session_id enviado:', this.session_id);

    this.columnGroupingService.sendGrouping(this.jsonData, this.session_id).subscribe({
      next: (response) => {
        const responseData = {
          status: response.status,
          body: response.body
        };

        if (response.status === 200) {
          console.log('Agrupación enviada exitosamente. Redirigiendo a la pantalla de previsualización.');
          this.router.navigate(['/hresult'], { state: { responseData } });
        } else {
          console.warn('El servidor respondió, pero no con un estado exitoso. Estado:', response.status);
        }
      },
      error: (error) => {
        console.error('Error al enviar la agrupación:', error);
        if (error.status === 422) {
          this.router.navigate(['/grouping'], {
            state: {
              error: 'La estructura de los datos es incorrecta. Por favor, revisa la selección de columnas.',
            },
          });
        } else {
          console.error(`Error status: ${error.status}`);
          console.error(`Error message: ${error.message}`);
          this.router.navigate(['/grouping'], {
            state: { error: 'Ocurrió un error en el servidor, intenta de nuevo.' },
          });
        }
      },
    });
  }

}
